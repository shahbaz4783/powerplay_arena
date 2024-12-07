'use server';

import { BetType, MatchFormat } from '@prisma/client';
import { db } from '../lib/db';

export const getUserStats = async (telegramId: string) => {
	try {
		const stats = await db.stats.findMany({
			where: { telegramId },
		});

		const formattedStats = stats.reduce((acc, stat) => {
			acc[stat.format] = stat;
			return acc;
		}, {} as Record<string, (typeof stats)[0]>);

		return formattedStats;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user stats info:', error.message);
		} else {
			console.error('Something went wrong while fetching stats info');
		}
		throw error;
	}
};

export const getUserFormatStats = async (userId: string, format: MatchFormat) => {
	try {
		return await db.stats.findUnique({
			where: {
				telegramId_format: {
					telegramId: userId,
					format: format,
				},
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user stats info:', error.message);
		} else {
			console.error('Something went wrong while fetching stats info');
		}
		throw error;
	}
};

export const getUserBettingStats = async (userId: string, betType: BetType) => {
	try {
		return await db.betStats.findUnique({
			where: {
				telegramId_betType: {
					telegramId: userId,
					betType,
				},
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user stats info:', error.message);
		} else {
			console.error('Something went wrong while fetching stats info');
		}
		throw error;
	}
};
