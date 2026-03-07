import coverDefault from "@/public/images/tv-the-stables-1.jpg";
import Photo1 from "@/public/images/Photo1.webp";

const baseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

export function getImagePath(path: string | null): string {
  if (!path || !baseUrl) return Photo1.src;
  return `${baseUrl}/${path}`;
}
export function getCoverImagePath(path: string | null): string {
  if (!path || !baseUrl) return coverDefault.src;
  return `${baseUrl}/${path}`;
}
