import HomeSlider from "@/app/(root)/(HomePage)/HomeSlider";
import { getAlbumBySlug } from "@/lib/database/album";
import { getSiteSettings } from "@/lib/database/siteSettings";
// import CoverPageSettings from "./CoverPageSettings";
// import AdminImageCard from "@/components/ui/admin/AdminImageCard";
import ImageDropzone from "@/components/image-dropzone/ImageDropzone";
import CoverPageClient from "./CoverPageClient";

type ContentKey = `content-${number | string}`;

export type CoverTextValues = {
  [K in ContentKey]?: string | null;
};

export default async function AdminCoverPage() {
  const siteSettings = await getSiteSettings({
    coverImageLimit: true,
    coverTextLimit: true,
  });
  const { coverImageLimit = undefined, coverTextLimit = undefined } = siteSettings || {};

  const coverAlbumData = await getAlbumBySlug("cover-album");
  const coverTexts = (coverAlbumData?.content as CoverTextValues) || {};

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto text-center color-white mb-40">
      <HomeSlider
        coverImages={coverAlbumData?.images}
        coverImageLimit={coverImageLimit}
        coverTexts={coverTexts}
        coverTextLimit={coverTextLimit}
      />

      <div className="flex flex-col justify-center items-center my-8 gap-3">
        <span>Kapak Fotoğrafı Yükle</span>
        <ImageDropzone xType="cover" albumId={coverAlbumData?.id} />
      </div>

      <CoverPageClient
        initialCoverImageLimit={coverImageLimit}
        initialCoverTextLimit={coverTextLimit}
        initialCoverTexts={coverTexts}
        coverAlbumImages={coverAlbumData?.images}
      />
    </div>
  );
}
