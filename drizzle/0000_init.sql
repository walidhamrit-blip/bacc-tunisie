CREATE TABLE "corrections" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"subject_slug" text NOT NULL,
	"section" text DEFAULT '' NOT NULL,
	"file_name" text,
	"file_size" integer DEFAULT 0 NOT NULL,
	"page_count" integer DEFAULT 0 NOT NULL,
	"source_text" text DEFAULT '' NOT NULL,
	"instruction" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'analysé' NOT NULL,
	"analysis" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exam_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"exam_slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exams" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"subject_slug" text NOT NULL,
	"section" text NOT NULL,
	"kind" text DEFAULT 'session' NOT NULL,
	"year" integer NOT NULL,
	"duration_min" integer DEFAULT 180 NOT NULL,
	"difficulty" integer DEFAULT 3 NOT NULL,
	"description" text NOT NULL,
	"parts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"advice" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"correction_notes" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"exercise_slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"title" text NOT NULL,
	"theme" text NOT NULL,
	"difficulty" integer DEFAULT 2 NOT NULL,
	"duration_min" integer DEFAULT 15 NOT NULL,
	"statement" text NOT NULL,
	"hints" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"answer" text NOT NULL,
	"lesson_slug" text
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"lesson_slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"title" text NOT NULL,
	"chapter" text NOT NULL,
	"summary" text NOT NULL,
	"level" text NOT NULL,
	"duration_min" integer DEFAULT 20 NOT NULL,
	"order_index" integer DEFAULT 0 NOT NULL,
	"objectives" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"blocks" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"key_points" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"pitfalls" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"flashcards" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"quiz_slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"score" integer NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"subject_slug" text NOT NULL,
	"lesson_slug" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" text DEFAULT 'Bac' NOT NULL,
	"duration_min" integer DEFAULT 8 NOT NULL,
	"questions" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"section" text NOT NULL,
	"is_demo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"family" text NOT NULL,
	"icon" text NOT NULL,
	"accent" text NOT NULL,
	"description" text NOT NULL,
	"sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"order_index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "exam_progress_unique_idx" ON "exam_progress" USING btree ("student_id","exam_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "exams_slug_idx" ON "exams" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "exercise_progress_unique_idx" ON "exercise_progress" USING btree ("student_id","exercise_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "exercises_slug_idx" ON "exercises" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_unique_idx" ON "lesson_progress" USING btree ("student_id","lesson_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "lessons_slug_idx" ON "lessons" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "quizzes_slug_idx" ON "quizzes" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "subjects_slug_idx" ON "subjects" USING btree ("slug");