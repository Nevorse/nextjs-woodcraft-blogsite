import { Suspense } from "react";
import ProjectAlbumPageInner from "./ProjectAlbumPageInner";

export default function ProjectAlbumPage({
  params,
}: {
  params: Promise<{ projectParam: string; folderParam: string }>;
}) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProjectAlbumPageInner params={params} />
    </Suspense>
  );
}
