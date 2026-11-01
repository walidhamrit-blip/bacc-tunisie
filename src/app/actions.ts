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
  students,
} from "@/db/schema";
import { getStudent } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";

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
    } else {
      await db
        .insert(lessonProgress)
        .values({ studentId: student.id, lessonSlug: slug, subjectSlug })
        .onConflictDoNothing();
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
    } else {
      await db
        .insert(exerciseProgress)
        .values({ studentId: student.id, exerciseSlug: slug, subjectSlug })
        .onConflictDoNothing();
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
    } else {
      await db
        .insert(examProgress)
        .values({ studentId: student.id, examSlug: slug, subjectSlug })
        .onConflictDoNothing();
    }
  }

  revalidatePath("/", "layout");
}

export async function recordQuizAttempt(quizSlug: string, subjectSlug: string, score: number, total: number) {
  if (!quizSlug || !subjectSlug || total <= 0) return;
  const safeTotal = Math.max(1, Math.min(total, 60));
  const safeScore = Math.max(0, Math.min(score, safeTotal));
  const student = await getStudent();
  await db.insert(quizAttempts).values({
    studentId: student.id,
    quizSlug,
    subjectSlug,
    score: safeScore,
    total: safeTotal,
  });
  revalidatePath("/evaluation");
  revalidatePath("/quiz");
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
  await db.delete(corrections).where(eq(corrections.studentId, student.id));
  revalidatePath("/", "layout");
}
