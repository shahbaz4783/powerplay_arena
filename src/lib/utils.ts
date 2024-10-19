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
  const minutesPast: number = Math.ceil(secondsPast / 60);
  const hoursPast: number = Math.ceil(minutesPast / 60);

  if (secondsPast < 60) {
    return `${secondsPast} second${secondsPast !== 1 ? "s" : ""} ago  (${date.toLocaleTimeString()})`;
  }
  if (minutesPast < 60) {
    return `${minutesPast} minute${minutesPast !== 1 ? "s" : ""} ago (${date.toLocaleTimeString()})`;
  }
  if (hoursPast < 24) {
    return `${hoursPast} hour${hoursPast !== 1 ? "s" : ""} ago (${date.toLocaleTimeString()})`;
  }

  return `${date.toDateString()} (${date.toLocaleTimeString()})`;
};

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
