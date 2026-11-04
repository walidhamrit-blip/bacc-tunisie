"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
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
import { getStudent, type Student } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";

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

export async function updateStudentProfile(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const section = normalizeSection(String(formData.get("section") ?? ""));
  const student = await getStudent();
  await db
    .update(students)
    .set({ name: name.length > 0 ? name : student.name, section })
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
  await db.delete(corrections).where(eq(corrections.studentId, student.id));
  await db
    .update(students)
    .set({ xpPoints: 0, streakDays: 0, lastActivityAt: null })
    .where(eq(students.id, student.id));
  revalidatePath("/", "layout");
}
