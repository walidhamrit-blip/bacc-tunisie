import { createAdminClient } from "@/lib/supabase";
import {
  students,
  subjects,
  lessons,
  exercises,
  exams,
  quizzes,
  corrections,
} from "@/db/schema";

const sb = createAdminClient();

/* ------------------------------------------------------------------ */
/*  Types réexportés pour la compatibilité avec les pages             */
/* ------------------------------------------------------------------ */

export type Student = typeof students.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Exam = typeof exams.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Correction = typeof corrections.$inferSelect;

/* ------------------------------------------------------------------ */
/*  Level helpers                                                     */
/* ------------------------------------------------------------------ */

export type LevelLabel = {
  label: string;
  tone: "slate" | "amber" | "sky" | "emerald" | "violet";
  short: string;
};

export function levelFromMastery(mastery: number): LevelLabel {
  if (mastery >= 80) return { label: "Excellent", tone: "emerald", short: "Niveau 4" };
  if (mastery >= 65) return { label: "Solide", tone: "sky", short: "Niveau 3" };
  if (mastery >= 45) return { label: "En progression", tone: "violet", short: "Niveau 2" };
  if (mastery >= 20) return { label: "Fragile", tone: "amber", short: "Niveau 1" };
  return { label: "À démarrer", tone: "slate", short: "Niveau 0" };
}

/* ------------------------------------------------------------------ */
/*  Student                                                           */
/* ------------------------------------------------------------------ */

export async function getStudent(): Promise<Student> {
  const { data, error } = await sb.from("students").select("*").limit(1);
  if (error) throw error;
  if (data?.length > 0) return data[0] as Student;

  const { data: created, error: insertError } = await sb
    .from("students")
    .insert({ name: "Élève de bac", section: "Sciences expérimentales", is_demo: true })
    .select()
    .limit(1);
  if (insertError) throw insertError;
  return created![0] as Student;
}

/* ------------------------------------------------------------------ */
/*  Subjects                                                          */
/* ------------------------------------------------------------------ */

