"use client";
import { navItems, adminNavItems, navTitle, adminNavTitle } from "./navConsts";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import SmoothLink from "../../ui/general/SmoothLink";
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { CgClose } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { signOutAction } from "@/lib/actions/auth-actions";
import toast from "react-hot-toast";

export default function Navbar() {
  const [displayFixedNav, setDisplayFixedNav] = useState<boolean>(false);
  const [openMobileNavbar, setOpenMobileNavbar] = useState<boolean>(false);
  const { isCompact } = useWindowSize();
  const mobileOutsideRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = pathname.startsWith("/admin");
  const currentNavTitle = isAdmin ? adminNavTitle : navTitle;
  const currentNavItems = isAdmin ? adminNavItems : navItems;

  if (!isCompact && openMobileNavbar) {
    setOpenMobileNavbar(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setDisplayFixedNav(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    setOpenMobileNavbar(false);
    const result = await signOutAction();
    if (result.success === true) {
      router.push("/");
      toast.success(result.message);
    } else {
      toast.error(`${(result.message)}`);
    }
  };

  return (
    <>
      {/* Static Navbar */}
      <header>
        <div className="flex w-[92%] max-w-375 mx-auto items-center justify-between text-(--color-primary)">
          <NavbarTitle currentNavTitle={currentNavTitle} />

          {isCompact ? (
            ////   Mobile Navbar =>
            <div>
              <button
                onClick={() => setOpenMobileNavbar(true)}
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                aria-label="HiOutlineMenuAlt3"
              >
                <HiOutlineMenuAlt3 className="w-7.25 h-7.25" />
              </button>
              {openMobileNavbar && (
                <div
                  className="fixed inset-0 z-40"
                  aria-label="outside"
                  ref={mobileOutsideRef}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setOpenMobileNavbar(false);
                    }
                  }}
                >
                  <div className="fixed top-0 right-0 max-w-92.5 pr-5 -mr-5 w-full h-full flex flex-col bg-black/40 backdrop-blur-lg">
                    <div className="mr-[10%]">
                      <div className="h-26.25 flex items-center justify-end">
                        <button
                          onClick={() => setOpenMobileNavbar(false)}
                          className="p-2 rounded-full hover:bg-black/20 transition-colors"
                        >
                          <CgClose className="w-7.25 h-7.25 text-white" />
                        </button>
                      </div>

                      <NavbarLinks
                        currentNavItems={currentNavItems}
                        className="flex-col items-end text-white"
                        itemClassName="hover:bg-black/20! rounded-md!"
                        onClick={() => setOpenMobileNavbar(false)}
                        onLogout={handleLogout}
                        isAdmin={isAdmin}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div> ////   <= Mobile Navbar
          ) : (
            <NavbarLinks
              currentNavItems={currentNavItems}
              className="hidden compact:flex"
              onLogout={handleLogout}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </header>
      {/* Fixed Navbar on Scroll */}
      {!isCompact && (
        <header
          className={`fixed shadow-md top-0 left-0 right-0 z-20 max-h-0 p-0 transition-all overflow-hidden bg-black/50 backdrop-blur-md 
          ${displayFixedNav ? "max-h-26.25!" : "max-h-0! shadow-none!"}`}
        >
          <div className="w-[92%] max-w-375 mx-auto flex items-center justify-between text-(--color-secondary)">
            <NavbarTitle currentNavTitle={currentNavTitle} />
            <NavbarLinks
              currentNavItems={currentNavItems}
              onLogout={handleLogout}
              isAdmin={isAdmin}
            />
          </div>
        </header>
      )}
    </>
  );
}
type NavTitleProps = {
  currentNavTitle: { title: string; logo: StaticImageData };
};
const NavbarTitle = ({ currentNavTitle }: NavTitleProps) => (
  <div className="flex items-center justify-center gap-7 h-26.25 shrink-0 p-1 text-2xl text-center content-center">
    <SmoothLink href={"/"}>
      <Image
        src={currentNavTitle.logo}
        height={90}
        alt="logo"
        className="object-cover object-center h-22.5 lg"
      />
    </SmoothLink>
    <SmoothLink href={"/"}>{currentNavTitle.title}</SmoothLink>
  </div>
);
type NavbarLinksProps = {
  currentNavItems: { title: string; href: string }[];
  className?: string;
  itemClassName?: string;
  onClick?: () => void;
  onLogout?: () => Promise<void> | void;
  isAdmin?: boolean;
};
const NavbarLinks = ({
  currentNavItems,
  className,
  itemClassName,
  onClick,
  onLogout,
  isAdmin,
}: NavbarLinksProps) => (
  <div className={`flex shrink gap-2 font-medium ${className}`}>
    {currentNavItems.map((item, index) => (
      <SmoothLink
        key={index}
        href={item.href}
        onClick={onClick}
        className={`px-4 py-2 rounded-xl transition-colors ${itemClassName}`}
      >
        {item.title}
      </SmoothLink>
    ))}
    {isAdmin && (
      <button
        className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${itemClassName}`}
        onClick={onLogout}
      >
        Çıkış
      </button>
    )}
  </div>
);
