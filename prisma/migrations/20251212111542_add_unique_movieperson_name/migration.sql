/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `moviePerson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "moviePerson_name_key" ON "moviePerson"("name");
