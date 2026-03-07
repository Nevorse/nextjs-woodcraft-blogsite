/*
  Warnings:

  - A unique constraint covering the columns `[folderId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "folderId" TEXT,
ALTER COLUMN "albumId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_folderId_key" ON "Image"("folderId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "AlbumFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
