import { MatchFormat, Stats } from "@prisma/client";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LEVEL_DATA, LEVEL_NAMES, XP_THRESHOLDS } from "./constants";
import { GameState, LevelInfo } from "../types/gameState";
import crypto from "crypto";

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
  let reward: number;

  if (streak >= 7) {
    reward = crypto.randomInt(200, 500);
  } else if (streak >= 5) {
    reward = crypto.randomInt(100, 200);
  } else if (streak >= 3) {
    reward = crypto.randomInt(50, 100);
  } else {
    reward = crypto.randomInt(10, 50);
  }

  return reward;
}

export const calculateBettingPassCost = (betAmount: number): number => {
	let bettingPassCost: number;
	if (betAmount < 100) bettingPassCost = 1;
	else if (betAmount >= 100 && betAmount < 300) bettingPassCost = 2;
	else if (betAmount >= 300 && betAmount < 500) bettingPassCost = 3;
	else if (betAmount >= 500 && betAmount < 1000) bettingPassCost = 4;
	else if (betAmount >= 1000 && betAmount < 5000) bettingPassCost = 5;
	else if (betAmount >= 5000 && betAmount < 10000) bettingPassCost = 8;
	else bettingPassCost = 10;

	return bettingPassCost;
};