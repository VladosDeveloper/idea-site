/*
  Warnings:

  - A unique constraint covering the columns `[serialNummber]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "serialNummber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_serialNummber_key" ON "Idea"("serialNummber");
