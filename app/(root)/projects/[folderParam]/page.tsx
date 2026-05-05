import { Suspense } from "react";
import ProjectFolderPageInner from "./ProjectFolderPageInner";

export default async function ProjectFolderPage({
  params,
}: {
  params: Promise<{ folderParam: string }>;
}) {

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProjectFolderPageInner params={params} />
    </Suspense>
  );
}
