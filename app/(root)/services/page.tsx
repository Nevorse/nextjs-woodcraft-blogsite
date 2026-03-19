import CardComponent from "@/components/ui/cards/CardComponent";
import { getAlbumsByType } from "@/lib/database/album";
import { AlbumType } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";

export default async function ServicesPage() {
  const albumsData = await getAlbumsByType(AlbumType.SERVICE_ALBUM);

  if (!albumsData) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            Hizmetlerimiz
          </h1>
          <h5 className="text-center font-medium tracking-wide text-(--color-primary)">
            Hizmetlerimize buradan ulaşabilirsiniz
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {albumsData.map((service, index) => (
            <CardComponent
              key={index}
              title={service.title}
              href={`/services/${service.slug}`}
              imagePath={service.images[0]?.uuid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
