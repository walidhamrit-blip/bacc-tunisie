import { PERIOD_BY_ID, SECTIONS, type PeriodId } from "@/lib/sections";

export type CommunitySheetDraft = {
  authorName: string;
  section: string;
  subjectSlug: string;
  period: string;
  title: string;
  summary: string;
  content: string;
  keyFormula: string;
  tagsRaw: string;
};

export type CommunityValidationOutcome =
  | {
      ok: true;
      sanitized: {
        authorName: string;
        section: string;
        subjectSlug: string;
        period: PeriodId;
        title: string;
        summary: string;
        content: string;
        keyFormula: string;
        tags: string[];
        moderationNote: string;
      };
    }
  | {
      ok: false;
      errors: string[];
    };

const BLOCKED_PATTERNS = [
  /https?:\/\//i,
  /www\./i,
  /\b(?:t\.me|wa\.me|discord\.gg|bit\.ly)\b/i,
  /(.)\1{6,}/, // répétition abusive du même caractère (ex: "aaaaaaa")
];

const INAPPROPRIATE_WORDS = [
  "arnaque",
  "casino",
  "crypto",
  "pari",
  "spam",
  "triche",
  "fuite bac",
];

function slugifyFragment(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function buildCommunitySheetSlug(subjectSlug: string, title: string): string {
  const base = slugifyFragment(`${subjectSlug}-${title}`) || "fiche-communaute";
  const suffix = Date.now().toString(36).slice(-5);
  return `${base}-${suffix}`;
}

/**
 * Validation simple et pédagogique d'une fiche courte soumise par un élève :
 * - vérifie la présence et les bornes de longueur (format « fiche courte » lisible sur mobile),
 * - bloque les liens externes, le spam ou les répétitions abusives,
 * - normalise la filière, le trimestre et les étiquettes (tags).
 */
export function validateCommunitySheetInput(
  draft: CommunitySheetDraft,
  validSubjectSlugs: Set<string>,
): CommunityValidationOutcome {
  const errors: string[] = [];

  const authorName = draft.authorName.trim().replace(/\s+/g, " ").slice(0, 60);
  const title = draft.title.trim().replace(/\s+/g, " ");
  const summary = draft.summary.trim().replace(/\s+/g, " ");
  const content = draft.content.trim();
  const keyFormula = draft.keyFormula.trim();
  const subjectSlug = draft.subjectSlug.trim();

  if (authorName.length < 2) {
    errors.push("Indique ton prénom ou pseudonyme (au moins 2 caractères).");
  }

  if (!validSubjectSlugs.has(subjectSlug)) {
    errors.push("Choisis une matière valide du programme officiel.");
  }

  const normalizedSection = SECTIONS.includes(draft.section as (typeof SECTIONS)[number])
    ? draft.section
    : SECTIONS[0];

  const normalizedPeriod: PeriodId =
    draft.period in PERIOD_BY_ID ? (draft.period as PeriodId) : "T1";

  if (title.length < 8 || title.length > 110) {
    errors.push("Le titre doit contenir entre 8 et 110 caractères.");
  }

  if (summary.length < 15 || summary.length > 240) {
    errors.push("Le résumé en une phrase doit contenir entre 15 et 240 caractères.");
  }

  if (content.length < 40 || content.length > 1800) {
    errors.push(
      "Le corps de la fiche courte doit contenir entre 40 et 1 800 caractères (va droit à l'essentiel).",
    );
  }

  if (keyFormula.length > 260) {
    errors.push("L'encadré « Formule / règle d'or » ne doit pas dépasser 260 caractères.");
  }

  const combinedText = `${authorName} ${title} ${summary} ${content} ${keyFormula}`;
  const lowerCombined = combinedText.toLowerCase();

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(combinedText)) {
      errors.push(
        "Les liens externes, numéros promotionnels ou répétitions abusives de caractères ne sont pas autorisés.",
      );
      break;
    }
  }

  if (INAPPROPRIATE_WORDS.some((word) => lowerCombined.includes(word))) {
    errors.push("Le texte contient un terme non conforme à la charte d'entraide scolaire.");
  }

  const tags = Array.from(
    new Set(
      draft.tagsRaw
        .split(/[,;#]+/)
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length >= 2 && tag.length <= 28),
    ),
  ).slice(0, 5);

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const checksPassed = [
    "Format court respecté",
    "Aucun lien publicitaire détecté",
    keyFormula.length > 0 ? "Formule / règle clé renseignée" : "Points essentiels structurés",
  ];

  return {
    ok: true,
    sanitized: {
      authorName,
      section: normalizedSection,
      subjectSlug,
      period: normalizedPeriod,
      title,
      summary,
      content,
      keyFormula,
      tags,
      moderationNote: `Contrôle automatique OK : ${checksPassed.join(" · ")}.`,
    },
  };
}
