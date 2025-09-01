/*
  Warnings:

  - You are about to drop the column `projectDir` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "projectDir",
ADD COLUMN     "projectsDir" TEXT NOT NULL DEFAULT 'workspace/ember/ember-projects';
