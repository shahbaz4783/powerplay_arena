-- CreateEnum
CREATE TYPE "BetType" AS ENUM ('SAFE_BET', 'CLASSIC_FLIP', 'TRIPLE_SHOT', 'JACKPOT');

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Award" DROP CONSTRAINT "Award_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_telegramId_fkey";

-- CreateTable
CREATE TABLE "BetStats" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "betType" "BetType" NOT NULL,
    "betsPlaced" INTEGER NOT NULL DEFAULT 0,
    "betsWon" INTEGER NOT NULL DEFAULT 0,
    "totalWagered" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPayout" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "BetStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BetStats_telegramId_key" ON "BetStats"("telegramId");

-- CreateIndex
CREATE INDEX "BetStats_telegramId_idx" ON "BetStats"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "BetStats_telegramId_betType_key" ON "BetStats"("telegramId", "betType");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetStats" ADD CONSTRAINT "BetStats_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
