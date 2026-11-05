"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { db } from "@/db";
import {
  bacSimulations,
  communitySheetLikes,
  communitySheets,
  corrections,
  errorCards,
  examProgress,
  exerciseProgress,
  lessonProgress,
  quizAttempts,
  quizzes,
  scoreHistory,
  students,
  studyPlans,
  subjects,
} from "@/db/schema";
import {
  clampNote20,
  computeBacAndOrientation,
  formatFrDecimal,
  getSectionBacConfig,
} from "@/lib/bac-calculator";
import {
  buildCommunitySheetSlug,
  validateCommunitySheetInput,
} from "@/lib/community-validation";
import {
  buildStudentSubjectsPlannerCatalog,
  getStudent,
  getStudentSessionInfo,
  type Student,
} from "@/lib/data";
import { normalizeSection } from "@/lib/sections";
import {
  buildErrorCardFingerprint,
  computeNextSrsState,
  isValidErrorCategory,
  type ErrorCategory,
  type SrsRating,
} from "@/lib/srs-engine";
import {
  DEVICE_TOKEN_COOKIE,
  MAX_PERSONAL_DEVICES,
  STUDENT_CODE_COOKIE,
  generateSyncCode,
  isLockedStudent,
  normalizeSyncCode,
  validateRegistrationInput,
} from "@/lib/student-session";
import {
  buildCurrentWeekLabel,
  clampPlanMinutes,
  computeStudyPlanSummary,
  formatMinutesAsHours,
  generateWeeklyStudyPlan,
  isValidStudyRhythm,
  type StudyPlanRhythm,
} from "@/lib/study-planner";

export type CommunitySubmissionState = {
  ok: boolean;
  errors: string[];
  message: string;
  submittedAt?: number;
};

export type AccountActionState = {
  ok: boolean;
  errors: string[];
  message: string;
  syncCode?: string;
};

export type SaveSimulationState = {
  ok: boolean;
  errors: string[];
  message: string;
  savedAt?: number;
};

export type ManualErrorCardState = {
  ok: boolean;
  errors: string[];
  message: string;
  createdAt?: number;
};

export type StudyPlanActionState = {
  ok: boolean;
  errors: string[];
  message: string;
  generatedAt?: number;
};

