"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SmoothLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  ///
};

export default function SmoothLink({
  href,
  children,
  target,
  className,
  id,
  onClick,
  ...props
}: SmoothLinkProps) {
  const pathname = usePathname();
  const stringHref = href.toString();

  const isAlreadyAdmin = pathname.startsWith("/admin");
  const isAdminPath = stringHref.startsWith("/admin");
  const isHomePath = stringHref.startsWith("/home");

  let finalHref = href;
  if (isHomePath) {
    finalHref = stringHref.replace(/^\/home/, "") || "/";
  } else if (isAlreadyAdmin && !isAdminPath) {
    finalHref = `/admin${stringHref.startsWith("/") ? "" : "/"}${stringHref}`;
  }

  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (target === "_blank") return;

    if (onClick) onClick(e);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href={finalHref}
      scroll={false}
      target={target}
      className={className}
      id={id}
      onClick={onClickHandler}
      {...props}
    >
      {children}
    </Link>
  );
}
