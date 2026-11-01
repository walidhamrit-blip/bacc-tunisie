export const SECTIONS = [
  "Mathématiques",
  "Sciences expérimentales",
  "Sciences techniques",
  "Économie & Gestion",
  "Lettres",
  "Informatique",
  "Sport",
] as const;

export type SectionName = (typeof SECTIONS)[number];

export const SECTION_INFO: Record<SectionName, { short: string; description: string }> = {
  Mathématiques: {
    short: "Bac Math",
    description: "Maths, physique, SVT et informatique avec un rythme soutenu.",
  },
  "Sciences expérimentales": {
    short: "Sciences exp.",
    description: "SVT et physique renforcées, maths appliquées au programme officiel.",
  },
  "Sciences techniques": {
    short: "Sciences tech.",
    description: "Maths, physique et technologie industrielle.",
  },
  "Économie & Gestion": {
    short: "Éco-Gestion",
    description: "Économie, gestion comptable, maths et matières communes.",
  },
  Lettres: {
    short: "Lettres",
    description: "Arabe, français, philosophie et histoire-géographie.",
  },
  Informatique: {
    short: "Informatique",
    description: "Algorithmique, bases de données et matières scientifiques.",
  },
  Sport: {
    short: "Sport",
    description: "Épreuves sportives et matières communes du bac.",
  },
};

export function isSection(value: string | null | undefined): value is SectionName {
  return !!value && (SECTIONS as readonly string[]).includes(value);
}

export const ALL_SECTIONS = ["Toutes les sections", ...SECTIONS];

export function normalizeSection(value: string | null | undefined): SectionName {
  return isSection(value) ? value : "Sciences expérimentales";
}
