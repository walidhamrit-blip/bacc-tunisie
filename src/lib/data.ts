import { and, asc, desc, eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/db";
import {
  bacSimulations,
  communitySheetLikes,
  communitySheets,
  corrections,
  errorCards,
  examProgress,
  exams,
  exerciseProgress,
  exercises,
  lessonProgress,
  lessons,
  quizAttempts,
  quizzes,
  scoreHistory,
  students,
  studyPlans,
  subjects,
} from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { calculateMentionProbability } from "@/lib/mention-probability";
import { normalizeSection, type SectionName } from "@/lib/sections";
import {
  DEVICE_TOKEN_COOKIE,
  STUDENT_CODE_COOKIE,
  isLockedStudent,
} from "@/lib/student-session";
import {
  buildCurrentWeekLabel,
  generateWeeklyStudyPlan,
  type SubjectPlannerInput,
} from "@/lib/study-planner";

export type Student = typeof students.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Exercise = typeof exercises.$inferSelect;
export type Exam = typeof exams.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type ScoreHistoryItem = typeof scoreHistory.$inferSelect;
export type BacSimulation = typeof bacSimulations.$inferSelect;
export type ErrorCardItem = typeof errorCards.$inferSelect;
export type StudyPlanRecord = typeof studyPlans.$inferSelect;
export type CommunitySheet = typeof communitySheets.$inferSelect;

export type StudentSessionStatus =
  | "authenticated"
  | "demo"
  | "evicted_by_device_limit";

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

async function getDemoStudent(): Promise<Student> {
  const demoRows = await db
    .select()
    .from(students)
    .where(eq(students.isDemo, true))
    .orderBy(students.id)
    .limit(1);

  if (demoRows.length > 0) return demoRows[0];

  const [created] = await db
    .insert(students)
    .values({
      name: "Élève de bac (Démo)",
      section: "Sciences expérimentales",
      isDemo: true,
      sectionLocked: false,
    })
    .returning();
  return created;
}

export async function getStudentSessionInfo(): Promise<{
  student: Student;
  sessionStatus: StudentSessionStatus;
  currentDeviceToken: string | null;
}> {
  await ensureSeeded();

  let syncCode = "";
  let deviceToken = "";
  try {
    const cookieStore = await cookies();
    syncCode = cookieStore.get(STUDENT_CODE_COOKIE)?.value?.trim() ?? "";
    deviceToken = cookieStore.get(DEVICE_TOKEN_COOKIE)?.value?.trim() ?? "";
  } catch {
    syncCode = "";
    deviceToken = "";
  }

  if (syncCode) {
    const rows = await db
      .select()
      .from(students)
      .where(and(eq(students.syncCode, syncCode), eq(students.isDemo, false)))
      .limit(1);

    if (rows.length > 0) {
      const account = rows[0];
      const allowedTokens = account.deviceTokens ?? [];
      if (
        allowedTokens.length === 0 ||
        (deviceToken.length > 0 && allowedTokens.includes(deviceToken))
      ) {
        return {
          student: account,
          sessionStatus: "authenticated",
          currentDeviceToken: deviceToken || null,
        };
      }

      const demo = await getDemoStudent();
      return {
        student: demo,
        sessionStatus: "evicted_by_device_limit",
        currentDeviceToken: null,
      };
    }
  }

  const demo = await getDemoStudent();
  return {
    student: demo,
    sessionStatus: "demo",
    currentDeviceToken: null,
  };
}

export async function getStudent(): Promise<Student> {
  const { student } = await getStudentSessionInfo();
  return student;
}

/**
 * Si l'élève est inscrit avec un abonnement personnel verrouillé (`sectionLocked = true`),
 * renvoie son unique section autorisée ainsi que l'ensemble strict des matières officielles
 * de cette filière pour empêcher l'utilisation multi-sections d'un même compte.
 */
async function getLockedSectionScope(): Promise<{
  lockedSection: string | null;
  allowedSubjectSlugs: Set<string> | null;
}> {
  const student = await getStudent();
  if (!isLockedStudent(student)) {
    return { lockedSection: null, allowedSubjectSlugs: null };
  }

  const allSubjects = await db.select().from(subjects);
  const allowed = new Set(
    allSubjects
      .filter((sub) => sub.sections.includes(student.section))
      .map((sub) => sub.slug),
  );

  return {
    lockedSection: student.section,
    allowedSubjectSlugs: allowed,
  };
}

export async function listSubjects(section?: string | null): Promise<Subject[]> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(subjects).orderBy(subjects.orderIndex),
    getLockedSectionScope(),
  ]);

  if (scope.lockedSection) {
    return rows.filter((row) => row.sections.includes(scope.lockedSection!));
  }

  if (section && section !== "Toutes les sections") {
    return rows.filter((row) => row.sections.includes(section));
  }
  return rows;
}

