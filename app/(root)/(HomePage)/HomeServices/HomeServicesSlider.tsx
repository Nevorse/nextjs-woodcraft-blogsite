"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Photo1 from "@/public/images/Photo1.webp";
import Image from "next/image";
import { dummySerivcesProps } from "../../services/page";
import SmoothLink from "@/components/ui/general/SmoothLink";

export default function HomeServicesSlider({
  slideData,
}: {
  slideData: dummySerivcesProps[];
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
        delay: 5000,
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
      {slideData.map((service, index) => (
        <SwiperSlide key={index} className="group">
          <div className="flex flex-col items-center justify-center m-8">
            <SmoothLink
              href={`/services/${service?.serviceTitle}`}
              className="relative block overflow-hidden w-full h-[240px] lg:h-[320px] mb-4 transition-all hover:shadow-xl cursor-pointer"
            >
              <Image
                src={service.serviceImages?.[0] || Photo1.src}
                alt={service.serviceTitle}
                className="object-center object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </SmoothLink>
            <SmoothLink href={`/services/${service?.serviceTitle}`}>
              <h5 className="text-xl font-bold mb-3 truncate cursor-pointer">
                {service?.serviceTitle}
              </h5>
            </SmoothLink>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
