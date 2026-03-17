import CardComponent from "@/components/ui/cards/CardComponent";
import Photo1 from "@/public/images/Photo1.webp";
import { getFolderBySlug } from "@/lib/database/albumFolder";
import { notFound } from "next/navigation";

export default async function ProjectFolderPage({
  params,
}: {
  params: Promise<{ folderParam: string }>;
}) {
  const { folderParam } = await params;

  const albumFolder = await getFolderBySlug(folderParam);

  if (!albumFolder) notFound();

  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            {albumFolder.title}
          </h1>
          <h5 className="text-center font-medium tracking-wide pb-6 text-(--color-primary) invisible">
            {""}
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {albumFolder.albums.map((project, index) => (
            <CardComponent
              key={index}
              title={project.title}
              href={`/projects/${albumFolder.slug}/${project.slug}`}
              image={project.images[0]?.uuid || Photo1.src}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
