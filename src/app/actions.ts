"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { normalizeSection } from "@/lib/sections";

const sb = createAdminClient();

export async function toggleProgress(formData: FormData) {
  const kind = String(formData.get("kind") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const subjectSlug = String(formData.get("subjectSlug") ?? "");
  if (!slug || !subjectSlug) return;

  const student = await getStudent();

  if (kind === "lesson") {
    const { data: existing } = await sb
      .from("lesson_progress")
      .select("id")
      .eq("student_id", student.id)
      .eq("lesson_slug", slug)
      .limit(1);
    if (existing && existing.length > 0) {
      await sb.from("lesson_progress").delete().eq("id", existing[0].id);
    } else {
      await sb.from("lesson_progress").insert({
        student_id: student.id,
        lesson_slug: slug,
        subject_slug: subjectSlug,
      });
    }
  }

  if (kind === "exercise") {
    const { data: existing } = await sb
      .from("exercise_progress")
      .select("id")
      .eq("student_id", student.id)
      .eq("exercise_slug", slug)
      .limit(1);
    if (existing && existing.length > 0) {
      await sb.from("exercise_progress").delete().eq("id", existing[0].id);
    } else {
      await sb.from("exercise_progress").insert({
        student_id: student.id,
        exercise_slug: slug,
        subject_slug: subjectSlug,
      });
    }
  }

  if (kind === "exam") {
    const { data: existing } = await sb
      .from("exam_progress")
      .select("id")
      .eq("student_id", student.id)
      .eq("exam_slug", slug)
      .limit(1);
    if (existing && existing.length > 0) {
      await sb.from("exam_progress").delete().eq("id", existing[0].id);
    } else {
      await sb.from("exam_progress").insert({
        student_id: student.id,
        exam_slug: slug,
        subject_slug: subjectSlug,
      });
    }
  }

  revalidatePath("/", "layout");
}

export async function recordQuizAttempt(quizSlug: string, subjectSlug: string, score: number, total: number) {
  if (!quizSlug || !subjectSlug || total <= 0) return;
  const safeTotal = Math.max(1, Math.min(total, 60));
  const safeScore = Math.max(0, Math.min(score, safeTotal));
  const student = await getStudent();
  await sb.from("quiz_attempts").insert({
    student_id: student.id,
    quiz_slug: quizSlug,
    subject_slug: subjectSlug,
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
  await sb
    .from("students")
    .update({ name: name.length > 0 ? name : student.name, section })
    .eq("id", student.id);
  revalidatePath("/", "layout");
}

export async function resetStudentProgress() {
  const student = await getStudent();
  await sb.from("lesson_progress").delete().eq("student_id", student.id);
  await sb.from("exercise_progress").delete().eq("student_id", student.id);
  await sb.from("exam_progress").delete().eq("student_id", student.id);
  await sb.from("quiz_attempts").delete().eq("student_id", student.id);
  await sb.from("corrections").delete().eq("student_id", student.id);
  revalidatePath("/", "layout");
}

async function getStudent() {
  const { data } = await sb.from("students").select("*").limit(1);
  if (data && data.length > 0) return data[0];
  const { data: created } = await sb
    .from("students")
    .insert({ name: "Élève de bac", section: "Sciences expérimentales", is_demo: true })
    .select()
    .limit(1);
  return created?.[0];
}
