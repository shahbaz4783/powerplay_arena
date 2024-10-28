/*
  Warnings:

  - The required column `id` was added to the `Award` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Award_awardId_key";

-- DropIndex
DROP INDEX "Award_userId_key";

-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Award_pkey" PRIMARY KEY ("id");
