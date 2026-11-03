import { sql } from "drizzle-orm";
import { db } from "@/db";
import {
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
import { subjectSeeds } from "@/db/content/subjects";
import { lessonsSeed } from "@/db/content/lessons-humanities";
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

async function countRows(table: typeof subjects | typeof lessons | typeof quizzes) {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(table);
  return row?.count ?? 0;
}

/**
 * Crée les tables si elles n'existent pas encore.
 * Utile quand le projet Vercel est déployé sans avoir lancé `npm run db:push`
 * (base Neon neuve) : l'application s'auto-initialise au premier chargement.
 * Chaque instruction est idempotente (IF NOT EXISTS).
 */
export async function ensureSchema(): Promise<void> {
  for (const statement of INIT_SQL_STATEMENTS) {
    try {
      await db.execute(sql.raw(statement));
    } catch (error) {
      // 42P07 / 42710 : objet déjà présent (course entre deux instances) → on ignore.
      const code = (error as { code?: string }).code;
      if (code !== "42P07" && code !== "42710" && code !== "42P16") throw error;
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

  const contentReady = subjectCount >= subjectSeeds.length && lessonCount >= lessonsSeed.length && quizCount >= quizzesSeed.length;

  if (!contentReady) {
    if (subjectCount < subjectSeeds.length) {
      await db.insert(subjects).values(subjectSeeds).onConflictDoNothing();
    }

    await chunkedInsert(lessonsSeed, 4, (batch) =>
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
    const existing = await db.select({ id: students.id }).from(students).limit(1);
    if (existing.length === 0) {
      const [student] = await db
        .insert(students)
        .values({ name: DEMO_NAME, section: DEMO_SECTION, isDemo: true })
        .returning({ id: students.id });

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

      await db.insert(quizAttempts).values([
        {
          studentId: student.id,
          quizSlug: "quiz-math-suites",
          subjectSlug: "mathematiques",
          score: 3,
          total: 4,
        },
        {
          studentId: student.id,
          quizSlug: "quiz-physique-rc",
          subjectSlug: "physique",
          score: 3,
          total: 4,
        },
        {
          studentId: student.id,
          quizSlug: "quiz-svt-genetique",
          subjectSlug: "svt",
          score: 2,
          total: 4,
        },
        {
          studentId: student.id,
          quizSlug: "quiz-philo-liberte",
          subjectSlug: "philosophie",
          score: 2,
          total: 4,
        },
        {
          studentId: student.id,
          quizSlug: "quiz-anglais-tenses",
          subjectSlug: "anglais",
          score: 4,
          total: 4,
        },
        {
          studentId: student.id,
          quizSlug: "quiz-info-python",
          subjectSlug: "informatique",
          score: 3,
          total: 4,
        },
      ]);
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

/** Remise à zéro de l'état initialisé : utile après un changement de schéma. */
export function resetSeedCache(): void {
  globalForSeed.__bacSeedPromise = undefined;
}
