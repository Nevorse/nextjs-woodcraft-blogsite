import Image from "next/image";
import SmoothLink from "../general/SmoothLink";
import SubmitButton from "../form/SubmitButton";
import { ConfirmDialog } from "../general/ConfirmDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo } from "react";
import { getImagePath } from "@/lib/helpers/imageHelpers";

type AdminComponentCardProps = {
  itemId: string;
  itemHref: string;
  itemTitle: string;
  imageHref: string | undefined | null;
};

function AdminComponentCard({
  itemId,
  itemHref,
  itemTitle,
  imageHref,
}: AdminComponentCardProps) {
  const [isPending, setIsPending] = useState(false);
  const handleDeleteClick = async () => {
    setIsPending(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("handleDeleteClick");

    setIsPending(false);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: itemId });

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
        isDragging ? "opacity-50 scale-95" : "",
      )}
    >
      <div
        // ref={setNodeRef}
        // style={style}
        // {...attributes}
        {...listeners}
        className="group relative"
      >
        <Image
          className="w-full 2xl:h-[380px] h-[300px] object-center object-cover"
          alt={itemTitle}
          src={getImagePath(imageHref)}
          width={450}
          height={380}
          draggable={false}
        />
        <div
          className={cn(
            "flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            isPending && "opacity-100",
          )}
        >
          <ConfirmDialog
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
      </div>

      <div className="text-2xl my-l overflow-hidden text-(--color-primary)">
        <SmoothLink href={itemHref} draggable={false}>
          <h1 className="truncate text-left w-fit inline-block underline underline-offset-4 decoration-(--theme-tertiary) decoration-1">
            {itemTitle}
          </h1>
        </SmoothLink>
      </div>
    </div>
  );
}

export default memo(AdminComponentCard);
