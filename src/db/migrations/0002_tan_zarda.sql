ALTER TABLE "todos" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "createdAt" SET DEFAULT now();