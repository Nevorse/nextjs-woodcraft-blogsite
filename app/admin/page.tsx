import SmoothLink from "@/components/ui/general/SmoothLink";
import HomeProjects from "../(root)/(HomePage)/HomeProjects";
import HomeServices from "../(root)/(HomePage)/HomeServices";
import HomeSlider from "../(root)/(HomePage)/HomeSlider";
import Footer from "@/components/main-layout/footer";
import { getSiteSettings } from "@/lib/database/siteSettings";
import { getAlbumBySlug } from "@/lib/database/album";
import { CoverTextValues } from "./cover/page";

export default async function AdminPage() {
  const siteSettings = await getSiteSettings({
    coverImageLimit: true,
    coverTextLimit: true,
  });
  const { coverImageLimit = undefined, coverTextLimit = undefined } = siteSettings || {};

  const coverAlbumData = await getAlbumBySlug("cover-album");
  const coverTexts = (coverAlbumData?.content as CoverTextValues) || {};
  return (
    <>
      <div className="max-w-[92%] min-h-[90vh] mx-auto text-center color-white">
        <SmoothLink href={"/admin/cover"}>
          <HomeSlider
            coverImages={coverAlbumData?.images}
            coverImageLimit={coverImageLimit}
            coverTexts={coverTexts}
            coverTextLimit={coverTextLimit}
          />
        </SmoothLink>
        <HomeServices />
        <HomeProjects />
      </div>
      <Footer />
    </>
  );
}
