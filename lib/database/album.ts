import prisma from "@/lib/prisma";
import { AlbumGetPayload } from "../generated/prisma/models";
import { AlbumType } from "../generated/prisma/enums";

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

export async function getAlbumsByType(
  type: AlbumType,
): Promise<AlbumWithRelations[]> {
  return prisma.album.findMany({
    where: { type },
    orderBy: { order: "desc" },
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

  return {
    ...album,
    content: album.content as ContentTextValues | null,
  };
}
