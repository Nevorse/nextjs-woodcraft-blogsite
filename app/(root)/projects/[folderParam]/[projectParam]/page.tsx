import { Suspense } from "react";
import ProjectAlbumPageInner from "./ProjectAlbumPageInner";

export default async function ProjectAlbumPage({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  return (
    <Suspense>
      <ProjectAlbumPageInner params={params} />
    </Suspense>
  );
}
