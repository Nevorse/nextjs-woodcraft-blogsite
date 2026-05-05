import { getAlbumBySlug } from "@/lib/database/album";
import { getFolderBySlug } from "@/lib/database/albumFolder";
import { notFound } from "next/navigation";
import AdminSingleAlbumClient from "@/app/admin/_components/AdminSingleAlbumClient";
import prisma from "@/lib/prisma";
import { FolderType } from "@/lib/generated/prisma/enums";

export async function generateStaticParams() {
  const projectFolders = await prisma.albumFolder.findMany({
    where: { type: FolderType.PROJECT_FOLDER },
    select: {
      slug: true,
      albums: {
        select: { slug: true },
      },
    },
  });

  return projectFolders.flatMap((folder) =>
    folder.albums.map((album) => ({
      folderParam: folder.slug,
      projectParam: album.slug,
    })),
  );
}

export default async function AdminProjectAlbumPage({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  const { projectParam, folderParam } = await params;

  const [projectData, folderData] = await Promise.all([
    getAlbumBySlug(projectParam),
    getFolderBySlug(folderParam),
  ]);

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
