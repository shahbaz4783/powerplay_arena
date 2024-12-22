/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `CricketMatchRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CricketMatchRecord" DROP CONSTRAINT "CricketMatchRecord_telegramId_fkey";

-- AlterTable
ALTER TABLE "CricketMatchRecord" DROP COLUMN "lastUpdated";

-- AddForeignKey
ALTER TABLE "CricketMatchRecord" ADD CONSTRAINT "CricketMatchRecord_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "users"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;
