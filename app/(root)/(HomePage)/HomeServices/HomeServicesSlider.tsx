"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import SmoothLink from "@/components/ui/general/SmoothLink";
import { getImagePath } from "@/lib/helpers/imageHelpers";

type SimpleAlbumData = {
  id: string;
  title: string;
  order: number;
  slug: string;
  images?: { uuid: string }[];
  [key: string]: unknown;
};
export default function HomeServicesSlider({
  slideData,
}: {
  slideData: SimpleAlbumData[];
}) {
  // Not in use
  // Click Events
  //   let int: NodeJS.Timeout;
  //   let timeOut: boolean = false;
  //   let startX: number = -1;
  //   const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     startX = e.pageX;
  //     timeOut = false;
  //     int = setTimeout(() => {
  //       timeOut = true;
  //     }, 200);
  //   };
  //   const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     const endX = e.screenX;
  //     const abs = Math.abs(startX - endX);
  //     clearTimeout(int);
  //     if (!timeOut && abs < 10) {
  //       router.push(`/services`); // + service link
  //     }
  //   };

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      slidesPerView={3}
      breakpoints={{
        0: { slidesPerView: 1 },
        700: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
      className="w-[92%] mx-auto"
    >
      {slideData.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center justify-center m-8 group">
            <SmoothLink
              href={`/services/${item.slug}`}
              className="relative block overflow-hidden w-full h-[240px] lg:h-[320px] mb-4 cursor-pointer group-hover:shadow-xl transition-shadow"
            >
              <Image
                src={getImagePath(item.images?.[0]?.uuid)}
                alt={item.title}
                className="object-center object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </SmoothLink>
            <SmoothLink href={`/services/${item.slug}`}>
              <h5 className="text-xl font-bold mb-3 truncate cursor-pointer">
                {item.title}
              </h5>
            </SmoothLink>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export function HomeServicesSliderSkeleton() {
  return (
    <div className="w-[92%] mx-auto flex">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center m-8 w-full
            ${i === 2 ? "hidden min-[700px]:flex" : ""}
            ${i === 3 ? "hidden min-[1280px]:flex" : ""}
          `}
        >
          <div className="w-full h-[240px] lg:h-[320px] mb-4 bg-(--theme-tertiary)/30 animate-pulse" />
          <div className="h-6 w-32 bg-(--theme-tertiary)/30 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
