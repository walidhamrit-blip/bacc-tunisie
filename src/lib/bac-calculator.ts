import { normalizeSection, type SectionName } from "@/lib/sections";

export const OPTIONAL_SUBJECT_CHOICES = [
  "Espagnol",
  "Allemand",
  "Italien",
  "Dessin",
  "Musique",
  "Russe",
  "Chinois",
  "Turc",
] as const;

export type OptionalSubjectName = (typeof OPTIONAL_SUBJECT_CHOICES)[number];

export type BacSubjectField = {
  key: string;
  label: string;
  symbol: string;
  coefficient: number;
  /** Coefficient spécifique dans la Formule Globale d'orientation `FG` (hors `4 × MG`). */
  fgWeight: number;
  /** Matière principale de spécialité (prise en compte dans le critère de rachat ≥ 9/20). */
  specialty: boolean;
  /** Indique si une dispense médicale officielle est possible (ex. Éducation physique hors Bac Sport). */
  dispensable?: boolean;
  /** Lien vers le slug matière de `Bac Coach` pour le pré-remplissage intelligent des notes. */
  projectSubjectSlug?: string;
  hint?: string;
};

export type OrientationBenchmark = {
  id: string;
  institution: string;
  domain: string;
  /** Seuil indicatif de score FG observé dans le Guide de l'Orientation Universitaire. */
  indicativeFgThreshold: number;
};

export type SectionBacConfig = {
  section: SectionName;
  fgFormulaText: string;
  rachatSpecialtyHint: string;
  subjects: BacSubjectField[];
  benchmarks: OrientationBenchmark[];
};

export type BacAdmissionCode =
  | "admis_tres_bien"
  | "admis_bien"
  | "admis_assez_bien"
  | "admis_passable"
  | "controle_rachat_possible"
  | "controle_rattrapage"
  | "refuse";

export type BacVerdict = {
  code: BacAdmissionCode;
  admitted: boolean;
  statusLabel: string;
  mentionLabel: string;
  arabicLabel: string;
  badgeClass: string;
  accentColor: string;
  summary: string;
};

export type ComputedSubjectRow = BacSubjectField & {
  note20: number;
  isDispensed: boolean;
  activeCoefficient: number;
  weightedPoints: number;
  fgDirectPoints: number;
  /** Gain immédiat sur la moyenne générale `MG` pour `+1,00 / 20` dans cette matière. */
  impactPlus1OnMg: number;
  /** Gain total sur le score d'orientation `FG` (`4 × ΔMG + fgWeight`) pour `+1,00 / 20`. */
  impactPlus1OnFg: number;
  eliminatoryZero: boolean;
};

export type ComputedBenchmarkRow = OrientationBenchmark & {
  reachedBase: boolean;
  reachedWithBonus7: boolean;
  missingFgBase: number;
  missingFgWithBonus7: number;
  progressPct: number;
};

export type BacCalculationResult = {
  section: SectionName;
  fgFormulaText: string;
  rachatSpecialtyHint: string;
  subjectRows: ComputedSubjectRow[];
  totalCoefficients: number;
  weightedSubjectPoints: number;
  optionEnabled: boolean;
  optionName: string;
  optionNote20: number;
  optionBonusPoints: number;
  sportDispense: boolean;
  canDispenseSport: boolean;
  totalPoints: number;
  mg20: number;
  fgBaseFromMg: number;
  fgSpecificPoints: number;
  fgScore: number;
  fgWith7PercentBonus: number;
  specialtyAvg20: number;
  hasEliminatoryZero: boolean;
  rachatEligible: boolean;
  pointsNeededForAdmission: number;
  nextThresholdTarget: {
    label: string;
    targetMg20: number;
    missingWeightedPoints: number;
  } | null;
  topFgLeverageSubject: ComputedSubjectRow | null;
  verdict: BacVerdict;
  benchmarks: ComputedBenchmarkRow[];
};

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function clampNote20(raw: number): number {
  if (!Number.isFinite(raw)) return 0;
  return round2(Math.min(20, Math.max(0, raw)));
}

