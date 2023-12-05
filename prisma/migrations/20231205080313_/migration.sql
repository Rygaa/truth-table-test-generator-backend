/*
  Warnings:

  - You are about to drop the `option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "option";

-- CreateTable
CREATE TABLE "type" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
