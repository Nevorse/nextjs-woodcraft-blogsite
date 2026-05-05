"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath, revalidateTag } from "next/cache";
import { generateIncrementalTitle } from "@/lib/utils";
import { FolderType } from "@/lib/generated/prisma/enums";
import { AlbumFolderUpdateInput } from "@/lib/generated/prisma/models";
import z from "zod";

type SimpleFolderType = "projects";
const AlbumFolderSchema = z
  .object({
    title: z.string().optional(),
    order: z.number().optional(),
  })
  .strict();
type FolderUpdateSafeInput = Pick<AlbumFolderUpdateInput, "title" | "order">;

export async function createAlbumFolder({
  type,
  pathToRevalidate,
  title,
  isPublished = false,
}: {
  type: SimpleFolderType;
  pathToRevalidate?: string;
  title?: string;
  isPublished?: boolean;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const folderTypeMap: Record<SimpleFolderType, FolderType> = {
      projects: "PROJECT_FOLDER",
    };
    const validFolderType = folderTypeMap[type];
    if (!validFolderType) {
      return { success: false, error: `Geçersiz klasör tipi: ${type}` };
    }

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

    revalidateTag(`folders-${validFolderType}`, "max");

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
  pathToRevalidate?: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!folders || folders.length === 0)
      return { success: false, error: "Klasör listesi boş." };

    // data "desc" ile alındığı için toReversed() gerekli
    const newOrders = folders
      .toReversed()
      .map((item, index) => ({ id: item.id, order: index }));

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

    revalidateTag(`folders`, "max");

    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "updateFolderOrders");
  }
}

export async function deleteFolderById({
  id,
  pathToRevalidate,
}: {
  id: string;
  pathToRevalidate?: string;
}): Promise<
  { success: true; id: string; title: string } | { success: false; error: string }
> {
  try {
    if (!id || id.trim() === "") {
      return { success: false, error: "Geçersiz folder ID" };
    }

    const result = await prisma.albumFolder.delete({
      where: { id },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`folders-${result.type}`, "max");

    return { success: true, id: result.id, title: result.title };
  } catch (error) {
    return handleDbActionError(error, "deleteFolderById");
  }
}

export async function updateAlbumFolderById({
  id,
  data,
  pathToRevalidate,
}: {
  id: string;
  data: FolderUpdateSafeInput;
  pathToRevalidate?: string;
}): Promise<{ success: true; newSlug: string } | { success: false; error: string }> {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null && value !== ""),
    );

    const validation = AlbumFolderSchema.safeParse(cleanData);

    if (!validation.success) {
      return { success: false, error: "Veri formatı hatalı" };
    }

    const updateData = { ...cleanData };

    if (updateData.title && typeof updateData.title === "string") {
      updateData.slug = slugify(updateData.title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    const result = await prisma.albumFolder.update({
      where: { id },
      data: updateData,
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`folder-${result.slug}`, "max");

    return {
      success: true,
      newSlug: result.slug,
    };
  } catch (error) {
    return handleDbActionError(error, "updateAlbumFolderById");
  }
}
