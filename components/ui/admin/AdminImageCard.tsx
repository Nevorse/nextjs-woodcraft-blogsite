"use client";
import { getImagePath } from "@/lib/helpers/imageHelpers";
import Image from "next/image";
import SubmitButton from "../form/SubmitButton";
import { WorkerResponse } from "@/lib/types/worker";
import { removeImagesFromAlbum } from "@/lib/actions/db/image-actions";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

export type ImageCardType = {
  id: string;
  uuid: string;
  order: number;
};
type AdminImageCardProps = {
  itemData: ImageCardType;
  onDelete?: (deletedImage: ImageCardType) => (errorMessage: string) => void;
  errorMessage?: string | undefined;
};

export default function AdminImageCard({
  itemData,
  onDelete,
  errorMessage,
}: AdminImageCardProps) {
  // const [isError, setIsError] = useState("");
  const pathname = usePathname();

  const deleteImageFromBucket: () => Promise<
    | { success: false; error: string }
    | { success: true; successPaths: string[]; total: number }
  > = async () => {
    const fileToDelete = [itemData.uuid];
    if (!fileToDelete) {
      return { success: false, error: "UUID Bulunamadı" };
    }

    const res = await fetch("/api/worker/images", {
      method: "DELETE",
      body: JSON.stringify({ files: fileToDelete }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error };
    }
    const responseData = data as WorkerResponse;
    if (!responseData.success) {
      return responseData;
    }

    // const filePaths = responseData.files.flatMap((f) => (f.ok ? [f.data.file] : []));

    return {
      success: true,
      successPaths: responseData.successPaths,
      total: responseData.files.length,
    };
  };

  const processDelete = async () => {
    const bucketResult = await deleteImageFromBucket();
    if (!bucketResult.success) {
      throw new Error(bucketResult.error);
    }
    const dbResult = await removeImagesFromAlbum(bucketResult.successPaths, pathname);
    if (!dbResult.success) {
      throw new Error(dbResult.error);
    }

    const failedCount = bucketResult.total - dbResult.count;
    return { successCount: dbResult.count, failedCount };
  };

  const handleDeleteClick = async () => {
    const restore = onDelete?.(itemData); // Optimistic
    try {
      await toast.promise(processDelete(), {
        loading: "Resimler Siliniyor...",
        success: (data) =>
          data.failedCount > 0
            ? `${data.successCount} resim başarıyla silindi (${data.failedCount} Başarısız!).`
            : `${data.successCount} resim başarıyla silindi.`,
        error: (err) => `Bir hata oluştu: ${err.message}`,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen Hata";
      restore?.(errorMessage);
      // setIsError(errorMessage);
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: itemData.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group relative cursor-pointer w-full aspect-16/11 max-w-125 ",
        isDragging ? "opacity-50 scale-95" : "",
      )}
    >
      <Image
        src={getImagePath(itemData.uuid)}
        alt={`cover-image-${itemData.order}`}
        className="object-cover object-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all"
        fill={true}
        sizes="(max-width: 500px) 100vw, 500px"
        draggable={false}
      />
      {/* Status overlay */}
      {errorMessage && (
        <div className=" absolute inset-0 bg-red-500/40 flex items-center justify-center">
          <span className="text-white font-medium overflow-hidden">
            {errorMessage || "Hata oluştu"}
          </span>
        </div>
      )}
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <SubmitButton
          buttonName="Resmi Sil"
          pendingButtonName="Resim Siliniyor..."
          type="button"
          className="bg-orange-700"
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
