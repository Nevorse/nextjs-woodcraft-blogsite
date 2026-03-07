"use server";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveImagesToAlbum(
  paths: string[],
  albumId: string,
  pathToRevalidate?: string,
): Promise<{ success: true; count: number } | { success: false; error: string }> {
  try {
    if (!paths || paths.length === 0)
      return { success: false, error: "UUID listesi boş." };
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

export async function removeImagesFromAlbum(
  paths: string[],
  pathToRevalidate?: string,
): Promise<{ success: true; count: number } | { success: false; error: string }> {
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

export async function updateImageOrders(
  images: { id: string; order: number }[],
  pathToRevalidate?: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!images || images.length === 0)
      return { success: false, error: "Resim listesi boş." };

    await prisma.$transaction(
      images.map(({ id, order }) =>
        prisma.image.update({
          where: { id },
          data: { order: order },
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
