import SmoothLink from "@/components/ui/general/SmoothLink";
import HomeProjects from "@/app/(root)/(HomePage)/HomeProjects";
import HomeServices from "@/app/(root)/(HomePage)/HomeServices";
import HomeSlider from "@/app/(root)/(HomePage)/HomeSlider";
import Footer from "@/components/main-layout/footer";
import { getSiteSettings } from "@/lib/database/siteSettings";
import { getAlbumBySlug } from "@/lib/database/album";
// import AdminPageSettings from "./AdminPageSettings";


export default async function AdminPage() {
  const siteSettings = await getSiteSettings({
    coverImageLimit: true,
    coverTextLimit: true,
    serviceAlbumLimit: true,
    projectAlbumLimit: true,
    isRegistrationOpen: true,
  });
  const {
    coverImageLimit,
    coverTextLimit,
    // serviceAlbumLimit,
    // projectAlbumLimit,
    // isRegistrationOpen,
  } = siteSettings || {};

  const coverAlbumData = await getAlbumBySlug("cover-album");
  const coverTexts = coverAlbumData?.content || {};
  return (
    <>
      <div className="w-[92%] min-h-[90vh] mx-auto text-center color-white">
        <SmoothLink href={"/admin/cover"}>
          <HomeSlider
            coverImages={coverAlbumData?.images}
            coverImageLimit={coverImageLimit}
            coverTexts={coverTexts}
            coverTextLimit={coverTextLimit}
          />
        </SmoothLink>

        {/* <AdminPageSettings
        serviceAlbumLimit={serviceAlbumLimit}
        projectAlbumLimit={projectAlbumLimit}
        isRegistrationOpen={isRegistrationOpen} /> */}

        <HomeServices />
        <HomeProjects />
      </div>
      <Footer />
    </>
  );
}
