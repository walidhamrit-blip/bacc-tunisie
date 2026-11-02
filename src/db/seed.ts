import { createAdminClient } from "@/lib/supabase";
import { subjectSeeds } from "@/db/content/subjects";
import { lessonsSeed } from "@/db/content/lessons-humanities";
import { exercisesSeed } from "@/db/content/exercises";
import { examsSeed } from "@/db/content/exams";
import { quizzesSeed } from "@/db/content/quizzes";

const sb = createAdminClient();

const DEMO_NAME = "Yassine Ben Salah";
const DEMO_SECTION = "Sciences expérimentales";

const globalForSeed = globalThis as typeof globalThis & {
  __bacSeedPromise?: Promise<void>;
};

async function countRows(table: string) {
  const { count, error } = await sb.from(table).select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

async function doSeed() {
  const [subjectCount, lessonCount, quizCount] = await Promise.all([
    countRows("subjects"),
    countRows("lessons"),
    countRows("quizzes"),
  ]);

  const contentReady =
    subjectCount >= subjectSeeds.length &&
    lessonCount >= lessonsSeed.length &&
    quizCount >= quizzesSeed.length;

  if (!contentReady) {
    if (subjectCount < subjectSeeds.length) {
      await sb.from("subjects").insert(subjectSeeds);
    }

    // Insert lessons in chunks to avoid payload limits
    for (let i = 0; i < lessonsSeed.length; i += 20) {
      await sb.from("lessons").insert(lessonsSeed.slice(i, i + 20));
    }
    for (let i = 0; i < exercisesSeed.length; i += 20) {
      await sb.from("exercises").insert(exercisesSeed.slice(i, i + 20));
    }
    for (let i = 0; i < examsSeed.length; i += 20) {
      await sb.from("exams").insert(examsSeed.slice(i, i + 20));
    }
    for (let i = 0; i < quizzesSeed.length; i += 20) {
      await sb.from("quizzes").insert(quizzesSeed.slice(i, i + 20));
    }
  }

  {
    const { data: existing } = await sb.from("students").select("id").limit(1);
    if (!existing || existing.length === 0) {
      const { data: student } = await sb
        .from("students")
        .insert({ name: DEMO_NAME, section: DEMO_SECTION, is_demo: true })
        .select()
        .limit(1);

      if (student?.[0]) {
        const studentId = student[0].id;

        await sb.from("lesson_progress").insert(
          [
            ["suites-numeriques", "mathematiques"],
            ["dipole-rc", "physique"],
            ["genetique-transmission", "svt"],
            ["la-liberte", "philosophie"],
            ["english-tenses-writing", "anglais"],
          ].map(([lessonSlug, subjectSlug]) => ({
            student_id: studentId,
            lesson_slug: lessonSlug,
            subject_slug: subjectSlug,
          }))
        );

        await sb.from("exercise_progress").insert(
          [
            ["suite-auxiliaire", "mathematiques"],
            ["rc-constante-de-temps", "physique"],
            ["python-maximum-moyenne", "informatique"],
          ].map(([exerciseSlug, subjectSlug]) => ({
            student_id: studentId,
            exercise_slug: exerciseSlug,
            subject_slug: subjectSlug,
          }))
        );

        await sb.from("exam_progress").insert({
          student_id: studentId,
          exam_slug: "bac-math-sciences-session",
          subject_slug: "mathematiques",
        });

        await sb.from("quiz_attempts").insert(
          [
            ["quiz-math-suites", "mathematiques", 3, 4],
            ["quiz-physique-rc", "physique", 3, 4],
            ["quiz-svt-genetique", "svt", 2, 4],
            ["quiz-philo-liberte", "philosophie", 2, 4],
            ["quiz-anglais-tenses", "anglais", 4, 4],
            ["quiz-info-python", "informatique", 3, 4],
          ].map(([quizSlug, subjectSlug, score, total]) => ({
            student_id: studentId,
            quiz_slug: quizSlug,
            subject_slug: subjectSlug,
            score,
            total,
          }))
        );
      }
    }
  }
}

export function ensureSeeded(): Promise<void> {
  if (!globalForSeed.__bacSeedPromise) {
    globalForSeed.__bacSeedPromise = doSeed().catch((error) => {
      globalForSeed.__bacSeedPromise = undefined;
      throw error;
    });
  }
  return globalForSeed.__bacSeedPromise;
}