export async function listSubjects(section?: string | null): Promise<Subject[]> {
  let query = sb.from("subjects").select("*").order("order_index", { ascending: true });
  if (section && section !== "Toutes les sections") {
    // Supabase ne filtre pas sur un tableau JSON directement avec eq ;
    // on récupère tout et on filtre en JS pour la simplicité.
    const { data, error } = await sb.from("subjects").select("*").order("order_index", { ascending: true });
    if (error) throw error;
    return (data as Subject[]).filter((row) => row.sections.includes(section));
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Subject[];
}

export async function getSubject(slug: string): Promise<Subject | null> {
  const { data, error } = await sb.from("subjects").select("*").eq("slug", slug).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Lessons                                                           */
/* ------------------------------------------------------------------ */

export async function listLessons(subjectSlug?: string | null): Promise<Lesson[]> {
  let query = sb.from("lessons").select("*");
  if (subjectSlug) query = query.eq("subject_slug", subjectSlug);
  query = query.order("order_index", { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Lesson[];
}

export async function getLesson(slug: string): Promise<Lesson | null> {
  const { data, error } = await sb.from("lessons").select("*").eq("slug", slug).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Exercises                                                         */
/* ------------------------------------------------------------------ */

export async function listExercises(subjectSlug?: string | null): Promise<Exercise[]> {
  let query = sb.from("exercises").select("*");
  if (subjectSlug) query = query.eq("subject_slug", subjectSlug);
  query = query.order("difficulty", { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Exercise[];
}

export async function getExercise(slug: string): Promise<Exercise | null> {
  const { data, error } = await sb.from("exercises").select("*").eq("slug", slug).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Exams                                                             */
/* ------------------------------------------------------------------ */

export async function listExams(subjectSlug?: string | null): Promise<Exam[]> {
  let query = sb.from("exams").select("*");
  if (subjectSlug) query = query.eq("subject_slug", subjectSlug);
  query = query.order("year", { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Exam[];
}

export async function getExam(slug: string): Promise<Exam | null> {
  const { data, error } = await sb.from("exams").select("*").eq("slug", slug).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Quizzes                                                           */
/* ------------------------------------------------------------------ */

export async function listQuizzes(subjectSlug?: string | null): Promise<Quiz[]> {
  let query = sb.from("quizzes").select("*");
  if (subjectSlug) query = query.eq("subject_slug", subjectSlug);
  query = query.order("id", { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Quiz[];
}

export async function getQuiz(slug: string): Promise<Quiz | null> {
  const { data, error } = await sb.from("quizzes").select("*").eq("slug", slug).limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                         */
/* ------------------------------------------------------------------ */

export type SubjectLevel = {
  subject: Subject;
  lessonsDone: number;
  lessonsTotal: number;
  exercisesDone: number;
  exercisesTotal: number;
  examsDone: number;
  examsTotal: number;
  quizCount: number;
  quizAverage: number | null;
  coverage: number;
  mastery: number;
  level: LevelLabel;
};

export async function getDashboard() {
  const student = await getStudent();

  const [subjectRows, lessonRows, exerciseRows, examRows, quizRows] = await Promise.all([
    sb.from("subjects").select("*").order("order_index", { ascending: true }),
    sb.from("lessons").select("slug, subject_slug"),
    sb.from("exercises").select("slug, subject_slug"),
    sb.from("exams").select("slug, subject_slug"),
    sb.from("quizzes").select("slug, subject_slug, title"),
  ]);

  if (subjectRows.error) throw subjectRows.error;
  if (lessonRows.error) throw lessonRows.error;
  if (exerciseRows.error) throw exerciseRows.error;
  if (examRows.error) throw examRows.error;
  if (quizRows.error) throw quizRows.error;

  const [doneLessons, doneExercises, doneExams, attempts] = await Promise.all([
    sb.from("lesson_progress").select("*").eq("student_id", student.id),
    sb.from("exercise_progress").select("*").eq("student_id", student.id),
    sb.from("exam_progress").select("*").eq("student_id", student.id),
    sb.from("quiz_attempts").select("*").eq("student_id", student.id).order("created_at", { ascending: false }),
  ]);

  if (doneLessons.error) throw doneLessons.error;
  if (doneExercises.error) throw doneExercises.error;
  if (doneExams.error) throw doneExams.error;
  if (attempts.error) throw attempts.error;

  const lessonsDoneMap = new Map<string, number>();
  for (const row of (doneLessons.data ?? [])) {
    lessonsDoneMap.set((row as any).lesson_slug, 1);
  }
  const exercisesDoneMap = new Map<string, number>();
  for (const row of (doneExercises.data ?? [])) {
    exercisesDoneMap.set((row as any).exercise_slug, 1);
  }
  const examsDoneMap = new Map<string, number>();
  for (const row of (doneExams.data ?? [])) {
    examsDoneMap.set((row as any).exam_slug, 1);
  }

  const relevantSubjects = (subjectRows.data as Subject[]).filter(
    (subject) => subject.sections.includes(student.section)
  );
  const finalSubjects = relevantSubjects.length > 0 ? relevantSubjects : (subjectRows.data as Subject[]);

  const subjectLevels: SubjectLevel[] = finalSubjects.map((subject) => {
    const lTotal = (lessonRows.data as any[]).filter((row: any) => row.subject_slug === subject.slug).length;
    const eTotal = (exerciseRows.data as any[]).filter((row: any) => row.subject_slug === subject.slug).length;
    const xTotal = (examRows.data as any[]).filter((row: any) => row.subject_slug === subject.slug).length;
    const lDone = (lessonRows.data as any[]).filter(
      (row: any) => row.subject_slug === subject.slug && lessonsDoneMap.has(row.slug)
    ).length;
    const eDone = (exerciseRows.data as any[]).filter(
      (row: any) => row.subject_slug === subject.slug && exercisesDoneMap.has(row.slug)
    ).length;
    const xDone = (examRows.data as any[]).filter(
      (row: any) => row.subject_slug === subject.slug && examsDoneMap.has(row.slug)
    ).length;
    const subjectAttempts = ((attempts.data ?? []) as any[]).filter((row: any) => row.subject_slug === subject.slug);
    const quizAverage =
      subjectAttempts.length > 0
        ? Math.round(
            (subjectAttempts.reduce((sum, row) => sum + row.score / Math.max(row.total, 1), 0) /
              subjectAttempts.length) *
              100
          )
        : null;
    const totalItems = lTotal + eTotal + xTotal;
    const doneItems = Math.min(lDone, lTotal) + Math.min(eDone, eTotal) + Math.min(xDone, xTotal);
    const coverage = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
    const mastery =
      quizAverage === null
        ? Math.round(coverage * 0.85)
        : Math.round(quizAverage * 0.65 + coverage * 0.35);

    return {
      subject,
      lessonsDone: Math.min(lDone, lTotal),
      lessonsTotal: lTotal,
      exercisesDone: Math.min(eDone, eTotal),
      exercisesTotal: eTotal,
      examsDone: Math.min(xDone, xTotal),
      examsTotal: xTotal,
      quizCount: subjectAttempts.length,
      quizAverage,
      coverage,
      mastery,
      level: levelFromMastery(mastery),
    };
  });

  const tracked = subjectLevels.filter(
    (row) => row.lessonsTotal + row.exercisesTotal + row.examsTotal > 0
  );
  const overallMastery =
    tracked.length > 0
      ? Math.round(tracked.reduce((sum, row) => sum + row.mastery, 0) / tracked.length)
      : 0;

  const sorted = [...tracked].sort((a, b) => a.mastery - b.mastery);
  const weakest = sorted[0] ?? null;
  const strongest = sorted[sorted.length - 1] ?? null;
  const subjectsWithContent = tracked.filter((row) => row.lessonsTotal > 0);
  const notStarted = subjectsWithContent.filter(
    (row) => row.lessonsDone === 0 && row.quizCount === 0 && row.exercisesDone === 0
  );
  const nextQuiz = weakest
    ? (quizRows.data as any[]).find((row: any) => row.subject_slug === weakest.subject.slug) ?? null
    : null;

  const totalAttemptScore = ((attempts.data ?? []) as any[]).reduce((sum, row) => sum + row.score, 0);
  const totalAttemptQuestions = ((attempts.data ?? []) as any[]).reduce((sum, row) => sum + row.total, 0);

  const { count } = await sb.from("corrections").select("*", { count: "exact", head: true }).eq("student_id", student.id);

  return {
    student,
    subjectLevels,
    tracked,
    overallMastery,
    overallLevel: levelFromMastery(overallMastery),
    weakest,
    strongest,
    notStarted,
    nextQuiz,
    stats: {
      lessonsDone: (doneLessons.data ?? []).length,
      exercisesDone: (doneExercises.data ?? []).length,
      examsDone: (doneExams.data ?? []).length,
      quizCount: ((attempts.data ?? []) as any[]).length,
      quizSuccess:
        totalAttemptQuestions > 0 ? Math.round((totalAttemptScore / totalAttemptQuestions) * 100) : null,
      corrections: count ?? 0,
    },
    recentAttempts: ((attempts.data ?? []) as any[]).slice(0, 6),
  };
}

/* ------------------------------------------------------------------ */
/*  Progress helpers                                                  */
/* ------------------------------------------------------------------ */

export async function getStudentLessonSlugs(studentId: number): Promise<Set<string>> {
  const { data } = await sb.from("lesson_progress").select("lesson_slug").eq("student_id", studentId);
  return new Set(((data ?? []) as any[]).map((row) => row.lesson_slug));
}

export async function getStudentExerciseSlugs(studentId: number): Promise<Set<string>> {
  const { data } = await sb.from("exercise_progress").select("exercise_slug").eq("student_id", studentId);
  return new Set(((data ?? []) as any[]).map((row) => row.exercise_slug));
}

export async function getStudentExamSlugs(studentId: number): Promise<Set<string>> {
  const { data } = await sb.from("exam_progress").select("exam_slug").eq("student_id", studentId);
  return new Set(((data ?? []) as any[]).map((row) => row.exam_slug));
}

/* ------------------------------------------------------------------ */
/*  Corrections                                                       */
/* ------------------------------------------------------------------ */

export async function listCorrections() {
  const student = await getStudent();
  const { data, error } = await sb
    .from("corrections")
    .select("*")
    .eq("student_id", student.id)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data ?? [];
}

export async function getCorrection(id: number) {
  const student = await getStudent();
  const { data, error } = await sb
    .from("corrections")
    .select("*")
    .eq("id", id)
    .eq("student_id", student.id)
    .limit(1);
  if (error) throw error;
  return data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Quiz best scores                                                  */
/* ------------------------------------------------------------------ */

export async function getBestQuizScores(studentId: number) {
  const { data, error } = await sb
    .from("quiz_attempts")
    .select("quiz_slug, score, total")
    .eq("student_id", studentId);
  if (error) throw error;

  const map = new Map<string, { best: number; attempts: number }>();
  const byQuiz = new Map<string, any[]>();
  for (const row of (data ?? [])) {
    const arr = byQuiz.get(row.quiz_slug) ?? [];
    arr.push(row);
    byQuiz.set(row.quiz_slug, arr);
  }
  for (const [quizSlug, rows] of byQuiz) {
    const best = Math.round(
      (Math.max(...rows.map((r) => r.score / Math.max(r.total, 1)))) * 100
    );
    map.set(quizSlug, { best, attempts: rows.length });
  }
  return map;
}
