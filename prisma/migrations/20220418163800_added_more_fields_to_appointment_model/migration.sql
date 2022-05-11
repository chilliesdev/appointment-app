/*
  Warnings:

  - Added the required column `duration` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
