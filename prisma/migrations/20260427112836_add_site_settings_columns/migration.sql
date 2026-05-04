/*
  Warnings:

  - The `content` column on the `album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `ops` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `coverAlbumLimit` on the `site_settings` table. All the data in the column will be lost.
  - You are about to drop the column `coverAlbumTexts` on the `site_settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "album" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB;

-- AlterTable
ALTER TABLE "album_folder" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "ops";

-- AlterTable
ALTER TABLE "site_settings" DROP COLUMN "coverAlbumLimit",
DROP COLUMN "coverAlbumTexts",
ADD COLUMN     "coverImageLimit" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "coverTextLimit" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "isRegistrationOpen" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "image_uuid_key" ON "image"("uuid");
