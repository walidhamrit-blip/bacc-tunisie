import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  communitySheets,
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
  subjects,
} from "@/db/schema";
import { communitySheetsSeed } from "@/db/content/community-sheets";
import { subjectSeeds } from "@/db/content/subjects";
import { lessonsSeed } from "@/db/content/lessons-humanities";
import { lessonProgramMeta } from "@/db/content/program";
import { exercisesSeed } from "@/db/content/exercises";
import { examsSeed } from "@/db/content/exams";
import { quizzesSeed } from "@/db/content/quizzes";
import { INIT_SQL_STATEMENTS } from "@/db/init-sql";

const DEMO_NAME = "Yassine Ben Salah";
const DEMO_SECTION = "Sciences expérimentales";

const globalForSeed = globalThis as typeof globalThis & {
  __bacSeedPromise?: Promise<void>;
};

async function chunkedInsert<T>(rows: T[], size: number, insert: (batch: T[]) => Promise<unknown>) {
  for (let i = 0; i < rows.length; i += size) {
    await insert(rows.slice(i, i + size));
  }
}

async function countRows(
  table: typeof subjects | typeof lessons | typeof quizzes | typeof communitySheets,
) {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(table);
  return row?.count ?? 0;
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
 * Crée les tables et colonnes si elles n'existent pas encore.
 * Utile quand le projet Vercel est déployé sans avoir lancé `npm run db:push`
 * (base Neon neuve ou déjà en production) : l'application s'auto-migre au chargement.
 * Chaque instruction est idempotente (IF NOT EXISTS).
 */
export async function ensureSchema(): Promise<void> {
  for (const statement of INIT_SQL_STATEMENTS) {
    try {
      await db.execute(sql.raw(statement));
    } catch (error) {
      // 42P07 / 42710 / 42701 : table, index ou colonne déjà présent (course entre deux instances).
      const code = (error as { code?: string }).code;
      if (code !== "42P07" && code !== "42710" && code !== "42P16" && code !== "42701") {
        throw error;
      }
    }
  }
}

async function doSeed() {
  await ensureSchema();

  const [subjectCount, lessonCount, quizCount] = await Promise.all([
    countRows(subjects),
    countRows(lessons),
    countRows(quizzes),
  ]);

  const contentReady =
    subjectCount >= subjectSeeds.length &&
    lessonCount >= lessonsSeed.length &&
    quizCount >= quizzesSeed.length;

  if (!contentReady) {
    if (subjectCount < subjectSeeds.length) {
      await db.insert(subjects).values(subjectSeeds).onConflictDoNothing();
    }

    // Trimestre officiel + filières concernées, dérivés du programme des 7 sections.
    const programMeta = lessonProgramMeta();
    const lessonsRows = lessonsSeed.map((lesson) => {
      const meta = programMeta.get(lesson.slug);
      return {
        ...lesson,
        period: lesson.period ?? meta?.period ?? "T1",
        sections: lesson.sections ?? meta?.sections ?? [],
      };
    });

    await chunkedInsert(lessonsRows, 4, (batch) =>
      db.insert(lessons).values(batch).onConflictDoNothing(),
    );
    await chunkedInsert(exercisesSeed, 4, (batch) =>
      db.insert(exercises).values(batch).onConflictDoNothing(),
    );
    await chunkedInsert(examsSeed, 4, (batch) =>
      db.insert(exams).values(batch).onConflictDoNothing(),
    );
    await chunkedInsert(quizzesSeed, 4, (batch) =>
      db.insert(quizzes).values(batch).onConflictDoNothing(),
    );
  }

  {
    // Base déjà seedée : on réaligne le trimestre, les filières et l'ordre de chaque fiche
    // sur le programme officiel (opération idempotente, une seule requête).
    const programMeta = lessonProgramMeta();
    const orderBySlug = new Map(lessonsSeed.map((lesson) => [lesson.slug, lesson.orderIndex]));
    const rows = [...programMeta].map(
      ([slug, meta]) => [slug, meta.period, meta.sections, orderBySlug.get(slug) ?? 1] as const,
    );
    if (rows.length > 0) {
      const values = sql.join(
        rows.map(
          ([slug, period, sections, orderIndex]) =>
            sql`(${slug}, ${period}, ${JSON.stringify(sections)}::jsonb, ${orderIndex}::int)`,
        ),
        sql`, `,
      );
      await db.execute(sql`
        UPDATE lessons AS l
        SET period = v.period, sections = v.sections, order_index = v.order_index
        FROM (VALUES ${values}) AS v(slug, period, sections, order_index)
        WHERE l.slug = v.slug
      `);
    }
  }

  const quizTitleBySlug = new Map(quizzesSeed.map((quiz) => [quiz.slug, quiz.title]));

  let activeStudentId = 1;
  const existing = await db.select().from(students).orderBy(asc(students.id)).limit(1);
  if (existing.length === 0) {
    const demoAttempts = [
      { quizSlug: "quiz-math-suites", subjectSlug: "mathematiques", score: 3, total: 4 },
      { quizSlug: "quiz-physique-rc", subjectSlug: "physique", score: 3, total: 4 },
      { quizSlug: "quiz-svt-genetique", subjectSlug: "svt", score: 2, total: 4 },
      { quizSlug: "quiz-philo-liberte", subjectSlug: "philosophie", score: 2, total: 4 },
      { quizSlug: "quiz-anglais-tenses", subjectSlug: "anglais", score: 4, total: 4 },
      { quizSlug: "quiz-info-python", subjectSlug: "informatique", score: 3, total: 4 },
    ];

    const quizXpTotal = demoAttempts.reduce(
      (sum, item) => sum + computeQuizXp(item.score, item.total, false),
      0,
    );
    // 5 fiches (5×15=75 XP) + 3 exercices (3×25=75 XP) + 1 examen (40 XP) + quiz XP
    const initialXp = 75 + 75 + 40 + quizXpTotal;

    const [student] = await db
      .insert(students)
      .values({
        name: DEMO_NAME,
        section: DEMO_SECTION,
        isDemo: true,
        xpPoints: initialXp,
        streakDays: 3,
        lastActivityAt: new Date(),
      })
      .returning({ id: students.id });

    activeStudentId = student.id;

    await db.insert(lessonProgress).values(
      [
        ["suites-numeriques", "mathematiques"],
        ["dipole-rc", "physique"],
        ["genetique-transmission", "svt"],
        ["la-liberte", "philosophie"],
        ["english-tenses-writing", "anglais"],
      ].map(([lessonSlug, subjectSlug]) => ({
        studentId: student.id,
        lessonSlug,
        subjectSlug,
      })),
    );

    await db.insert(exerciseProgress).values(
      [
        ["suite-auxiliaire", "mathematiques"],
        ["rc-constante-de-temps", "physique"],
        ["python-maximum-moyenne", "informatique"],
      ].map(([exerciseSlug, subjectSlug]) => ({
        studentId: student.id,
        exerciseSlug,
        subjectSlug,
      })),
    );

    await db.insert(examProgress).values([
      { studentId: student.id, examSlug: "bac-math-sciences-session", subjectSlug: "mathematiques" },
    ]);

    await db.insert(quizAttempts).values(
      demoAttempts.map((item) => ({
        studentId: student.id,
        ...item,
      })),
    );

    await db.insert(scoreHistory).values(
      demoAttempts.map((item) => ({
        studentId: student.id,
        activityType: "quiz" as const,
        activitySlug: item.quizSlug,
        activityTitle: quizTitleBySlug.get(item.quizSlug) ?? item.quizSlug,
        subjectSlug: item.subjectSlug,
        score: item.score,
        total: item.total,
        noteOn20Tenths: Math.round((item.score / Math.max(1, item.total)) * 200),
        xpEarned: computeQuizXp(item.score, item.total, false),
        durationSec: 240,
      })),
    );
  } else {
    // Migration douce pour une base déjà peuplée : si `score_history` est vide alors que
    // `quiz_attempts` contient déjà des essais, on reconstruit automatiquement l'historique et l'XP.
    const currentStudent = existing[0];
    activeStudentId = currentStudent.id;
    const [{ count: historyCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(scoreHistory)
      .where(eq(scoreHistory.studentId, currentStudent.id));

    if (historyCount === 0) {
      const existingAttempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.studentId, currentStudent.id))
        .orderBy(asc(quizAttempts.createdAt));

      if (existingAttempts.length > 0) {
        const backfilledRows = existingAttempts.map((attempt) => {
          const isBacBlanc = attempt.quizSlug.startsWith("bac-blanc-");
          const xp = computeQuizXp(attempt.score, attempt.total, isBacBlanc);
          return {
            studentId: currentStudent.id,
            activityType: (isBacBlanc ? "bac-blanc" : "quiz") as "bac-blanc" | "quiz",
            activitySlug: attempt.quizSlug,
            activityTitle: isBacBlanc
              ? `Bac Blanc · ${attempt.subjectSlug}`
              : (quizTitleBySlug.get(attempt.quizSlug) ?? attempt.quizSlug),
            subjectSlug: attempt.subjectSlug,
            score: attempt.score,
            total: attempt.total,
            noteOn20Tenths: Math.round((attempt.score / Math.max(1, attempt.total)) * 200),
            xpEarned: xp,
            durationSec: isBacBlanc ? 600 : 240,
            createdAt: attempt.createdAt,
          };
        });

        await chunkedInsert(backfilledRows, 10, (batch) => db.insert(scoreHistory).values(batch));

        if (currentStudent.xpPoints === 0) {
          const [[lCount], [eCount], [xCount]] = await Promise.all([
            db
              .select({ count: sql<number>`count(*)::int` })
              .from(lessonProgress)
              .where(eq(lessonProgress.studentId, currentStudent.id)),
            db
              .select({ count: sql<number>`count(*)::int` })
              .from(exerciseProgress)
              .where(eq(exerciseProgress.studentId, currentStudent.id)),
            db
              .select({ count: sql<number>`count(*)::int` })
              .from(examProgress)
              .where(eq(examProgress.studentId, currentStudent.id)),
          ]);

          const attemptXp = backfilledRows.reduce((sum, row) => sum + row.xpEarned, 0);
          const totalXp =
            (lCount?.count ?? 0) * 15 +
            (eCount?.count ?? 0) * 25 +
            (xCount?.count ?? 0) * 40 +
            attemptXp;

          await db
            .update(students)
            .set({
              xpPoints: totalXp,
              streakDays: Math.max(1, currentStudent.streakDays || 2),
              lastActivityAt: existingAttempts[existingAttempts.length - 1]?.createdAt ?? new Date(),
            })
            .where(eq(students.id, currentStudent.id));
        }
      }
    }
  }

  // Initialisation idempotente de l'espace communautaire de fiches (sur base neuve ou déjà en ligne)
  const communityCount = await countRows(communitySheets);
  if (communityCount === 0) {
    await chunkedInsert(
      communitySheetsSeed.map((sheet) => ({
        ...sheet,
        studentId: activeStudentId,
      })),
      4,
      (batch) => db.insert(communitySheets).values(batch).onConflictDoNothing(),
    );
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

/** Remise à zéro de l'état initialisé : utile après un changement de schéma. */
export function resetSeedCache(): void {
  globalForSeed.__bacSeedPromise = undefined;
}
