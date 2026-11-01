import { inflateRawSync, inflateSync } from "node:zlib";

export type PdfExtraction = {
  text: string;
  pageCount: number;
  warnings: string[];
};

function decodeLiteral(raw: string): string {
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    if (char !== "\\") {
      out += char;
      continue;
    }
    const next = raw[i + 1];
    i += 1;
    switch (next) {
      case "n":
        out += "\n";
        break;
      case "r":
        out += "\r";
        break;
      case "t":
        out += "\t";
        break;
      case "b":
        out += "\b";
        break;
      case "f":
        out += "\f";
        break;
      case "(":
      case ")":
      case "\\":
        out += next;
        break;
      case "\n":
        break;
      default:
        if (next && /[0-7]/.test(next)) {
          let octal = next;
          while (octal.length < 3 && /[0-7]/.test(raw[i + 1] ?? "")) {
            octal += raw[i + 1];
            i += 1;
          }
          out += String.fromCharCode(parseInt(octal, 8));
        } else if (next) {
          out += next;
        }
    }
  }
  return out;
}

function decodeHex(raw: string): string {
  const cleaned = raw.replace(/[^0-9a-fA-F]/g, "");
  const even = cleaned.length % 2 === 0 ? cleaned : `${cleaned}0`;
  const bytes = Buffer.from(even, "hex");
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return bytes.subarray(2).swap16().toString("utf16le");
  }
  return bytes.toString("latin1");
}

function extractStrings(chunk: string): string {
  let out = "";
  const literal = /\((?:\\.|[^\\()])*\)/g;
  let match: RegExpExecArray | null;
  while ((match = literal.exec(chunk))) {
    out += decodeLiteral(match[0].slice(1, -1));
  }
  const hex = /<([0-9a-fA-F\s]{4,})>/g;
  while ((match = hex.exec(chunk))) {
    out += decodeHex(match[1]);
  }
  return out;
}

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

export function extractPdfText(buffer: Buffer): PdfExtraction {
  const warnings: string[] = [];
  const raw = buffer.toString("latin1");
  const pageCount = Math.max(
    1,
    (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length,
  );

  const lines: string[] = [];
  const streamRegex = /stream\r?\n/g;
  let streamMatch: RegExpExecArray | null;

  while ((streamMatch = streamRegex.exec(raw))) {
    const start = streamMatch.index + streamMatch[0].length;
    const end = raw.indexOf("endstream", start);
    if (end < 0) continue;
    const bytes = Buffer.from(raw.slice(start, end), "latin1");
    if (bytes.length === 0) continue;

    let content: string | null = null;
    for (const attempt of [inflateSync, inflateRawSync]) {
      try {
        content = attempt(bytes).toString("latin1");
        break;
      } catch {
        content = null;
      }
    }
    if (!content) {
      // Streams stored without compression, only keep them if they look like text.
      content = /BT|Tj|TJ/.test(bytes.toString("latin1")) ? bytes.toString("latin1") : null;
    }
    if (!content) continue;
    if (!/(Tj|TJ)/.test(content)) continue;

    const segments = content.split(/\bBT\b|\bET\b|\bT[dD]\b|\bT\*|\b'|\b"/);
    for (const segment of segments) {
      const text = extractStrings(segment).replace(/\s+/g, " ").trim();
      if (text.length > 0) lines.push(text);
    }
    streamRegex.lastIndex = end;
  }

  let text = cleanText(lines.join("\n"));

  if (text.length > 40000) text = text.slice(0, 40000);
  if (text.length < 60) {
    warnings.push(
      "Le texte du PDF n'a pas pu être lu (document scanné ou polices encodées). Colle l'énoncé dans la zone de texte pour obtenir un corrigé guidé.",
    );
  }
  if (/[ÃÂ][\x80-\xbf]/.test(text)) {
    warnings.push("Certains caractères accentués peuvent être mal affichés dans l'extrait du PDF.");
  }

  return { text, pageCount, warnings };
}
