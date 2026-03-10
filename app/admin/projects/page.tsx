import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import ProjectFolderClient from "./ProjectFolderClient";

export default async function AdminProjectAlbumsPage() {
  const albumFolders = await getFoldersByType(FolderType.PROJECT_FOLDER);

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          Projelerimiz
        </h1>

        <ProjectFolderClient albumFolders={albumFolders} />
      </div>
    </div>
  );
}
