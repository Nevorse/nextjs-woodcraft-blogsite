import prisma from "@/lib/prisma";
import { AlbumFolderGetPayload } from "../generated/prisma/models";
import { FolderType } from "../generated/prisma/enums";

export type AlbumFolderType = AlbumFolderGetPayload<{
  include: {
    folderImage: true;
  };
}>;

export async function getFoldersByType(
  type: FolderType,
): Promise<AlbumFolderType[]> {
  return prisma.albumFolder.findMany({
    where: {
      type,
    },
    include: {
      folderImage: true,
    },
    orderBy: {
      order: "desc",
    },
  });
}
