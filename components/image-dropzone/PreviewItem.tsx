import Image from "next/image";
import { Spinner } from "../ui/general/icons";
import { HiOutlineXMark as XMark } from "react-icons/hi2";
import { FilePreview } from "./ImageDropzone";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

type PreviewItemProps = {
  item: FilePreview;
  removeFile: (id: string) => void;
  uploadableStatuses: string[];
};

export default function PreviewItem({
  item,
  removeFile,
  uploadableStatuses,
}: PreviewItemProps) {
  
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

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
        "relative group rounded-lg overflow-hidden border bg-muted aspect-square",
        isDragging ? "opacity-50 scale-95" : "",
      )}
    >
      <Image
        src={item.preview}
        alt="preview image"
        width={450}
        height={380}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Status overlay */}
      {item.status === "uploading" && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      )}
      {item.status === "error" && (
        <div className=" absolute inset-0 bg-red-500/40 flex items-center justify-center">
          <span className="text-white font-medium overflow-hidden">
            {item.error || "Hata oluştu"}
          </span>
        </div>
      )}

      {/* Remove button */}
      {uploadableStatuses.includes(item.status) && (
        <button
          onClick={() => removeFile(item.id)}
          className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-7 h-7 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XMark size={18} />
        </button>
      )}
    </div>
  );
}
