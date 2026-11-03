import { inflateRawSync, inflateSync } from "node:zlib";

export type PdfExtraction = {
  text: string;
  pageCount: number;
  warnings: string[];
};

/**
 * Extraction de texte PDF "maison", sans dépendance externe.
 *
 * Beaucoup de PDF d'examens (Word, imprimantes virtuelles, polices arabes
 * sous-ensemble) ne stockent pas les caractères directement : le flux de
 * contenu contient des codes de glyphes et la vraie correspondance
 * code → caractère se trouve dans la table /ToUnicode de chaque police.
 * Sans lire ces tables, on obtient du charabia (« QLAEPEPES » au lieu de
 * « Exercice »). Cet extracteur parse donc :
 *   - les objets du PDF et leurs flux (zlib ou non),
 *   - l'arbre des pages → ressources → polices → /ToUnicode (CMap),
 *   - le flux de contenu en suivant la police active (/Fx Tf) pour
 *     décoder chaque chaîne via sa CMap, avec repli latin1/UTF-16/UTF-8.
 */

/* ---------- décodage brut des chaînes ---------- */

function literalToBytes(raw: string): Buffer {
  const out: number[] = [];
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (ch !== "\\") {
      out.push(ch.charCodeAt(0) & 0xff);
      continue;
    }
    const next = raw[i + 1];
    i += 1;
    switch (next) {
      case "n":
        out.push(10);
        break;
      case "r":
        out.push(13);
        break;
      case "t":
        out.push(9);
        break;
      case "b":
        out.push(8);
        break;
      case "f":
        out.push(12);
        break;
      case "(":
      case ")":
      case "\\":
        out.push(next.charCodeAt(0));
        break;
      case "\n":
        break;
      case "\r":
        if (raw[i + 1] === "\n") i += 1;
        break;
      default:
        if (next && /[0-7]/.test(next)) {
          let octal = next;
          while (octal.length < 3 && /[0-7]/.test(raw[i + 1] ?? "")) {
            octal += raw[i + 1];
            i += 1;
          }
          out.push(parseInt(octal, 8) & 0xff);
        } else if (next) {
          out.push(next.charCodeAt(0) & 0xff);
        }
    }
  }
  return Buffer.from(out);
}

function hexToBytes(raw: string): Buffer {
  const cleaned = raw.replace(/[^0-9a-fA-F]/g, "");
  const even = cleaned.length % 2 === 0 ? cleaned : `${cleaned}0`;
  return Buffer.from(even, "hex");
}

/** Hexadécimal CMap (UTF-16BE) → chaîne unicode. */
function hexToUnicode(hex: string): string {
  const bytes = hexToBytes(hex);
  if (bytes.length >= 2 && bytes.length % 2 === 0) {
    const swapped = Buffer.from(bytes);
    swapped.swap16();
    return swapped.toString("utf16le");
  }
  return bytes.toString("latin1");
}

/** Décodage de repli quand la police n'a pas de table ToUnicode lisible. */
function decodeFallback(bytes: Buffer): string {
  if (bytes.length === 0) return "";
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    const swapped = Buffer.from(bytes.subarray(2));
    swapped.swap16();
    return swapped.toString("utf16le");
  }
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return bytes.subarray(2).toString("utf16le");
  }
  const latin = bytes.toString("latin1");
  // Cas fréquent : octets UTF-8 lus comme latin1 (« café » → « cafÃ© »).
  if (/[\xc2-\xf4][\x80-\xbf]/.test(latin)) {
    const utf8 = bytes.toString("utf8");
    const suspicious = (latin.match(/[\xc2-\xf4][\x80-\xbf]/g) ?? []).length;
    const replacements = (utf8.match(/\ufffd/g) ?? []).length;
    if (suspicious > 0 && replacements < suspicious) return utf8;
  }
  return latin;
}

/** Table ToUnicode d'une police : codes → unicode + largeur d'un code en octets. */
type CMap = { map: Map<number, string>; width: number };

/** Décodage via la table ToUnicode d'une police. */
function decodeWithMap(bytes: Buffer, cmap: CMap): string {
  const { map, width } = cmap;
  if (map.size === 0 || bytes.length === 0) return "";
  let out = "";
  for (let i = 0; i + width <= bytes.length; i += width) {
    const code = width === 2 ? (bytes[i] << 8) | bytes[i + 1] : bytes[i];
    out += map.get(code) ?? "";
  }
  return out;
}

