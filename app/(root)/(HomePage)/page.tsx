import HomeSlider from "./HomeSlider";
import HomeServices from "./HomeServices";
import HomeProjects from "./HomeProjects";
import MotionWrapper from "../_components/MotionWrapper";
import { getAlbumBySlug } from "@/lib/database/album";
import { getSiteSettings } from "@/lib/database/siteSettings";

export default async function Home() {
  const [siteSettings, coverAlbumData] = await Promise.all([
    getSiteSettings({
      coverImageLimit: true,
      coverTextLimit: true,
      // serviceAlbumLimit: true,
      // projectAlbumLimit: true,
    }),
    getAlbumBySlug("cover-album"),
  ]);

  const {
    coverImageLimit,
    coverTextLimit,
    // serviceAlbumLimit,
    // projectAlbumLimit,
  } = siteSettings || {};
  const coverTexts = coverAlbumData?.content || {};

  return (
    <div className="w-[92%] min-h-[90vh] mx-auto text-center color-white">
      <MotionWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <HomeSlider
          coverImages={coverAlbumData?.images}
          coverImageLimit={coverImageLimit}
          coverTexts={coverTexts}
          coverTextLimit={coverTextLimit}
        />
        <HomeServices />
        <HomeProjects />
      </MotionWrapper>
    </div>
  );
}
