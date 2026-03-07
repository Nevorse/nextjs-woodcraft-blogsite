"use client";
import SmoothLink from "./SmoothLink";

type BreadcrumbProps = {
  items: { label: string; href?: string }[];
}

export const BreadcrumbNav = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm text-(--theme-quaternary) truncate">
      {items.map((item, index) => (
        <div key={index} className="flex truncate">
          {item.href ? (
            <SmoothLink className="truncate underline underline-offset-2 decoration-(--theme-tertiary)" href={item.href}>
              {item.label}
            </SmoothLink>
          ) : (
            <span className=" truncate">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-2">&rsaquo;</span>
          )}
        </div>
      ))}
    </nav>
  );
};

