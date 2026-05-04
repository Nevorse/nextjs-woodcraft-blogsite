import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

type GetSiteSettingsParams = {
  serviceAlbumLimit?: boolean;
  projectAlbumLimit?: boolean;
  coverImageLimit?: boolean;
  coverTextLimit?: boolean;
  isRegistrationOpen?: boolean;
};

export async function getSiteSettings(params?: GetSiteSettingsParams) {
  "use cache";
  cacheTag("site-settings");
  cacheLife("hours");

  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: "SITE_SETTINGS_ID" },
    select: {
      serviceAlbumLimit: params?.serviceAlbumLimit ?? false,
      projectAlbumLimit: params?.projectAlbumLimit ?? false,
      coverImageLimit: params?.coverImageLimit ?? false,
      coverTextLimit: params?.coverTextLimit ?? false,
      isRegistrationOpen: params?.isRegistrationOpen ?? false,
    },
  });

  return siteSettings;
}
