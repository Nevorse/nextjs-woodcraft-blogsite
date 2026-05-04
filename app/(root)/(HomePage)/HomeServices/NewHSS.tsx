"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import type { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
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

const DOT_SIZE = 12;
const GAP = 12;
const STEP = DOT_SIZE + GAP;
const COPIES = 5; // dot array'i 5 kez tekrar eder, ortada başlar
const CENTER_COPY = Math.floor(COPIES / 2); // 2

export default function NewHomeServicesSlider({
  slideData,
}: {
  slideData: SimpleAlbumData[];
}) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [realIndex, setRealIndex] = useState(0);
  const [spv, setSpv] = useState(1);
  const [continuousIndex, setContinuousIndex] = useState(0);
  const prevRealIndexRef = useRef(0);

  const getSpv = (s: SwiperType) => {
    const v = s.params.slidesPerView;
    return typeof v === "number" ? Math.round(v) : 1;
  };

  const total = slideData.length;

  // 5 kopya dot array, ortadan başlayarak sonsuz kaydırma simüle eder
  const allDots = Array.from({ length: COPIES * total }, (_, i) => i % total);

  const handleRealIndexChange = (s: SwiperType) => {
    const newReal = s.realIndex;
    const prevReal = prevRealIndexRef.current;

    // Wrap-around yönünü tespit et
    let delta = newReal - prevReal;
    if (delta > total / 2) {
      // sola döndü (son → ilk)
      delta -= total;
    }
    if (delta < -total / 2) {
      // sağa döndü (ilk → son)
      delta += total;
    }

    setContinuousIndex((prev) => prev + delta);
    prevRealIndexRef.current = newReal;
    setRealIndex(newReal);
  };

  const windowSize = spv + 2;
  const visibleWidth = windowSize * DOT_SIZE + (windowSize - 1) * GAP;
  const windowStart = CENTER_COPY * total + continuousIndex - 1;
  const translateX = -windowStart * STEP;

  const isActive = (dotIndex: number) => {
    for (let j = 0; j < spv; j++) {
      if ((realIndex + j) % total === dotIndex) return true;
    }
    return false;
  };

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          700: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        onSwiper={(s) => {
          setSwiperRef(s);
          setSpv(getSpv(s));
        }}
        onRealIndexChange={handleRealIndexChange}
        onBreakpoint={(s) => setSpv(getSpv(s))}
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

      <div className="flex justify-center mt-6">
        <div className="overflow-hidden" style={{ width: `${visibleWidth}px` }}>
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ gap: `${GAP}px`, transform: `translateX(${translateX}px)` }}
          >
            {allDots.map((dotIndex, i) => (
              <button
                key={i}
                onClick={() => swiperRef?.slideToLoop(dotIndex)}
                style={{ width: DOT_SIZE, height: DOT_SIZE, flexShrink: 0 }}
                className={`rounded-full transition-all duration-300 ${
                  isActive(dotIndex)
                    ? "bg-white scale-110 shadow-[0_0_8px_3px_rgba(255,255,255,0.5)]"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
