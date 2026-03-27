import { getAlbumBySlug, getAlbumsByType } from "@/lib/database/album";
import { notFound } from "next/navigation";
import AdminSingleAlbumClient from "@/app/admin/_components/AdminSingleAlbumClient";
import { AlbumType } from "@/lib/generated/prisma/enums";

export default async function AdminServiceAlbumPage({
  params,
}: {
  params: Promise<{ serviceParam: string }>;
}) {
  const { serviceParam } = await params;

  const serviceData = await getAlbumBySlug(serviceParam);
  const otherAlbumsData = await getAlbumsByType(AlbumType.SERVICE_ALBUM);

  if (!serviceData) notFound();

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto my-12">
      <AdminSingleAlbumClient
      pageType="services"
      albumData={serviceData}
      albumParam={serviceParam}
      otherAlbums={otherAlbumsData}
      />
    </div>
  );
}
