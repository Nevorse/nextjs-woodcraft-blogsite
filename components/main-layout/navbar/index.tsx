"use client";
import { navItems, adminNavItems, navTitle, adminNavTitle } from "./navConsts";
import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useDynamicNavbar } from "@/hooks/useDynamicNavbar";
import { NavbarLinks, NavbarTitle } from "./NavbarLinks";
import { AnimatePresence, motion } from "motion/react";

export type UserType =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    }
  | null
  | undefined;
type NavbarProps = {
  user?: UserType;
};

export default function Navbar({ user }: NavbarProps) {
  const [displayFixedNav, setDisplayFixedNav] = useState<boolean>(false);
  const [openMobileNavbar, setOpenMobileNavbar] = useState<boolean>(false);
  const { isCompact, contentRef, containerRef } = useDynamicNavbar();
  const mobileOutsideRef = useRef(null);
  const pathname = usePathname();

  const isOnAdminPage = pathname.startsWith("/admin");
  const currentNavTitle = isOnAdminPage ? adminNavTitle : navTitle;
  const currentNavItems = isOnAdminPage ? adminNavItems : navItems;

  if (!isCompact && openMobileNavbar) {
    setOpenMobileNavbar(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 90;
      setDisplayFixedNav((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Static Navbar */}
      <header className="flex justify-center mx-[4%]" ref={containerRef}>
        <div
          className="flex whitespace-nowrap w-full max-w-375 items-center justify-between text-(--color-primary)"
          ref={contentRef}
        >
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

              <AnimatePresence>
                {openMobileNavbar && (
                  <div
                    className="fixed inset-0 z-40"
                    aria-label="outside"
                    ref={mobileOutsideRef}
                    onClick={(e) => {
                      // if (e.target === e.currentTarget) {
                      if (mobileOutsideRef.current === e.target) {
                        setOpenMobileNavbar(false);
                      }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="fixed top-0 right-0 w-[55%] max-w-92.5 min-w-max pr-1 -mr-5 h-full flex flex-col bg-black/40 backdrop-blur-lg"
                    >
                      <div className="mr-[12%]">
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
                          closeMobileNavbar={() => setOpenMobileNavbar(false)}
                          isOnAdminPage={isOnAdminPage}
                          user={user}
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </div> ////   <= Mobile Navbar
          ) : (
            <NavbarLinks
              currentNavItems={currentNavItems}
              className="opacity-0 compact:opacity-100"
              isOnAdminPage={isOnAdminPage}
              user={user}
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
              isOnAdminPage={isOnAdminPage}
              user={user}
            />
          </div>
        </header>
      )}
    </>
  );
}
