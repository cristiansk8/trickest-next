/*
  Warnings:

  - You are about to drop the column `birthskate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ciudad` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `madero` on the `WishSkate` table. All the data in the column will be lost.
  - You are about to drop the column `rodamientos` on the `WishSkate` table. All the data in the column will be lost.
  - You are about to drop the column `ruedas` on the `WishSkate` table. All the data in the column will be lost.
  - You are about to drop the column `tenis` on the `WishSkate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthskate",
DROP COLUMN "ciudad",
DROP COLUMN "departamento",
DROP COLUMN "estado",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "isPro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "oldNicknames" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredSkateStyle" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WishSkate" DROP COLUMN "madero",
DROP COLUMN "rodamientos",
DROP COLUMN "ruedas",
DROP COLUMN "tenis",
ADD COLUMN     "bearings" TEXT,
ADD COLUMN     "deck" TEXT,
ADD COLUMN     "helmet" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pads" TEXT,
ADD COLUMN     "shoes" TEXT,
ADD COLUMN     "wheels" TEXT;

-- CreateTable
CREATE TABLE "Trick" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Trick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_nickname_idx" ON "User"("nickname");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Trick" ADD CONSTRAINT "Trick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
