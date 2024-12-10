/*
  Warnings:

  - A unique constraint covering the columns `[telegramId]` on the table `stats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "GameOutcome" AS ENUM ('WON', 'LOST', 'TIE', 'ABANDONED', 'ONGOING');

-- CreateTable
CREATE TABLE "CricketMatchRecord" (
    "matchId" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "format" "MatchFormat" NOT NULL,
    "feePaid" BOOLEAN NOT NULL DEFAULT false,
    "runsScored" INTEGER NOT NULL DEFAULT 0,
    "ballsFaced" INTEGER NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "wicketsTaken" INTEGER NOT NULL DEFAULT 0,
    "runsConceded" INTEGER NOT NULL DEFAULT 0,
    "lowestRunsConceded" INTEGER NOT NULL DEFAULT 0,
    "highestWicketsTaken" INTEGER NOT NULL DEFAULT 0,
    "ballsBowled" INTEGER NOT NULL DEFAULT 0,
    "hattrick" INTEGER NOT NULL DEFAULT 0,
    "maidenOver" INTEGER NOT NULL DEFAULT 0,
    "outcome" "GameOutcome" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CricketMatchRecord_pkey" PRIMARY KEY ("matchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "stats_telegramId_key" ON "stats"("telegramId");

-- AddForeignKey
ALTER TABLE "CricketMatchRecord" ADD CONSTRAINT "CricketMatchRecord_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
