"use client";
import { AlbumWithRelations } from "@/lib/database/album";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FolderWithAlbumsType } from "@/lib/database/albumFolder";
import SmoothLink from "@/components/ui/general/SmoothLink";
import ImageDropzone from "@/components/image-dropzone/ImageDropzone";
import { getImagePath, restoreItemInOrder } from "@/lib/helpers/imageHelpers";
import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import AdminImageCard, { ImageCardType } from "@/components/ui/admin/AdminImageCard";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { hasOrderChanged } from "@/lib/helpers/albumHelpers";
import toast from "react-hot-toast";
import { updateImageOrders } from "@/lib/actions/db/image-actions";
import { usePathname } from "next/navigation";
import { getErrorMessage } from "@/lib/helpers/error-helpers";

type ProjectAlbumClientProps = {
  projectData: AlbumWithRelations;
  folderData: FolderWithAlbumsType;
  projectParam: string;
};
export default function AdminProjectAlbumClient({
  projectData,
  folderData,
  projectParam,
}: ProjectAlbumClientProps) {
  const [albumImagesState, setAlbumImagesState] = useState(projectData.images || []);
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

  const processSave = async () => {
    const result = await updateImageOrders({
      images: albumImagesState,
      pathToRevalidate: pathname,
    });
    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  };
  const handleSave = async () => {
    const orderChanged = hasOrderChanged(albumImagesState, projectData.images);
    if (!orderChanged) {
      toast.error("Değişiklik yapılmadı");
      return;
    }
    try {
      const promise = processSave();
      await toast.promise(promise, {
        loading: "Değişiklikler kaydediliyor...",
        success: "Kaydedildi.",
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(error, errorMessage);
    }
  };
  const handleOptimisticDeleteImage = (deletedImage: ImageCardType) => {
    setAlbumImagesState((prev) => prev.filter((item) => item.id !== deletedImage.id));
    // Restore function
    return (errorMessage: string) => {
      setAlbumImagesState((prev) => restoreItemInOrder(prev, deletedImage));
      setImageErrors((prev) => ({ ...prev, [deletedImage.id]: errorMessage }));
    };
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-y-8 gap-x-6">
        <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
          <div className="mb-8 transition-all">
            <div className="relative 2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full transition-all shadow-md">
              <Image
                className="object-cover object-center"
                src={getImagePath(albumImagesState[0]?.uuid)}
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

      <ImageDropzone xType="projects" parentId={projectData.id} />

      <div className="flex flex-col justify-center items-center mt-10">
        <span>
          <span className="underline">Resim sırasını</span> değiştirdikten sonra
          kaydediniz.
        </span>

        <SubmitButton
          buttonName="Kaydet"
          pendingButtonName="Kaydediliyor..."
          type="button"
          className={`mt-6`}
          onClick={handleSave}
        />
      </div>

      <DndSortableGrid
        itemState={albumImagesState}
        setItemState={setAlbumImagesState}
        initialItems={projectData.images}
      >
        <div className="flex flex-wrap justify-center mt-12 gap-3">
          {albumImagesState.map((itemData, index) => (
            <AdminImageCard
              key={`${itemData.id}`}
              itemData={itemData}
              onDelete={handleOptimisticDeleteImage}
              errorMessage={imageErrors[itemData.id]}
              isPrimaryImage={index === 0}
            />
          ))}
        </div>
      </DndSortableGrid>
    </>
  );
}
