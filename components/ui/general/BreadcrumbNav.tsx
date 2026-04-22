"use client";
import { AlbumWithContent } from "@/lib/database/album";
import SmoothLink from "./SmoothLink";

type BreadcrumbItem = { label: string; href?: string };

export const BreadcrumbNav = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex justify-end text-sm text-(--theme-quaternary) truncate">
      {items.map((item, index) => (
        <div key={index} className="flex truncate">
          {item.href ? (
            <SmoothLink
              className="truncate underline underline-offset-2 decoration-(--theme-tertiary)"
              href={item.href}
            >
              {item.label}
            </SmoothLink>
          ) : (
            <span className=" truncate">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">&rsaquo;</span>}
        </div>
      ))}
    </nav>
  );
};

export const getAlbumBreadcrumbs = (albumData: AlbumWithContent) => {
  const isProject = albumData.type === "PROJECT_ALBUM";
  const albumType = isProject ? "projects" : "services";

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: isProject ? "Tüm Projeler" : "Tüm Hizmetler",
      href: `/${albumType}`,
    },
  ];

  if (albumData.folder?.slug) {
    breadcrumbItems.push({
      label: albumData.folder.title ?? "Klasör",
      href: `/${albumType}/${albumData.folder.slug}`,
    });
  }
  breadcrumbItems.push({ label: albumData.title });

  return breadcrumbItems;
};
