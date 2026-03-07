import CardComponent from "@/components/ui/cards/CardComponent";
import { sortedProjectsData } from "@/lib/database/dummyDbData";


export default function ProjectsPage() {
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
          {sortedProjectsData.map((project, index) => (
            <CardComponent
              key={index}
              title={project.folderTitle}
              href={`/projects/${project.folderTitle}`}
              image={project.folderImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