export async function getSubject(slug: string): Promise<Subject | null> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(subjects).where(eq(subjects.slug, slug)).limit(1),
    getLockedSectionScope(),
  ]);
  const subject = rows[0] ?? null;
  if (!subject) return null;
  if (scope.allowedSubjectSlugs && !scope.allowedSubjectSlugs.has(subject.slug)) {
    return null;
  }
  return subject;
}

export async function listLessons(subjectSlug?: string | null): Promise<Lesson[]> {
  await ensureSeeded();
  const query = db.select().from(lessons);
  const [rows, scope] = await Promise.all([
    subjectSlug
      ? query.where(eq(lessons.subjectSlug, subjectSlug)).orderBy(lessons.orderIndex)
      : query.orderBy(lessons.subjectSlug, lessons.orderIndex),
    getLockedSectionScope(),
  ]);

  if (!scope.lockedSection || !scope.allowedSubjectSlugs) {
    return rows;
  }

  return rows.filter(
    (row) =>
      scope.allowedSubjectSlugs!.has(row.subjectSlug) &&
      (row.sections.length === 0 || row.sections.includes(scope.lockedSection!)),
  );
}

/** Fiches de cours d'une filière (section du bac), triées par trimestre puis matière. */
export async function listLessonsForSection(section?: string | null): Promise<Lesson[]> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(lessons).orderBy(lessons.subjectSlug, lessons.orderIndex),
    getLockedSectionScope(),
  ]);

  const effectiveSection = scope.lockedSection ?? section;
  if (!effectiveSection || effectiveSection === "Toutes les sections") return rows;

  const periodRank: Record<string, number> = { T1: 1, T2: 2, T3: 3, REV: 4 };
  return rows
    .filter((row) => {
      if (scope.allowedSubjectSlugs && !scope.allowedSubjectSlugs.has(row.subjectSlug)) {
        return false;
      }
      return row.sections.length === 0 || row.sections.includes(effectiveSection);
    })
    .sort((a, b) => (periodRank[a.period] ?? 9) - (periodRank[b.period] ?? 9));
}

export async function getLesson(slug: string): Promise<Lesson | null> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(lessons).where(eq(lessons.slug, slug)).limit(1),
    getLockedSectionScope(),
  ]);
  const lesson = rows[0] ?? null;
  if (!lesson) return null;

  if (scope.lockedSection && scope.allowedSubjectSlugs) {
    if (!scope.allowedSubjectSlugs.has(lesson.subjectSlug)) return null;
    if (lesson.sections.length > 0 && !lesson.sections.includes(scope.lockedSection)) {
      return null;
    }
  }
  return lesson;
}

export async function listExercises(subjectSlug?: string | null): Promise<Exercise[]> {
  await ensureSeeded();
  const query = db.select().from(exercises);
  const [rows, scope] = await Promise.all([
    subjectSlug
      ? query.where(eq(exercises.subjectSlug, subjectSlug)).orderBy(exercises.difficulty)
      : query.orderBy(exercises.subjectSlug, exercises.difficulty),
    getLockedSectionScope(),
  ]);

  if (scope.allowedSubjectSlugs) {
    return rows.filter((row) => scope.allowedSubjectSlugs!.has(row.subjectSlug));
  }
  return rows;
}

export async function getExercise(slug: string): Promise<Exercise | null> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(exercises).where(eq(exercises.slug, slug)).limit(1),
    getLockedSectionScope(),
  ]);
  const exercise = rows[0] ?? null;
  if (!exercise) return null;
  if (scope.allowedSubjectSlugs && !scope.allowedSubjectSlugs.has(exercise.subjectSlug)) {
    return null;
  }
  return exercise;
}

