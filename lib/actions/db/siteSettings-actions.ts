"use server";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const SettingsSchema = z
  .object({
    serviceAlbumLimit: z.number().optional(),
    projectAlbumLimit: z.number().optional(),
    coverImageLimit: z.number().optional(),
    coverTextLimit: z.number().optional(),
    isRegistrationOpen: z.boolean().optional(),
  })
  .strict();

export type UpdateSiteSettingsParams = {
  serviceAlbumLimit?: number;
  projectAlbumLimit?: number;
  coverImageLimit?: number;
  coverTextLimit?: number;
  isRegistrationOpen?: boolean;
};
export async function updateSiteSettings(
  data: UpdateSiteSettingsParams,
  pathToRevalidate?: string,
): Promise<{ success: true; } | { success: false; error: string }> {
  try {
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== null),
    );

    const validation = SettingsSchema.safeParse(cleanData);

    if (!validation.success) {
      return { success: false, error: "Veri formatı hatalı" };
    }

    await prisma.siteSettings.upsert({
      where: { id: "SITE_SETTINGS_ID" },
      update: {
        ...cleanData,
      },
      create: {
        id: "SITE_SETTINGS_ID",
        ...cleanData,
      },
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return { success: true };
  } catch (error) {
    return handleDbActionError(error, "updateSiteSettings");
  }
}
