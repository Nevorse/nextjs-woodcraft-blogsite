import prisma from "@/lib/prisma";
import { AlbumFolderGetPayload } from "../generated/prisma/models";
import { FolderType } from "../generated/prisma/enums";
import { cacheLife, cacheTag } from "next/cache";

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
      include: {
        images: {
          select: {
            id: true;
            uuid: true;
            order: true;
          };
          orderBy: { order: "desc" };
        };
        folder: true;
      };
    };
  };
}>;

export async function getFoldersByType({
  type,
  take,
}: {
  type: FolderType;
  take?: number;
}): Promise<AlbumFolderType[]> {
  "use cache";
  cacheTag("folders", `folders-${type}`);
  cacheLife("hours");

  return prisma.albumFolder.findMany({
    where: { type },
    take: take || undefined,
    include: {
      folderImage: true,
    },
    orderBy: {
      order: "desc",
    },
  });
}

export async function getFolderBySlug(
  slug: string,
): Promise<FolderWithAlbumsType | null> {
  "use cache";
  cacheTag("folders", `folder-${slug}`);
  cacheLife("hours");

  const folder = await prisma.albumFolder.findUnique({
    where: {
      slug: slug,
    },
    include: {
      folderImage: true,
      albums: {
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
      },
    },
  });

  if (!folder) return null;

  return folder;
}
