'use server';

import { db } from '@/src/lib/db';
import { MatchFormat } from '@prisma/client';

export async function initializeUserStats(
	telegramId: string,
	format: MatchFormat
) {
	try {
		await db.cricketMatchStats.create({
			data: {
				telegramId,
				format,
				matchesPlayed: 0,
				matchesWon: 0,
				matchesLost: 0,
				matchesTie: 0,
				runsScored: 0,
				highestRunsScored: 0,
				ballsFaced: 0,
				sixes: 0,
				fours: 0,
				wicketsTaken: 0,
				runsConceded: 0,
				lowestRunsConceded: 0,
				highestWicketsTaken: 0,
				ballsBowled: 0,
				hattrick: 0,
				maidenOver: 0,
			},
		});
		console.log(`Initialized stats for user ${telegramId} in ${format} format`);
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
