DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('active', 'completed', 'archived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"message" text NOT NULL,
	"status" "status" NOT NULL
);
