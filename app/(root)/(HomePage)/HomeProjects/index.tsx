import CardComponent from "@/components/ui/cards/CardComponent";
import { sortedProjectsData } from "../../projects/page";
import Photo1 from "@/public/images/Photo1.webp";


export default function HomeProjects() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 mb-20">
      <div className="flex flex-col items-center">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Projelerimiz
        </div>
        <div className=" w-36 h-px bg-(--color-primary) mb-10" />
      </div>

      <div className="flex w-[92.5%] gap-x-4 gap-y-20 justify-center flex-wrap">
        {sortedProjectsData?.slice(0, 6).map((project, index) => (
          <CardComponent
            key={index}
            title={project.folderTitle}
            href={`projects/${project.folderTitle}`}
            image={project.folderImage || Photo1.src}
          />
        ))}
      </div>
    </div>
  );
}
