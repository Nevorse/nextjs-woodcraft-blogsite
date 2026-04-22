"use client";
import Image from "next/image";
import SmoothLink from "../general/SmoothLink";
import SubmitButton from "../form/SubmitButton";
import { ConfirmDialog } from "../general/ConfirmDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getImagePath } from "@/lib/helpers/imageHelpers";
import { useDndData } from "./DndSortableGrid";
import { deleteAlbumById } from "@/lib/actions/db/album-actions";
import { deleteFolderById } from "@/lib/actions/db/albumFolder-actions";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/error-helpers";

type AdminComponentCardProps = {
  itemId: string;
  itemHref: string;
  itemTitle: string;
  imageHref: string | undefined | null;
  mode: "album" | "folder";
  type: "projects" | "services";
  parentId: string | undefined;
};

export default function AdminComponentCard({
  itemId,
  itemHref,
  itemTitle,
  imageHref,
  mode,
  type,
  parentId,
}: AdminComponentCardProps) {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { activeId } = useDndData();
  const pathname = usePathname();
  const imagePath = getImagePath(imageHref);

  const isAnyDragging = activeId !== null;
  const isThisItemDragging = activeId === itemId;

  const deleteAlbumFromBucket: () => Promise<
    { success: false; error: string } | { success: true }
  > = async () => {
    if (!itemId) {
      return { success: false, error: "ID Bulunamadı" };
    }

    const prefix = parentId ? `${type}/${parentId}/${itemId}` : `${type}/${itemId}`;

    const res = await fetch("/api/worker/albums", {
      method: "DELETE",
      body: JSON.stringify({ prefix }),
    });

    const responseData = await res.json();

    if (!res.ok) {
      return { success: false, error: "Bilinmeyen Hata" };
    }

    if (!responseData.success) {
      return responseData;
    }

    return {
      success: true,
    };
  };

  const processDelete = async () => {
    const bucketResult = await deleteAlbumFromBucket();
    if (!bucketResult.success) {
      throw new Error(bucketResult.error);
    }

    const deleteAlbum =
      mode === "album"
        ? deleteAlbumById({ id: itemId, pathToRevalidate: pathname })
        : mode === "folder"
          ? deleteFolderById({ id: itemId, pathToRevalidate: pathname })
          : null;

    if (!deleteAlbum) {
      throw new Error("Geçersiz mod");
    }

    const dbResult = await deleteAlbum;
    if (!dbResult.success) {
      throw new Error(dbResult.error);
    }

    return { success: true, title: dbResult.title };
  };

  const handleDeleteClick = async () => {
    try {
      setIsPending(true);
      await toast.promise(processDelete(), {
        loading: mode === "album" ? "Albüm Siliniyor..." : "Klasör Siliniyor...",
        success: (data) =>
          mode === "album"
            ? `Albüm "${data.title}" başarıyla silindi.`
            : `Klasör "${data.title}" başarıyla silindi.`,
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      console.error(error, errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: itemId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
      className={cn(
        "flex flex-col gap-3 2xl:w-[450px] w-[350px]",
        isThisItemDragging ? "opacity-50 scale-95" : "",
      )}
    >
      <div {...listeners} className="group relative">
        <Image
          className="w-full 2xl:h-[380px] h-[300px] object-center object-cover"
          alt={itemTitle}
          src={imagePath}
          width={450}
          height={380}
          draggable={false}
        />

        {/* Status overlay */}
        {errorMessage && (
          <div className="absolute inset-0 bg-red-500/40 flex items-center justify-center">
            <span className="text-white font-medium overflow-hidden">
              {errorMessage || "Hata oluştu"}
            </span>
          </div>
        )}

        {!isAnyDragging && (
          <div
            className={cn(
              "flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              isPending ? "opacity-100" : "",
            )}
          >
            <ConfirmDialog // !!!
              onConfirm={handleDeleteClick}
              description={`Klasörün içerisindeki bütün albümler ve resimler kalıcı olarak silinecek.\n Bu işlem geri alınamaz.`}
            >
              <SubmitButton
                buttonName="Klasörü Sil"
                pendingButtonName="Klasör Siliniyor..."
                type="button"
                className={"bg-orange-700 hover:opacity-95! cursor-pointer"}
                isSubmitting={isPending}
              />
            </ConfirmDialog>
          </div>
        )}
      </div>

      <div className="text-2xl my-l overflow-hidden text-(--color-primary)">
        {!isAnyDragging ? (
          <SmoothLink href={itemHref} draggable={false}>
            <h1 className="truncate text-left w-fit inline-block underline underline-offset-4 decoration-(--theme-tertiary) decoration-1">
              {itemTitle}
            </h1>
          </SmoothLink>
        ) : (
          <h1 className="truncate text-left w-fit inline-block underline underline-offset-4 decoration-(--theme-tertiary) decoration-1">
            {itemTitle}
          </h1>
        )}
      </div>
    </div>
  );
}
