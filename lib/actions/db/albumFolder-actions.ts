"use server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { handleDbActionError } from "@/lib/errorHandler/prisma-error-handler";
import { revalidatePath } from "next/cache";
import { FolderType } from "@/lib/generated/prisma/enums";

export async function createAlbumFolder(type: FolderType) {

}