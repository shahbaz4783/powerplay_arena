/*
  Warnings:

  - You are about to drop the column `bettingPasses` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `powerPass` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bettingPasses",
ADD COLUMN     "powerPass" INTEGER NOT NULL,
ALTER COLUMN "levelName" DROP DEFAULT,
ALTER COLUMN "xpForNextLevel" DROP DEFAULT;
