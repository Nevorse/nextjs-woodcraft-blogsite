"use server";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveImageToFolder({
  path,
  folderId,
  pathToRevalidate,
}: {
  path: string;
  folderId: string;
  pathToRevalidate?: string;
}): Promise<{ success: true; count: 1 } | { success: false; error: string }> {
  try {
    if (!path) return { success: false, error: "UUID eksik." };
    if (!folderId) return { success: false, error: "Folder ID'si eksik." };

    await prisma.image.create({
      data: { uuid: path, folderId },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return { success: true, count: 1 };
  } catch (error) {
    return handleDbActionError(error, "saveImagesToFolder");
  }
}

export async function saveImagesToAlbum({
  paths,
  albumId,
  pathToRevalidate,
}: {
  paths: string[];
  albumId: string;
  pathToRevalidate?: string;
}): Promise<{ success: true; count: number } | { success: false; error: string }> {
  try {
    if (!paths || paths.length === 0)
      return { success: false, error: "UUID listesi eksik." };
    if (!albumId) return { success: false, error: "Albüm ID'si eksik." };

    const aggregate = await prisma.image.aggregate({
      where: { albumId },
      _max: { order: true },
    });

    const nextOrder = (aggregate._max.order ?? -1) + 1;

    const data = paths.map((path, index) => ({
      uuid: path,
      albumId,
      order: nextOrder + index,
    }));

    const result = await prisma.image.createMany({
      data,
      // skipDuplicates: true,
    });

    // if (result.count === 0) {
    //   return { success: false, error: "Tüm görseller zaten albümde mevcut." };
    // }
    // const skipped = paths.length - result.count;

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return { success: true, count: result.count };
  } catch (error) {
    return handleDbActionError(error, "saveImagesToAlbum");
  }
}

export async function removeImagesFromAlbum({
  paths,
  pathToRevalidate,
}: {
  paths: string[];
  pathToRevalidate?: string;
}): Promise<{ success: true; count: number } | { success: false; error: string }> {
  try {
    if (!paths || paths.length === 0) {
      return { success: false, error: "UUID listesi boş." };
    }
    let count;
    if (paths.length === 1) {
      const result = await prisma.image.delete({
        where: { uuid: paths[0] },
      });
      count = result.id ? 1 : 0;
    } else {
      const result = await prisma.image.deleteMany({
        where: { uuid: { in: paths } },
      });
      count = result.count;
    }

    if (pathToRevalidate) revalidatePath(pathToRevalidate);

    return { success: true, count };
  } catch (error) {
    return handleDbActionError(error, "removeImagesFromAlbum");
  }
}

export async function updateImageOrders({
  images,
  pathToRevalidate,
}: {
  images: { id: string; order: number }[];
  pathToRevalidate?: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!images || images.length === 0)
      return { success: false, error: "Resim listesi boş." };
    
    // data "desc" ile alındığı için toReversed() gerekli
    const newOrders = images.toReversed().map((image, index) => ({ id: image.id, order: index }));

    await prisma.$transaction(
      newOrders.map(({ id, order }) =>
        prisma.image.update({
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
    return handleDbActionError(error, "updateImageOrders");
  }
}
