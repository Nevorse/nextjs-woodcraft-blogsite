"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import { AlbumUpdateInput } from "@/lib/generated/prisma/models";
import { generateIncrementalTitle } from "@/lib/utils";
import { AlbumType } from "@/lib/generated/prisma/enums";

const ContentKeySchema = z.string().regex(/^content-.+$/);
const AlbumSchema = z
  .object({
    title: z.string().optional(),
    order: z.number().optional(),
    content: z.record(ContentKeySchema, z.string().nullable().optional()).optional(),
  })
  .strict();

type SimpleAlbumType = "cover" | "projects" | "services";
const albumTypeMap: Record<SimpleAlbumType, AlbumType> = {
  cover: "COVER_ALBUM",
  projects: "PROJECT_ALBUM",
  services: "SERVICE_ALBUM",
};

export type AlbumUpdateSafeInput = Pick<AlbumUpdateInput, "content" | "title" | "order">;

export async function updateAlbumBySlug({
  slug,
  data,
  pathToRevalidate,
}: {
  slug: string;
  data: AlbumUpdateSafeInput;
  pathToRevalidate?: string;
}): Promise<{ success: true; newSlug: string } | { success: false; error: string }> {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null && value !== ""),
    );

    const validation = AlbumSchema.safeParse(cleanData);

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

    const result = await prisma.album.update({
      where: { slug },
      data: updateData,
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`album-${slug}`, "max");

    return {
      success: true,
      newSlug: result.slug,
    };
  } catch (error) {
    return handleDbActionError(error, "updateAlbumBySlug");
  }
}

export async function updateAlbumOrders({
  albums,
  pathToRevalidate,
}: {
  albums: { id: string; order: number }[];
  pathToRevalidate?: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!albums || albums.length === 0)
      return { success: false, error: "Klasör listesi boş." };

    // data "desc" ile alındığı için toReversed() gerekli
    const newOrders = albums
      .toReversed()
      .map((item, index) => ({ id: item.id, order: index }));

    await prisma.$transaction(
      newOrders.map(({ id, order }) =>
        prisma.album.update({
          where: { id },
          data: { order },
        }),
      ),
    );

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag("albums", "max");

    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "updateAlbumOrders");
  }
}

export async function createAlbumForFolder({
  folderId,
  type,
  pathToRevalidate,
  title,
  isPublished = false,
}: {
  folderId: string;
  type: SimpleAlbumType;
  pathToRevalidate?: string;
  title?: string;
  isPublished?: boolean;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const validAlbumType = albumTypeMap[type];
    if (!validAlbumType) {
      return { success: false, error: `Geçersiz albüm tipi: ${type}` };
    }

    const folder = await prisma.albumFolder.findUnique({
      where: { id: folderId },
      select: { id: true, type: true },
    });
    if (!folder) {
      return { success: false, error: "Klasör bulunamadı" };
    }

    // Title
    let resolvedTitle;
    if (title) {
      resolvedTitle = title;
    } else {
      const baseTitle = `Yeni ${type} albümü`;

      const existingAlbums: { title: string }[] = await prisma.album.findMany({
        where: {
          // folderId: folderId,
          type: validAlbumType,
          title: { startsWith: baseTitle },
        },
        select: { title: true },
      });

      resolvedTitle = generateIncrementalTitle(
        existingAlbums.map((a) => a.title),
        baseTitle,
      );
    }

    // Order
    const aggregate = await prisma.album.aggregate({
      where: { folderId: folderId },
      _max: { order: true },
    });
    const nextOrder = (aggregate._max.order ?? -1) + 1;

    // Slug
    const slug = slugify(resolvedTitle, { lower: true, strict: true, trim: true });

    await prisma.album.create({
      data: {
        folderId: folderId,
        title: resolvedTitle,
        order: nextOrder,
        slug: slug,
        type: validAlbumType,
        isPublished,
      },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`albums-${validAlbumType}`, "max");

    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "createAlbumForFolder");
  }
}

export async function createStandaloneAlbum({
  type,
  title,
  isPublished,
  pathToRevalidate,
  albumId,
}: {
  type: SimpleAlbumType;
  title?: string;
  isPublished?: boolean;
  pathToRevalidate?: string;
  albumId?: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const validAlbumType = albumTypeMap[type];
    if (!validAlbumType) {
      return { success: false, error: `Geçersiz klasör tipi: ${type}` };
    }

    // Title
    let resolvedTitle;
    if (title) {
      resolvedTitle = title;
    } else {
      const baseTitle = `Yeni ${type} albümü`;

      const existingAlbums: { title: string }[] = await prisma.album.findMany({
        where: {
          type: validAlbumType,
          title: { startsWith: baseTitle },
        },
        select: { title: true },
      });

      resolvedTitle = generateIncrementalTitle(
        existingAlbums.map((a) => a.title),
        baseTitle,
      );
    }

    // Order
    const aggregate = await prisma.album.aggregate({
      where: { type: validAlbumType },
      _max: { order: true },
    });
    const nextOrder = (aggregate._max.order ?? -1) + 1;

    // Slug
    const slug = slugify(resolvedTitle, { lower: true, strict: true, trim: true });

    await prisma.album.create({
      data: {
        id: albumId ? albumId : undefined,
        type: validAlbumType,
        title: resolvedTitle,
        slug: slug,
        order: nextOrder,
        isPublished,
      },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`albums-${validAlbumType}`, "max");

    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "createStandaloneAlbum");
  }
}

export async function deleteAlbumById({
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
      return { success: false, error: "Geçersiz album ID" };
    }

    const result = await prisma.album.delete({
      where: { id },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    revalidateTag(`albums-${result.type}`, "max");

    return { success: true, id: result.id, title: result.title };
  } catch (error) {
    return handleDbActionError(error, "deleteAlbumById");
  }
}

// export async function upsertAlbumByID({
//   id,
//   data,
//   type,
//   pathToRevalidate,
// }: {
//   id: string;
//   data: AlbumUpdateSafeInput;
//   type: SimpleAlbumType;
//   pathToRevalidate?: string;
// }): Promise<{ success: true } | { success: false; error: string }> {
//   try {
//     const validAlbumType = albumTypeMap[type];
//     if (!validAlbumType) {
//       return { success: false, error: `Geçersiz albüm tipi: ${type}` };
//     }

//     const cleanData = Object.fromEntries(
//       Object.entries(data).filter(([_, value]) => value != null && value !== ""),
//     );
//     const validation = AlbumSchema.safeParse(cleanData);
//     if (!validation.success) {
//       return { success: false, error: "Veri formatı hatalı" };
//     }

//     const updateData = { ...cleanData };

//     if (updateData.title && typeof updateData.title === "string") {
//       updateData.slug = slugify(updateData.title, {
//         lower: true,
//         strict: true,
//         trim: true,
//       });
//     }

//     await prisma.album.upsert({
//       where: { id },
//       update: {
//         ...updateData,
//       },
//       create: {
//         id,
//         type: validAlbumType,
//         title: typeof updateData.title === "string" ? updateData.title : "Yeni Albüm",
//         slug:
//           typeof updateData.title === "string"
//             ? slugify(updateData.title, { lower: true, strict: true, trim: true })
//             : slugify("Yeni Albüm", { lower: true, strict: true, trim: true }),
//         content: updateData.content,
//       },
//     });

//     if (pathToRevalidate) {
//       revalidatePath(pathToRevalidate);
//     }
//     return {
//       success: true,
//     };
//   } catch (error) {
//     return handleDbActionError(error, "upsertAlbumByID");
//   }
// }
