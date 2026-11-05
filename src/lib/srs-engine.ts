export type ErrorCardSource = "quiz" | "bac-blanc" | "manuel";

export type ErrorCategory =
  | "formule"
  | "methode"
  | "calcul"
  | "comprehension"
  | "inattention";

export type SrsRating = "again" | "hard" | "good" | "easy";

export const ERROR_CATEGORY_META: Record<
  ErrorCategory,
  { label: string; short: string; badgeClass: string; tip: string }
> = {
  formule: {
    label: "Formule ou théorème oublié",
    short: "Formule",
    badgeClass: "badge-brand",
    tip: "Vérifie toujours les hypothèses d'application avant d'écrire l'expression.",
  },
  methode: {
    label: "Méthode ou rédaction incomplète",
    short: "Méthode",
    badgeClass: "badge-blue",
    tip: "Structure ta réponse étape par étape comme attendu au corrigé officiel.",
  },
  calcul: {
    label: "Erreur de signe, d'unité ou de calcul",
    short: "Calcul / Signe",
    badgeClass: "badge-gold",
    tip: "Contrôle l'homogénéité, l'ordre de grandeur et les signes à la dernière ligne.",
  },
  comprehension: {
    label: "Confusion de notion du cours",
    short: "Notion",
    badgeClass: "badge-brand",
    tip: "Compare deux notions proches avec un contre-exemple simple.",
  },
  inattention: {
    label: "Lecture trop rapide de l'énoncé",
    short: "Inattention",
    badgeClass: "badge-slate",
    tip: "Souligne les mots-clés et les contraintes (domaine, signe, unité) dès la 1re lecture.",
  },
};

export const LEITNER_BOX_META = [
  {
    box: 1,
    title: "Boîte 1 · Urgence",
    cadence: "Chaque jour",
    tone: "var(--brand)",
  },
  {
    box: 2,
    title: "Boîte 2 · Fragile",
    cadence: "Tous les 2–3 j",
    tone: "var(--gold)",
  },
  {
    box: 3,
    title: "Boîte 3 · En cours",
    cadence: "Chaque semaine",
    tone: "var(--blue)",
  },
  {
    box: 4,
    title: "Boîte 4 · Solide",
    cadence: "Tous les 15 j",
    tone: "var(--violet)",
  },
  {
    box: 5,
    title: "Boîte 5 · Acquis Bac",
    cadence: "Long terme (30 j+)",
    tone: "var(--green)",
  },
] as const;

export type SrsCardSnapshot = {
  boxLevel: number;
  easeFactorPermille: number;
  intervalDays: number;
  repetitions: number;
  lapsesCount: number;
  mastered: boolean;
  nextReviewAt: Date;
};

export type SrsTransitionResult = {
  boxLevel: number;
  easeFactorPermille: number;
  intervalDays: number;
  repetitions: number;
  lapsesCount: number;
  mastered: boolean;
  nextReviewAt: Date;
  xpEarned: number;
  intervalLabel: string;
};

export function isValidErrorCategory(value: string): value is ErrorCategory {
  return (
    value === "formule" ||
    value === "methode" ||
    value === "calcul" ||
    value === "comprehension" ||
    value === "inattention"
  );
}

/**
 * Empreinte déterministe par matière + question pour fusionner intelligemment
 * une même erreur commise plusieurs fois au lieu de dupliquer la carte.
 */
export function buildErrorCardFingerprint(subjectSlug: string, prompt: string): string {
  const normalizedPrompt = prompt
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

  return `${subjectSlug.trim().toLowerCase()}::${normalizedPrompt || "item"}`;
}

export function formatIntervalLabel(intervalDays: number): string {
  if (intervalDays <= 0) return "12 h";
  if (intervalDays === 1) return "1 jour";
  if (intervalDays < 30) return `${intervalDays} jours`;
  const months = Math.round((intervalDays / 30) * 10) / 10;
  return `${String(months).replace(".", ",")} mois`;
}

export function formatDueRelativeLabel(nextReviewAt: Date, now: Date = new Date()): {
  isDue: boolean;
  label: string;
} {
  const diffMs = nextReviewAt.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { isDue: true, label: "À réviser maintenant" };
  }
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  if (diffHours < 24) {
    return { isDue: false, label: `Dans ${diffHours} h` };
  }
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return {
    isDue: false,
    label: diffDays === 1 ? "Demain" : `Dans ${diffDays} j`,
  };
}

/**
 * Algorithme de Répétition Espacée hybride SM-2 + Boîtes de Leitner (1 à 5)
 * calibré pour la préparation annuelle du Baccalauréat tunisien.
 */
