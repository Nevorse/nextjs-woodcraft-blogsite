import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";
import AdminAlbumsClient from "../_components/AdminAlbumsClient";

export default async function AdminProjectsPage() {
  const foldersData = await getFoldersByType({type: FolderType.PROJECT_FOLDER});

  if (!foldersData) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center">

        <AdminAlbumsClient
          pageType="projects"
          mode="folders"
          itemsData={foldersData}
        />
      </div>
    </div>
  );
}
