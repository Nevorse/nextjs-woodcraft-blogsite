import HomeServicesSlider from "./HomeServicesSlider";
import { sortedServicesData } from "../../services/page";

export default function HomeServices() {
  return (
    <div className="w-full mt-36 pb-10">
      <div className="flex flex-col items-center mb-2">
        <div className="text-(--color-primary) text-center text-4xl font-bold tracking-wider mb-4">
          Hizmetlerimiz
        </div>
        <div className="w-36 h-px bg-(--color-primary)"></div>
      </div>
      <HomeServicesSlider slideData={sortedServicesData} />
    </div>
  );
}
