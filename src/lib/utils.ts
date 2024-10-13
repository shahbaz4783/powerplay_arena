import { MatchFormat } from "@prisma/client";
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