export async function listExams(subjectSlug?: string | null): Promise<Exam[]> {
  await ensureSeeded();
  const query = db.select().from(exams);
  const [rows, scope] = await Promise.all([
    subjectSlug
      ? query.where(eq(exams.subjectSlug, subjectSlug)).orderBy(exams.year)
      : query.orderBy(exams.subjectSlug, exams.year),
    getLockedSectionScope(),
  ]);

  if (scope.allowedSubjectSlugs) {
    return rows.filter((row) => scope.allowedSubjectSlugs!.has(row.subjectSlug));
  }
  return rows;
}

export async function getExam(slug: string): Promise<Exam | null> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(exams).where(eq(exams.slug, slug)).limit(1),
    getLockedSectionScope(),
  ]);
  const exam = rows[0] ?? null;
  if (!exam) return null;
  if (scope.allowedSubjectSlugs && !scope.allowedSubjectSlugs.has(exam.subjectSlug)) {
    return null;
  }
  return exam;
}

export async function listQuizzes(subjectSlug?: string | null): Promise<Quiz[]> {
  await ensureSeeded();
  const query = db.select().from(quizzes);
  const [rows, scope] = await Promise.all([
    subjectSlug
      ? query.where(eq(quizzes.subjectSlug, subjectSlug)).orderBy(quizzes.id)
      : query.orderBy(quizzes.subjectSlug, quizzes.id),
    getLockedSectionScope(),
  ]);

  if (scope.allowedSubjectSlugs) {
    return rows.filter((row) => scope.allowedSubjectSlugs!.has(row.subjectSlug));
  }
  return rows;
}

export async function getQuiz(slug: string): Promise<Quiz | null> {
  await ensureSeeded();
  const [rows, scope] = await Promise.all([
    db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1),
    getLockedSectionScope(),
  ]);
  const quiz = rows[0] ?? null;
  if (!quiz) return null;
  if (scope.allowedSubjectSlugs && !scope.allowedSubjectSlugs.has(quiz.subjectSlug)) {
    return null;
  }
  return quiz;
}

export async function listBacSimulations(): Promise<BacSimulation[]> {
  await ensureSeeded();
  const student = await getStudent();

  if (isLockedStudent(student)) {
    return db
      .select()
      .from(bacSimulations)
      .where(
        and(
          eq(bacSimulations.studentId, student.id),
          eq(bacSimulations.section, student.section),
        ),
      )
      .orderBy(desc(bacSimulations.createdAt))
      .limit(15);
  }

  return db
    .select()
    .from(bacSimulations)
    .where(eq(bacSimulations.studentId, student.id))
    .orderBy(desc(bacSimulations.createdAt))
    .limit(15);
}

/**
 * Liste les cartes du Carnet d'Erreurs SRS de l'élève courant (triées par échéance prioritaire),
 * strictement filtrées sur les matières officielles de sa section lorsque son abonnement est verrouillé.
 */
export async function listErrorCards(): Promise<ErrorCardItem[]> {
  await ensureSeeded();
  const [student, scope] = await Promise.all([
    getStudent(),
    getLockedSectionScope(),
  ]);

  const rows = await db
    .select()
    .from(errorCards)
    .where(eq(errorCards.studentId, student.id))
    .orderBy(asc(errorCards.nextReviewAt), desc(errorCards.lapsesCount));

  if (scope.allowedSubjectSlugs) {
    return rows.filter((row) => scope.allowedSubjectSlugs!.has(row.subjectSlug));
  }
  return rows;
}

/**
 * Construit le catalogue enrichi des matières officielles d'une section
 * (maîtrise réelle, cartes SRS dues, cours/exercices/quiz/examens restants)
 * pour alimenter le Générateur de Planning Hebdomadaire Intelligent.
 */
