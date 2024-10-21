/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `XP` table. All the data in the column will be lost.
  - Added the required column `levelName` to the `XP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "XP" DROP COLUMN "lastUpdated",
ADD COLUMN     "levelName" TEXT NOT NULL,
ADD COLUMN     "xpForNextLevel" INTEGER NOT NULL DEFAULT 5000;
