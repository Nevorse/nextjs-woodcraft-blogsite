import coverDefault from "@/public/images/tv-the-stables-1.jpg";
import Photo1 from "@/public/images/Photo1.webp";

const baseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

export function getImagePath(path: string | null | undefined): string {
  if (!path || !baseUrl) return Photo1.src;
  return `${baseUrl}/${path}`;
}
export function getCoverImagePath(path: string | null | undefined): string {
  if (!path || !baseUrl) return coverDefault.src;
  return `${baseUrl}/${path}`;
}

export function restoreItemInOrder<T extends { order: number }>(
  prev: T[],
  deletedItem: T,
) {
  const newIndex = prev.findIndex((item) => item.order < deletedItem.order);
  const insertAt = newIndex === -1 ? prev.length : newIndex;

  return [...prev.slice(0, insertAt), deletedItem, ...prev.slice(insertAt)];
}