export async function buildStudentSubjectsPlannerCatalog(
  section: SectionName,
): Promise<SubjectPlannerInput[]> {
  await ensureSeeded();
  const [dashboard, srsCards, sectionSubjects, allLessons, allExercises, allQuizzes, allExams] =
    await Promise.all([
      getDashboard(),
      listErrorCards(),
      listSubjects(section),
      listLessonsForSection(section),
      listExercises(),
      listQuizzes(),
      listExams(),
    ]);

  const [doneLessons, doneExercises, doneExams] = await Promise.all([
    getStudentLessonSlugs(dashboard.student.id),
    getStudentExerciseSlugs(dashboard.student.id),
    getStudentExamSlugs(dashboard.student.id),
  ]);

  const masteryBySlug = new Map(
    dashboard.subjectLevels.map((lvl) => [lvl.subject.slug, lvl.mastery]),
  );

  const nowMs = Date.now();
  const dueSrsBySlug = new Map<string, number>();
  for (const card of srsCards) {
    if (card.nextReviewAt.getTime() <= nowMs && !card.mastered) {
      dueSrsBySlug.set(
        card.subjectSlug,
        (dueSrsBySlug.get(card.subjectSlug) ?? 0) + 1,
      );
    }
  }

  return sectionSubjects.map((sub) => ({
    slug: sub.slug,
    name: sub.name,
    icon: sub.icon,
    accent: sub.accent,
    mastery: masteryBySlug.get(sub.slug) ?? 0,
    dueSrsCount: dueSrsBySlug.get(sub.slug) ?? 0,
    lessons: allLessons
      .filter((l) => l.subjectSlug === sub.slug)
      .map((l) => ({ slug: l.slug, title: l.title, done: doneLessons.has(l.slug) })),
    exercises: allExercises
      .filter((e) => e.subjectSlug === sub.slug)
      .map((e) => ({ slug: e.slug, title: e.title, done: doneExercises.has(e.slug) })),
    quizzes: allQuizzes
      .filter((q) => q.subjectSlug === sub.slug)
      .map((q) => ({ slug: q.slug, title: q.title })),
    exams: allExams
      .filter((x) => x.subjectSlug === sub.slug)
      .map((x) => ({ slug: x.slug, title: x.title, done: doneExams.has(x.slug) })),
  }));
}

/**
 * Récupère le planning hebdomadaire enregistré de l'élève courant (ou en génère un
 * automatiquement sur sa section officielle s'il n'en possède pas encore).
 */
