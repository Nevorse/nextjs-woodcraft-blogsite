"use client";
import coverDefault from "@/public/images/tv-the-stables-1.jpg";
import { useEffect, useState } from "react";
import { getCoverImagePath } from "@/lib/helpers/imageHelpers";
import { cn } from "@/lib/utils";

type HomeSliderProps = {
  coverImages?: { uuid: string }[];
  coverImageLimit?: number | undefined;
  coverTexts?: Record<string, string | null | undefined>;
  coverTextLimit?: number | undefined;
};

export default function HomeSlider({
  coverImages = [],
  coverImageLimit = 1,
  coverTexts = {},
  coverTextLimit = 1,
}: HomeSliderProps) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [textIndex, setTextIndex] = useState<number>(0);

  const slideImages = coverImages.length
    ? coverImages.slice(0, coverImageLimit).map((img) => getCoverImagePath(img.uuid))
    : [coverDefault.src];

  const imageLimit =
    coverImages.length === 0 ? 1 : Math.min(coverImages.length, coverImageLimit);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageLimit);
      setTextIndex((prev) => (prev + 1) % coverTextLimit);
    }, 6000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [imageLimit, coverTextLimit]);

  return (
    <div className="relative flex w-full 2xl:h-[81vh] xl:h-[70vh] lg:h-[60vh] md:h-[55vh] sm:h-[50vh] h-[45vh]">
      {slideImages.map((slideImage, imgIndex) => (
        <div
          key={imgIndex}
          style={{ backgroundImage: `url(${slideImage})` }}
          className={cn(
            "w-full h-full bg-center bg-cover absolute opacity-0 transition-all duration-500",
            imgIndex === imageIndex && "opacity-100",
          )}
        >
          <div className="bg-black/35 w-full h-full absolute" />
        </div>
      ))}

      <div
        className="absolute inset-0 text-left top-[40%] w-[90%] mx-auto text-(--color-secondary)
        xl:text-4xl md:text-4xl text-2xl font-semibold transition-all opacity-95"
      >
        {coverTexts[`content-${textIndex}`] || ""}
      </div>
    </div>
  );
}
