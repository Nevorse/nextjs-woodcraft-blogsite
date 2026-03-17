import prisma from "@/lib/prisma";
import { AlbumFolderGetPayload } from "../generated/prisma/models";
import { FolderType } from "../generated/prisma/enums";

export type AlbumFolderType = AlbumFolderGetPayload<{
  include: {
    folderImage: true;
  };
}>;

export type FolderWithAlbumsType = AlbumFolderGetPayload<{
  include: {
    folderImage: true;
    albums: {
      orderBy: { order: "desc" };
      select: {
        id: true;
        title: true;
        slug: true;
        order: true;
        images: {
          select: {
            id: true;
            uuid: true;
            order: true;
          };
          orderBy: { order: "desc" };
          take: 1;
        };
      };
    };
  };
}>;

export async function getFoldersByType(type: FolderType): Promise<AlbumFolderType[]> {
  return prisma.albumFolder.findMany({
    where: { type },
    include: {
      folderImage: true,
    },
    orderBy: {
      order: "desc",
    },
  });
}
export async function getFolderBySlug(slug: string): Promise<FolderWithAlbumsType | null> {
  return prisma.albumFolder.findUnique({
    where: {
      slug: slug,
    },
    include: {
      folderImage: true,
      albums: {
        orderBy: { order: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          order: true,
          images: {
            select: {
              id: true,
              uuid: true,
              order: true,
            },
            orderBy: { order: "desc" },
            take: 1,
          },
        },
      },
    },
  });
}
