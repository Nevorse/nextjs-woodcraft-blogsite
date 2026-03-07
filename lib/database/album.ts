import prisma from "@/lib/prisma";
import { AlbumGetPayload } from "../generated/prisma/models";

type AlbumWithRelations = AlbumGetPayload<{
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

export async function getAlbumBySlug(slug: string): Promise<AlbumWithRelations | null> {
  return prisma.album.findUnique({
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
}
