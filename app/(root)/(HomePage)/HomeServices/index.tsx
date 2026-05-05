import { getAlbumsByType } from "@/lib/database/album";
import HomeServicesSlider from "./HomeServicesSlider";
import { AlbumType } from "@/lib/generated/prisma/enums";
import { getSiteSettings } from "@/lib/database/siteSettings";
import { Suspense } from "react";
import HomeServicesSliderSkeleton from "./HomeServicesSkeleton";

export default async function HomeServices() {
  const siteSettings = await getSiteSettings({ serviceAlbumLimit: true });

  const albumsData = await getAlbumsByType({
    type: AlbumType.SERVICE_ALBUM,
    take: siteSettings?.serviceAlbumLimit,
  });
  
  return (
    <div className="w-full mt-36 pb-10">
      <div className="flex flex-col items-center mb-2">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className="w-36 h-px bg-(--color-primary)"></div>
      </div>
      <Suspense fallback={<HomeServicesSliderSkeleton />}>
        <HomeServicesSlider slideData={albumsData} />
      </Suspense>
    </div>
  );
}
