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

  const isAdminPath = pathname.startsWith("/admin");
  const isAlreadyAdmin = stringHref.startsWith("/admin");

  // let finalHref = stringHref;
  let finalHref = href;
  if (isAdminPath && !isAlreadyAdmin) {
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