export function computeNextSrsState(
  card: Pick<
    SrsCardSnapshot,
    "boxLevel" | "easeFactorPermille" | "intervalDays" | "repetitions" | "lapsesCount"
  >,
  rating: SrsRating,
  now: Date = new Date(),
): SrsTransitionResult {
  const safeBox = Math.min(5, Math.max(1, card.boxLevel || 1));
  const safeEase = Math.min(3200, Math.max(1300, card.easeFactorPermille || 2500));
  const safeInterval = Math.max(0, card.intervalDays || 0);
  const safeReps = Math.max(0, card.repetitions || 0);
  const safeLapses = Math.max(1, card.lapsesCount || 1);

  if (rating === "again") {
    const nextReviewAt = new Date(now.getTime() + 12 * 60 * 60 * 1000); // +12h
    return {
      boxLevel: 1,
      easeFactorPermille: Math.max(1300, safeEase - 200),
      intervalDays: 0,
      repetitions: 0,
      lapsesCount: safeLapses + 1,
      mastered: false,
      nextReviewAt,
      xpEarned: 5,
      intervalLabel: "12 h",
    };
  }

  if (rating === "hard") {
    const nextIntervalDays =
      safeInterval <= 1 ? 1 : Math.min(45, Math.max(2, Math.round(safeInterval * 1.25)));
    const nextBox = safeBox === 1 && safeReps >= 1 ? 2 : safeBox;
    const nextReviewAt = new Date(now.getTime() + nextIntervalDays * 24 * 60 * 60 * 1000);
    return {
      boxLevel: nextBox,
      easeFactorPermille: Math.max(1300, safeEase - 150),
      intervalDays: nextIntervalDays,
      repetitions: safeReps + 1,
      lapsesCount: safeLapses,
      mastered: false,
      nextReviewAt,
      xpEarned: 10,
      intervalLabel: formatIntervalLabel(nextIntervalDays),
    };
  }

  if (rating === "good") {
    let nextIntervalDays: number;
    if (safeReps === 0) {
      nextIntervalDays = 1;
    } else if (safeReps === 1) {
      nextIntervalDays = 3;
    } else {
      nextIntervalDays = Math.min(
        60,
        Math.max(4, Math.round(safeInterval * (safeEase / 1000))),
      );
    }
    const nextBox = Math.min(5, safeBox + 1);
    const mastered = nextBox >= 5 && nextIntervalDays >= 14;
    const nextReviewAt = new Date(now.getTime() + nextIntervalDays * 24 * 60 * 60 * 1000);
    return {
      boxLevel: nextBox,
      easeFactorPermille: safeEase,
      intervalDays: nextIntervalDays,
      repetitions: safeReps + 1,
      lapsesCount: safeLapses,
      mastered,
      nextReviewAt,
      xpEarned: 15,
      intervalLabel: formatIntervalLabel(nextIntervalDays),
    };
  }

  // rating === "easy"
  const nextIntervalDays =
    safeReps === 0
      ? 4
      : Math.min(
          90,
          Math.max(6, Math.round(Math.max(2, safeInterval) * (safeEase / 1000) * 1.3)),
        );
  const nextBox = Math.min(5, safeBox + 2);
  const nextReviewAt = new Date(now.getTime() + nextIntervalDays * 24 * 60 * 60 * 1000);

  return {
    boxLevel: nextBox,
    easeFactorPermille: Math.min(3200, safeEase + 150),
    intervalDays: nextIntervalDays,
    repetitions: safeReps + 1,
    lapsesCount: safeLapses,
    mastered: nextBox >= 5,
    nextReviewAt,
    xpEarned: 20,
    intervalLabel: formatIntervalLabel(nextIntervalDays),
  };
}

export function previewAllRatingIntervals(
  card: Pick<
    SrsCardSnapshot,
    "boxLevel" | "easeFactorPermille" | "intervalDays" | "repetitions" | "lapsesCount"
  >,
): Record<SrsRating, string> {
  const refNow = new Date(0);
  return {
    again: computeNextSrsState(card, "again", refNow).intervalLabel,
    hard: computeNextSrsState(card, "hard", refNow).intervalLabel,
    good: computeNextSrsState(card, "good", refNow).intervalLabel,
    easy: computeNextSrsState(card, "easy", refNow).intervalLabel,
  };
}

export type SrsOverviewStats = {
  totalCards: number;
  dueNowCount: number;
  dueNext24hCount: number;
  recurringTrapsCount: number;
  masteredCount: number;
  retentionIndexPct: number;
  boxCounts: Record<1 | 2 | 3 | 4 | 5, number>;
};

export function computeSrsOverviewStats(
  cards: SrsCardSnapshot[],
  now: Date = new Date(),
): SrsOverviewStats {
  const boxCounts: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let dueNowCount = 0;
  let dueNext24hCount = 0;
  let recurringTrapsCount = 0;
  let masteredCount = 0;
  let retentionWeightedSum = 0;

  const weightsByBox: Record<number, number> = {
    1: 20,
    2: 45,
    3: 70,
    4: 88,
    5: 100,
  };

  for (const card of cards) {
    const clampedBox = Math.min(5, Math.max(1, card.boxLevel || 1)) as 1 | 2 | 3 | 4 | 5;
    boxCounts[clampedBox] += 1;
    retentionWeightedSum += weightsByBox[clampedBox] ?? 20;

    const diffMs = card.nextReviewAt.getTime() - now.getTime();
    if (diffMs <= 0) {
      dueNowCount += 1;
    } else if (diffMs <= 24 * 60 * 60 * 1000) {
      dueNext24hCount += 1;
    }

    if (card.lapsesCount >= 2) {
      recurringTrapsCount += 1;
    }

    if (card.mastered || clampedBox === 5) {
      masteredCount += 1;
    }
  }

  const retentionIndexPct =
    cards.length > 0 ? Math.round(retentionWeightedSum / cards.length) : 0;

  return {
    totalCards: cards.length,
    dueNowCount,
    dueNext24hCount,
    recurringTrapsCount,
    masteredCount,
    retentionIndexPct,
    boxCounts,
  };
}
