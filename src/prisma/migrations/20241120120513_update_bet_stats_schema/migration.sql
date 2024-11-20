/*
  Warnings:

  - You are about to drop the column `totalPayout` on the `BetStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BetStats" DROP COLUMN "totalPayout",
ADD COLUMN     "totalEarning" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalLoss" DOUBLE PRECISION NOT NULL DEFAULT 0;
