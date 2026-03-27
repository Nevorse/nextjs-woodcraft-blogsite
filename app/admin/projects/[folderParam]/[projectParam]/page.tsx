import { getAlbumBySlug } from "@/lib/database/album";
import { getFolderBySlug } from "@/lib/database/albumFolder";
import { notFound } from "next/navigation";
import AdminSingleAlbumClient from "@/app/admin/_components/AdminSingleAlbumClient";

export default async function AdminProjectAlbumPage({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  const { projectParam, folderParam } = await params;
  const projectData = await getAlbumBySlug(projectParam);
  const folderData = await getFolderBySlug(folderParam);
  if (!projectData || !folderData) notFound();

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto my-12">

      <AdminSingleAlbumClient
        pageType="projects"
        albumData={projectData}
        albumParam={projectParam}
        otherAlbums={folderData.albums}
      />
    </div>
  );
}
