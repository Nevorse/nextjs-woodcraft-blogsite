"use client";
import AdminComponentCard from "@/components/ui/admin/AdminComponentCard";
import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import SubmitButton from "@/components/ui/form/SubmitButton";
import Photo1 from "@/public/images/Photo1.webp";
import { FolderWithAlbumsType } from "@/lib/database/albumFolder";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createAlbumForFolder, updateAlbumOrders } from "@/lib/actions/db/album-actions";
import toast from "react-hot-toast";
import { hasOrderChanged } from "@/lib/helpers/albumHelpers";
import { getErrorMessage } from "@/lib/helpers/error-helpers";

type ProjectFolderClientProps = {
  albumFolder: FolderWithAlbumsType;
};
export default function AdminProjectFolderClient({
  albumFolder,
}: ProjectFolderClientProps) {
  const [albumsDataState, setAlbumsDataState] = useState(albumFolder.albums ?? []);
  const pathname = usePathname();

  const createNewAlbum = async () => {
    const result = await createAlbumForFolder({
      folderId: albumFolder.id,
      type: "project",
      pathToRevalidate: pathname,
      isPublished: false,
    });
    if (result.success) {
      toast.success("Albüm Klasörü oluşturuldu");
    } else {
      toast.error(result.error);
    }
  };

  const processSave = async () => {
    const result = await updateAlbumOrders({
      albums: albumsDataState,
      pathToRevalidate: pathname,
    });
    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  };

  const handleSave = async () => {
    const orderChanged = hasOrderChanged(albumsDataState, albumFolder.albums);
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
        itemState={albumsDataState}
        setItemState={setAlbumsDataState}
        initialItems={albumFolder.albums}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {albumsDataState.map((album) => (
            <AdminComponentCard
              key={album.id}
              itemId={album.id}
              imageHref={album.images[0]?.uuid || Photo1.src}
              itemTitle={album.title}
              itemHref={`/projects/${albumFolder.slug}/${album.slug}`}
            />
          ))}
        </div>
      </DndSortableGrid>
    </>
  );
}
