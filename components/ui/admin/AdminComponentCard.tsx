import Image from "next/image";
import SmoothLink from "../general/SmoothLink";
import SubmitButton from "../form/SubmitButton";
import { ConfirmDialog } from "../general/ConfirmDialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminComponentCard({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const handleDeleteClick = async () => {
    setIsPending(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("aaaaaaaaaaaa");

    setIsPending(false);
  };
  return (
    <div className="flex flex-col gap-3 2xl:w-[450px] w-[350px]">
      <div className="group relative">
        <SmoothLink href={href} draggable={false}>
          <Image
            className="w-full 2xl:h-[380px] h-[300px] object-center object-cover"
            alt={title}
            src={image}
            width={450}
            height={380}
            draggable={false}
          />
        </SmoothLink>
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
              buttonName="Resmi Sil"
              pendingButtonName="Resim Siliniyor..."
              type="button"
              className={"bg-orange-700 hover:opacity-95! cursor-pointer"}
              isSubmitting={isPending}
            />
          </ConfirmDialog>
        </div>
      </div>

      <div className="text-2xl my-l overflow-hidden text-(--color-primary)">
        <SmoothLink href={href} draggable={false}>
          <h1 className="truncate text-left w-fit inline-block underline underline-offset-4 decoration-(--theme-tertiary) decoration-1">
            {title}
          </h1>
        </SmoothLink>
      </div>
    </div>
  );
}
