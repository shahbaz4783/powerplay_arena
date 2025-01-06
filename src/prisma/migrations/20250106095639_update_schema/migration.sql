/*
  Warnings:

  - You are about to alter the column `xpBoost` on the `avatars` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `currentLevel` on the `power_ups` table. All the data in the column will be lost.
  - You are about to alter the column `currentBoost` on the `power_ups` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `maxVouchers` on the `referral_records` table. All the data in the column will be lost.
  - You are about to drop the column `totalEarnedVouchers` on the `referral_records` table. All the data in the column will be lost.
  - You are about to drop the column `voucherAmount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `starVoucher` on the `user_inventory` table. All the data in the column will be lost.
  - You are about to drop the `voucher_purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voucher_rewards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currentBenefit` to the `avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentBenefit` to the `power_ups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `power_ups` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'REDEEM';
ALTER TYPE "TransactionType" ADD VALUE 'UPGRADE';
ALTER TYPE "TransactionType" ADD VALUE 'DEPOSIT';

-- DropForeignKey
ALTER TABLE "avatars" DROP CONSTRAINT "avatars_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "power_ups" DROP CONSTRAINT "power_ups_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "voucher_purchases" DROP CONSTRAINT "voucher_purchases_telegramId_fkey";

-- DropForeignKey
ALTER TABLE "voucher_rewards" DROP CONSTRAINT "voucher_rewards_referralRecordId_fkey";

-- DropForeignKey
ALTER TABLE "voucher_rewards" DROP CONSTRAINT "voucher_rewards_voucherPurchaseId_fkey";

-- AlterTable
ALTER TABLE "avatars" ADD COLUMN     "currentBenefit" TEXT NOT NULL,
ADD COLUMN     "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
ALTER COLUMN "xpBoost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "power_ups" DROP COLUMN "currentLevel",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentBenefit" TEXT NOT NULL,
ADD COLUMN     "rarity" "Rarity" NOT NULL DEFAULT 'COMMON',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "currentBoost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "referral_records" DROP COLUMN "maxVouchers",
DROP COLUMN "totalEarnedVouchers",
ADD COLUMN     "maxStars" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "totalEarnedStars" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "voucherAmount",
ADD COLUMN     "starAmount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_inventory" DROP COLUMN "starVoucher";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatarUrl" DROP NOT NULL;

-- DropTable
DROP TABLE "voucher_purchases";

-- DropTable
DROP TABLE "voucher_rewards";

-- DropEnum
DROP TYPE "VoucherPurchasedStatus";

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "mintNumber" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "isRedeem" BOOLEAN NOT NULL DEFAULT false,
    "coinAmount" INTEGER NOT NULL DEFAULT 0,
    "passAmount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "resources_telegramId_idx" ON "resources"("telegramId");

-- AddForeignKey
ALTER TABLE "avatars" ADD CONSTRAINT "avatars_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "power_ups" ADD CONSTRAINT "power_ups_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "user_inventory"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
