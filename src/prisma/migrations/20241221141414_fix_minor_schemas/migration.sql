/*
  Warnings:

  - You are about to drop the column `bonusAwarded` on the `referral_records` table. All the data in the column will be lost.
  - You are about to drop the column `referredAt` on the `referral_records` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `assetType` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `balanceEffect` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `referral_records` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoucherRewardStatus" AS ENUM ('PENDING', 'CREDITED', 'EXPIRED', 'CLAIMED');

-- CreateEnum
CREATE TYPE "VoucherPurchasedStatus" AS ENUM ('CREDITED', 'REFUNDED');

-- AlterTable
ALTER TABLE "referral_records" DROP COLUMN "bonusAwarded",
DROP COLUMN "referredAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalEarnedCoins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalEarnedPasses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalEarnedVouchers" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "stats" ALTER COLUMN "lowestRunsConceded" DROP NOT NULL,
ALTER COLUMN "bestBowlingRuns" DROP NOT NULL,
ALTER COLUMN "bestBowlingWickets" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amount",
DROP COLUMN "assetType",
DROP COLUMN "balanceEffect",
ADD COLUMN     "coinAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "voucherAmount" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "AssetType";

-- DropEnum
DROP TYPE "BalanceEffect";

-- CreateTable
CREATE TABLE "voucher_purchases" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "voucherAmount" INTEGER NOT NULL,
    "starAmount" INTEGER NOT NULL,
    "telegramPaymentId" TEXT NOT NULL,
    "providerPaymentId" TEXT NOT NULL,
    "VoucherPurchaseStatus" "VoucherPurchasedStatus" NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "voucher_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher_rewards" (
    "id" TEXT NOT NULL,
    "referralRecordId" TEXT NOT NULL,
    "voucherPurchaseId" TEXT NOT NULL,
    "referrerReward" INTEGER NOT NULL,
    "referredReward" INTEGER NOT NULL,
    "status" "VoucherRewardStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "claimBy" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voucher_purchases_telegramPaymentId_key" ON "voucher_purchases"("telegramPaymentId");

-- CreateIndex
CREATE INDEX "voucher_purchases_telegramId_idx" ON "voucher_purchases"("telegramId");

-- CreateIndex
CREATE INDEX "voucher_rewards_referralRecordId_idx" ON "voucher_rewards"("referralRecordId");

-- CreateIndex
CREATE INDEX "voucher_rewards_voucherPurchaseId_idx" ON "voucher_rewards"("voucherPurchaseId");

-- AddForeignKey
ALTER TABLE "voucher_purchases" ADD CONSTRAINT "voucher_purchases_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_rewards" ADD CONSTRAINT "voucher_rewards_referralRecordId_fkey" FOREIGN KEY ("referralRecordId") REFERENCES "referral_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_rewards" ADD CONSTRAINT "voucher_rewards_voucherPurchaseId_fkey" FOREIGN KEY ("voucherPurchaseId") REFERENCES "voucher_purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
