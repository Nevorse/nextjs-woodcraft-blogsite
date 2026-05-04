"use client";
import SmoothLink from "@/components/ui/general/SmoothLink";
import Image, { StaticImageData } from "next/image";
import { UserType } from ".";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { signOutAction } from "@/lib/actions/auth-actions";

type NavbarLinksProps = {
  currentNavItems: { title: string; href: string }[];
  className?: string;
  itemClassName?: string;
  closeMobileNavbar?: () => void;
  isOnAdminPage?: boolean;
  user?: UserType;
};
export const NavbarLinks = ({
  currentNavItems,
  className,
  itemClassName,
  closeMobileNavbar,
  isOnAdminPage,
  user,
}: NavbarLinksProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    if (closeMobileNavbar) {
      closeMobileNavbar();
    }
    const result = await signOutAction();
    if (result.success === true) {
      router.push("/");
      toast.success("Çıkış yapıldı");
    } else {
      toast.error(`${result.error}`);
    }
  };

  const handleNavigate = () => {
    const prefixes = ["projects", "services"];
    const segments = pathname.split("/").filter(Boolean);
    const matchedPrefix = prefixes.find((prefix) => segments.includes(prefix));
    if (closeMobileNavbar) {
      closeMobileNavbar();
    }
    if (matchedPrefix) {
      router.push(isOnAdminPage ? pathname.replace("/admin", "") : `/admin${pathname}`);
    } else {
      router.push(isOnAdminPage ? "/" : "/admin");
    }
  };

  return (
    <div className={`flex shrink gap-2 font-medium ${className}`}>
      {currentNavItems.map((item, index) => (
        <SmoothLink
          key={index}
          href={item.href}
          onClick={closeMobileNavbar}
          className={`px-4 py-2 rounded-xl transition-colors ${itemClassName}`}
        >
          {item.title}
        </SmoothLink>
      ))}

      {isOnAdminPage ? (
        <>
          <button
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${itemClassName}`}
            onClick={handleNavigate}
          >
            Siteye Dön
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${itemClassName}`}
            onClick={handleLogout}
          >
            Çıkış
          </button>
        </>
      ) : user ? (
        <button
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${itemClassName}`}
          onClick={handleNavigate}
        >
          Admin Sayfası
        </button>
      ) : null}
    </div>
  );
};

type NavTitleProps = {
  currentNavTitle: { title: string; logo: StaticImageData };
};
export const NavbarTitle = ({ currentNavTitle }: NavTitleProps) => {
  return (
    <div className="flex items-center justify-center gap-7 shrink-0 p-2 text-2xl text-center content-center">
      <SmoothLink href={"/"}>
        <Image
          src={currentNavTitle.logo}
          height={90}
          width={90}
          alt="logo"
          className="object-cover object-center lg w-auto h-17.5 min-[450px]:h-22.5"
        />
      </SmoothLink>
      <SmoothLink href={"/"}>{currentNavTitle.title}</SmoothLink>
    </div>
  );
};
