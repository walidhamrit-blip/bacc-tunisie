import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { StudyPlanRhythm, StudyPlanSlot } from "@/lib/study-planner";

export type LessonBlock =
  | { type: "paragraph"; title?: string; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "formula"; title?: string; expression: string; note?: string }
  | { type: "callout"; tone: "info" | "warn" | "tip"; title: string; text: string }
  | { type: "table"; title?: string; head: string[]; rows: string[][] };

export type Flashcard = { question: string; answer: string };

export type ExerciseStep = { title: string; content: string };

export type ExamQuestion = {
  prompt: string;
  answer: string;
  method?: string;
  points: number;
};

export type ExamPart = {
  title: string;
  intro?: string;
  questions: ExamQuestion[];
};

export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type CorrectionExercise = {
  label: string;
  excerpt: string;
  questions: string[];
  notions: string[];
  methode: string[];
  rappels: { title: string; text: string }[];
  vigilance: string[];
  bareme: number;
};

export type CorrectionAnalysis = {
  engine: "guide-pedagogique" | "assistant-ia";
  summary: string;
  detectedNotions: string[];
  exercises: CorrectionExercise[];
  nextSteps: string[];
  relatedLessonSlugs: string[];
  relatedExerciseSlugs: string[];
  warnings: string[];
};

export type ScoreActivityType = "quiz" | "bac-blanc" | "devoir";

export type CommunitySheetStatus = "pending" | "approved" | "rejected";

export type ErrorCardSourceType = "quiz" | "bac-blanc" | "manuel";

export type ErrorCardCategoryType =
  | "formule"
  | "methode"
  | "calcul"
  | "comprehension"
  | "inattention";

export const subjects = pgTable(
  "subjects",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    shortName: text("short_name").notNull(),
    family: text("family").notNull(),
    icon: text("icon").notNull(),
    accent: text("accent").notNull(),
    description: text("description").notNull(),
    sections: jsonb("sections").$type<string[]>().notNull().default([]),
    orderIndex: integer("order_index").notNull().default(0),
  },
  (table) => [uniqueIndex("subjects_slug_idx").on(table.slug)],
);

export const lessons = pgTable(
  "lessons",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    title: text("title").notNull(),
    chapter: text("chapter").notNull(),
    summary: text("summary").notNull(),
    level: text("level").notNull(),
    period: text("period").notNull().default("T1"),
    sections: jsonb("sections").$type<string[]>().notNull().default([]),
    durationMin: integer("duration_min").notNull().default(20),
    orderIndex: integer("order_index").notNull().default(0),
    objectives: jsonb("objectives").$type<string[]>().notNull().default([]),
    blocks: jsonb("blocks").$type<LessonBlock[]>().notNull().default([]),
    keyPoints: jsonb("key_points").$type<string[]>().notNull().default([]),
    pitfalls: jsonb("pitfalls").$type<string[]>().notNull().default([]),
    flashcards: jsonb("flashcards").$type<Flashcard[]>().notNull().default([]),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
  },
  (table) => [uniqueIndex("lessons_slug_idx").on(table.slug)],
);

export const exercises = pgTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    title: text("title").notNull(),
    theme: text("theme").notNull(),
    difficulty: integer("difficulty").notNull().default(2),
    durationMin: integer("duration_min").notNull().default(15),
    statement: text("statement").notNull(),
    hints: jsonb("hints").$type<string[]>().notNull().default([]),
    steps: jsonb("steps").$type<ExerciseStep[]>().notNull().default([]),
    answer: text("answer").notNull(),
    lessonSlug: text("lesson_slug"),
  },
  (table) => [uniqueIndex("exercises_slug_idx").on(table.slug)],
);

export const exams = pgTable(
  "exams",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    section: text("section").notNull(),
    kind: text("kind").notNull().default("session"),
    year: integer("year").notNull(),
    durationMin: integer("duration_min").notNull().default(180),
    difficulty: integer("difficulty").notNull().default(3),
    description: text("description").notNull(),
    parts: jsonb("parts").$type<ExamPart[]>().notNull().default([]),
    advice: jsonb("advice").$type<string[]>().notNull().default([]),
    correctionNotes: jsonb("correction_notes").$type<string[]>().notNull().default([]),
  },
  (table) => [uniqueIndex("exams_slug_idx").on(table.slug)],
);

