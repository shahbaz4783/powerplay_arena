/*
  Warnings:

  - You are about to drop the column `highestWicketsTaken` on the `CricketMatchRecord` table. All the data in the column will be lost.
  - You are about to drop the column `lowestRunsConceded` on the `CricketMatchRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CricketMatchRecord" DROP COLUMN "highestWicketsTaken",
DROP COLUMN "lowestRunsConceded",
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
