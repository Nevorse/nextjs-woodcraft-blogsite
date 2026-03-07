import HomeSlider from "./HomeSlider";
import HomeServices from "./HomeServices";
import HomeProjects from "./HomeProjects";

export default function Home() {

  return (
    <div className="max-w-[92%] min-h-[90vh] mx-auto text-center color-white">
      <HomeSlider />
      <HomeServices />
      <HomeProjects />
    </div>
  );
}
