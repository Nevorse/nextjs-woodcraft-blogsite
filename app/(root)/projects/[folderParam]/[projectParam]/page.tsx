import { notFound } from "next/navigation";
import { getAlbumBySlug } from "@/lib/database/album";
import { getFolderBySlug } from "@/lib/database/albumFolder";
import SingleAlbumClient from "@/app/(root)/_components/SingleAlbumClient";

export default async function ProjectAlbumPage({
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
        <SingleAlbumClient
          albumData={projectData}
          albumParam={projectParam}
          otherAlbums={folderData.albums}
          pageType="projects"
        />
      </div>
  );
}
