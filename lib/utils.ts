import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateIncrementalTitle(
  existingTitles: string[],
  baseTitle: string
) {
  const escaped = baseTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const usedNumbers = existingTitles
    .map((title) => {
      const match = title.match(new RegExp(`^${escaped} (\\d+)$`));
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((n): n is number => n !== null);

  let next = 1;
  while (usedNumbers.includes(next)) next++;

  return `${baseTitle} ${next}`;
}