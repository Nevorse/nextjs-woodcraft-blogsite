"use client";
import { use, useState, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Photo1 from "@/public/images/Photo1.webp";
import SmoothLink from "@/components/ui/general/SmoothLink";
import { BreadcrumbNav } from "@/components/ui/general/BreadcrumbNav";
import SingleAlbumModal from "@/components/main-layout/modals/SingleAlbumModal";
import { sortedProjectsData } from "@/lib/database/dummyDbData";

export default function SingleProjectAlbum({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  const { projectParam, folderParam } = use(params);
  // find folder data
  const ProjectFolderData = sortedProjectsData.find(
    (item) => item.folderTitle == decodeURIComponent(folderParam)
  );
  // check folder data
  if (!ProjectFolderData) notFound();
  // sort folder data
  const sortedFolderData = ProjectFolderData.folderData.toSorted(
    (a, b) => b.projectId - a.projectId
  );
  // find project data
  const projectData = sortedFolderData.find(
    (item) => item.projectTitle == decodeURIComponent(projectParam)
  );
  // check project data
  if (!projectData) notFound();
  // convert to array object
  const projectImagesArray = projectData.projectImages?.map((img, index) => ({
    image: img,
    id: index,
  }));
  ////////////////////
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to active element
    const container = scrollContainerRef.current;
    if (container) {
      const targetId = `project-${projectData?.projectId}`;
      requestAnimationFrame(() => {
        const activeElement = container?.querySelector(
          `#${targetId}`
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
      {projectImagesArray &&
        projectImagesArray.length > 0 &&
        selectedIndex !== null && (
          <SingleAlbumModal
            data={projectImagesArray}
            startIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            alt={projectData.projectTitle}
          />
        )}
      <div className="max-w-[92%] min-h-[90vh] mx-auto my-12">
        <div className="flex justify-between">
          <div className="text-[28px] mb-8 font-semibold tracking-wider mr-12 shrink-0">
            <h1>{projectData.projectTitle}</h1>
          </div>

          <BreadcrumbNav
            items={[
              { label: "Tüm Projeler", href: "/projects" },
              {
                label: ProjectFolderData.folderTitle,
                href: `/projects/${folderParam}`,
              },
              { label: projectData.projectTitle },
            ]}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-y-8 gap-x-6">
          <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
            <div className="mb-8 transition-all">
              <div
                onClick={() => setSelectedIndex(0)}
                className="relative 2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full transition-all shadow-md cursor-pointer"
              >
                <Image
                  className="object-cover object-center"
                  src={projectData.projectImages?.[0] || Photo1.src}
                  alt={projectData.projectTitle}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="text-[18px]">
              <p className="whitespace-pre-wrap overflow-hidden text">
                {projectData.projectContent}
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
              {sortedFolderData?.map((data, index) => (
                <SmoothLink
                  key={index + "-" + data.projectId}
                  href={`/projects/${ProjectFolderData.folderTitle}/${data.projectTitle}`}
                  id={`project-${data.projectId}`}
                >
                  <div
                    className={`px-4 py-3 max-h-12 truncate transition-all bg-neutral-200 text-(--color-primary) ${
                      data.projectId == projectData.projectId
                        ? "bg-(--theme-quaternary)! text-neutral-200!"
                        : "hover:bg-(--theme-quaternary) hover:text-(--color-secondary) hover:opacity-90"
                    }`}
                  >
                    {data.projectTitle}
                  </div>
                </SmoothLink>
              ))}
            </div>
          </div>
        </div>

        {projectData.projectImages && projectData.projectImages.length > 1 && (
          <div className="flex flex-wrap justify-center mt-10 gap-3">
            {projectData.projectImages.slice(1).map((e, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index + 1)}
                className="relative cursor-pointer w-full aspect-16/11 max-w-[500px] hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={e}
                  alt={projectData.projectTitle}
                  className="object-cover object-center shadow-lg hover:shadow-2xl transition-shadow"
                  fill={true}
                  sizes="(max-width: 500px) 100vw, 500px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
