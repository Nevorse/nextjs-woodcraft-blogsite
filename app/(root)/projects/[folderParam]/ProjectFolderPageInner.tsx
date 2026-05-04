import { getFolderBySlug } from "@/lib/database/albumFolder";
import { notFound } from "next/navigation";
import MotionWrapper from "../../_components/MotionWrapper";
import AlbumsClient from "../../_components/AlbumsClient";

export default async function ProjectFolderPageInner({
  params,
}: {
  params: Promise<{ folderParam: string }>;
}) {
  const { folderParam } = await params;

  const albumFolder = await getFolderBySlug(folderParam);

  if (!albumFolder) notFound();

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
              {albumFolder.title}
            </h1>
            <h5 className="text-center font-medium tracking-wide pb-6 text-(--color-primary) invisible">
              {""}
            </h5>
          </div>

          <AlbumsClient itemsData={albumFolder.albums} mode="albumsInFolder" />
          {/* <MotionWrapper initial="hidden" animate="visible" variants={containerAnimation}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
              {albumFolder.albums.map((project) => (
                <MotionWrapper variants={itemAnimation} key={project.id}>
                  <CardComponent
                    title={project.title}
                    href={`/projects/${albumFolder.slug}/${project.slug}`}
                    imagePath={project.images[0]?.uuid}
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
