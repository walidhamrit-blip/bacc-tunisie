import { SECTION_BAC_CONFIGS } from "@/lib/bac-calculator";
import { normalizeSection, type SectionName } from "@/lib/sections";

export const DAYS_OF_WEEK = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

export type StudyPlanRhythm = "equilibre" | "intensif-lacunes" | "sprint-bac";

export type StudySlotActivityType =
  | "srs"
  | "cours"
  | "exercice"
  | "quiz"
  | "annale"
  | "bac-blanc";

export const STUDY_RHYTHM_META: Record<
  StudyPlanRhythm,
  { label: string; short: string; description: string }
> = {
  equilibre: {
    label: "Équilibré (Coefficients × Progression)",
    short: "Équilibré",
    description:
      "Répartit harmonieusement tes heures selon les coefficients officiels du Bac et l'avancement du programme.",
  },
  "intensif-lacunes": {
    label: "Rattrapage ciblé (Matières fragiles & SRS)",
    short: "Focus Lacunes",
    description:
      "Surpondère tes matières les plus faibles et tes pièges en attente dans le Carnet d'Erreurs SRS.",
  },
  "sprint-bac": {
    label: "Sprint Examen (Annales & Bac Blanc)",
    short: "Sprint Bac",
    description:
      "Priorise les exercices type Bac, sujets d'annales corrigés et simulations chronométrées du week-end.",
  },
};

export const ACTIVITY_TYPE_META: Record<
  StudySlotActivityType,
  { label: string; badgeClass: string; cta: string }
> = {
  srs: {
    label: "Rappel actif SRS",
    badgeClass: "badge-brand",
    cta: "Réviser mon Carnet SRS →",
  },
  cours: {
    label: "Fiche de cours",
    badgeClass: "badge-blue",
    cta: "Étudier la fiche →",
  },
  exercice: {
    label: "Exercice corrigé",
    badgeClass: "badge-green",
    cta: "Résoudre l'exercice →",
  },
  quiz: {
    label: "Quiz & Flashcards",
    badgeClass: "badge-gold",
    cta: "Lancer le quiz →",
  },
  annale: {
    label: "Sujet d'examen",
    badgeClass: "badge-slate",
    cta: "Traiter l'annale →",
  },
  "bac-blanc": {
    label: "Simulation Bac Blanc",
    badgeClass: "badge-brand",
    cta: "Lancer le chrono →",
  },
};

export type StudyPlanSlot = {
  id: string;
  dayIndex: number;
  dayName: string;
  durationMin: number;
  subjectSlug: string;
  subjectName: string;
  subjectIcon: string;
  subjectAccent: string;
  coefficient: number;
  specialty: boolean;
  activityType: StudySlotActivityType;
  title: string;
  targetHref: string;
  reason: string;
  completed: boolean;
};

export type SubjectPlannerInput = {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  mastery: number;
  dueSrsCount: number;
  lessons: { slug: string; title: string; done: boolean }[];
  exercises: { slug: string; title: string; done: boolean }[];
  quizzes: { slug: string; title: string }[];
  exams: { slug: string; title: string; done: boolean }[];
};

export type GenerateStudyPlanParams = {
  section: SectionName | string;
  dailyMinutesWeekday: number;
  dailyMinutesWeekend: number;
  preferredRhythm: StudyPlanRhythm;
  subjectsCatalog: SubjectPlannerInput[];
};

type WeightedSubject = SubjectPlannerInput & {
  coefficient: number;
  fgWeight: number;
  specialty: boolean;
  priorityScore: number;
};

export function isValidStudyRhythm(value: string): value is StudyPlanRhythm {
  return (
    value === "equilibre" ||
    value === "intensif-lacunes" ||
    value === "sprint-bac"
  );
}

export function clampPlanMinutes(raw: number, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(raw)) return fallback;
  const rounded = Math.round(raw / 15) * 15;
  return Math.min(max, Math.max(min, rounded));
}

