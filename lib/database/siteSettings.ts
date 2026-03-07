import prisma from "@/lib/prisma";

type GetSiteSettingsParams = {
  serviceAlbumLimit?: boolean;
  projectAlbumLimit?: boolean;
  coverImageLimit?: boolean;
  coverTextLimit?: boolean;
  isRegistrationOpen?: boolean;
};

export function getSiteSettings(params?: GetSiteSettingsParams) {
  return prisma.siteSettings.findUnique({
    where: { id: "SITE_SETTINGS_ID" },
    select: {
      serviceAlbumLimit: params?.serviceAlbumLimit ?? false,
      projectAlbumLimit: params?.projectAlbumLimit ?? false,
      coverImageLimit: params?.coverImageLimit ?? false,
      coverTextLimit: params?.coverTextLimit ?? false,
      isRegistrationOpen: params?.isRegistrationOpen ?? false,
    },
  });
}