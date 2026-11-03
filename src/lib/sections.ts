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

/**
 * Périodes de l'année scolaire du bac, alignées sur les devoirs de synthèse
 * trimestriels (DS1, DS2, DS3) puis la révision et l'examen de juin.
 */
export const PERIODS = [
  { id: "T1", short: "T1", label: "1er trimestre", months: "Septembre – Décembre", exam: "Devoir de synthèse N°1" },
  { id: "T2", short: "T2", label: "2ème trimestre", months: "Janvier – Mars", exam: "Devoir de synthèse N°2" },
  { id: "T3", short: "T3", label: "3ème trimestre", months: "Avril – Mai", exam: "Devoir de synthèse N°3" },
  { id: "REV", short: "Rév.", label: "Révision & bac", months: "Juin", exam: "Examen du baccalauréat" },
] as const;

export type PeriodId = (typeof PERIODS)[number]["id"];

export const PERIOD_BY_ID: Record<PeriodId, (typeof PERIODS)[number]> = Object.fromEntries(
  PERIODS.map((period) => [period.id, period]),
) as Record<PeriodId, (typeof PERIODS)[number]>;

export function isPeriod(value: string | null | undefined): value is PeriodId {
  return !!value && (PERIODS as readonly { id: string }[]).some((period) => period.id === value);
}
