"use client";
import AdminComponentCard from "@/components/ui/admin/AdminComponentCard";
import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  createAlbumForFolder,
  createStandaloneAlbum,
  updateAlbumOrders,
} from "@/lib/actions/db/album-actions";
import toast from "react-hot-toast";
import { hasOrderChanged } from "@/lib/helpers/albumHelpers";
import { getErrorMessage } from "@/lib/helpers/error-helpers";
import {
  createAlbumFolder,
  updateFolderOrders,
} from "@/lib/actions/db/albumFolder-actions";
import ImageDropzone from "@/components/image-dropzone/ImageDropzone";

type AdminItemData = {
  id: string;
  title: string;
  order: number;
  slug: string;
  computedImageHref?: string | undefined | null;
  images?: { uuid: string }[];
  folderImage?: { uuid: string } | null;
  [key: string]: unknown;
};
type AdminAlbumsClientProps = {
  pageType: "projects" | "services";
  itemsData: AdminItemData[];
} & (
  | {
      mode: "folders" | "albums";
      folderId?: undefined;
      thisComponentsImage?: undefined;
    }
  | {
      mode: "albumsInFolder";
      folderId: string;
      thisComponentsImage: string | undefined | null;
    }
);
export default function AdminAlbumsClient({
  pageType,
  itemsData = [],
  mode,
  folderId,
  thisComponentsImage,
}: AdminAlbumsClientProps) {
  const getImageUuid = (item: AdminItemData, mode: string) => {
    if (mode === "folders") {
      return item.folderImage?.uuid;
    }
    return item.images?.[0]?.uuid;
  };
  const processedItems = itemsData.map((item) => ({
    ...item,
    computedImageHref: getImageUuid(item, mode),
  }));

  const [itemsDataState, setItemsDataState] = useState(processedItems);
  const [openDropzone, setOpenDropzone] = useState(false);
  const pathname = usePathname();

  const createNewAlbum = async () => {
    const createAlbum =
      mode === "folders" && pageType === "projects"
        ? createAlbumFolder({ type: pageType, pathToRevalidate: pathname })
        : mode === "albumsInFolder"
          ? createAlbumForFolder({ folderId, type: pageType, pathToRevalidate: pathname })
          : mode === "albums"
            ? createStandaloneAlbum({ type: pageType, pathToRevalidate: pathname })
            : undefined;
    if (!createAlbum) {
      toast.error("Servisler için klasör özelliği açılmadı");
      return;
    }

    const result = await createAlbum;

    if (result.success) {
      toast.success(`${mode === "folders" ? "Klasör" : "Albüm"} oluşturuldu`);
    } else {
      toast.error(result.error);
    }
  };

  const processSave = async () => {
    const updateOrder =
      mode === "folders"
        ? updateFolderOrders({ folders: itemsDataState, pathToRevalidate: pathname })
        : updateAlbumOrders({ albums: itemsDataState, pathToRevalidate: pathname });

    const result = await updateOrder;

    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  };

  const handleSave = async () => {
    const orderChanged = hasOrderChanged(itemsDataState, itemsData);
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

  const handleDeleteOldImage: () => Promise<
    { success: false; error: string } | { success: true }
  > = async () => {
    if (!thisComponentsImage) {
      return { success: false, error: "Silinecek eski resim bulunamadı" };
    }
    const res = await fetch("/api/worker/images", {
      method: "DELETE",
      body: JSON.stringify({ files: [thisComponentsImage] }),
    });
    
    const responseData = await res.json();

    if (!res.ok) {
      return { success: false, error: responseData.files[0]?.error || "Bilinmeyen Hata" };
    }

    if (!responseData.success) {
      return responseData;
    }
    return {
      success: true,
    };
  };

  return (
    <>
      <div className="flex gap-10">
        <SubmitButton
          onClick={createNewAlbum}
          className="bg-(--theme-tertiary)!"
          buttonName={`Yeni ${mode === "folders" ? "Klasör" : "Albüm"} Oluştur`}
          pendingButtonName="Oluşturuluyor..."
          type="button"
        />

        {mode === "albumsInFolder" && (
          <SubmitButton
            onClick={() => setOpenDropzone((p) => !p)}
            className="bg-(--theme-tertiary)"
            buttonName={`Klasör Resmi${thisComponentsImage ? "ni Değiştir" : " Ekle"}`}
            type="button"
          />
        )}
      </div>

      {/* framer-motion kullan */}
      {openDropzone && (
        <div className="mt-8">
          <ImageDropzone
            parentId={folderId}
            xType="projects"
            isMultiple={false}
            isFolderImage={mode === "albumsInFolder" ? true : false}
            deleteOldImage={mode === "albumsInFolder" && thisComponentsImage ? handleDeleteOldImage : undefined}
          />
        </div>
      )}

      <SubmitButton
        buttonName="Kaydet"
        pendingButtonName="Kaydediliyor..."
        type="button"
        className={`mt-8`}
        onClick={handleSave}
      />

      <DndSortableGrid
        itemState={itemsDataState}
        setItemState={setItemsDataState}
        initialItems={processedItems}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {itemsDataState.map((item) => (
            <AdminComponentCard
              key={item.id}
              itemId={item.id}
              itemHref={`${pathname}/${item.slug}`}
              itemTitle={item.title}
              imageHref={item.computedImageHref}
              mode={mode === "folders" ? "folder" : "album"}
              type={pageType}
              parentId={folderId}
            />
          ))}
        </div>
      </DndSortableGrid>
    </>
  );
}
