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

        <AdminAlbumsClient
          pageType="projects"
          mode="albumsInFolder"
          itemsData={albumFolder.albums}
          folderId={albumFolder.id}
          thisComponentsImage={albumFolder.folderImage?.uuid}
          folderTitle={albumFolder.title}
        />
      </div>
    </div>
  );
}
