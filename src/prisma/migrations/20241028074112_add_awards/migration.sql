/*
  Warnings:

  - You are about to drop the `Challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChallenge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "UserChallenge" DROP CONSTRAINT "UserChallenge_userId_fkey";

-- DropTable
DROP TABLE "Challenge";

-- DropTable
DROP TABLE "UserChallenge";

-- CreateTable
CREATE TABLE "Award" (
    "awardId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Award_awardId_key" ON "Award"("awardId");

-- CreateIndex
CREATE UNIQUE INDEX "Award_userId_key" ON "Award"("userId");

-- CreateIndex
CREATE INDEX "Award_userId_idx" ON "Award"("userId");

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
