'use server';

import { db } from '@/src/lib/db';
import { BetType, MatchFormat } from '@prisma/client';

export async function initializeUserStats(
	telegramId: string,
	format: MatchFormat
) {
	try {
		await db.cricketMatchStats.create({
			data: {
				telegramId,
				format,
			},
		});
		console.log(`Initialized stats for user ${telegramId} in ${format} format`);
	} catch (error) {
		console.error(`Error initializing stats for user ${telegramId}:`, error);
		throw error;
	}
}

export async function initializeBettingStats(
	telegramId: string,
	betType: BetType
) {
	try {
		await db.betStats.create({
			data: {
				telegramId,
				betType,
			},
		});
		console.log(
			`Initialized betting stats for user ${telegramId} in ${betType} format`
		);
	} catch (error) {
		console.error(`Error initializing stats for user ${telegramId}:`, error);
		throw error;
	}
}

export const getCricketStatsByFormat = async (
	telegramId: string,
	format: MatchFormat
) => {
	return await db.cricketMatchStats.findUnique({
		where: {
			telegramId_format: {
				telegramId,
				format,
			},
		},
	});
};

export const getUserBettingStats = async (
	telegramId: string,
	betType: BetType
) => {
	return await db.betStats.findUnique({
		where: {
			telegramId_betType: {
				telegramId,
				betType,
			},
		},
	});
};
