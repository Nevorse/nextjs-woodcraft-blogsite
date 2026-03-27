import { getAlbumsByType } from "@/lib/database/album";
import HomeServicesSlider from "./HomeServicesSlider";
import { AlbumType } from "@/lib/generated/prisma/enums";

const albumsData = await getAlbumsByType(AlbumType.SERVICE_ALBUM);

export default function HomeServices() {
  return (
    <div className="w-full mt-36 pb-10">
      <div className="flex flex-col items-center mb-2">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className="w-36 h-px bg-(--color-primary)"></div>
      </div>
      <HomeServicesSlider slideData={albumsData} />
    </div>
  );
}