/* ---------- parsing structurel du PDF ---------- */

function parseObjects(raw: string): Map<number, string> {
  const objects = new Map<number, string>();
  const re = /(\d+)\s+(\d+)\s+obj([\s\S]*?)endobj/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw))) {
    objects.set(parseInt(match[1], 10), match[3]);
  }
  return objects;
}

function getStream(body: string): Buffer | null {
  const startMatch = /stream\r?\n/.exec(body);
  if (!startMatch || startMatch.index === undefined) return null;
  const from = startMatch.index + startMatch[0].length;
  const end = body.indexOf("endstream", from);
  if (end < 0) return null;
  return Buffer.from(body.slice(from, end), "latin1");
}

function inflateStream(body: string, bytes: Buffer): string | null {
  const head = body.slice(0, body.search(/stream\r?\n/));
  let out: Buffer | null = null;
  if (/FlateDecode/.test(head)) {
    for (const fn of [inflateSync, inflateRawSync]) {
      try {
        out = fn(bytes);
        break;
      } catch {
        out = null;
      }
    }
  } else {
    out = bytes;
  }
  if (!out || out.length === 0) return null;
  return out.toString("latin1");
}

/** Extrait un dictionnaire << ... >> équilibré commençant à `start`. */
function balancedDict(text: string, start: number): string {
  let depth = 0;
  for (let j = start; j < text.length; j += 1) {
    if (text.startsWith("<<", j)) {
      depth += 1;
      j += 1;
    } else if (text.startsWith(">>", j)) {
      depth -= 1;
      j += 1;
      if (depth === 0) return text.slice(start, j + 1);
    }
  }
  return text.slice(start);
}

function skipSpaces(text: string, i: number): number {
  while (i < text.length && /\s/.test(text[i])) i += 1;
  return i;
}

/** name de ressource (/F1) → numéro d'objet police, depuis un dict /Font. */
function parseFontDict(fontDict: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const m of fontDict.matchAll(/\/([^\s/<>()\[\]{}%]+)\s+(\d+)\s+(\d+)\s+R/g)) {
    map.set(m[1], parseInt(m[2], 10));
  }
  return map;
}

/** Polices déclarées dans les ressources d'une page (dict direct ou indirect). */
function getPageFontResources(pageBody: string, objects: Map<number, string>): Map<string, number> {
  const resIdx = pageBody.indexOf("/Resources");
  if (resIdx < 0) return new Map();
  let i = skipSpaces(pageBody, resIdx + "/Resources".length);
  let dictText: string | null = null;
  if (pageBody.startsWith("<<", i)) {
    dictText = balancedDict(pageBody, i);
  } else {
    const m = /(\d+)\s+\d+\s+R/.exec(pageBody.slice(i, i + 40));
    if (m) dictText = objects.get(parseInt(m[1], 10)) ?? null;
  }
  if (!dictText) return new Map();
  const fontIdx = dictText.indexOf("/Font");
  if (fontIdx < 0) return new Map();
  let j = skipSpaces(dictText, fontIdx + "/Font".length);
  let fontDict: string | null = null;
  if (dictText.startsWith("<<", j)) {
    fontDict = balancedDict(dictText, j);
  } else {
    const m = /(\d+)\s+\d+\s+R/.exec(dictText.slice(j, j + 40));
    if (m) fontDict = objects.get(parseInt(m[1], 10)) ?? null;
  }
  return fontDict ? parseFontDict(fontDict) : new Map();
}

/** Flux de contenu (/Contents) d'une page. */
function getPageContents(
  pageBody: string,
  objects: Map<number, string>,
): { body: string; bytes: Buffer }[] {
  const m = /\/Contents\s*(\[[\s\S]*?\]|\d+\s+\d+\s+R)/.exec(pageBody);
  if (!m) return [];
  const refs = [...m[1].matchAll(/(\d+)\s+\d+\s+R/g)].map((x) => parseInt(x[1], 10));
  const out: { body: string; bytes: Buffer }[] = [];
  for (const ref of refs) {
    const body = objects.get(ref);
    if (!body) continue;
    const bytes = getStream(body);
    if (bytes) out.push({ body, bytes });
  }
  return out;
}

