/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlbumFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_folderId_fkey";

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "AlbumFolder";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "coverAlbumLimit" INTEGER NOT NULL DEFAULT 3,
    "serviceAlbumLimit" INTEGER NOT NULL DEFAULT 0,
    "projectAlbumLimit" INTEGER NOT NULL DEFAULT 6,
    "coverAlbumTexts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album_folder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "FolderType" NOT NULL DEFAULT 'PROJECT_FOLDER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "album_folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "AlbumType" NOT NULL,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "ops" TEXT,
    "albumId" TEXT,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "album_folder_slug_key" ON "album_folder"("slug");

-- CreateIndex
CREATE INDEX "album_folder_type_order_idx" ON "album_folder"("type", "order");

-- CreateIndex
CREATE UNIQUE INDEX "album_slug_key" ON "album"("slug");

-- CreateIndex
CREATE INDEX "album_type_order_idx" ON "album"("type", "order");

-- CreateIndex
CREATE INDEX "album_folderId_order_idx" ON "album"("folderId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "image_folderId_key" ON "image"("folderId");

-- CreateIndex
CREATE INDEX "image_albumId_order_idx" ON "image"("albumId", "order");

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "album_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "album_folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
