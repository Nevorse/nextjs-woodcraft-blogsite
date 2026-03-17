import CardComponent from "@/components/ui/cards/CardComponent";
import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import Photo1 from "@/public/images/Photo1.webp";
import { notFound } from "next/navigation";

export default async function ProjectsPage() {
  const foldersData = await getFoldersByType(FolderType.PROJECT_FOLDER);

  if (!foldersData) notFound();
  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            Projelerimiz
          </h1>
          <h5 className="text-center font-medium tracking-wide text-(--color-primary)">
            Projelerimize buradan ulaşabilirsiniz.
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {foldersData.map((project, index) => (
            <CardComponent
              key={index}
              title={project.title}
              href={`/projects/${project.slug}`}
              imagePath={project.folderImage?.uuid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
