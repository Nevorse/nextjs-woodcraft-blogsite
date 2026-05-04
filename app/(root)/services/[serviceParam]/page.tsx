import { Suspense } from "react";
import ServiceAlbumPageInner from "./ServiceAlbumPageInner";


export default async function ServiceAlbumPage({
  params,
}: {
  params: Promise<{ serviceParam: string }>;
}) {


  return (
    <Suspense>
      <ServiceAlbumPageInner params={params} />
    </Suspense>
  );
}
