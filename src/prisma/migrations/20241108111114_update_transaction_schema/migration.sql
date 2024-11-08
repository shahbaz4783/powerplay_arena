/*
  Warnings:

  - Added the required column `balanceEffect` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BalanceEffect" AS ENUM ('INCREMENT', 'DECREMENT', 'NO_EFFECT');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "balanceEffect" "BalanceEffect" NOT NULL;
