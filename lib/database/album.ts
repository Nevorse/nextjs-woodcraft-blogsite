"use cache";
import prisma from "@/lib/prisma";
import { AlbumGetPayload } from "../generated/prisma/models";
import { AlbumType } from "../generated/prisma/enums";
import { cacheLife, cacheTag } from "next/cache";

export type AlbumWithRelations = AlbumGetPayload<{
  include: {
    images: {
      select: {
        id: true;
        uuid: true;
        order: true;
      };
    };
    folder: true;
  };
}>;
type ContentKey = `content-${number | string}`;

export type ContentTextValues = {
  [K in ContentKey]?: string | null;
};

export type AlbumWithContent = Omit<AlbumWithRelations, "content"> & {
  content: ContentTextValues | null;
};

export async function getAlbumsByType({
  type,
  take,
}: {
  type: AlbumType;
  take?: number;
}): Promise<AlbumWithRelations[]> {
  cacheTag("albums", `albums-${type}`);
  cacheLife("hours");


  return prisma.album.findMany({
    where: { type },
    orderBy: { order: "desc" },
    take: take || undefined,
    include: {
      images: {
        select: {
          id: true,
          uuid: true,
          order: true,
        },
        orderBy: { order: "desc" },
        take: 1,
      },
      folder: true,
    },
  });
}

export async function getAlbumBySlug(slug: string): Promise<AlbumWithContent | null> {
  const album = await prisma.album.findUnique({
    where: {
      slug: slug,
    },
    include: {
      images: {
        select: {
          id: true,
          uuid: true,
          order: true,
        },
        orderBy: {
          order: "desc",
        },
      },
      folder: true,
    },
  });

  if (!album) return null;

  cacheTag("albums", `album-${album.id}`);
  cacheLife("hours");

  return {
    ...album,
    content: album.content as ContentTextValues | null,
  };
}
