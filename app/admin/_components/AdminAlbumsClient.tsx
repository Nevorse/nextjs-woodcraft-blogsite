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

type AdminItemData = {
  id: string;
  title: string;
  order: number;
  slug: string;
  images?: { uuid: string }[];
  folderImage?: { uuid: string } | null;
  [key: string]: unknown;
};
type AdminAlbumsClientProps = {
  pageType: "projects" | "services";
  itemsData: AdminItemData[];
} & (
  | { mode: "folder" | "album"; folderId: undefined }
  | { mode: "albumInFolder"; folderId: string }
);
export default function AdminAlbumsClient({
  pageType,
  itemsData = [],
  mode,
  folderId,
}: AdminAlbumsClientProps) {
  const [itemsDataState, setItemsDataState] = useState(itemsData);
  const pathname = usePathname();

  const createNewAlbum = async () => {
    const createAlbum =
      mode === "folder" && pageType === "projects"
        ? createAlbumFolder({ type: pageType, pathToRevalidate: pathname })
        : mode === "albumInFolder"
          ? createAlbumForFolder({ folderId, type: pageType, pathToRevalidate: pathname })
          : mode === "album"
            ? createStandaloneAlbum({ type: pageType, pathToRevalidate: pathname })
            : undefined;
    if (!createAlbum) {
      toast.error("Servisler için klasör özelliği açılmadı");
      return;
    }

    const result = await createAlbum;

    if (result.success) {
      toast.success("Albüm oluşturuldu");
    } else {
      toast.error(result.error);
    }
  };

  const processSave = async () => {
    const updateOrder =
      mode === "folder"
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

  const getImageUuid = (item: AdminItemData, mode: string) => {
    if (mode === "folder") {
      return item.folderImage?.uuid;
    }
    return item.images?.[0]?.uuid;
  };
  return (
    <>
      <SubmitButton
        onClick={createNewAlbum}
        className="bg-(--theme-tertiary)!"
        buttonName="Yeni Albüm Oluştur"
        pendingButtonName="Oluşturuluyor..."
        type="button"
      />

      <SubmitButton
        buttonName="Kaydet"
        pendingButtonName="Kaydediliyor..."
        type="button"
        className={`mt-10`}
        onClick={handleSave}
      />

      <DndSortableGrid
        itemState={itemsDataState}
        setItemState={setItemsDataState}
        initialItems={itemsData}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {itemsDataState.map((item) => (
            <AdminComponentCard
              key={item.id}
              itemId={item.id}
              itemHref={`${pathname}/${item.slug}`}
              itemTitle={item.title}
              imageHref={getImageUuid(item, mode)}
            />
          ))}
        </div>
      </DndSortableGrid>
    </>
  );
}
