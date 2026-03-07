import AdminComponentCard from "@/components/ui/admin/AdminComponentCard"
import { getFoldersByType } from "@/lib/database/albumFolder"
import { FolderType } from "@/lib/generated/prisma/enums"
import Photo1 from "@/public/images/Photo1.webp";


export default async function AdminProjectAlbumsPage() {
  const albumFolders = await getFoldersByType(FolderType.PROJECT_FOLDER)


  return (
        <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
                Projelerimiz
              </h1>
              <h5 className="text-center font-medium tracking-wide text-(--color-primary)">
                Projelerimize buradan ulaşabilirsiniz.
              </h5>
            </div>
    
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
          </div>
        </div>
  )
}