export type QuizMistakePayload = {
  prompt: string;
  wrongAnswer: string;
  correctAnswer: string;
  explanation: string;
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

function computeNextStreakDays(lastActivityAt: Date | null, currentStreak: number, now: Date): number {
  if (!lastActivityAt) return 1;
  const prevDay = new Date(
    lastActivityAt.getFullYear(),
    lastActivityAt.getMonth(),
    lastActivityAt.getDate(),
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return Math.max(1, currentStreak);
  if (diffDays === 1) return Math.max(1, currentStreak) + 1;
  return 1;
}

async function awardStudentXp(student: Student, deltaXp: number) {
  const now = new Date();
  const nextXp = Math.max(0, (student.xpPoints ?? 0) + deltaXp);
  const nextStreak =
    deltaXp > 0
      ? computeNextStreakDays(student.lastActivityAt ?? null, student.streakDays ?? 0, now)
      : Math.max(0, student.streakDays ?? 0);

  await db
    .update(students)
    .set({
      xpPoints: nextXp,
      streakDays: nextStreak,
      ...(deltaXp > 0 ? { lastActivityAt: now } : {}),
    })
    .where(eq(students.id, student.id));
}

function computeQuizXp(score: number, total: number, isBacBlanc: boolean): number {
  const safeTotal = Math.max(1, total);
  const ratio = Math.max(0, Math.min(1, score / safeTotal));
  const base = isBacBlanc ? 35 : 20;
  const accuracyBonus = Math.round(ratio * (isBacBlanc ? 35 : 25));
  const perfectBonus = score === safeTotal ? 10 : 0;
  return base + accuracyBonus + perfectBonus;
}

async function upsertStudentErrorCard(params: {
  studentId: number;
  subjectSlug: string;
  sourceType: "quiz" | "bac-blanc" | "manuel";
  sourceSlug: string;
  sourceTitle: string;
  prompt: string;
  wrongAnswer: string;
  correctAnswer: string;
  explanation: string;
  errorCategory: ErrorCategory;
}) {
  const fingerprint = buildErrorCardFingerprint(params.subjectSlug, params.prompt);
  const existing = await db
    .select()
    .from(errorCards)
    .where(
      and(
        eq(errorCards.studentId, params.studentId),
        eq(errorCards.fingerprint, fingerprint),
      ),
    )
    .limit(1);

  const now = new Date();

  if (existing.length > 0) {
    const row = existing[0];
    await db
      .update(errorCards)
      .set({
        wrongAnswer: params.wrongAnswer || row.wrongAnswer,
        correctAnswer: params.correctAnswer || row.correctAnswer,
        explanation: params.explanation || row.explanation,
        errorCategory: params.errorCategory,
        boxLevel: 1,
        easeFactorPermille: Math.max(1300, (row.easeFactorPermille ?? 2500) - 150),
        intervalDays: 0,
        repetitions: 0,
        lapsesCount: (row.lapsesCount ?? 1) + 1,
        mastered: false,
        nextReviewAt: now,
      })
      .where(eq(errorCards.id, row.id));
    return;
  }

  await db.insert(errorCards).values({
    studentId: params.studentId,
    fingerprint,
    subjectSlug: params.subjectSlug,
    sourceType: params.sourceType,
    sourceSlug: params.sourceSlug,
    sourceTitle: params.sourceTitle,
    prompt: params.prompt,
    wrongAnswer: params.wrongAnswer,
    correctAnswer: params.correctAnswer,
    explanation: params.explanation,
    errorCategory: params.errorCategory,
    boxLevel: 1,
    easeFactorPermille: 2500,
    intervalDays: 0,
    repetitions: 0,
    lapsesCount: 1,
    mastered: false,
    nextReviewAt: now,
  });
}

/**
 * Inscription d'un nouvel élève avec verrouillage irréversible sur UNE SEULE section
 * (`sectionLocked = true`) et génération d'un Code Élève personnel limité à 2 appareils.
 */
export async function registerStudentAccount(
  _prevState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const validation = validateRegistrationInput({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    lycee: String(formData.get("lycee") ?? ""),
    section: String(formData.get("section") ?? ""),
    confirmSingleSection: formData.get("confirmSingleSection") === "on",
  });

  if (!validation.ok) {
    return {
      ok: false,
      errors: validation.errors,
      message: "",
    };
  }

  const { sanitized } = validation;

  if (sanitized.email.length > 0) {
    const existingEmail = await db
      .select({ id: students.id })
      .from(students)
      .where(and(eq(students.email, sanitized.email), eq(students.isDemo, false)))
      .limit(1);

    if (existingEmail.length > 0) {
      return {
        ok: false,
        errors: [
          "Un abonnement élève existe déjà avec cette adresse e-mail. Utilise l'onglet « J'ai déjà mon Code Élève » pour reprendre ta session.",
        ],
        message: "",
      };
    }
  }

  let syncCode = generateSyncCode();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const collision = await db
      .select({ id: students.id })
      .from(students)
      .where(eq(students.syncCode, syncCode))
      .limit(1);
    if (collision.length === 0) break;
    syncCode = generateSyncCode();
  }

  const deviceToken = `dev-${crypto.randomUUID()}`;

  await db.insert(students).values({
    name: sanitized.name,
    email: sanitized.email,
    lycee: sanitized.lycee,
    section: sanitized.section,
    sectionLocked: true,
    syncCode,
    deviceTokens: [deviceToken],
    isDemo: false,
    xpPoints: 25,
    streakDays: 1,
    lastActivityAt: new Date(),
  });

  const cookieStore = await cookies();
  cookieStore.set(STUDENT_CODE_COOKIE, syncCode, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
  });
  cookieStore.set(DEVICE_TOKEN_COOKIE, deviceToken, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
  });

  revalidatePath("/", "layout");

  return {
    ok: true,
    errors: [],
    message: `Inscription validée (+25 XP) ! Ton abonnement est désormais verrouillé sur la section « ${sanitized.section} ». Note précieusement ton Code Élève : ${syncCode}.`,
    syncCode,
  };
}

/**
 * Connexion / synchronisation d'un appareil personnel via le Code Élève (`BAC-XXXX-XX`).
 * Limite strictement le compte à `MAX_PERSONAL_DEVICES` (2 appareils : ex. téléphone + PC)
 * en déconnectant automatiquement l'appareil le plus ancien en cas de dépassement.
 */
export async function loginWithSyncCode(
  _prevState: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const normalizedCode = normalizeSyncCode(String(formData.get("syncCode") ?? ""));
  if (!normalizedCode || normalizedCode.length < 8) {
    return {
      ok: false,
      errors: ["Saisis ton Code Élève complet au format BAC-XXXX-XX."],
      message: "",
    };
  }

  const rows = await db
    .select()
    .from(students)
    .where(and(eq(students.syncCode, normalizedCode), eq(students.isDemo, false)))
    .limit(1);

  if (rows.length === 0) {
    return {
      ok: false,
      errors: [
        "Aucun compte élève trouvé pour ce code. Vérifie l'orthographe (ex. BAC-7K9P-4M) ou crée ton abonnement personnel.",
      ],
      message: "",
    };
  }

  const account = rows[0];
  const cookieStore = await cookies();
  const existingCookieToken = cookieStore.get(DEVICE_TOKEN_COOKIE)?.value?.trim() ?? "";
  const nextDeviceToken =
    existingCookieToken.length > 0 ? existingCookieToken : `dev-${crypto.randomUUID()}`;

  const updatedTokens = [
    ...(account.deviceTokens ?? []).filter((token) => token !== nextDeviceToken),
    nextDeviceToken,
  ].slice(-MAX_PERSONAL_DEVICES);

  await db
    .update(students)
    .set({
      deviceTokens: updatedTokens,
      lastActivityAt: new Date(),
    })
    .where(eq(students.id, account.id));

  cookieStore.set(STUDENT_CODE_COOKIE, normalizedCode, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
  });
  cookieStore.set(DEVICE_TOKEN_COOKIE, nextDeviceToken, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
  });

  revalidatePath("/", "layout");

  return {
    ok: true,
    errors: [],
    message: `Bon retour ${account.name} ! Session synchronisée sur ta section verrouillée « ${account.section} ».`,
    syncCode: normalizedCode,
  };
}

