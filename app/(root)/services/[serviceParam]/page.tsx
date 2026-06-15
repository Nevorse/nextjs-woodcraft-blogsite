import { notFound } from "next/navigation";
import { getAlbumBySlug, getAlbumsByType } from "@/lib/database/album";
import SingleAlbumClient from "@/app/(root)/_components/SingleAlbumClient";
import { AlbumType } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";

export async function generateStaticParams() {
  const albums = await prisma.album.findMany({
    where: { type: AlbumType.SERVICE_ALBUM },
    select: { slug: true },
  });

  return albums.map((album) => ({
    serviceParam: album.slug,
  }));
}

export default async function ServiceAlbumPage({
  params,
}: {
  params: Promise<{ serviceParam: string }>;
}) {
  const { serviceParam } = await params;

  const [serviceData, otherAlbumsData] = await Promise.all([
    getAlbumBySlug(serviceParam),
    getAlbumsByType({ type: AlbumType.SERVICE_ALBUM }),
  ]);

  if (!serviceData) notFound();

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto mb-12 mt-6">
      <SingleAlbumClient
        albumData={serviceData}
        albumParam={serviceParam}
        otherAlbums={otherAlbumsData}
        pageType="services"
      />
    </div>
  );
}
