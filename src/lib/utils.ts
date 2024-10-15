import { MatchFormat, Stats } from "@prisma/client";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fakeDelay = async (duration: number) => {
  return await new Promise((resolve) => setTimeout(resolve, duration));
};

export function isValidMatchFormat(format: string): format is MatchFormat {
  return Object.values(MatchFormat).includes(format as MatchFormat);
}

export const timeSince = (date: Date): string => {
  const now: Date = new Date();

  const secondsPast: number = Math.ceil(
    (now.getTime() - date.getTime()) / 1000,
  );
  if (secondsPast < 60) {
    return `${secondsPast} second${secondsPast !== 1 ? "s" : ""} ago`;
  }

  const minutesPast: number = Math.ceil(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} minute${minutesPast !== 1 ? "s" : ""} ago`;
  }

  const hoursPast: number = Math.ceil(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} hour${hoursPast !== 1 ? "s" : ""} ago`;
  }

  const daysPast: number = Math.ceil(hoursPast / 24);
  if (daysPast < 7) {
    return `${daysPast} day${daysPast !== 1 ? "s" : ""} ago`;
  }

  const weeksPast: number = Math.ceil(daysPast / 7);
  if (weeksPast < 4) {
    return `${weeksPast} week${weeksPast !== 1 ? "s" : ""} ago`;
  }

  const monthsPast: number = Math.ceil(daysPast / 30);
  if (monthsPast < 12) {
    return `${monthsPast} month${monthsPast !== 1 ? "s" : ""} ago`;
  }

  const yearsPast: number = Math.ceil(daysPast / 365);
  return `${yearsPast} year${yearsPast !== 1 ? "s" : ""} ago`;
};

export const calculateEcomony = (stats: Stats) => {
  const { ballsBowled, runsConceded } = stats;
  
};