export function formatFrDecimal(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace(".", ",");
}

export const SECTION_BAC_CONFIGS: Record<SectionName, SectionBacConfig> = {
  Mathématiques: {
    section: "Mathématiques",
    fgFormulaText: "FG = 4 × MG + 2 × M + 1,5 × SP + 0,5 × SVT + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Mathématiques (M) et Sciences physiques (SP)",
    subjects: [
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 4,
        fgWeight: 2,
        specialty: true,
        projectSubjectSlug: "mathematiques",
        hint: "Matière principale · double impact massif sur MG (×4) et FG (+2×M)",
      },
      {
        key: "physique",
        label: "Sciences physiques",
        symbol: "SP",
        coefficient: 4,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "physique",
        hint: "Matière principale · Physique & Chimie",
      },
      {
        key: "svt",
        label: "Sciences de la vie et de la terre",
        symbol: "SVT",
        coefficient: 1,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "svt",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "informatique",
        label: "Informatique",
        symbol: "Info",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "Écrit 0,5 + pratique 0,5 (coefficient officiel 1)",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "math-ipest-med",
        institution: "IPEST La Marsa / Médecine Tunis",
        domain: "Prépas d'excellence & Santé",
        indicativeFgThreshold: 176,
      },
      {
        id: "math-insat-ensi",
        institution: "INSAT / Prépa Intégrée Ingénieur (MPI)",
        domain: "Sciences de l'Ingénieur & Tech",
        indicativeFgThreshold: 162,
      },
      {
        id: "math-prepa-mp",
        institution: "Cycles Préparatoires MP (IPEIT, IPEIS, IPEIM)",
        domain: "Concours Nationaux d'Ingénieurs",
        indicativeFgThreshold: 140,
      },
      {
        id: "math-licence-info",
        institution: "ISI / FST — Licences Informatique & Mathématiques",
        domain: "Licences Scientifiques",
        indicativeFgThreshold: 124,
      },
    ],
  },

  "Sciences expérimentales": {
    section: "Sciences expérimentales",
    fgFormulaText: "FG = 4 × MG + 1 × M + 1,5 × SP + 1,5 × SVT + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Sciences physiques (SP) et SVT",
    subjects: [
      {
        key: "physique",
        label: "Sciences physiques",
        symbol: "SP",
        coefficient: 4,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "physique",
        hint: "Matière principale · Physique & Chimie",
      },
      {
        key: "svt",
        label: "Sciences de la vie et de la terre",
        symbol: "SVT",
        coefficient: 4,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "svt",
        hint: "Matière principale · Génétique, Neuro, Immunité & Reproduction",
      },
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 3,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "mathematiques",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "informatique",
        label: "Informatique",
        symbol: "Info",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "Écrit 0,5 + pratique 0,5 (coefficient officiel 1)",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "sci-medecine",
        institution: "Facultés de Médecine, Dentaire & Pharmacie",
        domain: "Études Médicales (Tunis, Sousse, Monastir, Sfax)",
        indicativeFgThreshold: 171,
      },
      {
        id: "sci-insat-cba",
        institution: "INSAT (CBA) & Sciences Paramédicales (Anesthésie, Kiné)",
        domain: "Biologie Appliquée & Santé",
        indicativeFgThreshold: 154,
      },
      {
        id: "sci-prepa-pc-bg",
        institution: "Cycles Préparatoires PC & Biologie-Géologie",
        domain: "Ingénierie & Agronomie",
        indicativeFgThreshold: 136,
      },
      {
        id: "sci-licence-biotech",
        institution: "FST / ISBT — Licences Biotechnologie & Sciences de la Vie",
        domain: "Licences Fondamentales & Appliquées",
        indicativeFgThreshold: 118,
      },
    ],
  },

  "Sciences techniques": {
    section: "Sciences techniques",
    fgFormulaText: "FG = 4 × MG + 1,5 × TE + 1,5 × M + 1 × SP + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Technologie (TE), Mathématiques (M) et Sciences physiques (SP)",
    subjects: [
      {
        key: "technologie",
        label: "Technologie (Génie élec. & méca.)",
        symbol: "TE",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "technologie",
        hint: "Matière principale de spécialité technique",
      },
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "mathematiques",
      },
      {
        key: "physique",
        label: "Sciences physiques",
        symbol: "SP",
        coefficient: 3,
        fgWeight: 1,
        specialty: true,
        projectSubjectSlug: "physique",
      },
      {
        key: "technologie_tp",
        label: "Technologie — épreuve pratique (TP)",
        symbol: "TP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "technologie",
        hint: "Épreuve pratique de technologie, coefficient 1 à part entière",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "informatique",
        label: "Informatique",
        symbol: "Info",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "Écrit 0,5 + pratique 0,5 (coefficient officiel 1)",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "tech-insat-prepa-pt",
        institution: "INSAT / Cycles Préparatoires PT (IPEIM, IPEIS, IPEIN)",
        domain: "Concours Ingénieurs Technologie",
        indicativeFgThreshold: 152,
      },
      {
        id: "tech-issat-isi",
        institution: "ISSAT / ISI — Ingénierie Systèmes Embarqués & Automatique",
        domain: "Électronique, Énergie & Informatique Industrielle",
        indicativeFgThreshold: 136,
      },
      {
        id: "tech-iset-gm-ge",
        institution: "ISET (Radès, Sousse, Sfax) — Génie Électrique & Mécanique",
        domain: "Licences Appliquées Technologiques",
        indicativeFgThreshold: 120,
      },
      {
        id: "tech-licence-energetique",
        institution: "Facultés des Sciences — Licences Électromécanique & Énergétique",
        domain: "Sciences & Technologies",
        indicativeFgThreshold: 108,
      },
    ],
  },

  Informatique: {
    section: "Informatique",
    fgFormulaText: "FG = 4 × MG + 1,5 × M + 1,5 × Algo + 0,5 × SP + 0,5 × STI + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Algorithmique & Programmation (Algo) et Mathématiques (M)",
    subjects: [
      {
        key: "algo",
        label: "Algorithmique & Programmation",
        symbol: "Algo",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "informatique",
        hint: "Spécialité Python, structures de données & algorithmique",
      },
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "mathematiques",
      },
      {
        key: "sti",
        label: "STI (Bases de données & TIC)",
        symbol: "STI",
        coefficient: 3,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "SQL, conception relationnelle, architectures & réseaux",
      },
      {
        key: "physique",
        label: "Sciences physiques",
        symbol: "SP",
        coefficient: 2,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "physique",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "info-insat-supcom",
        institution: "INSAT / Prépa Intégrée Génie Logiciel & Réseaux",
        domain: "Cycle Ingénieur Informatique",
        indicativeFgThreshold: 160,
      },
      {
        id: "info-isi-isamm",
        institution: "ISI Ariana / ISIMS / ISAMM — Génie Logiciel & IA",
        domain: "Sciences de l'Informatique & Multimédia",
        indicativeFgThreshold: 142,
      },
      {
        id: "info-bi-isg-ihec",
        institution: "IHEC / ISG Tunis / ESEN — Business Computing (BI)",
        domain: "Informatique de Gestion & Data",
        indicativeFgThreshold: 128,
      },
      {
        id: "info-iset-dsi",
        institution: "ISET — Développement des Systèmes d'Information (DSI)",
        domain: " Technologies de l'Informatique",
        indicativeFgThreshold: 114,
      },
    ],
  },

  "Économie & Gestion": {
    section: "Économie & Gestion",
    fgFormulaText: "FG = 4 × MG + 1,5 × Ec + 1,5 × Ge + 0,5 × M + 0,5 × HG + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Économie (Ec) et Gestion (Ge)",
    subjects: [
      {
        key: "economie",
        label: "Économie",
        symbol: "Ec",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "economie",
        hint: "Matière principale · Croissance, développement & mondialisation",
      },
      {
        key: "gestion",
        label: "Gestion",
        symbol: "Ge",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "gestion",
        hint: "Matière principale · Comptabilité, coûts & gestion financière",
      },
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 2,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "mathematiques",
      },
      {
        key: "histoire-geographie",
        label: "Histoire-Géographie",
        symbol: "HG",
        coefficient: 2,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "histoire-geographie",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "informatique",
        label: "Informatique",
        symbol: "Info",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "Écrit 0,5 + pratique 0,5 (coefficient officiel 1)",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "eco-ihec-tbs",
        institution: "IHEC Carthage / Tunis Business School (TBS)",
        domain: "Hautes Études Commerciales & Management",
        indicativeFgThreshold: 152,
      },
      {
        id: "eco-isg-essect",
        institution: "ISG Tunis / ESSECT / ISCAE Manouba — Comptabilité & Finance",
        domain: "Expertise Comptable, Audit & Finance",
        indicativeFgThreshold: 134,
      },
      {
        id: "eco-fseg-bi",
        institution: "FSEG (Tunis, Sfax, Sousse) — Sciences Économiques & BI",
        domain: "Économie, Gestion & Informatique de Gestion",
        indicativeFgThreshold: 118,
      },
      {
        id: "eco-droit-iset",
        institution: "Facultés de Droit & ISET Administration des Affaires",
        domain: "Droit, Commerce & Logistique",
        indicativeFgThreshold: 106,
      },
    ],
  },

  Lettres: {
    section: "Lettres",
    fgFormulaText: "FG = 4 × MG + 1,5 × A + 1,5 × Ph + 1 × HG + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Arabe (A) et Philosophie (Ph)",
    subjects: [
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 4,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "arabe",
        hint: "Matière principale · Littérature arabe & rédaction",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 4,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "philosophie",
        hint: "Matière principale · Dissertation & commentaire philosophique",
      },
      {
        key: "histoire-geographie",
        label: "Histoire-Géographie",
        symbol: "HG",
        coefficient: 3,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "histoire-geographie",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 2,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 2,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "education-islamique",
        label: "Pensée islamique",
        symbol: "Isl",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "education-islamique",
      },
      {
        key: "informatique",
        label: "Informatique",
        symbol: "Info",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "informatique",
        hint: "Écrit 0,5 + pratique 0,5 (coefficient officiel 1)",
      },
      {
        key: "sport_ep",
        label: "Éducation physique (Sport)",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        dispensable: true,
      },
    ],
    benchmarks: [
      {
        id: "let-ens-ipelsht",
        institution: "ENS Tunis / IPELSHT — Cycle Préparatoire Littéraire & Langues",
        domain: "École Normale Supérieure & Recherche",
        indicativeFgThreshold: 148,
      },
      {
        id: "let-fsjpst-ipsi",
        institution: "FSJPST Tunis (Sciences Juridiques) & IPSI (Journalisme)",
        domain: "Droit, Médias & Communication",
        indicativeFgThreshold: 132,
      },
      {
        id: "let-islt-flah",
        institution: "ISLT / Faculté des Lettres Manouba & 9 Avril — Langues & Traduction",
        domain: "Anglais, Français, Traduction & Psychologie",
        indicativeFgThreshold: 118,
      },
      {
        id: "let-education",
        institution: "ISEAH — Éducation et Enseignement & Sciences Humaines",
        domain: "Enseignement, Histoire & Sociologie",
        indicativeFgThreshold: 108,
      },
    ],
  },

  Sport: {
    section: "Sport",
    fgFormulaText:
      "FG = 4 × MG + 1,5 × SB + 1 × Sp-prat + 0,5 × EP + 0,5 × SP + 0,5 × Ph + 1 × F + 1 × Ang",
    rachatSpecialtyHint: "Spécialité sportive (Sp-sport) et Sciences biologiques (SB)",
    subjects: [
      {
        key: "sport_spec",
        label: "Spécialité sportive — pratique",
        symbol: "Sp-prat",
        coefficient: 2.5,
        fgWeight: 1,
        specialty: true,
        projectSubjectSlug: "education-physique",
        hint: "Matière principale · épreuves pratiques de la discipline",
      },
      {
        key: "sport_theorie",
        label: "Spécialité sportive — théorie",
        symbol: "Sp-théo",
        coefficient: 0.5,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "education-physique",
        hint: "Anatomie, biomécanique, physiologie de l'effort & réglementation",
      },
      {
        key: "svt",
        label: "Sciences biologiques (SVT)",
        symbol: "SB",
        coefficient: 3,
        fgWeight: 1.5,
        specialty: true,
        projectSubjectSlug: "svt",
        hint: "Matière principale · Physiologie de l'effort, neuro & immunité",
      },
      {
        key: "sport_ep",
        label: "Éducation physique générale",
        symbol: "EP",
        coefficient: 1,
        fgWeight: 0.5,
        specialty: false,
        dispensable: false,
      },
      {
        key: "physique",
        label: "Sciences physiques",
        symbol: "SP",
        coefficient: 1,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "physique",
      },
      {
        key: "philosophie",
        label: "Philosophie",
        symbol: "Ph",
        coefficient: 1.5,
        fgWeight: 0.5,
        specialty: false,
        projectSubjectSlug: "philosophie",
      },
      {
        key: "francais",
        label: "Français",
        symbol: "F",
        coefficient: 1.5,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "francais",
      },
      {
        key: "anglais",
        label: "Anglais",
        symbol: "Ang",
        coefficient: 1.5,
        fgWeight: 1,
        specialty: false,
        projectSubjectSlug: "anglais",
      },
      {
        key: "mathematiques",
        label: "Mathématiques",
        symbol: "M",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "mathematiques",
      },
      {
        key: "arabe",
        label: "Arabe",
        symbol: "A",
        coefficient: 1,
        fgWeight: 0,
        specialty: false,
        projectSubjectSlug: "arabe",
      },
    ],
    benchmarks: [
      {
        id: "sport-kine-sante",
        institution: "ESSTSS — Physiothérapie / Kinésithérapie du Sport",
        domain: "Santé & Réadaptation Motrice",
        indicativeFgThreshold: 146,
      },
      {
        id: "sport-issep-ksar-said",
        institution: "ISSEP Ksar Saïd — Éducation Physique & Entraînement",
        domain: "Sciences et Techniques des Activités Physiques et Sportives",
        indicativeFgThreshold: 128,
      },
      {
        id: "sport-issep-sfax-sousse",
        institution: "ISSEP Sfax, Gafsa & Kef — Préparation Physique & Management Sportif",
        domain: "Entraînement & Gestion du Sport",
        indicativeFgThreshold: 114,
      },
      {
        id: "sport-animation",
        institution: "ISJ — Animation Jeunesse & Encadrement Sportif",
        domain: "Jeunesse, Loisirs & Vie Associative",
        indicativeFgThreshold: 104,
      },
    ],
  },
};

