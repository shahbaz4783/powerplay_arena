/*
  Warnings:

  - The values [MATCH_WINNINGS] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `Award` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `lastClaimed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `streak` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `XP` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[telegramId,format]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telegramId` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `Stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('MATCH_FEE', 'MATCH_EARNINGS', 'REWARD', 'BET_PLACED', 'BET_WON', 'PURCHASE', 'OTHERS');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Award" DROP CONSTRAINT "Award_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "XP" DROP CONSTRAINT "XP_userId_fkey";

-- DropIndex
DROP INDEX "Award_userId_idx";

-- DropIndex
DROP INDEX "Stats_userId_format_key";

-- DropIndex
DROP INDEX "Stats_userId_idx";

-- DropIndex
DROP INDEX "Transaction_userId_idx";

-- AlterTable
ALTER TABLE "Award" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "telegramId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "userId",
ADD COLUMN     "hattrik" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highestRunsScored" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highestWicketsTaken" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lowestRunsConceded" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maidenOver" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "telegramId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userId",
ADD COLUMN     "telegramId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastClaimed",
DROP COLUMN "streak",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId");

-- DropTable
DROP TABLE "Wallet";

-- DropTable
DROP TABLE "XP";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "levelName" TEXT NOT NULL DEFAULT 'Rookie',
    "xpForNextLevel" INTEGER NOT NULL DEFAULT 2000,
    "streakLength" INTEGER NOT NULL DEFAULT 0,
    "weeklyStreak" INTEGER NOT NULL DEFAULT 0,
    "bettingPasses" INTEGER NOT NULL DEFAULT 0,
    "avatarUrl" TEXT NOT NULL,
    "lastClaimedAt" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "avatarId" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_telegramId_key" ON "Profile"("telegramId");

-- CreateIndex
CREATE INDEX "Profile_telegramId_idx" ON "Profile"("telegramId");

-- CreateIndex
CREATE INDEX "Avatar_telegramId_idx" ON "Avatar"("telegramId");

-- CreateIndex
CREATE INDEX "Award_telegramId_idx" ON "Award"("telegramId");

-- CreateIndex
CREATE INDEX "Stats_telegramId_idx" ON "Stats"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_telegramId_format_key" ON "Stats"("telegramId", "format");

-- CreateIndex
CREATE INDEX "Transaction_telegramId_idx" ON "Transaction"("telegramId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
