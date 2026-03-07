"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath } from "next/cache";
import z from "zod";
import { AlbumUpdateInput } from "@/lib/generated/prisma/models";

const ContentKeySchema = z.string().regex(/^content-.+$/);
const AlbumSchema = z
  .object({
    title: z.string().optional(),
    order: z.number().optional(),
    content: z.record(ContentKeySchema, z.string().nullable().optional()).optional(),
  })
  .strict();
type AlbumUpdateSafeInput = Pick<AlbumUpdateInput, "content" | "title" | "order">;

// TEST
export async function createAlbum() {
  const slug = slugify("Cover Album", { lower: true, strict: true, trim: true });
  await prisma.album.create({
    data: {
      title: "Cover Album",
      slug,
      type: "COVER_ALBUM",
    },
  });
}

export async function updateAlbumBySlug(
  slug: string,
  data: AlbumUpdateSafeInput,
  pathToRevalidate?: string,
) {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value != null && value !== ""),
    );

    const validation = AlbumSchema.safeParse(cleanData);

    if (!validation.success) {
      return { success: false, error: "Veri formatı hatalı" };
    }

    const updateData: AlbumUpdateInput = { ...cleanData };

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
    return {
      success: true,
      newSlug: result.slug,
      title: result.title,
      content: result.content,
    };
  } catch (error) {
    return handleDbActionError(error, "updateAlbumBySlug");
  }
}
