"use client";
import AdminComponentCard from "@/components/ui/admin/AdminComponentCard";
import DndSortableGrid from "@/components/ui/admin/DndSortableGrid";
import SubmitButton from "@/components/ui/form/SubmitButton";
import {
  createAlbumFolder,
  updateFolderOrders,
} from "@/lib/actions/db/albumFolder-actions";
import { AlbumFolderType } from "@/lib/database/albumFolder";
import { hasOrderChanged } from "@/lib/helpers/albumHelpers";
import { getErrorMessage } from "@/lib/helpers/error-helpers";
import Photo1 from "@/public/images/Photo1.webp";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type AdminProjectsClientProps = {
  foldersData: AlbumFolderType[];
};

export default function AdminProjectsClient({
  foldersData = [],
}: AdminProjectsClientProps) {
  const [foldersDataState, setFoldersDataState] = useState(foldersData);
  // const [folderErrors, setFolderErrors] = useState<Record<string, string>>({});
  const pathname = usePathname();

  const createNewFolder = async () => {
    const result = await createAlbumFolder({
      type: "project",
      pathToRevalidate: pathname,
    });
    if (result.success) {
      toast.success("Albüm Klasörü oluşturuldu");
    } else {
      toast.error(result.error);
    }
  };

  const processSave = async () => {
    const result = await updateFolderOrders({
      folders: foldersDataState,
      pathToRevalidate: pathname,
    });
    if (!result.success) {
      throw new Error(result.error);
    }
    return result;
  };

  const handleSave = async () => {
    const orderChanged = hasOrderChanged(foldersDataState, foldersData);

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
        onClick={createNewFolder}
        className="bg-(--theme-tertiary)!"
        buttonName="Yeni Klasör Oluştur"
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
        itemState={foldersDataState}
        setItemState={setFoldersDataState}
        initialItems={foldersData}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {foldersDataState.map((folder) => (
            <AdminComponentCard
              key={folder.id}
              itemId={folder.id}
              itemHref={`/projects/${folder.slug}`}
              itemTitle={folder.title}
              imageHref={folder.folderImage?.uuid || Photo1.src}
            />
          ))}
        </div>
      </DndSortableGrid>
    </>
  );
}
