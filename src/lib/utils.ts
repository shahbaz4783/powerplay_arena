import { MatchFormat, Stats } from "@prisma/client";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LEVEL_DATA, LEVEL_NAMES, XP_THRESHOLDS } from "./constants";
import { GameState, LevelInfo } from "../types/gameState";

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

export const capitalizeFirstLetter = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function calculateLevel(xp: number): LevelInfo {
  let level = 1;
  let xpForNextLevel = LEVEL_DATA[0].xpThreshold;

  for (let i = 0; i < LEVEL_DATA.length; i++) {
    if (xp >= LEVEL_DATA[i].xpThreshold) {
      level = LEVEL_DATA[i].level;
      xpForNextLevel = LEVEL_DATA[i + 1] ? LEVEL_DATA[i + 1].xpThreshold : 0;
    } else {
      break;
    }
  }

  return {
    level: level,
    name: LEVEL_DATA[level - 1].name,
    currentXP: xp,
    xpForNextLevel: xpForNextLevel,
  };
}

export function calculateXPGain(gameState: GameState): number {
  const winBonus = gameState.matchResult.winner === "player" ? 50 : 0;
  const performanceXP = gameState.player.runs + gameState.opponent.wickets * 10;
  return winBonus + performanceXP;
}

export function hasLeveledUp(oldXP: number, newXP: number): boolean {
  const oldLevel = calculateLevel(oldXP).level;
  const newLevel = calculateLevel(newXP).level;
  return newLevel > oldLevel;
}

export function calculateReward(streak: number): number {
  let reward = 10;

  if (streak >= 7) {
    reward += 100;
  } else if (streak >= 5) {
    reward += 50;
  } else if (streak >= 3) {
    reward += 25;
  }

  reward += Math.floor(Math.random() * 20);

  return reward;
}
