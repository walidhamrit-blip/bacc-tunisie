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
  examProgress,
  exerciseProgress,
  lessonProgress,
  quizAttempts,
  quizzes,
  scoreHistory,
  students,
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
import { getStudent, getStudentSessionInfo, type Student } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";
import {
  DEVICE_TOKEN_COOKIE,
  MAX_PERSONAL_DEVICES,
  STUDENT_CODE_COOKIE,
  generateSyncCode,
  isLockedStudent,
  normalizeSyncCode,
  validateRegistrationInput,
} from "@/lib/student-session";

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
) {
  if (!quizSlug || !subjectSlug || total <= 0) return;
  const safeTotal = Math.max(1, Math.min(total, 60));
  const safeScore = Math.max(0, Math.min(score, safeTotal));
  const safeDuration = Math.max(0, Math.min(Math.round(durationSec), 7200));

  const student = await getStudent();

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
    const [sub] = await db
      .select({ name: subjects.name })
      .from(subjects)
      .where(eq(subjects.slug, subjectSlug))
      .limit(1);
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

  await awardStudentXp(student, xpEarned);

  revalidatePath("/");
  revalidatePath("/evaluation");
  revalidatePath("/quiz");
  revalidatePath("/bac-blanc");
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
      .where(eq(communitySheets.id, sheetId))
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
  await db.delete(corrections).where(eq(corrections.studentId, student.id));
  await db
    .update(students)
    .set({ xpPoints: 0, streakDays: 0, lastActivityAt: null })
    .where(eq(students.id, student.id));
  revalidatePath("/", "layout");
}
