/*
  Warnings:

  - Changed the type of `userId` on the `WishSkate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "WishSkate" DROP CONSTRAINT "WishSkate_userId_fkey";

-- AlterTable
ALTER TABLE "WishSkate" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WishSkate_userId_key" ON "WishSkate"("userId");

-- AddForeignKey
ALTER TABLE "WishSkate" ADD CONSTRAINT "WishSkate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