export const quizzes = pgTable(
  "quizzes",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    lessonSlug: text("lesson_slug"),
    title: text("title").notNull(),
    description: text("description").notNull(),
    level: text("level").notNull().default("Bac"),
    durationMin: integer("duration_min").notNull().default(8),
    questions: jsonb("questions").$type<QuizQuestion[]>().notNull().default([]),
  },
  (table) => [uniqueIndex("quizzes_slug_idx").on(table.slug)],
);

export const students = pgTable(
  "students",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    lycee: text("lycee").notNull().default(""),
    section: text("section").notNull(),
    /** Verrouille définitivement l'abonnement de l'élève sur son unique section choisie à l'inscription. */
    sectionLocked: boolean("section_locked").notNull().default(false),
    /** Code personnel unique (ex. BAC-7K9P-4M) permettant la synchronisation sur téléphone + ordinateur. */
    syncCode: text("sync_code"),
    /** Jetons d'appareils actifs autorisés (plafonné à 2 appareils personnels contre le partage de compte). */
    deviceTokens: jsonb("device_tokens").$type<string[]>().notNull().default([]),
    isDemo: boolean("is_demo").notNull().default(true),
    xpPoints: integer("xp_points").notNull().default(0),
    streakDays: integer("streak_days").notNull().default(0),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("students_sync_code_idx").on(table.syncCode)],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("lesson_progress_unique_idx").on(table.studentId, table.lessonSlug)],
);

export const exerciseProgress = pgTable(
  "exercise_progress",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    exerciseSlug: text("exercise_slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("exercise_progress_unique_idx").on(table.studentId, table.exerciseSlug)],
);

export const examProgress = pgTable(
  "exam_progress",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    examSlug: text("exam_slug").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("exam_progress_unique_idx").on(table.studentId, table.examSlug)],
);

export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  quizSlug: text("quiz_slug").notNull(),
  subjectSlug: text("subject_slug").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Historique enrichi des scores (quiz, Bac Blanc chronométrés et notes de devoirs)
 * servant au suivi gamifié (XP) et au calcul de la Probabilité de Mention au Bac.
 */
export const scoreHistory = pgTable(
  "score_history",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    activityType: text("activity_type").$type<ScoreActivityType>().notNull().default("quiz"),
    activitySlug: text("activity_slug").notNull(),
    activityTitle: text("activity_title").notNull().default(""),
    subjectSlug: text("subject_slug").notNull(),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    /** Note ramenée sur 20 exprimée en dixièmes (ex: 145 = 14,5 / 20). */
    noteOn20Tenths: integer("note_on_20_tenths").notNull().default(0),
    xpEarned: integer("xp_earned").notNull().default(0),
    durationSec: integer("duration_sec").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("score_history_student_created_idx").on(table.studentId, table.createdAt)],
);

/**
 * Simulations sauvegardées du Calculateur Officiel de la Moyenne du Bac (`MG`)
 * et du Score d'Orientation Universitaire (`FG` — Formule Globale).
 */
export const bacSimulations = pgTable(
  "bac_simulations",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    label: text("label").notNull(),
    section: text("section").notNull(),
    notes: jsonb("notes").$type<Record<string, number>>().notNull().default({}),
    optionEnabled: boolean("option_enabled").notNull().default(false),
    optionName: text("option_name").notNull().default("Espagnol"),
    /** Note de l'option sur 20 exprimée en centièmes (ex: 1450 = 14,50 / 20). */
    optionNoteHundredths: integer("option_note_hundredths").notNull().default(1200),
    sportDispense: boolean("sport_dispense").notNull().default(false),
    /** Moyenne générale MG exprimée en centièmes (ex: 1425 = 14,25 / 20). */
    mgHundredths: integer("mg_hundredths").notNull().default(0),
    /** Score Formule Globale FG exprimé en centièmes (ex: 14860 = 148,60 pts). */
    fgHundredths: integer("fg_hundredths").notNull().default(0),
    mentionLabel: text("mention_label").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("bac_simulations_student_created_idx").on(table.studentId, table.createdAt)],
);

