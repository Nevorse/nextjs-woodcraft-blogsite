import { notFound } from "next/navigation";
import { getAlbumBySlug, getAlbumsByType } from "@/lib/database/album";
import SingleAlbumClient from "@/app/(root)/_components/SingleAlbumClient";
import { AlbumType } from "@/lib/generated/prisma/enums";

export default async function ServiceAlbumPageInner({
  params,
}: {
  params: Promise<{ serviceParam: string }>;
}) {
  const { serviceParam } = await params;

  const serviceData = await getAlbumBySlug(serviceParam);
  const otherAlbumsData = await getAlbumsByType({type: AlbumType.SERVICE_ALBUM});

  if (!serviceData) notFound();

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto my-12">
      <SingleAlbumClient
        albumData={serviceData}
        albumParam={serviceParam}
        otherAlbums={otherAlbumsData}
        pageType="services"
      />
    </div>
  );
}
