/*
  Warnings:

  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Award` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BetStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaitlistUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Award" DROP CONSTRAINT "Award_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "BetStats" DROP CONSTRAINT "BetStats_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_telegramId_fkey";

-- DropTable
DROP TABLE "Avatar";

-- DropTable
DROP TABLE "Award";

-- DropTable
DROP TABLE "BetStats";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Stats";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "WaitlistUser";

-- CreateTable
CREATE TABLE "users" (
    "telegramId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "inviteCode" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("telegramId")
);

-- CreateTable
CREATE TABLE "UserProgression" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "levelName" TEXT NOT NULL,
    "xpForNextLevel" INTEGER NOT NULL,
    "streakLength" INTEGER NOT NULL DEFAULT 0,
    "weeklyStreak" INTEGER NOT NULL DEFAULT 0,
    "lastClaimedAt" TIMESTAMP(3),

    CONSTRAINT "UserProgression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_inventory" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "powerCoin" INTEGER NOT NULL DEFAULT 0,
    "powerPass" INTEGER NOT NULL DEFAULT 0,
    "starVoucher" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "mintNumber" SERIAL NOT NULL,
    "avatarId" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power_ups" (
    "id" TEXT NOT NULL,
    "mintNumber" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "powerUpId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "currentLevel" INTEGER NOT NULL,
    "currentBoost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "power_ups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "awardId" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "format" "MatchFormat" NOT NULL,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "matchesWon" INTEGER NOT NULL DEFAULT 0,
    "matchesLost" INTEGER NOT NULL DEFAULT 0,
    "matchesTie" INTEGER NOT NULL DEFAULT 0,
    "runsScored" INTEGER NOT NULL DEFAULT 0,
    "highestRunsScored" INTEGER NOT NULL DEFAULT 0,
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

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bet_stats" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "betType" "BetType" NOT NULL,
    "betsPlaced" INTEGER NOT NULL DEFAULT 0,
    "betsWon" INTEGER NOT NULL DEFAULT 0,
    "totalWagered" INTEGER NOT NULL DEFAULT 0,
    "totalEarning" INTEGER NOT NULL DEFAULT 0,
    "totalLoss" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "bet_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceEffect" "BalanceEffect" NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT,
    "matchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TransactionStatus" NOT NULL DEFAULT 'COMPLETED',

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stars_transactions" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "stars_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_records" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,
    "bonusAwarded" INTEGER NOT NULL,
    "referredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_inviteCode_key" ON "users"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgression_telegramId_key" ON "UserProgression"("telegramId");

-- CreateIndex
CREATE INDEX "UserProgression_telegramId_idx" ON "UserProgression"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "user_inventory_telegramId_key" ON "user_inventory"("telegramId");

-- CreateIndex
CREATE INDEX "avatars_telegramId_idx" ON "avatars"("telegramId");

-- CreateIndex
CREATE INDEX "power_ups_telegramId_idx" ON "power_ups"("telegramId");

-- CreateIndex
CREATE INDEX "badges_telegramId_idx" ON "badges"("telegramId");

-- CreateIndex
CREATE INDEX "stats_telegramId_idx" ON "stats"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "stats_telegramId_format_key" ON "stats"("telegramId", "format");

-- CreateIndex
CREATE INDEX "bet_stats_telegramId_idx" ON "bet_stats"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "bet_stats_telegramId_betType_key" ON "bet_stats"("telegramId", "betType");

-- CreateIndex
CREATE INDEX "transactions_telegramId_idx" ON "transactions"("telegramId");

-- CreateIndex
CREATE INDEX "transactions_type_idx" ON "transactions"("type");

-- CreateIndex
CREATE INDEX "stars_transactions_telegramId_idx" ON "stars_transactions"("telegramId");

-- CreateIndex
CREATE INDEX "referral_records_referrerId_idx" ON "referral_records"("referrerId");

-- CreateIndex
CREATE INDEX "referral_records_referredId_idx" ON "referral_records"("referredId");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_users_email_key" ON "waitlist_users"("email");

-- AddForeignKey
ALTER TABLE "UserProgression" ADD CONSTRAINT "UserProgression_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_inventory" ADD CONSTRAINT "user_inventory_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "power_ups" ADD CONSTRAINT "power_ups_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bet_stats" ADD CONSTRAINT "bet_stats_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stars_transactions" ADD CONSTRAINT "stars_transactions_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_records" ADD CONSTRAINT "referral_records_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_records" ADD CONSTRAINT "referral_records_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
