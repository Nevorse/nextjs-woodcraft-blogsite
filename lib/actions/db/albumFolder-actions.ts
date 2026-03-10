"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath } from "next/cache";
import { FolderType } from "@/lib/generated/prisma/enums";

export async function createAlbumFolder(
  type: FolderType,
  pathToRevalidate?: string,
  title?: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const validFolderTypes = Object.values(FolderType);
    if (!validFolderTypes.includes(type)) {
      return { success: false, error: `Geçersiz klasör tipi: ${type}` };
    }
    let resolvedTitle;

    if (title) {
      resolvedTitle = title;
    } else {
      const baseTitle = "Yeni Proje Klasörü";

      const existingFolders: { title: string }[] = await prisma.albumFolder.findMany({
        where: { title: { startsWith: baseTitle } },
        select: { title: true },
      });

      const usedNumbers = existingFolders
        .map((f) => {
          // const match = f.title.match(/^Yeni Proje Klasörü (\d+)$/);
          const match = f.title.match(new RegExp(`^${baseTitle} (\\d+)$`));
          return match ? parseInt(match[1], 10) : null;
        })
        .filter((n) => n !== null);

      let nextNumber = 1;
      while (usedNumbers.includes(nextNumber)) {
        nextNumber++;
      }
      resolvedTitle = `${baseTitle} ${nextNumber}`;
    }

    const slug = slugify(resolvedTitle, { lower: true, strict: true, trim: true });

    await prisma.albumFolder.create({
      data: { title: resolvedTitle, slug, type, isPublished: false },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "createAlbumFolder");
  }
}
