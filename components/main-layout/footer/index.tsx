"use client";
import Link from "next/link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import SmoothLink from "../../ui/general/SmoothLink";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function Footer() {
  const { width: windowInnerWidth } = useWindowSize();
  return (
    <div className="bg-(--theme-quaternary) w-full text-(--color-secondary)">
      <div className="w-full flex flex-wrap justify-center gap-x-40 gap-y-20 py-20">
        <div className="flex flex-col gap-3 mx-5">
          <h2 className="text-2xl tracking-wide font-sans!">
            İletişim Adreslerimiz
          </h2>
          <div className="flex flex-col gap-5">
            {windowInnerWidth && windowInnerWidth > 450 ? (
              <div className="flex gap-3 items-center">
                <FaPhoneAlt className="w-5 h-5" />
                <p className="text-lg font-medium font-sans!">+90 542 134 5623</p>
              </div>
            ) : (
              <Link href="tel:+905421345623">
                <div className="flex gap-3 items-center text-(--color-tertiary) md:text-(--color-secondary)">
                  <FaPhoneAlt className="w-5 h-5" />
                  <p className="text-lg font-medium font-sans!">+90 542 134 5623</p>
                </div>
              </Link>
            )}

            <Link
              target="_blank"
              href="https://wa.me/905421345623"
              className="hover:text-(--color-tertiary) text-(--color-tertiary) md:text-(--color-secondary) "
            >
              <div className="flex gap-3 items-center">
                <FaWhatsapp className="w-5 h-5" />
                <p className="text-lg font-medium font-sans!">+90 542 134 5623</p>
              </div>
            </Link>

            <div className="flex gap-3 items-center">
              <IoIosMail className="w-5 h-5" />
              <p className="text-lg font-medium font-sans!">info@ozgurahsap.com</p>
            </div>

            <Link
              target="_blank"
              href="https://instagram.com/ozgurahsapdekorasyon"
              className="hover:text-(--color-tertiary) text-(--color-tertiary) md:text-(--color-secondary)"
            >
              <div className="flex gap-3 items-center">
                <IoLogoInstagram className="w-5 h-5" />
                <p className="text-lg font-medium font-sans!">
                  /ozgurahsapdekorasyon
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 mx-5">
          <h2 className="text-2xl tracking-wide">Bağlantılar</h2>
          <div className="flex flex-col gap-3">
            <div className="flex hover:text-(--color-tertiary) gap-3 items-center">
              <SmoothLink href={"/projects"}>Projelerimiz</SmoothLink>
            </div>
            <div className="flex hover:text-(--color-tertiary) gap-3 items-center">
              <SmoothLink href={"/services"}>Hizmetlerimiz</SmoothLink>
            </div>
            <div className="flex hover:text-(--color-tertiary) gap-3 items-center">
              <SmoothLink href={"/aboutus"}>Hakkımızda</SmoothLink>
            </div>
            <div className="flex hover:text-(--color-tertiary) gap-3 items-center">
              <SmoothLink href={"/contact"}>İletişim</SmoothLink>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[14.5px] font-sans! flex justify-center px-10 pb-5">
        © Copyright 2026 | Özgür Ahşap Dekorasyon | Tüm hakları saklıdır. Hiç bir
        görsel izinsiz kullanılamaz.
      </div>
    </div>
  );
}
