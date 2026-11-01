import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

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

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  section: text("section").notNull(),
  isDemo: boolean("is_demo").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

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

/* ------------------------------------------------------------------ */
/*  Assistant pédagogique IA (lié au compte de l'étudiant)            */
/* ------------------------------------------------------------------ */

export type AiMessageRole = "user" | "assistant";

export const aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  title: text("title").notNull().default("Nouvelle conversation"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const aiMessages = pgTable("ai_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
    role: text("role").notNull().$type<AiMessageRole>(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
