/*
  Warnings:

  - You are about to drop the column `serialNummber` on the `Idea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serialNumber]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Idea_serialNummber_key";

-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "serialNummber",
ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_serialNumber_key" ON "Idea"("serialNumber");
