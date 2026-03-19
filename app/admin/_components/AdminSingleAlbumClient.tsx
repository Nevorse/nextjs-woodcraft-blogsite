"use client";
import { AlbumWithContent, ContentTextValues } from "@/lib/database/album";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/helpers/error-helpers";
import Input from "@/components/ui/form/Input";
import { BreadcrumbItem, BreadcrumbNav } from "@/components/ui/general/BreadcrumbNav";
import { cn, normalize } from "@/lib/utils";
import { isEqual } from "lodash";
import { AlbumUpdateSafeInput, updateAlbumBySlug } from "@/lib/actions/db/album-actions";

type SimpleAlbumData = {
  id: string;
  title: string;
  order: number;
  slug: string;
  images?: { uuid: string }[];
  [key: string]: unknown;
};

type AdminSingleAlbumClientProps = {
  albumData: AlbumWithContent;
  albumParam: string;
  otherAlbums: SimpleAlbumData[];
  folderParam?: string | undefined;
  pageType: "projects" | "services";
};
export default function AdminSingleAlbumClient({
  albumData,
  albumParam,
  otherAlbums = [],
  folderParam,
  pageType,
}: AdminSingleAlbumClientProps) {
  const [albumImagesState, setAlbumImagesState] = useState(albumData.images || []);
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const [titleState, setTitleState] = useState(albumData.title);
  const [contentState, setContentState] = useState<ContentTextValues>(
    albumData.content ?? {},
  );
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const e = textareaRef.current;
    if (!e) return;
    requestAnimationFrame(() => {
      e.style.height = "auto";
      e.style.height = e.scrollHeight + "px";
    });
  }, []);

  useEffect(() => {
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
  }, [albumParam]);

  const processSave = async (
    isTextsModified: boolean,
    isTitleChanged: boolean,
    albumDataToUpdate: AlbumUpdateSafeInput,
    orderChanged: boolean,
  ) => {
    if (orderChanged) {
      const result = await updateImageOrders({
        images: albumImagesState,
      });
      if (!result.success) throw new Error(result.error);
    }
    if (isTextsModified || isTitleChanged) {
      const result = await updateAlbumBySlug({
        slug: albumData.slug,
        data: albumDataToUpdate,
      });
      if (!result.success) throw new Error(result.error);

      return { success: true, newSlug: result.newSlug };
    }
    return { success: true, newSlug: undefined };
  };

  const handleSave = async () => {
    const isTextsModified = !isEqual(
      normalize(contentState),
      normalize(albumData.content ?? {}),
    );
    const isTitleChanged = titleState !== albumData.title;

    const albumDataToUpdate = {
      ...(isTextsModified && {
        content: contentState,
      }),
      ...(isTitleChanged && {
        title: titleState,
      }),
    };

    const orderChanged = hasOrderChanged(albumImagesState, albumData.images);

    const isAnythingChanged = isTextsModified || isTitleChanged || orderChanged;

    if (!isAnythingChanged) {
      toast.error("Değişiklik yapılmadı");
      return;
    }
    try {
      const promise = processSave(
        isTextsModified,
        isTitleChanged,
        albumDataToUpdate,
        orderChanged,
      );
      const res = await toast.promise(promise, {
        loading: "Değişiklikler kaydediliyor...",
        success: "Kaydedildi.",
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });

      if (res.newSlug) router.push(res.newSlug);
      else router.refresh();
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

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: pageType === "projects" ? "Tüm Projeler" : "Tüm Hizmetler",
      href: `/${pageType}`,
    },
  ];
  if (albumData.folder?.title && folderParam) {
    breadcrumbItems.push({
      label: albumData.folder?.title ?? "Klasör",
      href: `/${pageType}/${albumData.folder?.slug}`,
    });
  }
  breadcrumbItems.push({ label: albumData.title ?? "Albüm" });

  return (
    <>
      <div className="flex justify-between gap-12">
        <div className="w-full text-[28px] mb-8 font-semibold tracking-wider">
          <Input
            name="title"
            as="input"
            outlined
            value={titleState}
            onChange={(e) => setTitleState(e.currentTarget.value)}
            className="truncate p-0! border-0! shadow-none!"
          />
        </div>
        <div className="w-1/3">
          <BreadcrumbNav items={breadcrumbItems} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-8 gap-x-6">
        <div className="flex flex-1 flex-col gap-4 xl:w-[80%]">
          <div className="mb-8 transition-all">
            <div className="relative 2xl:h-[75vh] xl:h-[60vh] lg:h-[65vh] md:h-[55vh] sm:h-[45vh] h-[40vh] w-full transition-all shadow-md">
              <Image
                className="object-cover object-center"
                src={getImagePath(albumImagesState[0]?.uuid)}
                alt={albumData.title}
                fill={true}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="text-[18px]">
            <Input
              ref={textareaRef}
              name="content"
              as="textarea"
              placeholder="Content Area"
              rows={3}
              value={contentState["content-1" as keyof ContentTextValues] || ""}
              onChange={(e) => {
                setContentState((prev) => ({
                  ...prev,
                  ["content-1"]: e.target.value,
                }));
              }}
              className={cn(contentState["content-1"] && "border-0 shadow-none")}
            />
          </div>
        </div>

        <div className="relative mb-6 flex-1 lg:max-w-[320px]">
          <div
            ref={scrollContainerRef}
            className="w-full flex flex-col gap-y-1 overflow-y-scroll 
              2xl:max-h-[75vh] xl:max-h-[60vh] lg:max-h-[65vh] md:max-h-[55vh] sm:max-h-[45vh] max-h-[40vh]
              [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-(--theme-tertiary) [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {otherAlbums?.map((item) => {
              const itemHref =
                folderParam
                  ? `/${pageType}/${folderParam}/${item.slug}`
                  : `/${pageType}/${item.slug}`;

              return (
                <SmoothLink
                  key={item.id}
                  href={itemHref} // Ortak alan
                  id={`album-${item.id}`}
                >
                  <div
                    className={`px-4 py-3 max-h-12 truncate transition-all bg-neutral-200 text-(--color-primary) ${
                      item.id == albumData.id
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

      <div className="my-12">
        {/* Ortak alan */}
        <ImageDropzone
          xType={pageType}
          parentId={albumData.id}
          parentFolderId={albumData.folderId ? albumData.folderId : undefined}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <span>
          <span className="underline">Başlığı, içerik yazısını ve resim sırasını</span> değiştirdikten sonra
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
        initialItems={albumData.images}
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
