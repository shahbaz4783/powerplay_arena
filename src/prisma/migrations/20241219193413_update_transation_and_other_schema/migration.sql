/*
  Warnings:

  - The values [ABANDONED] on the enum `GameOutcome` will be removed. If these variants are still used in the database, this will fail.
  - The values [MATCH_FEE,MATCH_EARNINGS,BET_PLACED,BET_WON] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `feePaid` on the `CricketMatchRecord` table. All the data in the column will be lost.
  - You are about to drop the column `href` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `awardId` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `power_ups` table. All the data in the column will be lost.
  - You are about to drop the column `hattrick` on the `stats` table. All the data in the column will be lost.
  - You are about to drop the column `highestWicketsTaken` on the `stats` table. All the data in the column will be lost.
  - You are about to drop the column `maidenOver` on the `stats` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `UserProgression` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stars_transactions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photoUrl` to the `avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xpBoost` to the `avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `badgeId` to the `badges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `badges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoUrl` to the `power_ups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bestBowlingRuns` to the `stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bestBowlingWickets` to the `stats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetType` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('COIN', 'PASS', 'VOUCHER');

-- AlterEnum
BEGIN;
CREATE TYPE "GameOutcome_new" AS ENUM ('WON', 'LOST', 'TIE', 'ONGOING');
ALTER TABLE "CricketMatchRecord" ALTER COLUMN "outcome" DROP DEFAULT;
ALTER TABLE "CricketMatchRecord" ALTER COLUMN "outcome" TYPE "GameOutcome_new" USING ("outcome"::text::"GameOutcome_new");
ALTER TYPE "GameOutcome" RENAME TO "GameOutcome_old";
ALTER TYPE "GameOutcome_new" RENAME TO "GameOutcome";
DROP TYPE "GameOutcome_old";
ALTER TABLE "CricketMatchRecord" ALTER COLUMN "outcome" SET DEFAULT 'ONGOING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('GAME', 'REWARD', 'PRIZE', 'EXCHANGE', 'PURCHASE', 'WITHDRAWAL', 'REFUND', 'OTHERS');
ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "TransactionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserProgression" DROP CONSTRAINT "UserProgression_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "stars_transactions" DROP CONSTRAINT "stars_transactions_telegramId_fkey";

-- DropIndex
DROP INDEX "stats_telegramId_key";

-- AlterTable
ALTER TABLE "CricketMatchRecord" DROP COLUMN "feePaid",
ADD COLUMN     "matchNumber" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "href",
ADD COLUMN     "photoUrl" TEXT NOT NULL,
ADD COLUMN     "xpBoost" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "badges" DROP COLUMN "awardId",
ADD COLUMN     "badgeId" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "power_ups" DROP COLUMN "image",
ADD COLUMN     "photoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stats" DROP COLUMN "hattrick",
DROP COLUMN "highestWicketsTaken",
DROP COLUMN "maidenOver",
ADD COLUMN     "bestBowlingRuns" INTEGER NOT NULL,
ADD COLUMN     "bestBowlingWickets" INTEGER NOT NULL,
ALTER COLUMN "lowestRunsConceded" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "matchId",
DROP COLUMN "status",
ADD COLUMN     "assetType" "AssetType" NOT NULL,
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "UserProgression";

-- DropTable
DROP TABLE "stars_transactions";

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "user_progression" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "levelName" TEXT NOT NULL,
    "xpForNextLevel" INTEGER NOT NULL,
    "streakLength" INTEGER NOT NULL DEFAULT 0,
    "weeklyStreak" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" TIMESTAMP(3),

    CONSTRAINT "user_progression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_progression_telegramId_key" ON "user_progression"("telegramId");

-- CreateIndex
CREATE INDEX "user_progression_telegramId_idx" ON "user_progression"("telegramId");

-- CreateIndex
CREATE INDEX "users_telegramId_idx" ON "users"("telegramId");

-- AddForeignKey
ALTER TABLE "user_progression" ADD CONSTRAINT "user_progression_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
