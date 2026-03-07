import CardComponent from "@/components/ui/cards/CardComponent";
import { sortedProjectsData } from "@/lib/database/dummyDbData";
import { notFound } from "next/navigation";

export default async function ProjectsFolderPage({
  params,
}: {
  params: Promise<{ folderParam: string }>;
}) {
  const { folderParam } = await params;

  // find
  const ProjectFolderData = sortedProjectsData.find(
    (item) => item.folderTitle == decodeURIComponent(folderParam)
  );
  // check
  if (!ProjectFolderData) notFound();
  // sort
  const sortedFolderData = ProjectFolderData.folderData.toSorted(
    (a, b) => b.projectId - a.projectId
  );

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            {ProjectFolderData.folderTitle}
          </h1>
          <h5 className="text-center font-medium tracking-wide pb-6 text-(--color-primary) invisible">
             {""}
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {sortedFolderData.map((project, index) => (
            <CardComponent
              key={index}
              title={project.projectTitle}
              href={`${folderParam}/${project.projectTitle}`}
              image={project.projectImages?.[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