/**
 * Carnet d'Erreurs Intelligent & Répétition Espacée (SRS SM-2 + Boîtes de Leitner 1 à 5).
 * Collecte automatiquement les erreurs aux quiz et permet d'ajouter ses erreurs de devoirs.
 */
export const errorCards = pgTable(
  "error_cards",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    fingerprint: text("fingerprint").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    sourceType: text("source_type").$type<ErrorCardSourceType>().notNull().default("quiz"),
    sourceSlug: text("source_slug").notNull().default(""),
    sourceTitle: text("source_title").notNull().default(""),
    prompt: text("prompt").notNull(),
    wrongAnswer: text("wrong_answer").notNull().default(""),
    correctAnswer: text("correct_answer").notNull(),
    explanation: text("explanation").notNull().default(""),
    errorCategory: text("error_category")
      .$type<ErrorCardCategoryType>()
      .notNull()
      .default("comprehension"),
    boxLevel: integer("box_level").notNull().default(1),
    easeFactorPermille: integer("ease_factor_permille").notNull().default(2500),
    intervalDays: integer("interval_days").notNull().default(0),
    repetitions: integer("repetitions").notNull().default(0),
    lapsesCount: integer("lapses_count").notNull().default(1),
    mastered: boolean("mastered").notNull().default(false),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("error_cards_student_fingerprint_idx").on(table.studentId, table.fingerprint),
    index("error_cards_student_due_idx").on(table.studentId, table.nextReviewAt),
  ],
);

/**
 * Planning hebdomadaire intelligent de révision (7 jours), personnalisé par élève
 * et strictement aligné sur sa section officielle du Bac.
 */
export const studyPlans = pgTable(
  "study_plans",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    section: text("section").notNull(),
    weekLabel: text("week_label").notNull().default(""),
    dailyMinutesWeekday: integer("daily_minutes_weekday").notNull().default(90),
    dailyMinutesWeekend: integer("daily_minutes_weekend").notNull().default(180),
    preferredRhythm: text("preferred_rhythm")
      .$type<StudyPlanRhythm>()
      .notNull()
      .default("equilibre"),
    slots: jsonb("slots").$type<StudyPlanSlot[]>().notNull().default([]),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("study_plans_student_unique_idx").on(table.studentId)],
);

/**
 * Fiches courtes de révision soumises par les élèves de la communauté
 * avec workflow de validation simple (`pending` -> `approved` / `rejected`).
 */
export const communitySheets = pgTable(
  "community_sheets",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    studentId: integer("student_id").notNull(),
    authorName: text("author_name").notNull(),
    section: text("section").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    period: text("period").notNull().default("T1"),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    keyFormula: text("key_formula").notNull().default(""),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    status: text("status").$type<CommunitySheetStatus>().notNull().default("pending"),
    moderationNote: text("moderation_note").notNull().default(""),
    likesCount: integer("likes_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("community_sheets_slug_idx").on(table.slug),
    index("community_sheets_status_created_idx").on(table.status, table.createdAt),
  ],
);

/**
 * Mentions « J'aime » sur les fiches communautaires (unicité par fiche et par votant).
 */
export const communitySheetLikes = pgTable(
  "community_sheet_likes",
  {
    id: serial("id").primaryKey(),
    sheetId: integer("sheet_id").notNull(),
    studentId: integer("student_id").notNull(),
    voterKey: text("voter_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("community_sheet_likes_unique_idx").on(table.sheetId, table.voterKey),
    index("community_sheet_likes_sheet_idx").on(table.sheetId),
  ],
);

export const corrections = pgTable(
  "corrections",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    subjectSlug: text("subject_slug").notNull(),
    section: text("section").notNull().default(""),
    fileName: text("file_name"),
    fileSize: integer("file_size").notNull().default(0),
    pageCount: integer("page_count").notNull().default(0),
    sourceText: text("source_text").notNull().default(""),
    instruction: text("instruction").notNull().default(""),
    status: text("status").notNull().default("analysé"),
    analysis: jsonb("analysis").$type<CorrectionAnalysis>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
);
