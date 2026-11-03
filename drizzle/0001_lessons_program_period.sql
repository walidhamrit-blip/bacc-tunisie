ALTER TABLE "lessons" ADD COLUMN "period" text DEFAULT 'T1' NOT NULL;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "sections" jsonb DEFAULT '[]'::jsonb NOT NULL;