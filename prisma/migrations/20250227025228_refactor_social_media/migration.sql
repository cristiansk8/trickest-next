/*
  Warnings:

  - You are about to drop the column `facebook` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `SocialMedia` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `SocialMedia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,platform]` on the table `SocialMedia` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `SocialMedia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'TIKTOK', 'YOUTUBE', 'LINKEDIN');

-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_userId_fkey";

-- DropIndex
DROP INDEX "SocialMedia_userId_key";

-- AlterTable
ALTER TABLE "SocialMedia" DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "tiktok",
DROP COLUMN "twitter",
DROP COLUMN "youtube",
ADD COLUMN     "platform" "SocialPlatform" NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_userId_platform_key" ON "SocialMedia"("userId", "platform");

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