export function formatMinutesAsHours(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m < 10 ? `0${m}` : m}`;
}

export function buildCurrentWeekLabel(referenceDate: Date = new Date()): string {
  const d = new Date(referenceDate);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + diffToMonday);
  const sunday = new Date(
    monday.getFullYear(),
    monday.getMonth(),
    monday.getDate() + 6,
  );

  const fmt = (dt: Date) =>
    dt.toLocaleDateString("fr-TN", { day: "2-digit", month: "short" });

  return `Semaine du ${fmt(monday)} au ${fmt(sunday)}`;
}

function buildWeightedSubjects(params: GenerateStudyPlanParams): WeightedSubject[] {
  const normalized = normalizeSection(params.section);
  const bacConfig = SECTION_BAC_CONFIGS[normalized];

  // Agrège les coefficients officiels par `projectSubjectSlug` (ex: Algo + STI -> informatique)
  const coeffBySlug = new Map<
    string,
    { coefficient: number; fgWeight: number; specialty: boolean }
  >();

  for (const field of bacConfig.subjects) {
    if (!field.projectSubjectSlug) continue;
    const prev = coeffBySlug.get(field.projectSubjectSlug);
    coeffBySlug.set(field.projectSubjectSlug, {
      coefficient: (prev?.coefficient ?? 0) + field.coefficient,
      fgWeight: (prev?.fgWeight ?? 0) + field.fgWeight,
      specialty: Boolean(prev?.specialty || field.specialty),
    });
  }

  const weighted: WeightedSubject[] = [];

  for (const sub of params.subjectsCatalog) {
    const official = coeffBySlug.get(sub.slug);
    if (!official && coeffBySlug.size > 0) {
      continue;
    }

    const coefficient = official?.coefficient ?? 1;
    const fgWeight = official?.fgWeight ?? 0;
    const specialty = official?.specialty ?? false;

    const weaknessGap = Math.max(10, 100 - Math.min(100, Math.max(0, sub.mastery)));
    const srsBoost = Math.min(5, sub.dueSrsCount) * 0.35;

    let priorityScore: number;
    if (params.preferredRhythm === "intensif-lacunes") {
      priorityScore =
        (coefficient * 0.85 + fgWeight * 0.35) * (0.6 + (weaknessGap / 100) * 1.65) +
        srsBoost * 1.4;
    } else if (params.preferredRhythm === "sprint-bac") {
      priorityScore =
        (coefficient * 1.25 + fgWeight * 0.55 + (specialty ? 1.2 : 0)) *
          (0.75 + (weaknessGap / 100) * 0.85) +
        srsBoost * 0.8;
    } else {
      priorityScore =
        (coefficient * 1.05 + fgWeight * 0.4 + (specialty ? 0.6 : 0)) *
          (0.7 + (weaknessGap / 100) * 1.1) +
        srsBoost;
    }

    weighted.push({
      ...sub,
      coefficient,
      fgWeight,
      specialty,
      priorityScore: Math.round(priorityScore * 100) / 100,
    });
  }

  return weighted.sort((a, b) => b.priorityScore - a.priorityScore);
}

function splitDayIntoDurations(totalMinutes: number, isWeekend: boolean): number[] {
  const safe = Math.max(30, totalMinutes);
  const blocks: number[] = [];
  let remaining = safe;

  if (isWeekend && remaining >= 150) {
    // Un grand créneau d'approfondissement ou d'annale le week-end
    const deepBlock = remaining >= 210 ? 90 : 75;
    blocks.push(deepBlock);
    remaining -= deepBlock;
  }

  while (remaining > 0) {
    if (remaining <= 60) {
      blocks.push(remaining);
      break;
    }
    if (remaining >= 95) {
      blocks.push(50);
      remaining -= 50;
    } else {
      const half = Math.round(remaining / 2 / 5) * 5;
      blocks.push(half);
      blocks.push(remaining - half);
      break;
    }
  }

  return blocks;
}

/**
 * Génère un planning hebdomadaire sur 7 jours (Lundi -> Dimanche) adapté :
 * - à l'unique section officielle de l'élève et ses coefficients (`MG` + `FG`),
 * - à son niveau de maîtrise réel par matière,
 * - à ses cartes d'erreurs dues dans le Carnet SRS,
 * - au rythme choisi (`equilibre`, `intensif-lacunes`, `sprint-bac`).
 */
export function generateWeeklyStudyPlan(
  params: GenerateStudyPlanParams,
): StudyPlanSlot[] {
  const weekdayMin = clampPlanMinutes(params.dailyMinutesWeekday, 90, 45, 240);
  const weekendMin = clampPlanMinutes(params.dailyMinutesWeekend, 180, 60, 360);
  const weightedSubjects = buildWeightedSubjects(params);

  if (weightedSubjects.length === 0) return [];

  const totalPriority = weightedSubjects.reduce((s, item) => s + item.priorityScore, 0);
  const totalWeeklyMin = weekdayMin * 5 + weekendMin * 2;

  // Quotas cibles en minutes par matière pour la semaine
  const remainingQuota = new Map<string, number>();
  for (const sub of weightedSubjects) {
    const target = Math.max(
      30,
      Math.round((sub.priorityScore / Math.max(0.1, totalPriority)) * totalWeeklyMin),
    );
    remainingQuota.set(sub.slug, target);
  }

  // Compteurs de rotation de contenu pour proposer des ressources variées sur la semaine
  const rotationCursor = new Map<string, number>();
  const srsScheduledForSubject = new Set<string>();
  const slots: StudyPlanSlot[] = [];

  for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
    const dayName = DAYS_OF_WEEK[dayIndex];
    const isWeekend = dayIndex >= 5;
    const dayBudget = isWeekend ? weekendMin : weekdayMin;
    const blockDurations = splitDayIntoDurations(dayBudget, isWeekend);
    const usedToday = new Set<string>();

    blockDurations.forEach((durationMin, blockPos) => {
      // Le Dimanche en ouverture (si créneau >= 60 min), programmer un Bac Blanc sur la spécialité n°1
      if (dayIndex === 6 && blockPos === 0 && durationMin >= 60) {
        const topSpecialty =
          weightedSubjects.find((s) => s.specialty) ?? weightedSubjects[0];
        usedToday.add(topSpecialty.slug);
        remainingQuota.set(
          topSpecialty.slug,
          (remainingQuota.get(topSpecialty.slug) ?? 0) - durationMin,
        );

        slots.push({
          id: `slot-d${dayIndex}-b${blockPos}-${topSpecialty.slug}`,
          dayIndex,
          dayName,
          durationMin,
          subjectSlug: topSpecialty.slug,
          subjectName: topSpecialty.name,
          subjectIcon: topSpecialty.icon,
          subjectAccent: topSpecialty.accent,
          coefficient: topSpecialty.coefficient,
          specialty: topSpecialty.specialty,
          activityType: "bac-blanc",
          title: `Bac Blanc chronométré · ${topSpecialty.name}`,
          targetHref: "/bac-blanc",
          reason: `Matière phare (coeff ×${topSpecialty.coefficient}) · entraînement en conditions réelles d'examen.`,
          completed: false,
        });
        return;
      }

      // En début de semaine (Lundi / Mardi / Jeudi), placer en priorité une session SRS si des erreurs sont dues
      const urgentSrsCandidate = weightedSubjects.find(
        (s) =>
          s.dueSrsCount > 0 &&
          !srsScheduledForSubject.has(s.slug) &&
          !usedToday.has(s.slug),
      );

      if (urgentSrsCandidate && blockPos === blockDurations.length - 1 && durationMin <= 55) {
        srsScheduledForSubject.add(urgentSrsCandidate.slug);
        usedToday.add(urgentSrsCandidate.slug);
        remainingQuota.set(
          urgentSrsCandidate.slug,
          (remainingQuota.get(urgentSrsCandidate.slug) ?? 0) - durationMin,
        );

        slots.push({
          id: `slot-d${dayIndex}-b${blockPos}-srs-${urgentSrsCandidate.slug}`,
          dayIndex,
          dayName,
          durationMin,
          subjectSlug: urgentSrsCandidate.slug,
          subjectName: urgentSrsCandidate.name,
          subjectIcon: urgentSrsCandidate.icon,
          subjectAccent: urgentSrsCandidate.accent,
          coefficient: urgentSrsCandidate.coefficient,
          specialty: urgentSrsCandidate.specialty,
          activityType: "srs",
          title: `Purger ${urgentSrsCandidate.dueSrsCount} piège(s) SRS · ${urgentSrsCandidate.name}`,
          targetHref: "/carnet-erreurs",
          reason: `${urgentSrsCandidate.dueSrsCount} carte(s) arrivée(s) à échéance dans ton Carnet d'Erreurs SM-2.`,
          completed: false,
        });
        return;
      }

      // Sélectionne la matière ayant le plus grand quota restant non encore étudiée aujourd'hui
      const candidates = [...weightedSubjects].sort(
        (a, b) => (remainingQuota.get(b.slug) ?? 0) - (remainingQuota.get(a.slug) ?? 0),
      );
      const chosen =
        candidates.find((c) => !usedToday.has(c.slug)) ?? candidates[0];

      usedToday.add(chosen.slug);
      remainingQuota.set(
        chosen.slug,
        (remainingQuota.get(chosen.slug) ?? 0) - durationMin,
      );

      const step = rotationCursor.get(chosen.slug) ?? 0;
      rotationCursor.set(chosen.slug, step + 1);

      const unfinishedLessons = chosen.lessons.filter((l) => !l.done);
      const lessonPool = unfinishedLessons.length > 0 ? unfinishedLessons : chosen.lessons;

      const unfinishedExercises = chosen.exercises.filter((e) => !e.done);
      const exercisePool =
        unfinishedExercises.length > 0 ? unfinishedExercises : chosen.exercises;

      const unfinishedExams = chosen.exams.filter((x) => !x.done);
      const examPool = unfinishedExams.length > 0 ? unfinishedExams : chosen.exams;

      // Choix intelligent du type d'activité selon la durée du bloc, le rythme et l'étape de rotation
      let activityType: StudySlotActivityType;
      if (isWeekend && durationMin >= 65 && examPool.length > 0) {
        activityType = "annale";
      } else if (params.preferredRhythm === "sprint-bac") {
        const order: StudySlotActivityType[] = ["exercice", "annale", "quiz", "cours"];
        activityType = order[step % order.length];
      } else if (chosen.mastery < 45) {
        const order: StudySlotActivityType[] = ["cours", "exercice", "quiz"];
        activityType = order[step % order.length];
      } else {
        const order: StudySlotActivityType[] = ["exercice", "cours", "quiz", "annale"];
        activityType = order[step % order.length];
      }

      // Repli gracieux si une collection est vide pour cette matière
      if (activityType === "annale" && examPool.length === 0) {
        activityType = exercisePool.length > 0 ? "exercice" : "cours";
      }
      if (activityType === "exercice" && exercisePool.length === 0) {
        activityType = chosen.quizzes.length > 0 ? "quiz" : "cours";
      }
      if (activityType === "quiz" && chosen.quizzes.length === 0) {
        activityType = "cours";
      }

      let title = `Révision active · ${chosen.name}`;
      let targetHref = `/matieres/${chosen.slug}`;

      if (activityType === "cours" && lessonPool.length > 0) {
        const item = lessonPool[step % lessonPool.length];
        title = `Fiche : ${item.title}`;
        targetHref = `/cours/${item.slug}`;
      } else if (activityType === "exercice" && exercisePool.length > 0) {
        const item = exercisePool[step % exercisePool.length];
        title = `Série : ${item.title}`;
        targetHref = `/exercices/${item.slug}`;
      } else if (activityType === "quiz" && chosen.quizzes.length > 0) {
        const item = chosen.quizzes[step % chosen.quizzes.length];
        title = item.title;
        targetHref = `/quiz/${item.slug}`;
      } else if (activityType === "annale" && examPool.length > 0) {
        const item = examPool[step % examPool.length];
        title = `Annale : ${item.title}`;
        targetHref = `/examens/${item.slug}`;
      }

      const masteryBadge =
        chosen.mastery < 45
          ? `Maîtrise fragile (${chosen.mastery} %) à consolider`
          : `Maîtrise actuelle : ${chosen.mastery} %`;

      slots.push({
        id: `slot-d${dayIndex}-b${blockPos}-${chosen.slug}`,
        dayIndex,
        dayName,
        durationMin,
        subjectSlug: chosen.slug,
        subjectName: chosen.name,
        subjectIcon: chosen.icon,
        subjectAccent: chosen.accent,
        coefficient: chosen.coefficient,
        specialty: chosen.specialty,
        activityType,
        title,
        targetHref,
        reason: `Coeff ×${String(chosen.coefficient).replace(".", ",")} · ${masteryBadge}.`,
        completed: false,
      });
    });
  }

  return slots;
}

