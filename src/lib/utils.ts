import { MatchFormat } from '@prisma/client';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LEVEL_DATA, rewardTiers } from '../constants/app-config';
import { GameState, LevelInfo } from '../types/gameState';
import crypto from 'crypto';

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
		(now.getTime() - date.getTime()) / 1000
	);
	const minutesPast: number = Math.ceil(secondsPast / 60);
	const hoursPast: number = Math.ceil(minutesPast / 60);

	if (secondsPast < 60) {
		return `${secondsPast} second${
			secondsPast !== 1 ? 's' : ''
		} ago  (${date.toLocaleTimeString()})`;
	}
	if (minutesPast < 60) {
		return `${minutesPast} minute${
			minutesPast !== 1 ? 's' : ''
		} ago (${date.toLocaleTimeString()})`;
	}
	if (hoursPast < 24) {
		return `${hoursPast} hour${
			hoursPast !== 1 ? 's' : ''
		} ago (${date.toLocaleTimeString()})`;
	}

	return `${date.toDateString()} (${date.toLocaleTimeString()})`;
};

export function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export const capitalizeFirstLetter = (text: string) => {
	return text
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
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
	const winBonus = gameState.matchResult.winner === 'player' ? 50 : 0;
	const performanceXP = gameState.player.runs + gameState.opponent.wickets * 10;
	return winBonus + performanceXP;
}

export function hasLeveledUp(oldXP: number, newXP: number): boolean {
	const oldLevel = calculateLevel(oldXP).level;
	const newLevel = calculateLevel(newXP).level;
	return newLevel > oldLevel;
}

export function calculateReward(streakDay: number) {
	const tier =
		rewardTiers[streakDay - 1] || rewardTiers[rewardTiers.length - 1];
	const [minCoins, maxCoins] = tier.coins.split('-').map(Number);
	const [minPowerPass, maxPowerPass] = tier.powerPass.split('-').map(Number);

	return {
		coins: crypto.randomInt(minCoins, maxCoins + 1),
		powerPass: crypto.randomInt(minPowerPass, maxPowerPass + 1),
	};
}

export const calculateBettingPassCost = (betAmount: number): number => {
	if (betAmount <= 100) return 1;

	let bettingPassCost = 1;
	let currentRangeLimit = 100;

	while (betAmount >= currentRangeLimit) {
		bettingPassCost += 1;
		currentRangeLimit *= 2;
	}

	return bettingPassCost;
};

export const calculateBoostedReward = (
	reward: string,
	weeklyStreak: number
): string => {
	const [min, max] = reward.split('-').map(Number);
	const boost = 1 + (weeklyStreak * 5) / 100;
	return `${Math.floor(min * boost)}-${Math.floor(max * boost)}`;
};

export const getTimeUntilNextReward = () => {
	const now = new Date();
	const utcMidnight = new Date(
		Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
	);
	const timeLeft = utcMidnight.getTime() - now.getTime();
	const hours = Math.floor(timeLeft / (1000 * 60 * 60));
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	return `${hours}h ${minutes}m`;
};

export interface StreakInfo {
	streakLength: number;
	weeklyStreak: number;
	isMissed: boolean;
	canClaim: boolean;
}

export const getStreakStatus = (lastClaimedAt: Date | null) => {
	const now = new Date();
	const startOfToday = new Date(
		Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	);
	const startOfYesterday = new Date(startOfToday);
	startOfYesterday.setUTCDate(startOfYesterday.getUTCDate() - 1);

	let isMissed = false;
	let canClaim = true;

	if (!lastClaimedAt) {
		canClaim = true;
	} else {
		const lastClaimedUTC = new Date(lastClaimedAt);
		if (lastClaimedUTC >= startOfToday) {
			canClaim = false;
		} else if (lastClaimedUTC < startOfYesterday) {
			isMissed = true;
			canClaim = true;
		} else {
			canClaim = true;
		}
	}

	return { isMissed, canClaim };
};

export const incrementStreak = (
	currentStreak: number,
	currentWeeklyStreak: number,
	lastClaimedAt: Date | null
): { newStreak: number; newWeeklyStreak: number } => {
	const { isMissed } = getStreakStatus(lastClaimedAt);

	let newStreak = currentStreak + 1;
	let newWeeklyStreak = currentWeeklyStreak;

	if (newStreak >= 7) {
		newWeeklyStreak++;
		newStreak = 0;
	}

	if (isMissed) {
		newStreak = 1;
	}

	return { newStreak, newWeeklyStreak };
};

export const calculateExchangeValues = (
	passes: number
): {
	totalPassCost: number;
	netPassSaleAmount: number;
	exchangeFee: number;
} => {
	const CONVERSION_RATE = 20;
	const FEE_RATE = 0.03;
	const MIN_FEE = 5;

	if (passes <= 0) {
		return {
			totalPassCost: 0,
			netPassSaleAmount: 0,
			exchangeFee: 0,
		};
	}

	const baseAmount = passes * CONVERSION_RATE;
	const exchangeFee = Math.max(Math.ceil(baseAmount * FEE_RATE), MIN_FEE);

	return {
		totalPassCost: baseAmount + exchangeFee,
		netPassSaleAmount: baseAmount - exchangeFee,
		exchangeFee,
	};
};