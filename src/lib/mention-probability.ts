import { getProgramSection, PROGRAM } from "@/db/content/program";
import type { scoreHistory } from "@/db/schema";

export type ScoreHistoryRow = typeof scoreHistory.$inferSelect;

export type MentionKey = "passable" | "assez_bien" | "bien" | "tres_bien";

export type MentionTierProbability = {
  key: MentionKey;
  label: "Passable" | "Assez Bien" | "Bien" | "Très Bien";
  rangeLabel: string;
  minScore20: number;
  maxScore20: number;
  /** Probabilité exacte de tomber dans cette tranche de mention (en %). */
  bracketProbabilityPct: number;
  /** Probabilité cumulée d'atteindre AU MOINS cette mention (Moyenne ≥ seuil, en %). */
  atLeastProbabilityPct: number;
  badgeClass: string;
  accentColor: string;
};

export type SubjectWeightedProjection = {
  subjectSlug: string;
  subjectName: string;
  coefficientLabel: string;
  coefficientValue: number;
  isSpecialty: boolean;
  attemptsCount: number;
  historyAvg20: number | null;
  coveragePct: number;
  estimatedNote20: number;
  /** Gain sur la moyenne générale du Bac si l'élève progresse de +2 pts dans cette matière. */
  gainForPlus2Pts: number;
};

export type GamificationBadge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
};

export type GamificationRank = {
  level: number;
  title: string;
  currentXp: number;
  minXp: number;
  nextLevelXp: number | null;
  progressPct: number;
  xpToNext: number;
};

export type MentionPredictionResult = {
  section: string;
  projectedAverage20: number;
  uncertaintySigma: number;
  confidencePct: number;
  admissionProbabilityPct: number;
  underTenProbabilityPct: number;
  mostLikelyMention: MentionTierProbability | null;
  tiers: MentionTierProbability[];
  subjectProjections: SubjectWeightedProjection[];
  totalCoefficientSum: number;
  priorityLeverage: {
    subjectSlug: string;
    subjectName: string;
    coefficientLabel: string;
    currentEstimated20: number;
    gainForPlus2Pts: number;
    advice: string;
  } | null;
  gamification: {
    rank: GamificationRank;
    streakDays: number;
    badges: GamificationBadge[];
    unlockedCount: number;
  };
};

export type SubjectCoverageSnapshot = {
  subjectSlug: string;
  subjectName: string;
  coveragePct: number;
  lessonsDone: number;
  exercisesDone: number;
  examsDone: number;
};

const GAMIFICATION_RANKS = [
  { level: 1, title: "Candidat Régulier", minXp: 0, nextXp: 150 },
  { level: 2, title: "Bachelier Méthodique", minXp: 150, nextXp: 350 },
  { level: 3, title: "Chasseur de Mention", minXp: 350, nextXp: 700 },
  { level: 4, title: "Maître des Annales", minXp: 700, nextXp: 1200 },
  { level: 5, title: "Major de Promotion", minXp: 1200, nextXp: null },
] as const;