/** Table ToUnicode (CMap) d'un objet police → map code → unicode + largeur de code. */
function parseCmap(text: string): CMap {
  const map = new Map<number, string>();
  // Largeur des codes déclarée par codespacerange (<0000> <ffff> → 2 octets).
  let width = 0;
  for (const block of text.matchAll(/begincodespacerange([\s\S]*?)endcodespacerange/g)) {
    for (const m of block[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/g)) {
      width = Math.max(width, Math.ceil(m[1].replace(/\s/g, "").length / 2));
    }
  }
  for (const block of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const m of block[1].matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F\s]+)>/g)) {
      map.set(parseInt(m[1], 16), hexToUnicode(m[2]));
    }
  }
  for (const block of text.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)) {
    const body = block[1];
    // Forme tableau : <lo> <hi> [ <d1> <d2> ... ]
    for (const m of body.matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*\[([\s\S]*?)\]/g)) {
      const lo = parseInt(m[1], 16);
      const items = [...m[3].matchAll(/<([0-9a-fA-F\s]+)>/g)];
      items.forEach((item, idx) => map.set(lo + idx, hexToUnicode(item[1])));
    }
    // Forme plage : <lo> <hi> <dst> (on incrémente la dernière unité de dst)
    const withoutArrays = body.replace(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*\[[\s\S]*?\]/g, " ");
    for (const m of withoutArrays.matchAll(/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F\s]+)>/g)) {
      const lo = parseInt(m[1], 16);
      const hi = Math.min(parseInt(m[2], 16), lo + 8192);
      const dstBytes = hexToBytes(m[3]);
      for (let c = lo; c <= hi; c += 1) {
        if (dstBytes.length >= 2 && dstBytes.length % 2 === 0) {
          const b = Buffer.from(dstBytes);
          const last = b.readUInt16BE(b.length - 2) + (c - lo);
          b.writeUInt16BE(last & 0xffff, b.length - 2);
          const swapped = Buffer.from(b);
          swapped.swap16();
          map.set(c, swapped.toString("utf16le"));
        } else if (dstBytes.length > 0) {
          map.set(c, String.fromCharCode((dstBytes[0] + (c - lo)) & 0xff));
        }
      }
    }
  }
  // Repli : déduire la largeur de la plus grande clé connue.
  if (width === 0) {
    for (const key of map.keys()) {
      if (key > 0xff) {
        width = 2;
        break;
      }
    }
    if (width === 0) width = 1;
  }
  return { map, width };
}

/* ---------- extraction du texte d'un flux de contenu ---------- */

type FontResolver = (fontObj: number | null) => CMap | null;

