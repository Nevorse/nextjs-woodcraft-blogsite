"use client";

import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Photo1 from "@/public/images/Photo1.webp";
import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";

export default function SingleAlbumModal({
  data,
  startIndex = 0,
  alt,
  onClose,
}: {
  data: { image: string; id?: number }[];
  startIndex: number;
  onClose: () => void;
  alt?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleIndexChange = (index: number | "next" | "prev") => {
    if (index === "next") {
      setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    } else if (index === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    } else if (typeof index === "number") {
      if (index >= 0 && index < data.length) setCurrentIndex(index);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalRef.current === e.target &&
      (e.target as HTMLElement).id === "modal-overlay"
    ) {
      onClose();
    }
  };

  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleIndexChange("next");
      if (e.key === "ArrowLeft") handleIndexChange("prev");
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]); // react to currentIndex changes

  return (
    <div
      ref={modalRef}
      id="modal-overlay"
      onClick={(e) => handleOutsideClick(e)}
      className="fixed inset-0 flex items-center justify-center z-30 bg-black/80 backdrop-blur-md p-4 select-none"
    >
      <CgClose
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 text-white/80 cursor-pointer hover:text-white hover:scale-110 transition-all z-50"
      />
      <IoIosArrowBack
        onClick={() => handleIndexChange("prev")}
        className="absolute left-4 md:left-10 w-10 h-10 text-white/80 cursor-pointer hover:text-white hover:scale-110 transition-all z-50"
      />
      <IoIosArrowForward
        onClick={() => handleIndexChange("next")}
        className="absolute right-4 md:right-10 w-10 h-10 text-white/80 cursor-pointer hover:text-white hover:scale-110 transition-all z-50"
      />

      <div className="relative group shadow-2xl">
        <Image
          src={data[currentIndex]?.image || Photo1.src}
          alt={alt || "Project Image"}
          width={0}
          height={0}
          priority
          // style={{ width: 'auto', height: 'auto' }}
          className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain transition-all duration-300"
          sizes="100vw"
        />
        <div className="hidden">
          {currentIndex < data.length - 1 && (
            <Image
              src={data[currentIndex + 1]?.image}
              priority
              width={10}
              height={10}
              alt=""
            />
          )}
          {currentIndex > 0 && (
            <Image
              src={data[currentIndex - 1]?.image}
              priority
              width={10}
              height={10}
              alt=""
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-5 flex text-white gap-x-3 h-5 xl:h-6">
        {data.length > 10 ? (
          <div className="flex gap-x-2">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{data.length}</span>
          </div>
        ) : (
          data.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndexChange(index)}
              type="button"
              aria-label={`${index + 1}. Resme Git`}
              className={`hover:scale-125 transition-all relative before:rounded-full before:absolute before:inset-0 before:-z-10 before:hover:blur-sm before:hover:bg-white
              ${
                index === currentIndex &&
                "scale-110 before:blur-xs before:bg-white/75"
              }`}
            >
              <GoDotFill className="rounded-full w-5 h-5 xl:w-6 xl:h-6 shadow-2xl shadow-black" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
