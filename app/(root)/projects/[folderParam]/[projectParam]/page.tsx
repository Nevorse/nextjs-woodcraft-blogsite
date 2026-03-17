import { notFound } from "next/navigation";
import { BreadcrumbNav } from "@/components/ui/general/BreadcrumbNav";
import { getAlbumBySlug } from "@/lib/database/album";
import { getFolderBySlug } from "@/lib/database/albumFolder";
import ProjectAlbumPageClient from "./ProjectAlbumPageClient";

export default async function ProjectAlbumPage({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  const { projectParam, folderParam } = await params;
  const projectData = await getAlbumBySlug(projectParam);
  const folderData = await getFolderBySlug(folderParam);
  if (!projectData || !folderData) notFound();

  return (
    <>
      <div className="w-[92%] min-h-[90vh] mx-auto my-12">
        <div className="flex justify-between">
          <div className="text-[28px] mb-8 font-semibold tracking-wider mr-12 shrink-0">
            <h1>{projectData.title}</h1>
          </div>

          <BreadcrumbNav
            items={[
              { label: "Tüm Projeler", href: "/projects" },
              {
                label: folderData.title,
                href: `/projects/${folderParam}`,
              },
              { label: projectData.title },
            ]}
          />
        </div>
        <ProjectAlbumPageClient
          projectData={projectData}
          folderData={folderData}
          projectParam={projectParam}
        />
      </div>
    </>
  );
}
