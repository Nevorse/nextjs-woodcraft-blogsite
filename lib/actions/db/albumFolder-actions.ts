"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath } from "next/cache";
import { generateIncrementalTitle } from "@/lib/utils";
import { FolderType } from "@/lib/generated/prisma/enums";

type SimpleFolderType = "project";
export async function createAlbumFolder({
  type,
  pathToRevalidate,
  title,
  isPublished = true,
}: {
  type: SimpleFolderType;
  pathToRevalidate?: string;
  title?: string;
  isPublished?: boolean;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const folderTypeMap: Record<SimpleFolderType, FolderType> = {
      "project": "PROJECT_FOLDER",
    };
    const validFolderType = folderTypeMap[type];
    if (!validFolderType) {
      return { success: false, error: `Geçersiz klasör tipi: ${type}` };
    }
    // const validFolderTypes = Object.values(FolderType);
    // if (!validFolderTypes.includes(type)) {
    //   return { success: false, error: `Geçersiz klasör tipi: ${type}` };
    // }

    // Title
    let resolvedTitle;
    if (title) {
      resolvedTitle = title;
    } else {
      const baseTitle = "Yeni Proje Klasörü";

      const existingFolders: { title: string }[] = await prisma.albumFolder.findMany({
        where: {
          // type: validFolderType,
          title: { startsWith: baseTitle },
        },
        select: { title: true },
      });

      resolvedTitle = generateIncrementalTitle(
        existingFolders.map((f) => f.title),
        baseTitle,
      );
    }

    // Order
    const aggregate = await prisma.albumFolder.aggregate({
      where: { type: validFolderType },
      _max: { order: true },
    });
    const nextOrder = (aggregate._max.order ?? -1) + 1;

    // Slug
    const slug = slugify(resolvedTitle, { lower: true, strict: true, trim: true });

    await prisma.albumFolder.create({
      data: {
        title: resolvedTitle,
        order: nextOrder,
        slug,
        type: validFolderType,
        isPublished,
      },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "createAlbumFolder");
  }
}

export async function updateFolderOrders({
  folders,
  pathToRevalidate,
}: {
  folders: { id: string; order: number }[];
  pathToRevalidate?: string 
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!folders || folders.length === 0)
      return { success: false, error: "Klasör listesi boş." };

    // data "desc" ile alındığı için toReversed() gerekli
    const newOrders = folders.toReversed().map((folder, index) => ({ id: folder.id, order: index }));

    await prisma.$transaction(
      newOrders.map(({ id, order }) =>
        prisma.albumFolder.update({
          where: { id },
          data: { order },
        }),
      ),
    );

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "updateFolderOrders");
  }
}