export type StudyPlanSubjectShare = {
  subjectSlug: string;
  subjectName: string;
  subjectIcon: string;
  subjectAccent: string;
  coefficient: number;
  specialty: boolean;
  minutes: number;
  sharePct: number;
  slotsTotal: number;
  slotsDone: number;
};

export type StudyPlanSummary = {
  totalMinutes: number;
  completedMinutes: number;
  totalSlots: number;
  completedSlots: number;
  completionPct: number;
  bySubject: StudyPlanSubjectShare[];
};

export function computeStudyPlanSummary(slots: StudyPlanSlot[]): StudyPlanSummary {
  let totalMinutes = 0;
  let completedMinutes = 0;
  let completedSlots = 0;

  const map = new Map<string, StudyPlanSubjectShare>();

  for (const slot of slots) {
    totalMinutes += slot.durationMin;
    if (slot.completed) {
      completedMinutes += slot.durationMin;
      completedSlots += 1;
    }

    const existing = map.get(slot.subjectSlug);
    if (existing) {
      existing.minutes += slot.durationMin;
      existing.slotsTotal += 1;
      if (slot.completed) existing.slotsDone += 1;
    } else {
      map.set(slot.subjectSlug, {
        subjectSlug: slot.subjectSlug,
        subjectName: slot.subjectName,
        subjectIcon: slot.subjectIcon,
        subjectAccent: slot.subjectAccent,
        coefficient: slot.coefficient,
        specialty: slot.specialty,
        minutes: slot.durationMin,
        sharePct: 0,
        slotsTotal: 1,
        slotsDone: slot.completed ? 1 : 0,
      });
    }
  }

  const bySubject = [...map.values()]
    .map((row) => ({
      ...row,
      sharePct: totalMinutes > 0 ? Math.round((row.minutes / totalMinutes) * 100) : 0,
    }))
    .sort((a, b) => b.minutes - a.minutes);

  const completionPct =
    slots.length > 0 ? Math.round((completedSlots / slots.length) * 100) : 0;

  return {
    totalMinutes,
    completedMinutes,
    totalSlots: slots.length,
    completedSlots,
    completionPct,
    bySubject,
  };
}
