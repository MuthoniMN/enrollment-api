ALTER TABLE "cohorts" ADD COLUMN "orientationDate" timestamp;--> statement-breakpoint
ALTER TABLE "cohorts" ADD COLUMN "duration" text;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "admitted" boolean;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "deadline" timestamp;