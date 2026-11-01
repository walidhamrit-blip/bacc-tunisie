import type { SectionName } from "@/lib/sections";

export type SubjectSeed = {
  slug: string;
  name: string;
  shortName: string;
  family: "Sciences" | "Lettres & langues" | "Sciences humaines" | "Économie" | "Technologie";
  icon: string;
  accent: string;
  description: string;
  sections: SectionName[];
  orderIndex: number;
};

const SCI = "Sciences expérimentales" as const;
const MAT = "Mathématiques" as const;
const TEC = "Sciences techniques" as const;
const ECO = "Économie & Gestion" as const;
const LET = "Lettres" as const;
const INF = "Informatique" as const;
const SPO = "Sport" as const;

export const subjectSeeds: SubjectSeed[] = [
  {
    slug: "mathematiques",
    name: "Mathématiques",
    shortName: "Maths",
    family: "Sciences",
    icon: "∑",
    accent: "#1E5EFF",
    description:
      "Analyse, suites, complexes et probabilités : les chapitres du programme officiel expliqués pas à pas, avec les réflexes de rédaction attendus au bac.",
    sections: [MAT, SCI, TEC, ECO, INF, SPO],
    orderIndex: 1,
  },
  {
    slug: "physique",
    name: "Physique",
    shortName: "Physique",
    family: "Sciences",
    icon: "⚛",
    accent: "#7C3AED",
    description:
      "Électricité, mécanique, ondes et noyaux : les lois au programme, les montages, les graphes et les méthodes de calcul de bac.",
    sections: [MAT, SCI, TEC, INF],
    orderIndex: 2,
  },
  {
    slug: "svt",
    name: "Sciences naturelles",
    shortName: "SVT",
    family: "Sciences",
    icon: "🧬",
    accent: "#0E9F6E",
    description:
      "Génétique, immunologie et reproduction : des fiches synthétiques, des schémas à maîtriser et des exercices de synthèse corrigés.",
    sections: [MAT, SCI],
    orderIndex: 3,
  },
  {
    slug: "informatique",
    name: "Informatique",
    shortName: "Info",
    family: "Sciences",
    icon: "⌨",
    accent: "#0F766E",
    description:
      "Algorithmique, Python et bases de données : on pense l'algorithme, on écrit le code, puis on vérifie avec le corrigé détaillé.",
    sections: [MAT, SCI, TEC, ECO, LET, INF],
    orderIndex: 4,
  },
  {
    slug: "technologie",
    name: "Sciences de l'ingénieur",
    shortName: "Techno",
    family: "Technologie",
    icon: "⚙",
    accent: "#B45309",
    description:
      "Chaîne d'énergie, automatismes et lecture de plans : la méthode pour analyser un système technique et justifier ses choix.",
    sections: [TEC],
    orderIndex: 5,
  },
  {
    slug: "philosophie",
    name: "Philosophie",
    shortName: "Philo",
    family: "Sciences humaines",
    icon: "☉",
    accent: "#9D174D",
    description:
      "Notions, problématiques et plan du commentaire : apprendre à construire une dissertation claire, du plan détaillé à l'introduction rédigée.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 6,
  },
  {
    slug: "arabe",
    name: "Arabe",
    shortName: "Arabe",
    family: "Lettres & langues",
    icon: "ع",
    accent: "#065F46",
    description:
      "نصوص، بلاغة، وقواعد اللغة العربية : تحليل النص الشعري والسردي مع منهجية الإجابة ومواضيع مقترحة.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 7,
  },
  {
    slug: "francais",
    name: "Français",
    shortName: "Français",
    family: "Lettres & langues",
    icon: "✒",
    accent: "#1D4ED8",
    description:
      "Roman, théâtre, argumentation : lecture méthodique, citations utiles et entraînement à l'essai et au commentaire composé.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 8,
  },
  {
    slug: "anglais",
    name: "Anglais",
    shortName: "English",
    family: "Lettres & langues",
    icon: "A",
    accent: "#0891B2",
    description:
      "Reading, grammar, writing: des fiches claires, du vocabulaire thématique et des sujets corrigés pour gagner des points.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 9,
  },
  {
    slug: "histoire-geographie",
    name: "Histoire-Géographie",
    shortName: "Hist-Géo",
    family: "Sciences humaines",
    icon: "◍",
    accent: "#A16207",
    description:
      "La Tunisie contemporaine, la mondialisation et les espaces productifs : frises, cartes mentales et réponses structurées.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 10,
  },
  {
    slug: "education-islamique",
    name: "Éducation islamique",
    shortName: "Éd. islamique",
    family: "Sciences humaines",
    icon: "☾",
    accent: "#166534",
    description:
      "النصوص القرآنية والحديثية : فهم المقاصد والقيم، منهجية التفسير وربط النص بالواقع.",
    sections: [MAT, SCI, TEC, ECO, LET, INF, SPO],
    orderIndex: 11,
  },
  {
    slug: "economie",
    name: "Économie",
    shortName: "Économie",
    family: "Économie",
    icon: "↗",
    accent: "#C2410C",
    description:
      "Croissance, inflation et commerce mondial : les mécanismes expliqués avec des exemples tunisiens et des exercices chiffrés.",
    sections: [ECO],
    orderIndex: 12,
  },
  {
    slug: "gestion",
    name: "Gestion & Comptabilité",
    shortName: "Gestion",
    family: "Économie",
    icon: "▤",
    accent: "#4338CA",
    description:
      "Bilan, compte de résultat et enregistrements comptables : la logique du débit-crédit et des exercices corrigés type bac.",
    sections: [ECO],
    orderIndex: 13,
  },
];
