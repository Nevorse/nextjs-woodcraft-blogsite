"use client";
import AdminComponentCard from "@/components/ui/admin/AdminComponentCard";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { createAlbumFolder } from "@/lib/actions/db/albumFolder-actions";
import { AlbumFolderType } from "@/lib/database/albumFolder";
import Photo1 from "@/public/images/Photo1.webp";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

type ProjectFolderClientProps = {
  albumFolders: AlbumFolderType[];
};

export default function ProjectFolderClient({ albumFolders }: ProjectFolderClientProps) {
  const pathname = usePathname();
  const createNewFolder = async () => {
    const result = await createAlbumFolder("PROJECT_FOLDER", pathname);
    if (result.success) {
      toast.success("Albüm Klasörü oluşturuldu");
    } else {
      toast.error(result.error);
    }
  };
  return (
    <>
      <SubmitButton
        onClick={createNewFolder}
        className="bg-(--color-primary)!"
        buttonName="Klasör Oluştur"
        pendingButtonName="Oluşturuluyor..."
        type="button"
      />

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
        {albumFolders.map((folder, index) => (
          <AdminComponentCard
            key={index}
            title={folder.title}
            href={`/projects/${folder.slug}`}
            image={folder.folderImage?.uuid || Photo1.src}
          />
        ))}
      </div>
    </>
  );
}
