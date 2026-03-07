import SmoothLink from "@/components/ui/general/SmoothLink";
import HomeProjects from "../(root)/(HomePage)/HomeProjects";
import HomeServices from "../(root)/(HomePage)/HomeServices";
import HomeSlider from "../(root)/(HomePage)/HomeSlider";
import Footer from "@/components/main-layout/footer";

export default function AdminPage() {
  return (
    <>
      <div className="max-w-[92%] min-h-[90vh] mx-auto text-center color-white">
        <SmoothLink href={"/admin/cover"}>
          <HomeSlider />
        </SmoothLink>
        <HomeServices />
        <HomeProjects />
      </div>
      <Footer />
    </>
  );
}
