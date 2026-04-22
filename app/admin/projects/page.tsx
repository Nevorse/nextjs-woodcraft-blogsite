import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";
import AdminAlbumsClient from "../_components/AdminAlbumsClient";

export default async function AdminProjectsPage() {
  const foldersData = await getFoldersByType(FolderType.PROJECT_FOLDER);

  if (!foldersData) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          Projelerimiz
        </h1>

        <AdminAlbumsClient
          pageType="projects"
          itemsData={foldersData}
          mode="folders"
          folderId={undefined}
        />
      </div>
    </div>
  );
}
