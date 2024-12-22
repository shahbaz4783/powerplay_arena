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
import { getUserInventoryById } from '../models/user';
import { initializeCricketStats } from '../models/stats';
import { cricketMatchRewards } from '../lib/game-logics';
import * as models from '@/src/models';
import { responseMessages } from '../constants/messages';

interface CricketMatchData {
	matchId: string;
}
export async function setupCricketMatch(
	telegramId: string,
	prevState: ServerResponseType<CricketMatchData>,
	formData: FormData
): Promise<ServerResponseType<CricketMatchData>> {
	try {
		const formatValue = formData.get('format') as MatchFormat;
		const entryFee = parseInt(formData.get('entryFee') as string);
		const passRequired = parseInt(formData.get('passRequired') as string);

		const inventory = await models.getUserInventory(telegramId);

		// Validate sufficient resources
		const errors = [];
		if (inventory.powerCoin < entryFee)
			errors.push(responseMessages.transaction.error.insufficientBalance);
		if (inventory.powerPass < passRequired)
			errors.push(responseMessages.transaction.error.insufficientPass);
		if (errors.length) {
			return {
				success: false,
				message: errors.join(' '),
			};
		}

		const result = await db.$transaction(async (tx) => {
			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { decrement: entryFee },
					powerPass: { decrement: passRequired },
				},
			});

			return await tx.cricketMatchRecord.create({
				data: {
					format: formatValue,
					user: { connect: { telegramId } },
				},
			});
		});

		return {
			success: true,
			message: 'Match started successfully',
			data: { matchId: result.matchId },
		};
	} catch (error) {
		console.error('Error starting quick match:', error);
		return {
			success: false,
			message:
				error instanceof Error ? error.message : 'An unexpected error occurred',
		};
	}
}

export async function updateCricketMatchData(
	matchId: string,
	gameState: GameState
): Promise<ServerResponseType<{ rewards?: number }>> {
	try {
		const existingMatch = await db.cricketMatchRecord.findUnique({
			where: { matchId },
			select: { outcome: true, telegramId: true },
		});

		if (existingMatch && existingMatch.outcome !== 'ONGOING') {
			return {
				success: false,
				message: 'The match has already been completed and cannot be updated.',
			};
		}

		const {
			player,
			opponent,
			matchResult,
			matchSetup,
			toss: { playMode },
		} = gameState;

		let outcome: GameOutcome;
		if (matchResult.winner === 'player') {
			outcome = 'WON';
		} else if (matchResult.winner === 'opponent') {
			outcome = 'LOST';
		} else if (matchResult.winner === 'tie') {
			outcome = 'TIE';
		} else {
			outcome = 'ONGOING';
		}

		const { totalEarnings, totalXP } = cricketMatchRewards(gameState);

		const currentStats = await models.getCricketStatsByFormat(
			existingMatch?.telegramId!,
			matchSetup.format as MatchFormat
		);
		const progress = await models.getUserProgression(
			existingMatch?.telegramId!
		);

		if (!currentStats) {
			await models.initializeCricketStats(
				existingMatch?.telegramId!,
				matchSetup.format as MatchFormat
			);
		}

		const result = await db.$transaction(async (tx) => {
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
				},
			});

			// Only update stats if the game is finished
			if (outcome !== 'ONGOING') {
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
						ballsFaced: { increment: player.ballsFaced },
						sixes: { increment: player.sixes },
						fours: { increment: player.fours },

						highestRunsScored: Math.max(
							currentStats?.highestRunsScored ?? 0,
							player.runs
						),
						wicketsTaken: { increment: opponent.wickets },
						runsConceded: { increment: opponent.runs },
						ballsBowled: { increment: opponent.ballsFaced },

						lowestRunsConceded:
							(playMode !== 'defend' && matchResult.winner !== 'opponent') ||
							(playMode === 'defend' && matchResult.winner === 'opponent')
								? Math.min(
										currentStats?.lowestRunsConceded ?? Infinity,
										opponent.runs
								  )
								: currentStats?.lowestRunsConceded,

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
						coinAmount: totalEarnings,
						type: 'GAME',
						description: `Earnings from match ${matchId}`,
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
			data: {
				rewards: result.totalEarnings,
			},
		};
	} catch (error) {
		console.error('Error updating match data:', error);
		return {
			success: false,
			message: 'Failed to update match data, stats, and distribute rewards',
		};
	}
}

export async function saveAwardToDatabase(
	telegramId: string,
	challenge: Milestone
) {
	try {
		if (!telegramId) return { message: { error: 'No user Found' } };
		console.log('Saving challenge:', challenge);

		const existingAward = await db.badge.findFirst({
			where: {
				telegramId,
				badgeId: challenge.id,
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
					type: 'REWARD',
					description: `Reward for completing ${challenge.title} challenge`,
				},
			});

			await tx.badge.create({
				data: {
					telegramId,
					badgeId: challenge.id,
					title: challenge.title,
					description: challenge.description,
					photoUrl: '',
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