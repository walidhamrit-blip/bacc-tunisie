import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  corrections,
  examProgress,
  exams,
  exerciseProgress,
  exercises,
  lessonProgress,
  lessons,
  quizAttempts,
  quizzes,
  students,
  subjects,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";

export type Student = typeof students.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Exam = typeof exams.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;

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

export async function getStudent(): Promise<Student> {
  await ensureSeeded();
  const rows = await db.select().from(students).orderBy(students.id).limit(1);
  if (rows.length > 0) return rows[0];
  const [created] = await db
    .insert(students)
    .values({ name: "Élève de bac", section: "Sciences expérimentales" })
    .returning();
  return created;
}

export async function listSubjects(section?: string | null): Promise<Subject[]> {
  await ensureSeeded();
  const rows = await db.select().from(subjects).orderBy(subjects.orderIndex);
  if (section && section !== "Toutes les sections") {
    return rows.filter((row) => row.sections.includes(section));
  }
  return rows;
}

export async function getSubject(slug: string): Promise<Subject | null> {
  await ensureSeeded();
  const rows = await db.select().from(subjects).where(eq(subjects.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function listLessons(subjectSlug?: string | null): Promise<Lesson[]> {
  await ensureSeeded();
  const query = db.select().from(lessons);
  const rows = subjectSlug
    ? await query.where(eq(lessons.subjectSlug, subjectSlug)).orderBy(lessons.orderIndex)
    : await query.orderBy(lessons.subjectSlug, lessons.orderIndex);
  return rows;
}

/** Fiches de cours d'une filière (section du bac), triées par trimestre puis matière. */
export async function listLessonsForSection(section?: string | null): Promise<Lesson[]> {
  await ensureSeeded();
  const rows = await db.select().from(lessons).orderBy(lessons.subjectSlug, lessons.orderIndex);
  if (!section || section === "Toutes les sections") return rows;
  const periodRank: Record<string, number> = { T1: 1, T2: 2, T3: 3, REV: 4 };
  return rows
    .filter((row) => row.sections.length === 0 || row.sections.includes(section))
    .sort((a, b) => (periodRank[a.period] ?? 9) - (periodRank[b.period] ?? 9));
}

export async function getLesson(slug: string): Promise<Lesson | null> {
  await ensureSeeded();
  const rows = await db.select().from(lessons).where(eq(lessons.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function listExercises(subjectSlug?: string | null): Promise<Exercise[]> {
  await ensureSeeded();
  const query = db.select().from(exercises);
  return subjectSlug
    ? await query.where(eq(exercises.subjectSlug, subjectSlug)).orderBy(exercises.difficulty)
    : await query.orderBy(exercises.subjectSlug, exercises.difficulty);
}

export async function getExercise(slug: string): Promise<Exercise | null> {
  await ensureSeeded();
  const rows = await db.select().from(exercises).where(eq(exercises.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function listExams(subjectSlug?: string | null): Promise<Exam[]> {
  await ensureSeeded();
  const query = db.select().from(exams);
  return subjectSlug
    ? await query.where(eq(exams.subjectSlug, subjectSlug)).orderBy(exams.year)
    : await query.orderBy(exams.subjectSlug, exams.year);
}

export async function getExam(slug: string): Promise<Exam | null> {
  await ensureSeeded();
  const rows = await db.select().from(exams).where(eq(exams.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function listQuizzes(subjectSlug?: string | null): Promise<Quiz[]> {
  await ensureSeeded();
  const query = db.select().from(quizzes);
  return subjectSlug
    ? await query.where(eq(quizzes.subjectSlug, subjectSlug)).orderBy(quizzes.id)
    : await query.orderBy(quizzes.subjectSlug, quizzes.id);
}

export async function getQuiz(slug: string): Promise<Quiz | null> {
  await ensureSeeded();
  const rows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getDashboard() {
  const student = await getStudent();
  const [subjectRows, lessonRows, exerciseRows, examRows, quizRows] = await Promise.all([
    db.select().from(subjects).orderBy(subjects.orderIndex),
    db.select({ slug: lessons.slug, subjectSlug: lessons.subjectSlug }).from(lessons),
    db.select({ slug: exercises.slug, subjectSlug: exercises.subjectSlug }).from(exercises),
    db.select({ slug: exams.slug, subjectSlug: exams.subjectSlug }).from(exams),
    db.select({ slug: quizzes.slug, subjectSlug: quizzes.subjectSlug, title: quizzes.title }).from(quizzes),
  ]);

  const [doneLessons, doneExercises, doneExams, attempts] = await Promise.all([
    db.select().from(lessonProgress).where(eq(lessonProgress.studentId, student.id)),
    db.select().from(exerciseProgress).where(eq(exerciseProgress.studentId, student.id)),
    db.select().from(examProgress).where(eq(examProgress.studentId, student.id)),
    db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.studentId, student.id))
      .orderBy(desc(quizAttempts.createdAt)),
  ]);

  const relevantSubjects = subjectRows.filter(
    (subject) => subject.sections.includes(student.section) || student.section === "",
  );
  const finalSubjects = relevantSubjects.length > 0 ? relevantSubjects : subjectRows;

  const subjectLevels: SubjectLevel[] = finalSubjects.map((subject) => {
    const lTotal = lessonRows.filter((row) => row.subjectSlug === subject.slug).length;
    const eTotal = exerciseRows.filter((row) => row.subjectSlug === subject.slug).length;
    const xTotal = examRows.filter((row) => row.subjectSlug === subject.slug).length;
    const lDone = doneLessons.filter((row) => row.subjectSlug === subject.slug).length;
    const eDone = doneExercises.filter((row) => row.subjectSlug === subject.slug).length;
    const xDone = doneExams.filter((row) => row.subjectSlug === subject.slug).length;
    const subjectAttempts = attempts.filter((row) => row.subjectSlug === subject.slug);
    const quizAverage =
      subjectAttempts.length > 0
        ? Math.round(
            (subjectAttempts.reduce((sum, row) => sum + row.score / Math.max(row.total, 1), 0) /
              subjectAttempts.length) *
              100,
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
    (row) => row.lessonsTotal + row.exercisesTotal + row.examsTotal > 0,
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
    (row) => row.lessonsDone === 0 && row.quizCount === 0 && row.exercisesDone === 0,
  );
  const nextQuiz = weakest
    ? quizRows.find((row) => row.subjectSlug === weakest.subject.slug) ?? null
    : null;

  const totalAttemptScore = attempts.reduce((sum, row) => sum + row.score, 0);
  const totalAttemptQuestions = attempts.reduce((sum, row) => sum + row.total, 0);

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
      lessonsDone: doneLessons.length,
      exercisesDone: doneExercises.length,
      examsDone: doneExams.length,
      quizCount: attempts.length,
      quizSuccess:
        totalAttemptQuestions > 0 ? Math.round((totalAttemptScore / totalAttemptQuestions) * 100) : null,
      corrections: (
        await db
          .select({ count: sql<number>`count(*)::int` })
          .from(corrections)
          .where(eq(corrections.studentId, student.id))
      )[0].count,
    },
    recentAttempts: attempts.slice(0, 6),
  };
}

export async function getStudentLessonSlugs(studentId: number): Promise<Set<string>> {
  const rows = await db
    .select({ slug: lessonProgress.lessonSlug })
    .from(lessonProgress)
    .where(eq(lessonProgress.studentId, studentId));
  return new Set(rows.map((row) => row.slug));
}

export async function getStudentExerciseSlugs(studentId: number): Promise<Set<string>> {
  const rows = await db
    .select({ slug: exerciseProgress.exerciseSlug })
    .from(exerciseProgress)
    .where(eq(exerciseProgress.studentId, studentId));
  return new Set(rows.map((row) => row.slug));
}

export async function getStudentExamSlugs(studentId: number): Promise<Set<string>> {
  const rows = await db
    .select({ slug: examProgress.examSlug })
    .from(examProgress)
    .where(eq(examProgress.studentId, studentId));
  return new Set(rows.map((row) => row.slug));
}

export async function listCorrections() {
  const student = await getStudent();
  return db
    .select()
    .from(corrections)
    .where(eq(corrections.studentId, student.id))
    .orderBy(desc(corrections.createdAt))
    .limit(20);
}

export async function getCorrection(id: number) {
  const student = await getStudent();
  const rows = await db
    .select()
    .from(corrections)
    .where(and(eq(corrections.id, id), eq(corrections.studentId, student.id)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getBestQuizScores(studentId: number) {
  const rows = await db
    .select({
      quizSlug: quizAttempts.quizSlug,
      best: sql<number>`max(round(100.0 * ${quizAttempts.score} / greatest(${quizAttempts.total}, 1)))::int`,
      attempts: sql<number>`count(*)::int`,
    })
    .from(quizAttempts)
    .where(eq(quizAttempts.studentId, studentId))
    .groupBy(quizAttempts.quizSlug);
  return new Map(rows.map((row) => [row.quizSlug, row]));
}