function extractFromContent(content: string, fonts: Map<string, number>, resolveFont: FontResolver): string[] {
  const lines: string[] = [];
  const re =
    /\/([A-Za-z0-9_.#+-]+)\s+(-?[\d.]+)\s+Tf|\(((?:\\.|[^\\()])*)\)|<([0-9a-fA-F\s]{2,})>|(?<![A-Za-z0-9])(T[dD*]|Tm|EMC|'|")(?![A-Za-z0-9])|\/ActualText\s*(?:\(((?:\\.|[^\\()])*)\)|<([0-9a-fA-F\s]{2,})>)/g;
  let match: RegExpExecArray | null;
  let currentFont: number | null = null;
  let buffer = "";
  let actualText: string | null = null;

  const decodeBytes = (bytes: Buffer): string => {
    if (currentFont != null) {
      const cmap = resolveFont(currentFont);
      if (cmap && cmap.map.size > 0) {
        const decoded = decodeWithMap(bytes, cmap);
        if (decoded.length > 0) return decoded;
      }
    }
    return decodeFallback(bytes);
  };

  const flush = () => {
    const text = buffer.replace(/\s+/g, " ").trim();
    if (text.length > 0) lines.push(text);
    buffer = "";
  };

  while ((match = re.exec(content))) {
    if (match[1] !== undefined) {
      // /Nom taille Tf → police active
      currentFont = fonts.get(match[1]) ?? null;
    } else if (match[3] !== undefined) {
      // chaîne littérale (...)
      if (actualText === null) buffer += decodeBytes(literalToBytes(match[3]));
    } else if (match[4] !== undefined) {
      // chaîne hexadécimale <...>
      if (actualText === null) buffer += decodeBytes(hexToBytes(match[4]));
    } else if (match[5] !== undefined) {
      // opérateur de positionnement (nouvelle ligne) ou EMC
      if (match[5] === "EMC") {
        if (actualText !== null) {
          buffer += actualText;
          actualText = null;
        }
      } else {
        flush();
      }
    } else if (match[6] !== undefined || match[7] !== undefined) {
      // /ActualText : texte réel prioritaire sur les glyphes
      actualText = decodeBytes(match[6] !== undefined ? literalToBytes(match[6]) : hexToBytes(match[7]));
    }
  }
  flush();
  return lines;
}

/* ---------- nettoyage ---------- */

function cleanText(value: string): string {
  return value
    .replace(/\r/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line, index, arr) => line.length > 0 && line !== arr[index - 1])
    .join("\n")
    .trim();
}

/** Ratio de caractères « suspects » (hors lettres latines/arabes, chiffres, ponctuation usuelle). */
function garbageRatio(sample: string): number {
  if (sample.length === 0) return 0;
  const ok = /[A-Za-z0-9À-ÖØ-öø-ÿĀ-ž išűőœŒæÆ\u0600-\u06ff\u0750-\u077f\s.,;:!?()«»"'’\-–—%+\/=<>°€$#@&*[\]{}|~^_`\\]/g;
  const weird = sample.replace(ok, "").length;
  return weird / sample.length;
}

/* ---------- point d'entrée ---------- */

export function extractPdfText(buffer: Buffer): PdfExtraction {
  const warnings: string[] = [];
  const raw = buffer.toString("latin1");
  const pageCount = Math.max(1, (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length);

  const objects = parseObjects(raw);
  const lines: string[] = [];

  // Cache font object → CMap ToUnicode.
  const fontCache = new Map<number, CMap>();
  const resolveFont = (fontObj: number | null): CMap | null => {
    if (fontObj == null) return null;
    if (!fontCache.has(fontObj)) {
      let cmap: CMap | null = null;
      const body = objects.get(fontObj);
      if (body) {
        const m = /\/ToUnicode\s+(\d+)\s+\d+\s+R/.exec(body);
        if (m) {
          const toBody = objects.get(parseInt(m[1], 10));
          const stream = toBody ? getStream(toBody) : null;
          if (toBody && stream) {
            const cmapText = inflateStream(toBody, stream);
            if (cmapText && /beginbf(char|range)/.test(cmapText)) {
              cmap = parseCmap(cmapText);
            }
          }
        }
      }
      fontCache.set(fontObj, cmap ?? { map: new Map(), width: 1 });
    }
    return fontCache.get(fontObj) ?? null;
  };

  const pages = [...objects.entries()].filter(([, body]) => /\/Type\s*\/Page(?![sA-Za-z])/.test(body));

  if (pages.length > 0) {
    for (const [, pageBody] of pages) {
      const fonts = getPageFontResources(pageBody, objects);
      for (const { body, bytes } of getPageContents(pageBody, objects)) {
        const content = inflateStream(body, bytes);
        if (!content || !/(Tf|Tj|TJ)/.test(content)) continue;
        lines.push(...extractFromContent(content, fonts, resolveFont));
      }
    }
  }

  // Repli : aucune page trouvée → on balaie tous les flux contenant du texte,
  // avec une table de polices globale (noms de ressources du document entier).
  if (lines.length === 0) {
    const globalFonts = new Map<string, number>();
    for (const body of objects.values()) {
      if (!body.includes("/Font")) continue;
      for (const [name, obj] of getPageFontResources(body, objects)) {
        if (!globalFonts.has(name)) globalFonts.set(name, obj);
      }
    }
    for (const body of objects.values()) {
      const bytes = getStream(body);
      if (!bytes) continue;
      const content = inflateStream(body, bytes);
      if (!content || !/(Tf|Tj|TJ)/.test(content)) continue;
      lines.push(...extractFromContent(content, globalFonts, resolveFont));
    }
  }

  let text = cleanText(lines.join("\n"));
  if (text.length > 40000) text = text.slice(0, 40000);

  if (text.length < 60) {
    warnings.push(
      "Le texte du PDF n'a pas pu être lu (document scanné ou polices encodées). Colle l'énoncé dans la zone de texte pour obtenir un corrigé guidé.",
    );
  } else {
    const ratio = garbageRatio(text.slice(0, 4000));
    if (ratio > 0.08) {
      warnings.push(
        "Une partie du texte semble illisible (polices du PDF non reconnues). Si l'extrait paraît tronqué ou déformé, colle l'énoncé directement dans la zone de texte.",
      );
    } else if (/[ÃÂ][\x80-\xbf]/.test(text)) {
      warnings.push("Certains caractères accentués peuvent être mal affichés dans l'extrait du PDF.");
    }
  }

  return { text, pageCount, warnings };
}