/**
 * Révoque immédiatement tous les autres appareils connectés à ce compte élève,
 * en ne conservant que l'appareil courant.
 */
export async function revokeOtherDevices() {
  const { student, sessionStatus, currentDeviceToken } = await getStudentSessionInfo();
  if (sessionStatus !== "authenticated" || student.isDemo || !currentDeviceToken) return;

  await db
    .update(students)
    .set({ deviceTokens: [currentDeviceToken] })
    .where(eq(students.id, student.id));

  revalidatePath("/mon-compte");
}

/**
 * Déconnecte l'appareil courant sans supprimer la progression stockée en base.
 */
export async function logoutStudentAccount() {
  const cookieStore = await cookies();
  cookieStore.delete(STUDENT_CODE_COOKIE);
  cookieStore.delete(DEVICE_TOKEN_COOKIE);
  revalidatePath("/", "layout");
}

export async function toggleProgress(formData: FormData) {
  const kind = String(formData.get("kind") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const subjectSlug = String(formData.get("subjectSlug") ?? "");
  if (!slug || !subjectSlug) return;

  const student = await getStudent();

  if (kind === "lesson") {
    const existing = await db
      .select({ id: lessonProgress.id })
      .from(lessonProgress)
      .where(and(eq(lessonProgress.studentId, student.id), eq(lessonProgress.lessonSlug, slug)))
      .limit(1);
    if (existing.length > 0) {
      await db.delete(lessonProgress).where(eq(lessonProgress.id, existing[0].id));
      await awardStudentXp(student, -15);
    } else {
      await db
        .insert(lessonProgress)
        .values({ studentId: student.id, lessonSlug: slug, subjectSlug })
        .onConflictDoNothing();
      await awardStudentXp(student, 15);
    }
  }

  if (kind === "exercise") {
    const existing = await db
      .select({ id: exerciseProgress.id })
      .from(exerciseProgress)
      .where(and(eq(exerciseProgress.studentId, student.id), eq(exerciseProgress.exerciseSlug, slug)))
      .limit(1);
    if (existing.length > 0) {
      await db.delete(exerciseProgress).where(eq(exerciseProgress.id, existing[0].id));
      await awardStudentXp(student, -25);
    } else {
      await db
        .insert(exerciseProgress)
        .values({ studentId: student.id, exerciseSlug: slug, subjectSlug })
        .onConflictDoNothing();
      await awardStudentXp(student, 25);
    }
  }

  if (kind === "exam") {
    const existing = await db
      .select({ id: examProgress.id })
      .from(examProgress)
      .where(and(eq(examProgress.studentId, student.id), eq(examProgress.examSlug, slug)))
      .limit(1);
    if (existing.length > 0) {
      await db.delete(examProgress).where(eq(examProgress.id, existing[0].id));
      await awardStudentXp(student, -40);
    } else {
      await db
        .insert(examProgress)
        .values({ studentId: student.id, examSlug: slug, subjectSlug })
        .onConflictDoNothing();
      await awardStudentXp(student, 40);
    }
  }

  revalidatePath("/", "layout");
}

export async function recordQuizAttempt(
  quizSlug: string,
  subjectSlug: string,
  score: number,
  total: number,
  durationSec = 0,
  mistakes: QuizMistakePayload[] = [],
) {
  if (!quizSlug || !subjectSlug || total <= 0) return;
  const safeTotal = Math.max(1, Math.min(total, 60));
  const safeScore = Math.max(0, Math.min(score, safeTotal));
  const safeDuration = Math.max(0, Math.min(Math.round(durationSec), 7200));

  const student = await getStudent();
  const [sub] = await db
    .select({ name: subjects.name, sections: subjects.sections })
    .from(subjects)
    .where(eq(subjects.slug, subjectSlug))
    .limit(1);

  // Protection mono-section côté serveur
  if (isLockedStudent(student) && sub && !sub.sections.includes(student.section)) {
    return;
  }

  await db.insert(quizAttempts).values({
    studentId: student.id,
    quizSlug,
    subjectSlug,
    score: safeScore,
    total: safeTotal,
  });

  const isBacBlanc = quizSlug.startsWith("bac-blanc-");
  let activityTitle = quizSlug;

  if (isBacBlanc) {
    activityTitle = `Bac Blanc · ${sub?.name ?? subjectSlug}`;
  } else {
    const [quizRow] = await db
      .select({ title: quizzes.title })
      .from(quizzes)
      .where(eq(quizzes.slug, quizSlug))
      .limit(1);
    if (quizRow?.title) {
      activityTitle = quizRow.title;
    }
  }

  const noteOn20Tenths = Math.round((safeScore / safeTotal) * 200);
  const xpEarned = computeQuizXp(safeScore, safeTotal, isBacBlanc);

  await db.insert(scoreHistory).values({
    studentId: student.id,
    activityType: isBacBlanc ? "bac-blanc" : "quiz",
    activitySlug: quizSlug,
    activityTitle,
    subjectSlug,
    score: safeScore,
    total: safeTotal,
    noteOn20Tenths,
    xpEarned,
    durationSec: safeDuration,
  });

  // Alimentation automatique du Carnet d'Erreurs SRS pour chaque mauvaise réponse
  if (Array.isArray(mistakes) && mistakes.length > 0) {
    for (const item of mistakes.slice(0, 20)) {
      const prompt = String(item.prompt ?? "").trim().slice(0, 500);
      const correctAnswer = String(item.correctAnswer ?? "").trim().slice(0, 400);
      if (!prompt || !correctAnswer) continue;

      await upsertStudentErrorCard({
        studentId: student.id,
        subjectSlug,
        sourceType: isBacBlanc ? "bac-blanc" : "quiz",
        sourceSlug: quizSlug,
        sourceTitle: activityTitle,
        prompt,
        wrongAnswer: String(item.wrongAnswer ?? "").trim().slice(0, 400),
        correctAnswer,
        explanation: String(item.explanation ?? "").trim().slice(0, 600),
        errorCategory: "comprehension",
      });
    }
  }

  await awardStudentXp(student, xpEarned);

  revalidatePath("/");
  revalidatePath("/evaluation");
  revalidatePath("/quiz");
  revalidatePath("/bac-blanc");
  revalidatePath("/carnet-erreurs");
}

/**
 * Évalue une carte du Carnet d'Erreurs selon l'algorithme SRS (SM-2 + Boîtes de Leitner 1..5).
 */
export async function reviewErrorCard(
  cardId: number,
  rating: SrsRating,
): Promise<{
  ok: boolean;
  xpEarned: number;
  boxLevel: number;
  intervalDays: number;
  lapsesCount: number;
  mastered: boolean;
  nextReviewAtIso: string;
  intervalLabel: string;
} | null> {
  if (!Number.isInteger(cardId) || cardId <= 0) return null;
  if (!["again", "hard", "good", "easy"].includes(rating)) return null;

  const student = await getStudent();
  const rows = await db
    .select()
    .from(errorCards)
    .where(and(eq(errorCards.id, cardId), eq(errorCards.studentId, student.id)))
    .limit(1);

  if (rows.length === 0) return null;
  const card = rows[0];

  const now = new Date();
  const next = computeNextSrsState(card, rating, now);

  await db
    .update(errorCards)
    .set({
      boxLevel: next.boxLevel,
      easeFactorPermille: next.easeFactorPermille,
      intervalDays: next.intervalDays,
      repetitions: next.repetitions,
      lapsesCount: next.lapsesCount,
      mastered: next.mastered,
      lastReviewedAt: now,
      nextReviewAt: next.nextReviewAt,
    })
    .where(eq(errorCards.id, card.id));

  await awardStudentXp(student, next.xpEarned);

  revalidatePath("/carnet-erreurs");
  revalidatePath("/evaluation");

  return {
    ok: true,
    xpEarned: next.xpEarned,
    boxLevel: next.boxLevel,
    intervalDays: next.intervalDays,
    lapsesCount: next.lapsesCount,
    mastered: next.mastered,
    nextReviewAtIso: next.nextReviewAt.toISOString(),
    intervalLabel: next.intervalLabel,
  };
}

/**
 * Ajout manuel d'une erreur commise lors d'un devoir surveillé, d'une série ou d'une annale,
 * strictement restreint aux matières officielles de la section verrouillée de l'élève.
 */
export async function addManualErrorCard(
  _prevState: ManualErrorCardState,
  formData: FormData,
): Promise<ManualErrorCardState> {
  const student = await getStudent();
  const subjectSlug = String(formData.get("subjectSlug") ?? "").trim();
  const rawCategory = String(formData.get("errorCategory") ?? "methode").trim();
  const sourceTitle =
    String(formData.get("sourceTitle") ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 90) || "Devoir / Série d'exercices";
  const prompt = String(formData.get("prompt") ?? "").trim().slice(0, 500);
  const wrongAnswer = String(formData.get("wrongAnswer") ?? "").trim().slice(0, 400);
  const correctAnswer = String(formData.get("correctAnswer") ?? "").trim().slice(0, 400);
  const explanation = String(formData.get("explanation") ?? "").trim().slice(0, 600);

  const errors: string[] = [];

  if (!subjectSlug) {
    errors.push("Choisis la matière concernée par cette erreur.");
  }
  if (prompt.length < 8) {
    errors.push("Décris la question ou le piège rencontré (au moins 8 caractères).");
  }
  if (correctAnswer.length < 3) {
    errors.push("Indique la correction exacte ou la formule juste à retenir.");
  }

  const [subRow] = subjectSlug
    ? await db
        .select({ slug: subjects.slug, name: subjects.name, sections: subjects.sections })
        .from(subjects)
        .where(eq(subjects.slug, subjectSlug))
        .limit(1)
    : [];

  if (!subRow) {
    errors.push("La matière sélectionnée est introuvable.");
  } else if (isLockedStudent(student) && !subRow.sections.includes(student.section)) {
    errors.push(
      `Ton abonnement individuel est verrouillé sur la section « ${student.section} » : cette matière n'en fait pas partie.`,
    );
  }

  if (errors.length > 0) {
    return { ok: false, errors, message: "" };
  }

  const errorCategory: ErrorCategory = isValidErrorCategory(rawCategory)
    ? rawCategory
    : "methode";

  const [{ count: manualCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(errorCards)
    .where(and(eq(errorCards.studentId, student.id), eq(errorCards.sourceType, "manuel")));

  const xpEarned = manualCount < 10 ? 15 : 5;

  await upsertStudentErrorCard({
    studentId: student.id,
    subjectSlug,
    sourceType: "manuel",
    sourceSlug: `manuel-${Date.now()}`,
    sourceTitle,
    prompt,
    wrongAnswer,
    correctAnswer,
    explanation,
    errorCategory,
  });

  await awardStudentXp(student, xpEarned);

  revalidatePath("/carnet-erreurs");
  revalidatePath("/evaluation");

  return {
    ok: true,
    errors: [],
    message: `Fiche d'erreur ajoutée au planificateur SRS (+${xpEarned} XP) ! Elle est prête dans ta session du jour.`,
    createdAt: Date.now(),
  };
}

export async function deleteErrorCard(cardId: number) {
  if (!Number.isInteger(cardId) || cardId <= 0) return;

  const student = await getStudent();
  await db
    .delete(errorCards)
    .where(and(eq(errorCards.id, cardId), eq(errorCards.studentId, student.id)));

  revalidatePath("/carnet-erreurs");
}

/**
 * Régénère et sauvegarde le Planning Hebdomadaire Intelligent sur 7 jours.
 * Impose strictement `student.section` côté serveur lorsque l'abonnement de l'élève est verrouillé.
 */
export async function generateStudentStudyPlan(
  _prevState: StudyPlanActionState,
  formData: FormData,
): Promise<StudyPlanActionState> {
  const student = await getStudent();
  const effectiveSection = isLockedStudent(student)
    ? normalizeSection(student.section)
    : normalizeSection(String(formData.get("section") ?? student.section));

  const dailyMinutesWeekday = clampPlanMinutes(
    Number.parseInt(String(formData.get("dailyMinutesWeekday") ?? "90"), 10),
    90,
    45,
    240,
  );
  const dailyMinutesWeekend = clampPlanMinutes(
    Number.parseInt(String(formData.get("dailyMinutesWeekend") ?? "180"), 10),
    180,
    60,
    360,
  );
  const rawRhythm = String(formData.get("preferredRhythm") ?? "equilibre").trim();
  const preferredRhythm: StudyPlanRhythm = isValidStudyRhythm(rawRhythm)
    ? rawRhythm
    : "equilibre";

  const subjectsCatalog = await buildStudentSubjectsPlannerCatalog(effectiveSection);
  const slots = generateWeeklyStudyPlan({
    section: effectiveSection,
    dailyMinutesWeekday,
    dailyMinutesWeekend,
    preferredRhythm,
    subjectsCatalog,
  });

  const weekLabel = buildCurrentWeekLabel();

  const existing = await db
    .select({ id: studyPlans.id })
    .from(studyPlans)
    .where(eq(studyPlans.studentId, student.id))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(studyPlans)
      .set({
        section: effectiveSection,
        weekLabel,
        dailyMinutesWeekday,
        dailyMinutesWeekend,
        preferredRhythm,
        slots,
        updatedAt: new Date(),
      })
      .where(eq(studyPlans.id, existing[0].id));
  } else {
    await db.insert(studyPlans).values({
      studentId: student.id,
      section: effectiveSection,
      weekLabel,
      dailyMinutesWeekday,
      dailyMinutesWeekend,
      preferredRhythm,
      slots,
    });
  }

  await awardStudentXp(student, 10);

  revalidatePath("/planning");
  revalidatePath("/organisation");
  revalidatePath("/evaluation");

  const totalWeeklyMin = dailyMinutesWeekday * 5 + dailyMinutesWeekend * 2;

  return {
    ok: true,
    errors: [],
    message: `Nouveau planning hebdomadaire généré (+10 XP) pour la section « ${effectiveSection} » (${formatMinutesAsHours(totalWeeklyMin)} sur 7 jours, ${slots.length} créneaux ciblés).`,
    generatedAt: Date.now(),
  };
}

/**
 * Coche ou décoche un créneau du planning hebdomadaire de l'élève (+10 XP par créneau validé).
 */
export async function toggleStudyPlanSlot(slotId: string): Promise<{
  ok: boolean;
  completed: boolean;
  completionPct: number;
  xpDelta: number;
} | null> {
  const cleanId = String(slotId ?? "").trim();
  if (!cleanId) return null;

  const student = await getStudent();
  const rows = await db
    .select()
    .from(studyPlans)
    .where(eq(studyPlans.studentId, student.id))
    .limit(1);

  if (rows.length === 0) return null;
  const plan = rows[0];

  let targetCompleted = false;
  let found = false;

  const updatedSlots = plan.slots.map((slot) => {
    if (slot.id !== cleanId) return slot;
    found = true;
    targetCompleted = !slot.completed;
    return { ...slot, completed: targetCompleted };
  });

  if (!found) return null;

  await db
    .update(studyPlans)
    .set({
      slots: updatedSlots,
      updatedAt: new Date(),
    })
    .where(eq(studyPlans.id, plan.id));

  const xpDelta = targetCompleted ? 10 : -10;
  await awardStudentXp(student, xpDelta);

  const summary = computeStudyPlanSummary(updatedSlots);

  revalidatePath("/planning");
  revalidatePath("/evaluation");

  return {
    ok: true,
    completed: targetCompleted,
    completionPct: summary.completionPct,
    xpDelta,
  };
}

/**
 * Permet à l'élève d'enregistrer une note réelle de lycée (Devoir de contrôle / synthèse sur 20)
 * dans `score_history` afin d'affiner le calcul de sa Probabilité de Mention.
 */
export async function recordManualScore(formData: FormData) {
  const subjectSlug = String(formData.get("subjectSlug") ?? "").trim();
  const rawLabel = String(formData.get("label") ?? "").trim().slice(0, 80);
  const rawNote = String(formData.get("note20") ?? "").replace(",", ".").trim();

  if (!subjectSlug || !rawNote) return;

  const parsedNote = Number.parseFloat(rawNote);
  if (!Number.isFinite(parsedNote)) return;

  const clampedNote20 = Math.min(20, Math.max(0, Math.round(parsedNote * 10) / 10));
  const tenths = Math.round(clampedNote20 * 10);
  const xpEarned = 30 + (clampedNote20 >= 14 ? 10 : 0);

  const student = await getStudent();
  const [sub] = await db
    .select({ name: subjects.name })
    .from(subjects)
    .where(eq(subjects.slug, subjectSlug))
    .limit(1);

  const activityTitle =
    rawLabel.length > 0 ? rawLabel : `Devoir de synthèse · ${sub?.name ?? subjectSlug}`;

  await db.insert(scoreHistory).values({
    studentId: student.id,
    activityType: "devoir",
    activitySlug: `devoir-${subjectSlug}-${Date.now()}`,
    activityTitle,
    subjectSlug,
    score: tenths,
    total: 200,
    noteOn20Tenths: tenths,
    xpEarned,
    durationSec: 0,
  });

  await awardStudentXp(student, xpEarned);

  revalidatePath("/");
  revalidatePath("/evaluation");
}

/**
 * Sauvegarde une simulation officielle de Moyenne du Bac (`MG`) et Score d'Orientation (`FG`).
 * Si l'élève dispose d'un abonnement mono-section verrouillé (`isLockedStudent`), la section
 * est strictement imposée côté serveur sur `student.section` (anti-partage de compte).
 */
export async function saveBacSimulation(
  _prevState: SaveSimulationState,
  formData: FormData,
): Promise<SaveSimulationState> {
  const student = await getStudent();

  const effectiveSection = isLockedStudent(student)
    ? normalizeSection(student.section)
    : normalizeSection(String(formData.get("section") ?? student.section));

  const rawLabel = String(formData.get("label") ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 70);

  const label = rawLabel.length >= 2 ? rawLabel : `Simulation ${effectiveSection}`;

  let parsedNotes: Record<string, unknown> = {};
  try {
    const rawJson = String(formData.get("notesJson") ?? "{}");
    const candidate = JSON.parse(rawJson);
    if (candidate && typeof candidate === "object") {
      parsedNotes = candidate as Record<string, unknown>;
    }
  } catch {
    return {
      ok: false,
      errors: ["Impossible de lire les notes saisies. Réessaie en vérifiant tes valeurs."],
      message: "",
    };
  }

  const config = getSectionBacConfig(effectiveSection);
  const sanitizedNotes: Record<string, number> = {};
  for (const sub of config.subjects) {
    const rawVal = parsedNotes[sub.key];
    const num =
      typeof rawVal === "number"
        ? rawVal
        : Number.parseFloat(String(rawVal ?? "10").replace(",", "."));
    sanitizedNotes[sub.key] = clampNote20(num);
  }

  const optionEnabled =
    formData.get("optionEnabled") === "true" || formData.get("optionEnabled") === "on";
  const optionName =
    String(formData.get("optionName") ?? "Espagnol")
      .trim()
      .slice(0, 30) || "Espagnol";
  const optionNote20 = clampNote20(
    Number.parseFloat(String(formData.get("optionNote20") ?? "12").replace(",", ".")),
  );
  const sportDispense =
    formData.get("sportDispense") === "true" || formData.get("sportDispense") === "on";

  const calc = computeBacAndOrientation({
    section: effectiveSection,
    notes: sanitizedNotes,
    optionEnabled,
    optionName,
    optionNote20,
    sportDispense,
  });

  const existingCountRow = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bacSimulations)
    .where(eq(bacSimulations.studentId, student.id));

  const existingCount = existingCountRow[0]?.count ?? 0;
  const xpEarned = existingCount === 0 ? 20 : existingCount < 5 ? 5 : 0;

  await db.insert(bacSimulations).values({
    studentId: student.id,
    label,
    section: effectiveSection,
    notes: sanitizedNotes,
    optionEnabled: calc.optionEnabled,
    optionName: calc.optionName,
    optionNoteHundredths: Math.round(calc.optionNote20 * 100),
    sportDispense: calc.sportDispense,
    mgHundredths: Math.round(calc.mg20 * 100),
    fgHundredths: Math.round(calc.fgScore * 100),
    mentionLabel: calc.verdict.mentionLabel,
  });

  if (xpEarned > 0) {
    await awardStudentXp(student, xpEarned);
  }

  revalidatePath("/calculateur");
  revalidatePath("/evaluation");

  const xpSuffix = xpEarned > 0 ? ` (+${xpEarned} XP)` : "";
  return {
    ok: true,
    errors: [],
    message: `Simulation « ${label} » sauvegardée${xpSuffix} : MG = ${formatFrDecimal(
      calc.mg20,
    )}/20 · Score FG = ${formatFrDecimal(calc.fgScore)} pts.`,
    savedAt: Date.now(),
  };
}

export async function deleteBacSimulation(simulationId: number) {
  if (!Number.isInteger(simulationId) || simulationId <= 0) return;

  const student = await getStudent();
  await db
    .delete(bacSimulations)
    .where(
      and(
        eq(bacSimulations.id, simulationId),
        eq(bacSimulations.studentId, student.id),
      ),
    );

  revalidatePath("/calculateur");
}

/**
 * Soumission d'une fiche courte de révision par un élève avec validation simple automatique
 * et placement dans la file de modération avant publication publique.
 */
export async function submitCommunitySheet(
  _prevState: CommunitySubmissionState,
  formData: FormData,
): Promise<CommunitySubmissionState> {
  const student = await getStudent();
  const subjectRows = await db.select({ slug: subjects.slug, sections: subjects.sections }).from(subjects);

  const allowedRows = isLockedStudent(student)
    ? subjectRows.filter((row) => row.sections.includes(student.section))
    : subjectRows;
  const validSubjectSlugs = new Set(allowedRows.map((row) => row.slug));

  const effectiveSection = isLockedStudent(student)
    ? student.section
    : String(formData.get("section") ?? "");

  const validation = validateCommunitySheetInput(
    {
      authorName: String(formData.get("authorName") ?? ""),
      section: effectiveSection,
      subjectSlug: String(formData.get("subjectSlug") ?? ""),
      period: String(formData.get("period") ?? "T1"),
      title: String(formData.get("title") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      content: String(formData.get("content") ?? ""),
      keyFormula: String(formData.get("keyFormula") ?? ""),
      tagsRaw: String(formData.get("tagsRaw") ?? ""),
    },
    validSubjectSlugs,
  );

  if (!validation.ok) {
    return {
      ok: false,
      errors: validation.errors,
      message: "",
    };
  }

  const { sanitized } = validation;
  const slug = buildCommunitySheetSlug(sanitized.subjectSlug, sanitized.title);

  await db.insert(communitySheets).values({
    slug,
    studentId: student.id,
    authorName: sanitized.authorName,
    section: sanitized.section,
    subjectSlug: sanitized.subjectSlug,
    period: sanitized.period,
    title: sanitized.title,
    summary: sanitized.summary,
    content: sanitized.content,
    keyFormula: sanitized.keyFormula,
    tags: sanitized.tags,
    status: "pending",
    moderationNote: sanitized.moderationNote,
    likesCount: 0,
  });

  await awardStudentXp(student, 15);

  revalidatePath("/communaute");
  revalidatePath("/evaluation");
  revalidatePath("/");

  return {
    ok: true,
    errors: [],
    message:
      "Fiche courte enregistrée (+15 XP) ! Elle a réussi le contrôle automatique et attend une validation simple en un clic ci-dessous.",
    submittedAt: Date.now(),
  };
}

/**
 * Validation simple en un clic d'une fiche en attente (`approved` ou `rejected`).
 */
export async function moderateCommunitySheet(
  sheetId: number,
  decision: "approved" | "rejected",
) {
  if (!Number.isInteger(sheetId) || sheetId <= 0) return;

  const student = await getStudent();
  await db
    .update(communitySheets)
    .set({
      status: decision,
      moderationNote:
        decision === "approved"
          ? "Validée et publiée dans l'espace communautaire."
          : "Refusée lors de la validation simple.",
    })
    .where(eq(communitySheets.id, sheetId));

  if (decision === "approved") {
    await awardStudentXp(student, 20);
  }

  revalidatePath("/communaute");
  revalidatePath("/evaluation");
  revalidatePath("/");
}

/**
 * Ajoute ou retire un « J'aime » sur une fiche communautaire de manière atomique.
 */
export async function toggleCommunitySheetLike(sheetId: number): Promise<{
  liked: boolean;
  likesCount: number;
} | null> {
  if (!Number.isInteger(sheetId) || sheetId <= 0) return null;

  const student = await getStudent();
  const cookieStore = await cookies();
  let voterKey = cookieStore.get("bac_voter")?.value ?? "";

  if (!voterKey) {
    const generated = `voter-${crypto.randomUUID()}`;
    try {
      cookieStore.set("bac_voter", generated, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
      voterKey = generated;
    } catch {
      voterKey = `student-${student.id}`;
    }
  }

  const existing = await db
    .select({ id: communitySheetLikes.id })
    .from(communitySheetLikes)
    .where(
      and(
        eq(communitySheetLikes.sheetId, sheetId),
        eq(communitySheetLikes.voterKey, voterKey),
      ),
    )
    .limit(1);

  let liked: boolean;

  if (existing.length > 0) {
    await db
      .delete(communitySheetLikes)
      .where(eq(communitySheetLikes.id, existing[0].id));
    await db
      .update(communitySheets)
      .set({
        likesCount: sql`greatest(0, ${communitySheets.likesCount} - 1)`,
      })
      .where(eq(communitySheets.id, sheetId));
    liked = false;
  } else {
    await db
      .insert(communitySheetLikes)
      .values({
        sheetId,
        studentId: student.id,
        voterKey,
      })
      .onConflictDoNothing();
    await db
      .update(communitySheets)
      .set({
        likesCount: sql`${communitySheets.likesCount} + 1`,
      })
      .where(eq(communitySheets.id, sheetId));
    liked = true;
  }

  const [updated] = await db
    .select({ likesCount: communitySheets.likesCount })
    .from(communitySheets)
    .where(eq(communitySheets.id, sheetId))
    .limit(1);

  revalidatePath("/communaute");

  return {
    liked,
    likesCount: updated?.likesCount ?? 0,
  };
}

/**
 * Met à jour le profil de l'élève :
 * - Si l'abonnement personnel est actif (`sectionLocked = true`), la section est
 *   STRICTEMENT immuable côté serveur (anti-partage multi-sections).
 * - En mode visiteur de démonstration (`isDemo = true`), permet de tester une section.
 */
export async function updateStudentProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const lycee = String(formData.get("lycee") ?? "").trim().slice(0, 100);
  const student = await getStudent();

  const nextSection = isLockedStudent(student)
    ? student.section
    : normalizeSection(String(formData.get("section") ?? ""));

  await db
    .update(students)
    .set({
      name: name.length > 0 ? name : student.name,
      lycee,
      section: nextSection,
    })
    .where(eq(students.id, student.id));

  revalidatePath("/", "layout");
}

export async function resetStudentProgress() {
  const student = await getStudent();
  await db.delete(lessonProgress).where(eq(lessonProgress.studentId, student.id));
  await db.delete(exerciseProgress).where(eq(exerciseProgress.studentId, student.id));
  await db.delete(examProgress).where(eq(examProgress.studentId, student.id));
  await db.delete(quizAttempts).where(eq(quizAttempts.studentId, student.id));
  await db.delete(scoreHistory).where(eq(scoreHistory.studentId, student.id));
  await db.delete(bacSimulations).where(eq(bacSimulations.studentId, student.id));
  await db.delete(errorCards).where(eq(errorCards.studentId, student.id));
  await db.delete(studyPlans).where(eq(studyPlans.studentId, student.id));
  await db.delete(corrections).where(eq(corrections.studentId, student.id));
  await db
    .update(students)
    .set({ xpPoints: 0, streakDays: 0, lastActivityAt: null })
    .where(eq(students.id, student.id));
  revalidatePath("/", "layout");
}
