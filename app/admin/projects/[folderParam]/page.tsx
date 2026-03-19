import { getFolderBySlug } from "@/lib/database/albumFolder";
import { notFound } from "next/navigation";
import AdminAlbumsClient from "../../_components/AdminAlbumsClient";

export default async function AdminProjectFolderPage({
  params,
}: {
  params: Promise<{ folderParam: string }>;
}) {
  const { folderParam } = await params;

  const albumFolder = await getFolderBySlug(folderParam);

  if (!albumFolder) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          {albumFolder.title}
        </h1>

        <AdminAlbumsClient
          pageType="projects"
          itemsData={albumFolder.albums}
          mode="albumInFolder"
          folderId={albumFolder.id}
        />
      </div>
    </div>
  );
}
