"use server";

import { FormResponse, ServerResponseType } from '@/src/types/types';
import { db } from '../lib/db';
import { GameState, LevelInfo } from '../types/gameState';
import { redirect } from 'next/navigation';
import { GameOutcome, MatchFormat } from '@prisma/client';
import { calculateLevel, calculateCricketXPGain } from '../lib/utils';
import { revalidatePath } from 'next/cache';
import { Milestone } from '../types/db.types';
import { token } from '../constants/app-config';
import { getUserInventoryById } from '../db/user';
import { initializeUserStats } from '../db/stats';
import { cricketMatchRewards } from '../lib/game-logics';

export async function startQuickMatch(
	telegramId: string,
	prevState: ServerResponseType,
	formData: FormData
): Promise<ServerResponseType> {
	try {
		const formatValue = formData.get('format');
		const entryFee = parseInt(formData.get('entryFee') as string);
		const passRequired = parseInt(formData.get('passRequired') as string);
		const matchFormat: MatchFormat = formatValue as MatchFormat;

		const inventory = await getUserInventoryById(telegramId);
		if (
			!inventory ||
			inventory.powerCoin < entryFee ||
			inventory.powerPass < passRequired
		) {
			const errorMessage = !inventory
				? 'Cannot find your inventory data.'
				: inventory.powerCoin < entryFee
				? `You don't have enough ${token.name}`
				: `You don't have enough ${token.pass}`;

			return { success: false, message: errorMessage };
		}

		const result = await db.$transaction(async (tx) => {
			await tx.userInventory.update({
				where: { telegramId: inventory.telegramId },
				data: {
					powerCoin: { decrement: entryFee },
					powerPass: { decrement: passRequired },
				},
			});

			const newMatch = await tx.cricketMatchRecord.create({
				data: {
					format: matchFormat,
					feePaid: true,
					user: {
						connect: {
							telegramId,
						},
					},
				},
			});

			return newMatch;
		});

		console.log(result.matchId);
		return {
			success: true,
			message: result.matchId,
		};
	} catch (error) {
		if (error instanceof Error) {
			return { success: false, error: { details: error.message } };
		} else {
			return { success: false, error: { details: 'Something went wrong' } };
		}
	}
}