export function getSectionBacConfig(section: string | null | undefined): SectionBacConfig {
  const normalized = normalizeSection(section);
  return SECTION_BAC_CONFIGS[normalized];
}

export function buildDefaultNotesForSection(
  section: string | null | undefined,
  defaultNote = 12,
): Record<string, number> {
  const config = getSectionBacConfig(section);
  const safeDefault = clampNote20(defaultNote);
  const map: Record<string, number> = {};
  for (const sub of config.subjects) {
    map[sub.key] = safeDefault;
  }
  return map;
}

/**
 * Construit une grille de notes pré-remplie à partir des projections de l'élève
 * issues de ses quiz, Bac Blanc chronométrés et notes de devoirs (`MentionPredictionResult`).
 */
export function buildPrefilledNotesFromProjections(
  section: string | null | undefined,
  projectionsBySlug: Record<string, number>,
): Record<string, number> {
  const config = getSectionBacConfig(section);
  const map: Record<string, number> = {};
  for (const sub of config.subjects) {
    if (sub.projectSubjectSlug && typeof projectionsBySlug[sub.projectSubjectSlug] === "number") {
      map[sub.key] = clampNote20(projectionsBySlug[sub.projectSubjectSlug]);
    } else if (sub.key === "sport_ep") {
      map[sub.key] = 14.5;
    } else {
      map[sub.key] = 11.5;
    }
  }
  return map;
}

