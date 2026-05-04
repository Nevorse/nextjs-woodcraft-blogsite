"use client";
import AdminComponentCard from "@/components/ui/admin/AdminComponentCard";
import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { usePathname, useRouter } from "next/navigation";
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
  updateAlbumFolderById,
  updateFolderOrders,
} from "@/lib/actions/db/albumFolder-actions";
import ImageDropzone from "@/components/image-dropzone/ImageDropzone";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import Input from "@/components/ui/form/Input";

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
      folderTitle?: undefined;
    }
  | {
      mode: "albumsInFolder";
      folderId: string;
      thisComponentsImage: string | undefined | null;
      folderTitle: string;
    }
);
export default function AdminAlbumsClient({
  pageType,
  itemsData = [],
  mode,
  folderId,
  thisComponentsImage,
  folderTitle,
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

  const [titleState, setTitleState] = useState(folderTitle);
  const [itemsDataState, setItemsDataState] = useState(processedItems);
  const [openDropzone, setOpenDropzone] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const createNewAlbum = async () => {
    const createAlbum =
      mode === "folders" && pageType === "projects"
        ? createAlbumFolder({ type: pageType})
        : mode === "albumsInFolder"
          ? createAlbumForFolder({ folderId, type: pageType})
          : mode === "albums"
            ? createStandaloneAlbum({ type: pageType })
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

  const processSave = async ({
    isTitleChanged,
    orderChanged,
  }: {
    isTitleChanged: boolean;
    orderChanged: boolean;
  }) => {
    if (orderChanged) {
      const updateOrder =
        mode === "folders"
          ? updateFolderOrders({ folders: itemsDataState })
          : updateAlbumOrders({ albums: itemsDataState});

      const result = await updateOrder;
      if (!result.success) {
        throw new Error(result.error);
      }
    }

    if (isTitleChanged) {
      if (!folderId) return { success: false, error: "ID Okuma Başarısız" };

      const result = await updateAlbumFolderById({
        id: folderId,
        data: { title: titleState },
      });
      if (!result.success) throw new Error(result.error);
      return { success: true, newSlug: result.newSlug };
    }

    return { success: true, newSlug: undefined };
  };

  const handleSave = async () => {
    const isTitleChanged = titleState !== folderTitle;
    const orderChanged = hasOrderChanged(itemsDataState, itemsData);

    const isAnythingChanged = isTitleChanged || orderChanged;
    if (!isAnythingChanged) {
      toast.error("Değişiklik yapılmadı");
      return;
    }
    try {
      const promise = processSave({ isTitleChanged, orderChanged });
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
      <ConfirmDialog />

      {mode === "albumsInFolder" ? (
        <div className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          <span className="invisible block h-0 px-2">{titleState || " "}</span>
          <Input
            name="title"
            as="input"
            focusOutline
            value={titleState}
            onChange={(e) => setTitleState(e.currentTarget.value)}
            className="text-center truncate p-0! border-0! shadow-none!"
          />
        </div>
      ) : (
        <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
          {pageType === "projects" ? "Projelerimiz" : "Hizmetlerimiz"}
        </h1>
      )}

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
            deleteOldImage={
              mode === "albumsInFolder" && thisComponentsImage
                ? handleDeleteOldImage
                : undefined
            }
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
              confirm={confirm}
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
