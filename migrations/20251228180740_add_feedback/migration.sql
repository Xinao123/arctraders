-- CreateEnum
CREATE TYPE "FeedbackKind" AS ENUM ('SUGGESTION', 'BUG');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('OPEN', 'TRIAGED', 'CLOSED');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kind" "FeedbackKind" NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'OPEN',
    "message" TEXT NOT NULL,
    "contact" TEXT,
    "pageUrl" TEXT,
    "lang" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
