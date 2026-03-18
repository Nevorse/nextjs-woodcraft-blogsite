import { notFound } from "next/navigation";
import AdminAlbumsClient from "../_components/AdminAlbumsClient";
import { getAlbumsByType } from "@/lib/database/album";
import { AlbumType } from "@/lib/generated/prisma/enums";


export default async function AdminServicePage() {
;
  const albumsData = await getAlbumsByType(AlbumType.SERVICE_ALBUM);

  if (!albumsData) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          Servislerimiz
        </h1>

        {/* <AdminAlbumsClient albumFolder={albumsData} pageType="projects" /> */}
      </div>
    </div>
  );
}
