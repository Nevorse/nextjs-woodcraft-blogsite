"use client";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosMail, IoLogoInstagram } from "react-icons/io";

export default function ContactInfo() {
  const { width: windowInnerWidth } = useWindowSize();
  return (
    <div className="flex flex-wrap justify-around gap-16 my-12 text-(--color-primary)">
      {windowInnerWidth && windowInnerWidth > 450 ? (
        // Desktop
        <>
          <div className="flex flex-col items-center gap-4">
            <FaPhoneAlt className="w-8 h-8" />
            <p className="text-2xl font-medium font-sans!">+90 542 134 5623</p>
          </div>

          <Link target="_blank" href="https://wa.me/905421345623">
            <div className="flex flex-col items-center gap-4 hover:text-green-500/90">
              <FaWhatsapp className="w-8 h-8" />
              <p className="text-2xl font-medium font-sans!">+90 542 134 5623</p>
            </div>
          </Link>

          <div className="flex flex-col items-center gap-4">
            <IoIosMail className="w-8 h-8" />
            <p className="text-2xl font-medium font-sans!">info@ozgurahsap.com</p>
          </div>

          <Link target="_blank" href="https://instagram.com/ozgurahsapdekorasyon">
            <div className="flex flex-col items-center gap-4 hover:text-green-500/90">
              <IoLogoInstagram className="w-8 h-8" />
              <p className="text-2xl font-medium font-sans!">
                /ozgurahsapdekorasyon
              </p>
            </div>
          </Link>
        </>
      ) : (
        // Mobile
        <>
          <Link href="tel:+905421345623">
            <div className="flex flex-col items-center gap-4 hover:text-green-500/90">
              <FaPhoneAlt className="w-8 h-8" />
              <p className="text-2xl font-medium underline underline-offset-[6px] font-sans">
                +90 542 134 5623
              </p>
            </div>
          </Link>
          <Link target="_blank" href="https://wa.me/905421345623">
            <div className="flex flex-col items-center gap-4 hover:text-green-500/90">
              <FaWhatsapp className="w-8 h-8" />
              <p className="text-2xl font-medium underline underline-offset-[6px] font-sans">
                +90 542 134 5623
              </p>
            </div>
          </Link>

          <div className="flex flex-col items-center gap-4">
            <IoIosMail className="w-8 h-8" />
            <p className="text-2xl font-medium font-sans">info@ozgurahsap.com</p>
          </div>

          <Link target="_blank" href="https://instagram.com/ozgurahsapdekorasyon">
            <div className="flex flex-col items-center gap-4 hover:text-green-500/90">
              <IoLogoInstagram className="w-8 h-8" />
              <p className="text-2xl font-medium underline underline-offset-[6px] font-sans">
                /ozgurahsapdekorasyon
              </p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
