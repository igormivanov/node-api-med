/*
  Warnings:

  - Added the required column `title` to the `medical_duties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancies` to the `medical_duties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medical_duties" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "vacancies" INTEGER NOT NULL;
