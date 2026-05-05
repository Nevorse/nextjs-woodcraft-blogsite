import CardComponent from "@/components/ui/cards/CardComponent";
import { getFoldersByType } from "@/lib/database/albumFolder";
import { getSiteSettings } from "@/lib/database/siteSettings";
import { FolderType } from "@/lib/generated/prisma/enums";

export default async function HomeProjects() {
  const siteSettings = await getSiteSettings({ projectAlbumLimit: true });
  const { projectAlbumLimit = 6 } = siteSettings || {};
  const foldersData = await getFoldersByType({
    type: FolderType.PROJECT_FOLDER,
    take: projectAlbumLimit,
  });

  if (!foldersData) return;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 mb-20">
      <div className="flex flex-col items-center">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Projelerimiz
        </div>
        <div className=" w-36 h-px bg-(--color-primary) mb-10" />
      </div>

      <div className="flex w-[92.5%] gap-x-4 gap-y-20 justify-center flex-wrap">
        {foldersData.map((project, index) => (
          <CardComponent
            key={index}
            title={project.title}
            href={`projects/${project.slug}`}
            imagePath={project.folderImage?.uuid}
          />
        ))}
      </div>
    </div>
  );
}