export function computeBacAndOrientation(params: {
  section: string | null | undefined;
  notes: Record<string, number>;
  optionEnabled: boolean;
  optionName?: string;
  optionNote20: number;
  sportDispense: boolean;
}): BacCalculationResult {
  const config = getSectionBacConfig(params.section);
  const canDispenseSport = config.subjects.some((sub) => sub.key === "sport_ep" && sub.dispensable);
  const effectiveSportDispense = canDispenseSport && Boolean(params.sportDispense);

  const totalCoefficients = round2(
    config.subjects.reduce((sum, sub) => {
      if (sub.dispensable && effectiveSportDispense) return sum;
      return sum + sub.coefficient;
    }, 0),
  );
  const safeCoefSum = Math.max(1, totalCoefficients);

  const subjectRows: ComputedSubjectRow[] = config.subjects.map((sub) => {
    const note20 = clampNote20(params.notes[sub.key] ?? 10);
    const isDispensed = Boolean(sub.dispensable && effectiveSportDispense);
    const activeCoefficient = isDispensed ? 0 : sub.coefficient;
    const weightedPoints = round2(note20 * activeCoefficient);
    const fgDirectPoints = round2(note20 * sub.fgWeight);
    const impactPlus1OnMg = isDispensed ? 0 : round2(activeCoefficient / safeCoefSum);
    const impactPlus1OnFg = isDispensed
      ? 0
      : round2(4 * (activeCoefficient / safeCoefSum) + sub.fgWeight);

    return {
      ...sub,
      note20,
      isDispensed,
      activeCoefficient,
      weightedPoints,
      fgDirectPoints,
      impactPlus1OnMg,
      impactPlus1OnFg,
      eliminatoryZero: !isDispensed && note20 === 0,
    };
  });

  const weightedSubjectPoints = round2(
    subjectRows.reduce((sum, row) => sum + row.weightedPoints, 0),
  );

  const optionNote20 = clampNote20(params.optionNote20);
  const optionName = (params.optionName ?? "Espagnol").trim() || "Espagnol";
  const optionBonusPoints = params.optionEnabled
    ? round2(Math.max(0, optionNote20 - 10))
    : 0;

  const totalPoints = round2(weightedSubjectPoints + optionBonusPoints);
  const mg20 = round2(totalPoints / safeCoefSum);

  const fgBaseFromMg = round2(4 * mg20);
  const fgSpecificPoints = round2(
    subjectRows.reduce((sum, row) => sum + row.fgDirectPoints, 0),
  );
  const fgScore = round2(fgBaseFromMg + fgSpecificPoints);
  const fgWith7PercentBonus = round2(fgScore * 1.07);

  const specialtyRows = subjectRows.filter((row) => row.specialty && !row.isDispensed);
  const specialtyAvg20 =
    specialtyRows.length > 0
      ? round2(
          specialtyRows.reduce((sum, row) => sum + row.note20, 0) / specialtyRows.length,
        )
      : mg20;

  const hasEliminatoryZero = subjectRows.some((row) => row.eliminatoryZero);
  const rachatEligible =
    mg20 >= 9 && mg20 < 10 && specialtyAvg20 >= 9 && !hasEliminatoryZero;

  const pointsNeededForAdmission =
    mg20 < 10 ? round2(Math.max(0, 10 * safeCoefSum - totalPoints)) : 0;

  let nextThresholdTarget: BacCalculationResult["nextThresholdTarget"] = null;
  const thresholds = [
    { label: "Admission directe (10,00/20)", targetMg20: 10 },
    { label: "Mention Assez Bien (12,00/20)", targetMg20: 12 },
    { label: "Mention Bien (14,00/20)", targetMg20: 14 },
    { label: "Mention Très Bien (16,00/20)", targetMg20: 16 },
  ];
  const nextThreshold = thresholds.find((item) => mg20 < item.targetMg20);
  if (nextThreshold) {
    nextThresholdTarget = {
      label: nextThreshold.label,
      targetMg20: nextThreshold.targetMg20,
      missingWeightedPoints: round2(
        Math.max(0, nextThreshold.targetMg20 * safeCoefSum - totalPoints),
      ),
    };
  }

  let verdict: BacVerdict;
  if (mg20 >= 16 && !hasEliminatoryZero) {
    verdict = {
      code: "admis_tres_bien",
      admitted: true,
      statusLabel: "Admis(e) · Session Principale",
      mentionLabel: "Mention Très Bien",
      arabicLabel: "ناجح — ملاحظة حسن جدا",
      badgeClass: "badge-green",
      accentColor: "var(--green)",
      summary:
        "Excellence académique : ta moyenne générale ouvre les filières les plus sélectives du Guide de l'Orientation Universitaire.",
    };
  } else if (mg20 >= 14 && !hasEliminatoryZero) {
    verdict = {
      code: "admis_bien",
      admitted: true,
      statusLabel: "Admis(e) · Session Principale",
      mentionLabel: "Mention Bien",
      arabicLabel: "ناجح — ملاحظة حسن",
      badgeClass: "badge-blue",
      accentColor: "var(--blue)",
      summary:
        "Très solide performance : tu valides la Mention Bien avec un score d'orientation compétitif.",
    };
  } else if (mg20 >= 12 && !hasEliminatoryZero) {
    verdict = {
      code: "admis_assez_bien",
      admitted: true,
      statusLabel: "Admis(e) · Session Principale",
      mentionLabel: "Mention Assez Bien",
      arabicLabel: "ناجح — ملاحظة قريب من الحسن",
      badgeClass: "badge-gold",
      accentColor: "var(--gold-ink)",
      summary:
        "Admission confortable avec Mention Assez Bien. Quelques points ciblés sur tes gros coefficients peuvent propulser ton score FG.",
    };
  } else if (mg20 >= 10 && !hasEliminatoryZero) {
    verdict = {
      code: "admis_passable",
      admitted: true,
      statusLabel: "Admis(e) · Session Principale",
      mentionLabel: "Mention Passable",
      arabicLabel: "ناجح — ملاحظة مقبول",
      badgeClass: "badge-green",
      accentColor: "var(--green)",
      summary:
        "Baccalauréat validé dès la session principale ! Travaille tes matières à fort poids FG pour élargir tes choix d'orientation.",
    };
  } else if (mg20 >= 9 && mg20 < 10) {
    verdict = {
      code: "controle_rachat_possible",
      admitted: false,
      statusLabel: rachatEligible
        ? "Zone de Rachat (الإسعاف) ou Session de Contrôle"
        : "Session de Contrôle (Rachat non rempli)",
      mentionLabel: rachatEligible ? "Éligible au Rachat (sous réserve moyenne annuelle)" : "Session de Contrôle",
      arabicLabel: rachatEligible ? "مؤجل — قابل للإسعاف" : "دورة المراقبة",
      badgeClass: "badge-gold",
      accentColor: "var(--gold-ink)",
      summary: rachatEligible
        ? `Ta moyenne est entre 9,00 et 9,99/20 et tes matières principales atteignent ${formatFrDecimal(
            specialtyAvg20,
          )}/20 (≥ 9/20) sans zéro éliminatoire : le rachat à 10,00 est possible si ta moyenne annuelle ≥ 10/20.`
        : `Moyenne entre 9,00 et 9,99/20, mais les conditions cumulatives du rachat ne sont pas toutes réunies (moyenne spécialités : ${formatFrDecimal(
            specialtyAvg20,
          )}/20${hasEliminatoryZero ? ", présence d'un 00/20" : ""}). Passage en session de contrôle.`,
    };
  } else if (mg20 >= 7) {
    verdict = {
      code: "controle_rattrapage",
      admitted: false,
      statusLabel: "Ajourné(e) · Session de Contrôle",
      mentionLabel: "Rattrapage (دورة المراقبة)",
      arabicLabel: "مؤجل إلى دورة المراقبة",
      badgeClass: "badge-gold",
      accentColor: "var(--gold-ink)",
      summary: `Moyenne comprise entre 7,00 et 8,99/20 : il te manque ${formatFrDecimal(
        pointsNeededForAdmission,
      )} points pondérés pour décrocher l'admission directe à 10,00/20.`,
    };
  } else {
    verdict = {
      code: "refuse",
      admitted: false,
      statusLabel: "Non admis (< 7,00 / 20)",
      mentionLabel: "Moyenne insuffisante",
      arabicLabel: "مرفوض",
      badgeClass: "badge-brand",
      accentColor: "var(--brand)",
      summary: `Une moyenne inférieure à 7,00/20 en session principale ne permet pas d'accéder à la session de contrôle. Concentre-toi en priorité sur tes matières à gros coefficients.`,
    };
  }

  const topFgLeverageSubject =
    [...subjectRows]
      .filter((row) => !row.isDispensed && row.note20 < 19)
      .sort((a, b) => b.impactPlus1OnFg - a.impactPlus1OnFg)[0] ?? null;

  const benchmarks: ComputedBenchmarkRow[] = config.benchmarks.map((bench) => {
    const missingFgBase = round2(Math.max(0, bench.indicativeFgThreshold - fgScore));
    const missingFgWithBonus7 = round2(
      Math.max(0, bench.indicativeFgThreshold - fgWith7PercentBonus),
    );
    const progressPct = Math.min(
      100,
      Math.max(0, Math.round((fgScore / Math.max(1, bench.indicativeFgThreshold)) * 100)),
    );

    return {
      ...bench,
      reachedBase: verdict.admitted && fgScore >= bench.indicativeFgThreshold,
      reachedWithBonus7:
        verdict.admitted && fgWith7PercentBonus >= bench.indicativeFgThreshold,
      missingFgBase,
      missingFgWithBonus7,
      progressPct,
    };
  });

  return {
    section: config.section,
    fgFormulaText: config.fgFormulaText,
    rachatSpecialtyHint: config.rachatSpecialtyHint,
    subjectRows,
    totalCoefficients,
    weightedSubjectPoints,
    optionEnabled: Boolean(params.optionEnabled),
    optionName,
    optionNote20,
    optionBonusPoints,
    sportDispense: effectiveSportDispense,
    canDispenseSport,
    totalPoints,
    mg20,
    fgBaseFromMg,
    fgSpecificPoints,
    fgScore,
    fgWith7PercentBonus,
    specialtyAvg20,
    hasEliminatoryZero,
    rachatEligible,
    pointsNeededForAdmission,
    nextThresholdTarget,
    topFgLeverageSubject,
    verdict,
    benchmarks,
  };
}
