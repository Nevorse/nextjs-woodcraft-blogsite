-- CreateEnum
CREATE TYPE "FolderType" AS ENUM ('PROJECT_FOLDER');

-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('COVER_ALBUM', 'SERVICE_ALBUM', 'PROJECT_ALBUM');

-- CreateTable
CREATE TABLE "AlbumFolder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "FolderType" NOT NULL DEFAULT 'PROJECT_FOLDER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "AlbumType" NOT NULL,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "albumId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlbumFolder_type_order_idx" ON "AlbumFolder"("type", "order");

-- CreateIndex
CREATE INDEX "Album_type_order_idx" ON "Album"("type", "order");

-- CreateIndex
CREATE INDEX "Album_folderId_order_idx" ON "Album"("folderId", "order");

-- CreateIndex
CREATE INDEX "Image_albumId_order_idx" ON "Image"("albumId", "order");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "AlbumFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
