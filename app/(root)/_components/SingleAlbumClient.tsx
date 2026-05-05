"use client";
import SingleAlbumModal from "@/components/main-layout/modals/SingleAlbumModal";
import { AlbumWithContent, ContentTextValues } from "@/lib/database/album";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SmoothLink from "@/components/ui/general/SmoothLink";
import { getImagePath } from "@/lib/helpers/imageHelpers";
import {
  BreadcrumbNav,
  getAlbumBreadcrumbs,
} from "@/components/ui/general/BreadcrumbNav";
import { AnimatePresence, motion } from "motion/react";

type SimpleAlbumData = {
  id: string;
  title: string;
  order: number;
  slug: string;
  images?: { uuid: string }[];
  [key: string]: unknown;
};
type SingleAlbumClientProps = {
  albumData: AlbumWithContent;
  albumParam: string;
  otherAlbums: SimpleAlbumData[];
  pageType: "projects" | "services";
};

export default function SingleAlbumClient({
  albumData,
  albumParam,
  otherAlbums,
  pageType,
}: SingleAlbumClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!albumData?.id || !scrollContainerRef.current) return;
    // scroll to active element
    const container = scrollContainerRef.current;
    if (container) {
      const targetId = `album-${albumData.id}`;
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
  }, [albumParam, albumData.id]);

  return (
    <>
      <AnimatePresence>
          {albumData.images && albumData.images.length > 0 && selectedIndex !== null && (
            <SingleAlbumModal
              data={albumData.images}
              startIndex={selectedIndex}
              onClose={() => setSelectedIndex(null)}
              alt={albumData.title}
            />
          )}
      </AnimatePresence>

      <div className="flex justify-between">
        <div
          className="w-full text-[28px] mb-8 font-semibold tracking-wider"
          // className="text-[28px] mb-8 font-semibold tracking-wider mr-12 shrink-0"
        >
          <h1>{albumData.title}</h1>
        </div>

        <div className="w-1/3">
          <BreadcrumbNav items={getAlbumBreadcrumbs(albumData)} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-8 gap-x-6">
        <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <div
                onClick={() => setSelectedIndex(0)}
                className="relative 2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full shadow-md cursor-pointer"
              >
                <Image
                  className="object-cover object-center"
                  src={getImagePath(albumData.images[0]?.uuid)}
                  alt={albumData.title}
                  fill={true}
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          </motion.div>

          <div className="text-[18px]">
            <p className="whitespace-pre-wrap overflow-hidden text">
              {albumData.content?.["content-1" as keyof ContentTextValues] || ""}
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
            {otherAlbums.map((item) => {
              const itemHref = albumData.folder?.slug
                ? `/${pageType}/${albumData.folder.slug}/${item.slug}`
                : `/${pageType}/${item.slug}`;

              return (
                <SmoothLink key={item.id} href={itemHref} id={`album-${item.id}`}>
                  <div
                    className={`px-4 py-3 max-h-12 truncate transition-all bg-neutral-200 text-(--color-primary) ${
                      item.id === albumData.id
                        ? "bg-(--theme-quaternary)! text-neutral-200!"
                        : "hover:bg-(--theme-quaternary) hover:text-(--color-secondary) hover:opacity-90"
                    }`}
                  >
                    {item.title}
                  </div>
                </SmoothLink>
              );
            })}
          </div>
        </div>
      </div>

      {albumData.images && albumData.images.length > 1 && (
        <div className="flex flex-wrap justify-center mt-10 gap-3">
          {albumData.images.slice(1).map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index + 1)}
              className="relative cursor-pointer w-full aspect-16/11 max-w-125 hover:scale-[1.02] transition-transform"
            >
              <Image
                src={getImagePath(img.uuid)}
                alt={albumData.title}
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
