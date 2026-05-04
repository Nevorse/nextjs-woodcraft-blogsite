"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems, navTitle } from "./navConsts";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function NavbarSkeleton() {
  return (
    <header className="flex justify-center mx-[4%]">
      <div className="flex whitespace-nowrap w-full max-w-375 items-center justify-between text-(--color-primary)">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-7 shrink-0 p-2 text-2xl text-center content-center">
          <Link href="/">
            <Image
              src={navTitle.logo}
              height={90}
              width={90}
              alt="logo"
              className="object-cover object-center w-auto h-17.5 min-[450px]:h-22.5"
            />
          </Link>

          <Link href="/">{navTitle.title}</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden compact:flex shrink gap-2 font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="px-4 py-2 rounded-xl transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile button */}
        <div className="compact:hidden">
          <div className="p-2 rounded-full">
            <HiOutlineMenuAlt3 className="w-7.25 h-7.25" />
          </div>
        </div>
      </div>
    </header>
  );
}