export async function updateMatchData(
	matchId: string,
	gameState: GameState,
	isAbandoned: boolean = false
): Promise<{ success: boolean; message: string; rewards?: number }> {
	try {
		const existingMatch = await db.cricketMatchRecord.findUnique({
			where: { matchId },
			select: { outcome: true, telegramId: true },
		});

		if (existingMatch && existingMatch.outcome !== 'ONGOING') {
			return {
				success: false,
				message: 'This match has already been completed and cannot be updated.',
			};
		}

		const { player, opponent, matchResult, matchSetup } = gameState;

		let outcome: GameOutcome;
		if (isAbandoned) {
			outcome = 'ABANDONED';
		} else if (matchResult.winner === 'player') {
			outcome = 'WON';
		} else if (matchResult.winner === 'opponent') {
			outcome = 'LOST';
		} else {
			outcome = 'TIE';
		}

		const { totalEarnings, totalXP } = cricketMatchRewards(gameState);

		const result = await db.$transaction(async (tx) => {
			const progress = await tx.userProgression.findUnique({
				where: { telegramId: existingMatch?.telegramId },
			});

			const updatedMatch = await tx.cricketMatchRecord.update({
				where: { matchId },
				data: {
					runsScored: player.runs,
					ballsFaced: player.ballsFaced,
					sixes: player.sixes,
					fours: player.fours,
					wicketsTaken: opponent.wickets,
					runsConceded: opponent.runs,
					ballsBowled: opponent.ballsFaced,
					outcome,
					lastUpdated: new Date(),
				},
			});

			// Only update stats if the game is finished (not abandoned and has a result)
			if (!isAbandoned && outcome !== 'ABANDONED') {
				// Fetch current stats
				const currentStats = await tx.cricketMatchStats.findUnique({
					where: {
						telegramId_format: {
							telegramId: updatedMatch.telegramId,
							format: matchSetup.format as MatchFormat,
						},
					},
				});

				if (!currentStats) {
					await initializeUserStats(
						updatedMatch.telegramId,
						matchSetup.format as MatchFormat
					);
				}

				await tx.cricketMatchStats.update({
					where: {
						telegramId_format: {
							telegramId: updatedMatch.telegramId,
							format: matchSetup.format as MatchFormat,
						},
					},
					data: {
						matchesPlayed: { increment: 1 },
						matchesWon: { increment: outcome === 'WON' ? 1 : 0 },
						matchesLost: { increment: outcome === 'LOST' ? 1 : 0 },
						matchesTie: { increment: outcome === 'TIE' ? 1 : 0 },
						runsScored: { increment: player.runs },
						highestRunsScored: Math.max(
							currentStats?.highestRunsScored ?? 0,
							player.runs
						),
						ballsFaced: { increment: player.ballsFaced },
						sixes: { increment: player.sixes },
						fours: { increment: player.fours },

						wicketsTaken: { increment: opponent.wickets },
						runsConceded: { increment: opponent.runs },
						lowestRunsConceded:
							(currentStats?.lowestRunsConceded ?? 0) === 0
								? opponent.runs
								: Math.min(
										currentStats?.lowestRunsConceded ?? 0,
										opponent.runs
								  ),
						highestWicketsTaken: Math.max(
							currentStats?.highestWicketsTaken ?? 0,
							opponent.wickets
						),
						ballsBowled: { increment: opponent.ballsFaced },

						...(opponent.wickets > (currentStats?.bestBowlingWickets ?? 0) ||
						(opponent.wickets === (currentStats?.bestBowlingWickets ?? 0) &&
							opponent.runs < (currentStats?.bestBowlingRuns ?? Infinity))
							? {
									bestBowlingWickets: opponent.wickets,
									bestBowlingRuns: opponent.runs,
							  }
							: {}),
					},
				});

				await tx.userInventory.update({
					where: { telegramId: updatedMatch.telegramId },
					data: {
						powerCoin: { increment: totalEarnings },
					},
				});

				// Record the transaction
				await tx.transaction.create({
					data: {
						telegramId: updatedMatch.telegramId,
						amount: totalEarnings,
						balanceEffect: 'INCREMENT',
						type: 'MATCH_EARNINGS',
						description: `Earnings from match ${matchId}`,
						matchId,
					},
				});

				const newTotalXP = progress?.totalXP! + totalXP;
				const newLevelInfo: LevelInfo = calculateLevel(newTotalXP);

				await tx.userProgression.update({
					where: { telegramId: updatedMatch.telegramId },
					data: {
						totalXP: { increment: totalXP },
						level: newLevelInfo.level,
						levelName: newLevelInfo.name,
						xpForNextLevel: newLevelInfo.xpForNextLevel,
					},
				});
			}

			return { updatedMatch, totalEarnings };
		});

		return {
			success: true,
			message:
				'Match data updated, stats updated, and rewards distributed successfully',
			rewards: result.totalEarnings,
		};
	} catch (error) {
		console.error('Error updating match data:', error);
		return {
			success: false,
			message: 'Failed to update match data, stats, and distribute rewards',
		};
	}
}

export async function saveAwardToDatabase(telegramId: string, challenge: Milestone) {
	try {
		if (!telegramId) return { message: { error: 'No user Found' } };
		console.log('Saving challenge:', challenge);

		const existingAward = await db.badge.findFirst({
			where: {
				telegramId,
				awardId: challenge.id,
			},
		});

		if (existingAward) {
			return { message: { error: 'This award has already been claimed' } };
		}

		await db.$transaction(async (tx) => {
			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { increment: challenge.reward },
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					amount: challenge.reward,
					type: 'REWARD',
					balanceEffect: 'INCREMENT',
					description: `Reward for completing ${challenge.title} challenge`,
				},
			});

			await tx.badge.create({
				data: {
					telegramId,
					awardId: challenge.id,
					title: challenge.title,
					description: challenge.description,
				},
			});
		});
	} catch (error) {
		if (error instanceof Error) {
			return { message: { error: error.message } };
		} else {
			return {
				message: {
					error: 'Failed to claim reward. Please try again.',
				},
			};
		}
	}
	revalidatePath('/miniapp/achievements');
}