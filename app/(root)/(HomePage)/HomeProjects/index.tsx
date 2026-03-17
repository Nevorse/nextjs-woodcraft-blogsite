import CardComponent from "@/components/ui/cards/CardComponent";
import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import { getImagePath } from "@/lib/helpers/imageHelpers";

export default async function HomeProjects() {
  const foldersData = await getFoldersByType(FolderType.PROJECT_FOLDER);

  if (!foldersData) return;

  console.log(foldersData)

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 mb-20">
      <div className="flex flex-col items-center">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Projelerimiz
        </div>
        <div className=" w-36 h-px bg-(--color-primary) mb-10" />
      </div>

      <div className="flex w-[92.5%] gap-x-4 gap-y-20 justify-center flex-wrap">
        {foldersData.slice(0, 6).map((project, index) => (
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