export function parseCoefficientValue(coefficientLabel: string): number {
  const cleaned = coefficientLabel.replace(/[^0-9.,]/g, "").replace(",", ".");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * Fonction de répartition de la loi normale centrée réduite Φ(z)
 * (approximation polynomiale d'Abramowitz & Stegun, précision 1.5e-7).
 */
export function standardNormalCdf(z: number): number {
  if (z < -8) return 0;
  if (z > 8) return 1;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;

  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;

  const erf =
    1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}

/**
 * Arrondit un tableau de probabilités [0..1] en pourcentages entiers dont la somme vaut exactement 100.
 */
function roundPercentagesTo100(rawShares: number[]): number[] {
  const total = rawShares.reduce((acc, v) => acc + Math.max(0, v), 0);
  if (total <= 0) {
    return rawShares.map((_, idx) => (idx === 0 ? 100 : 0));
  }
  const scaled = rawShares.map((v) => (Math.max(0, v) / total) * 100);
  const floors = scaled.map((v) => Math.floor(v));
  let remainder = 100 - floors.reduce((acc, v) => acc + v, 0);

  const byFractionDesc = scaled
    .map((v, index) => ({ index, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);

  for (let i = 0; i < byFractionDesc.length && remainder > 0; i += 1) {
    floors[byFractionDesc[i].index] += 1;
    remainder -= 1;
  }
  return floors;
}

export function computeGamificationRank(xpPoints: number): GamificationRank {
  const safeXp = Math.max(0, Math.round(xpPoints));
  const found =
    [...GAMIFICATION_RANKS].reverse().find((tier) => safeXp >= tier.minXp) ?? GAMIFICATION_RANKS[0];

  if (found.nextXp === null) {
    return {
      level: found.level,
      title: found.title,
      currentXp: safeXp,
      minXp: found.minXp,
      nextLevelXp: null,
      progressPct: 100,
      xpToNext: 0,
    };
  }

  const span = Math.max(1, found.nextXp - found.minXp);
  const progressPct = Math.min(100, Math.max(0, Math.round(((safeXp - found.minXp) / span) * 100)));

  return {
    level: found.level,
    title: found.title,
    currentXp: safeXp,
    minXp: found.minXp,
    nextLevelXp: found.nextXp,
    progressPct,
    xpToNext: Math.max(0, found.nextXp - safeXp),
  };
}

/**
 * Calcule la Probabilité de Mention au Baccalauréat tunisien
 * (Passable, Assez Bien, Bien, Très Bien) ainsi que le profil de gamification.
 */
export function calculateMentionProbability(params: {
  section: string;
  history: ScoreHistoryRow[];
  subjectSnapshots: SubjectCoverageSnapshot[];
  xpPoints: number;
  streakDays: number;
  totalLessonsDone: number;
  totalExercisesDone: number;
  totalExamsDone: number;
}): MentionPredictionResult {
  const {
    section,
    history,
    subjectSnapshots,
    xpPoints,
    streakDays,
    totalLessonsDone,
    totalExamsDone,
  } = params;

  const programSection = getProgramSection(section) ?? PROGRAM[0];
  const snapshotBySlug = new Map(subjectSnapshots.map((s) => [s.subjectSlug, s]));

  // Regrouper l'historique par matière (trié du plus récent au plus ancien)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const historyBySubject = new Map<string, ScoreHistoryRow[]>();
  for (const row of sortedHistory) {
    const bucket = historyBySubject.get(row.subjectSlug) ?? [];
    bucket.push(row);
    historyBySubject.set(row.subjectSlug, bucket);
  }

  const totalCoefficientSum = programSection.subjects.reduce(
    (sum, sub) => sum + parseCoefficientValue(sub.coefficient),
    0,
  );
  const safeCoefSum = Math.max(1, totalCoefficientSum);

  const subjectProjections: SubjectWeightedProjection[] = programSection.subjects.map((progSub) => {
    const coefValue = parseCoefficientValue(progSub.coefficient);
    const snap = snapshotBySlug.get(progSub.slug);
    const coveragePct = snap?.coveragePct ?? 0;
    const subHistory = historyBySubject.get(progSub.slug) ?? [];

    // Moyenne pondérée par récence sur 20 (les derniers devoirs/quiz pèsent davantage)
    let historyAvg20: number | null = null;
    if (subHistory.length > 0) {
      let weightedSum = 0;
      let weightTotal = 0;
      subHistory.forEach((entry, idx) => {
        // Les devoirs et Bac Blanc pèsent légèrement plus qu'un quiz rapide
        const typeMultiplier =
          entry.activityType === "devoir" ? 1.45 : entry.activityType === "bac-blanc" ? 1.25 : 1.0;
        const recencyDecay = Math.pow(0.86, idx);
        const w = typeMultiplier * recencyDecay;
        const note20 =
          entry.noteOn20Tenths > 0
            ? entry.noteOn20Tenths / 10
            : (entry.score / Math.max(1, entry.total)) * 20;
        weightedSum += note20 * w;
        weightTotal += w;
      });
      historyAvg20 = Math.round((weightedSum / Math.max(0.001, weightTotal)) * 10) / 10;
    }

    // Estimation bayésienne prudente combinant l'historique de notes et la couverture du programme
    const coverageAnchor20 = 8.2 + (coveragePct / 100) * 9.3; // 8,2/20 à 0 % → 17,5/20 à 100 %
    let estimatedNote20: number;
    if (historyAvg20 !== null) {
      const historyConfidence = Math.min(0.86, 0.5 + subHistory.length * 0.11);
      estimatedNote20 =
        historyConfidence * historyAvg20 + (1 - historyConfidence) * coverageAnchor20;
    } else if (coveragePct > 0) {
      estimatedNote20 = 8.5 + (coveragePct / 100) * 8.0;
    } else {
      // Matière pas encore travaillée : ancre prudente légèrement sous la moyenne
      estimatedNote20 = 9.4;
    }

    const clampedNote20 = Math.round(Math.min(19.8, Math.max(2.0, estimatedNote20)) * 10) / 10;
    const possibleGain = Math.min(2.0, Math.max(0, 20 - clampedNote20));
    const gainForPlus2Pts = Math.round(((possibleGain * coefValue) / safeCoefSum) * 100) / 100;

    return {
      subjectSlug: progSub.slug,
      subjectName: progSub.name,
      coefficientLabel: progSub.coefficient,
      coefficientValue: coefValue,
      isSpecialty: Boolean(progSub.specialty),
      attemptsCount: subHistory.length,
      historyAvg20,
      coveragePct,
      estimatedNote20: clampedNote20,
      gainForPlus2Pts,
    };
  });

  // Moyenne générale pondérée projetée sur 20
  const weightedTotalPoints = subjectProjections.reduce(
    (sum, item) => sum + item.estimatedNote20 * item.coefficientValue,
    0,
  );
  const projectedAverage20 = Math.round((weightedTotalPoints / safeCoefSum) * 100) / 100;

  // Calcul de l'incertitude σ et de l'indice de confiance (%)
  const coveredCoefWeight = subjectProjections.reduce(
    (sum, item) => sum + (item.attemptsCount > 0 ? item.coefficientValue : item.coveragePct > 0 ? item.coefficientValue * 0.4 : 0),
    0,
  );
  const coefCoverageRatio = Math.min(1, coveredCoefWeight / safeCoefSum);
  const volumeFactor = Math.min(1, sortedHistory.length / 14);
  const confidenceRaw = Math.round((coefCoverageRatio * 0.62 + volumeFactor * 0.38) * 100);
  const confidencePct = Math.min(95, Math.max(18, confidenceRaw));

  // Plus l'élève a d'évaluations sur ses gros coefficients, plus l'écart-type σ se resserre (de 2,35 à 0,85 pt)
  const uncertaintySigma =
    Math.round((2.35 - (confidencePct / 100) * 1.5) * 100) / 100;

  // Probabilités cumulées Φ
  const cdf10 = standardNormalCdf((10 - projectedAverage20) / uncertaintySigma);
  const cdf12 = standardNormalCdf((12 - projectedAverage20) / uncertaintySigma);
  const cdf14 = standardNormalCdf((14 - projectedAverage20) / uncertaintySigma);
  const cdf16 = standardNormalCdf((16 - projectedAverage20) / uncertaintySigma);

  const rawShares = [
    cdf10, // < 10/20
    Math.max(0, cdf12 - cdf10), // Passable [10 ; 12[
    Math.max(0, cdf14 - cdf12), // Assez Bien [12 ; 14[
    Math.max(0, cdf16 - cdf14), // Bien [14 ; 16[
    Math.max(0, 1 - cdf16), // Très Bien >= 16
  ];

  const [underTenPct, passablePct, assezBienPct, bienPct, tresBienPct] =
    roundPercentagesTo100(rawShares);

  const admissionProbabilityPct = Math.min(99, Math.max(1, 100 - underTenPct));

  const tiers: MentionTierProbability[] = [
    {
      key: "passable",
      label: "Passable",
      rangeLabel: "10,00 – 11,99 / 20",
      minScore20: 10,
      maxScore20: 12,
      bracketProbabilityPct: passablePct,
      atLeastProbabilityPct: Math.min(99, Math.max(1, Math.round((1 - cdf10) * 100))),
      badgeClass: "badge-slate",
      accentColor: "var(--gold)",
    },
    {
      key: "assez_bien",
      label: "Assez Bien",
      rangeLabel: "12,00 – 13,99 / 20",
      minScore20: 12,
      maxScore20: 14,
      bracketProbabilityPct: assezBienPct,
      atLeastProbabilityPct: Math.min(99, Math.max(0, Math.round((1 - cdf12) * 100))),
      badgeClass: "badge-gold",
      accentColor: "var(--gold)",
    },
    {
      key: "bien",
      label: "Bien",
      rangeLabel: "14,00 – 15,99 / 20",
      minScore20: 14,
      maxScore20: 16,
      bracketProbabilityPct: bienPct,
      atLeastProbabilityPct: Math.min(99, Math.max(0, Math.round((1 - cdf14) * 100))),
      badgeClass: "badge-blue",
      accentColor: "var(--blue)",
    },
    {
      key: "tres_bien",
      label: "Très Bien",
      rangeLabel: "16,00 – 20,00 / 20",
      minScore20: 16,
      maxScore20: 20,
      bracketProbabilityPct: tresBienPct,
      atLeastProbabilityPct: Math.min(99, Math.max(0, Math.round((1 - cdf16) * 100))),
      badgeClass: "badge-green",
      accentColor: "var(--green)",
    },
  ];

  const mostLikelyMention =
    [...tiers].sort((a, b) => b.bracketProbabilityPct - a.bracketProbabilityPct)[0] ?? null;

  // Identifier la matière levier (fort coefficient × marge de progression)
  const leverageCandidate = [...subjectProjections]
    .filter((item) => item.estimatedNote20 < 17.5)
    .sort(
      (a, b) =>
        b.coefficientValue * (18.5 - b.estimatedNote20) -
        a.coefficientValue * (18.5 - a.estimatedNote20),
    )[0];

  const priorityLeverage = leverageCandidate
    ? {
        subjectSlug: leverageCandidate.subjectSlug,
        subjectName: leverageCandidate.subjectName,
        coefficientLabel: leverageCandidate.coefficientLabel,
        currentEstimated20: leverageCandidate.estimatedNote20,
        gainForPlus2Pts: leverageCandidate.gainForPlus2Pts,
        advice: `Progresser de +2 pts en ${leverageCandidate.subjectName} (${leverageCandidate.coefficientLabel}) ajoute immédiatement +${leverageCandidate.gainForPlus2Pts
          .toFixed(2)
          .replace(".", ",")} pt à ta moyenne générale du Bac.`,
      }
    : null;

  // Badges de gamification
  const hasPerfectScore = sortedHistory.some((h) => h.total > 0 && h.score >= h.total);
  const hasBacBlanc = sortedHistory.some((h) => h.activityType === "bac-blanc");
  const hasHighCoefMastery = subjectProjections.some(
    (s) => s.coefficientValue >= 3 && s.estimatedNote20 >= 12.5 && s.attemptsCount > 0,
  );

  const badges: GamificationBadge[] = [
    {
      id: "first-score",
      icon: "🏅",
      title: "Premier Jalon",
      description: "Enregistrer au moins un score dans l'historique.",
      unlocked: sortedHistory.length >= 1,
    },
    {
      id: "perfect-20",
      icon: "🎯",
      title: "Sans-Faute (20/20)",
      description: "Obtenir 100 % de réussite sur un quiz ou un devoir.",
      unlocked: hasPerfectScore,
    },
    {
      id: "chrono-master",
      icon: "⏱️",
      title: "Sang-Froid",
      description: "Terminer une épreuve en mode Bac Blanc chronométré.",
      unlocked: hasBacBlanc || totalExamsDone >= 1,
    },
    {
      id: "assidu-reader",
      icon: "📚",
      title: "Fiches Solides",
      description: "Marquer au moins 5 fiches de cours comme comprises.",
      unlocked: totalLessonsDone >= 5,
    },
    {
      id: "heavy-coef",
      icon: "⚖️",
      title: "Pilier de Filière",
      description: "Dépasser 12,5/20 estimé dans une matière à coef. ×3 ou ×4.",
      unlocked: hasHighCoefMastery,
    },
    {
      id: "mention-bien-cap",
      icon: "🌟",
      title: "Cap Mention Bien",
      description: "Atteindre une moyenne générale projetée ≥ 14,00 / 20.",
      unlocked: projectedAverage20 >= 14,
    },
  ];

  const rank = computeGamificationRank(xpPoints);

  return {
    section: programSection.section,
    projectedAverage20,
    uncertaintySigma,
    confidencePct,
    admissionProbabilityPct,
    underTenProbabilityPct: underTenPct,
    mostLikelyMention,
    tiers,
    subjectProjections,
    totalCoefficientSum: safeCoefSum,
    priorityLeverage,
    gamification: {
      rank,
      streakDays: Math.max(0, streakDays),
      badges,
      unlockedCount: badges.filter((b) => b.unlocked).length,
    },
  };
}
