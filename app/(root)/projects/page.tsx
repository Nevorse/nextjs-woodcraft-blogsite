import { getFoldersByType } from "@/lib/database/albumFolder";
import { FolderType } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";
import MotionWrapper from "../_components/MotionWrapper";
import AlbumsClient from "../_components/AlbumsClient";

export default async function ProjectsPage() {
  const foldersData = await getFoldersByType({ type: FolderType.PROJECT_FOLDER });

  if (!foldersData) notFound();

  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
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

          <AlbumsClient itemsData={foldersData} mode="folders" />
          {/* <MotionWrapper initial="hidden" animate="visible" variants={containerAnimation}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
              {foldersData.map((project) => (
                <MotionWrapper variants={itemAnimation} key={project.id}>
                  <CardComponent
                    title={project.title}
                    href={`/projects/${project.slug}`}
                    imagePath={project.folderImage?.uuid}
                  />
                </MotionWrapper>
              ))}
            </div>
          </MotionWrapper> */}
        </div>
      </div>
    </MotionWrapper>
  );
}
