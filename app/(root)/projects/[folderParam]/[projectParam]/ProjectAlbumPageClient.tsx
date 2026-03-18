"use client";
import SingleAlbumModal from "@/components/main-layout/modals/SingleAlbumModal";
import { AlbumWithContent } from "@/lib/database/album";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FolderWithAlbumsType } from "@/lib/database/albumFolder";
import SmoothLink from "@/components/ui/general/SmoothLink";
import { getImagePath } from "@/lib/helpers/imageHelpers";

type ProjectAlbumClientProps = {
  projectData: AlbumWithContent;
  folderData: FolderWithAlbumsType;
  projectParam: string;
};
export default function ProjectAlbumPageClient({
  projectData,
  folderData,
  projectParam,
}: ProjectAlbumClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to active element
    const container = scrollContainerRef.current;
    if (container) {
      const targetId = `project-${projectData.id}`;
      requestAnimationFrame(() => {
        const activeElement = container?.querySelector(
          `#${targetId}`,
        ) as HTMLElement | null;
        if (activeElement) {
          const elementOffsetTop = activeElement.offsetTop;
          const containerHeight = container.offsetHeight;
          const elementHeight = activeElement.offsetHeight;
          const scrollPosition =
            elementOffsetTop - containerHeight / 2 + elementHeight / 2;
          container.scrollTo({ top: scrollPosition, behavior: "smooth" });
        }
      });
    }
  }, [projectParam]);

  return (
    <>
      {projectData.images && projectData.images.length > 0 && selectedIndex !== null && (
        <SingleAlbumModal
          data={projectData.images}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          alt={projectData.title}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-y-8 gap-x-6">
        <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
          <div className="mb-8 transition-all">
            <div
              onClick={() => setSelectedIndex(0)}
              className="relative 2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full transition-all shadow-md cursor-pointer"
            >
              <Image
                className="object-cover object-center"
                src={getImagePath(projectData.images[0]?.uuid)}
                alt={projectData.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="text-[18px]">
            <p className="whitespace-pre-wrap overflow-hidden text">
              {"-------Content-------"}
            </p>
          </div>
        </div>

        <div className="relative mb-6 flex-1 lg:max-w-[320px]">
          <div
            ref={scrollContainerRef}
            className="w-full flex flex-col gap-y-1 overflow-y-scroll 
              2xl:max-h-[75vh] xl:max-h-[60vh] lg:max-h-[65vh] md:max-h-[55vh] sm:max-h-[45vh] max-h-[40vh]
              [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--theme-tertiary) [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {folderData.albums?.map((data, index) => (
              <SmoothLink
                key={index + "-" + data.id}
                href={`/projects/${folderData.slug}/${data.slug}`}
                id={`project-${data.id}`}
              >
                <div
                  className={`px-4 py-3 max-h-12 truncate transition-all bg-neutral-200 text-(--color-primary) ${
                    data.id == projectData.id
                      ? "bg-(--theme-quaternary)! text-neutral-200!"
                      : "hover:bg-(--theme-quaternary) hover:text-(--color-secondary) hover:opacity-90"
                  }`}
                >
                  {data.title}
                </div>
              </SmoothLink>
            ))}
          </div>
        </div>
      </div>

      {projectData.images && projectData.images.length > 1 && (
        <div className="flex flex-wrap justify-center mt-10 gap-3">
          {projectData.images.slice(1).map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index + 1)}
              className="relative cursor-pointer w-full aspect-16/11 max-w-[500px] hover:scale-[1.02] transition-transform"
            >
              <Image
                src={getImagePath(img.uuid)}
                alt={projectData.title}
                className="object-cover object-center shadow-lg hover:shadow-2xl transition-shadow"
                fill={true}
                sizes="(max-width: 500px) 100vw, 500px"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