export async function getOrCreateStudyPlan(): Promise<StudyPlanRecord> {
  await ensureSeeded();
  const student = await getStudent();
  const activeSection = normalizeSection(student.section);

  const existingRows = await db
    .select()
    .from(studyPlans)
    .where(eq(studyPlans.studentId, student.id))
    .limit(1);

  if (
    existingRows.length > 0 &&
    existingRows[0].section === activeSection &&
    existingRows[0].slots.length > 0
  ) {
    return existingRows[0];
  }

  const dailyMinutesWeekday = existingRows[0]?.dailyMinutesWeekday ?? 90;
  const dailyMinutesWeekend = existingRows[0]?.dailyMinutesWeekend ?? 180;
  const preferredRhythm = existingRows[0]?.preferredRhythm ?? "equilibre";
  const weekLabel = buildCurrentWeekLabel();

  const subjectsCatalog = await buildStudentSubjectsPlannerCatalog(activeSection);
  const slots = generateWeeklyStudyPlan({
    section: activeSection,
    dailyMinutesWeekday,
    dailyMinutesWeekend,
    preferredRhythm,
    subjectsCatalog,
  });

  if (existingRows.length > 0) {
    const [updated] = await db
      .update(studyPlans)
      .set({
        section: activeSection,
        weekLabel,
        dailyMinutesWeekday,
        dailyMinutesWeekend,
        preferredRhythm,
        slots,
        updatedAt: new Date(),
      })
      .where(eq(studyPlans.id, existingRows[0].id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(studyPlans)
    .values({
      studentId: student.id,
      section: activeSection,
      weekLabel,
      dailyMinutesWeekday,
      dailyMinutesWeekend,
      preferredRhythm,
      slots,
    })
    .returning();

  return created;
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

  const [doneLessons, doneExercises, doneExams, attempts, historyRows] = await Promise.all([
    db.select().from(lessonProgress).where(eq(lessonProgress.studentId, student.id)),
    db.select().from(exerciseProgress).where(eq(exerciseProgress.studentId, student.id)),
    db.select().from(examProgress).where(eq(examProgress.studentId, student.id)),
    db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.studentId, student.id))
      .orderBy(desc(quizAttempts.createdAt)),
    db
      .select()
      .from(scoreHistory)
      .where(eq(scoreHistory.studentId, student.id))
      .orderBy(desc(scoreHistory.createdAt)),
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
    const subjectHistory = historyRows.filter((row) => row.subjectSlug === subject.slug);
    const subjectAttempts = attempts.filter((row) => row.subjectSlug === subject.slug);

    const quizAverage =
      subjectHistory.length > 0
        ? Math.round(
            (subjectHistory.reduce(
              (sum, row) =>
                sum +
                (row.noteOn20Tenths > 0 ? row.noteOn20Tenths / 200 : row.score / Math.max(row.total, 1)),
              0,
            ) /
              subjectHistory.length) *
              100,
          )
        : subjectAttempts.length > 0
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
      quizCount: Math.max(subjectAttempts.length, subjectHistory.length),
      quizAverage,
      coverage,
      mastery,
      level: levelFromMastery(mastery),
    };
  });

  // Calcul des snapshots de couverture sur l'ensemble des 13 matières pour le moteur de Mention
  const allSubjectSnapshots = subjectRows.map((subject) => {
    const lTotal = lessonRows.filter((row) => row.subjectSlug === subject.slug).length;
    const eTotal = exerciseRows.filter((row) => row.subjectSlug === subject.slug).length;
    const xTotal = examRows.filter((row) => row.subjectSlug === subject.slug).length;
    const lDone = Math.min(lTotal, doneLessons.filter((row) => row.subjectSlug === subject.slug).length);
    const eDone = Math.min(eTotal, doneExercises.filter((row) => row.subjectSlug === subject.slug).length);
    const xDone = Math.min(xTotal, doneExams.filter((row) => row.subjectSlug === subject.slug).length);
    const totalItems = lTotal + eTotal + xTotal;
    const coveragePct = totalItems > 0 ? Math.round(((lDone + eDone + xDone) / totalItems) * 100) : 0;
    return {
      subjectSlug: subject.slug,
      subjectName: subject.name,
      coveragePct,
      lessonsDone: lDone,
      exercisesDone: eDone,
      examsDone: xDone,
    };
  });

  const mentionPrediction = calculateMentionProbability({
    section: student.section,
    history: historyRows,
    subjectSnapshots: allSubjectSnapshots,
    xpPoints: student.xpPoints ?? 0,
    streakDays: student.streakDays ?? 0,
    totalLessonsDone: doneLessons.length,
    totalExercisesDone: doneExercises.length,
    totalExamsDone: doneExams.length,
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
    mentionPrediction,
    scoreHistory: historyRows.slice(0, 12),
    stats: {
      lessonsDone: doneLessons.length,
      exercisesDone: doneExercises.length,
      examsDone: doneExams.length,
      quizCount: Math.max(attempts.length, historyRows.length),
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

export async function getCommunitySpaceData(voterKey: string) {
  await ensureSeeded();

  const [allSheets, likedRows, scope] = await Promise.all([
    db
      .select()
      .from(communitySheets)
      .orderBy(desc(communitySheets.likesCount), desc(communitySheets.createdAt)),
    db
      .select({ sheetId: communitySheetLikes.sheetId })
      .from(communitySheetLikes)
      .where(eq(communitySheetLikes.voterKey, voterKey)),
    getLockedSectionScope(),
  ]);

  const scopedSheets = scope.allowedSubjectSlugs
    ? allSheets.filter((sheet) => scope.allowedSubjectSlugs!.has(sheet.subjectSlug))
    : allSheets;

  const approvedSheets = scopedSheets.filter((sheet) => sheet.status === "approved");
  const pendingSheets = scopedSheets
    .filter((sheet) => sheet.status === "pending")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const likedSheetIds = likedRows.map((row) => row.sheetId);

  return {
    approvedSheets,
    pendingSheets,
    likedSheetIds,
  };
}
