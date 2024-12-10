"use server";

import { FormResponse, ServerResponseType } from '@/src/types/types';
import { db } from '../lib/db';
import { GameState, LevelInfo } from '../types/gameState';
import { redirect } from 'next/navigation';
import { MatchFormat } from '@prisma/client';
import {
	calculateLevel,
	calculateXPGain,
	capitalizeFirstLetter,
	isValidMatchFormat,
} from '../lib/utils';
import { calculateRewards } from '../lib/game-logics';
import { revalidatePath } from 'next/cache';
import { Milestone } from '../types/db.types';
import { token } from '../constants/app-config';
import { v4 as uuidv4 } from 'uuid';
import { getUserInventoryById } from '../db/user';

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

export async function saveMatchDataToDatabase(
	gameState: GameState,
	telegramId: string
): Promise<FormResponse> {
	try {
		if (!telegramId) return { message: { error: 'No user Found' } };
		await db.$transaction(async (tx) => {
			// Update stats
			await tx.cricketMatchStats.update({
				where: {
					telegramId_format: {
						telegramId,
						format: gameState.matchSetup.format as MatchFormat,
					},
				},
				data: {
					matchesPlayed: { increment: 1 },
					matchesWon:
						gameState.matchResult.winner === 'player'
							? { increment: 1 }
							: undefined,
					matchesLost:
						gameState.matchResult.winner === 'opponent'
							? { increment: 1 }
							: undefined,
					matchesTie:
						gameState.matchResult.winner === 'tie'
							? { increment: 1 }
							: undefined,
					runsScored: { increment: gameState.player.runs },
					ballsFaced: { increment: gameState.player.ballsFaced },
					sixes: { increment: gameState.player.sixes },
					fours: { increment: gameState.player.fours },
					wicketsTaken: { increment: gameState.opponent.wickets },
					runsConceded: { increment: gameState.opponent.runs },
					ballsBowled: { increment: gameState.opponent.ballsFaced },
				},
			});

			// Calculate rewards and add to the wallet and create a transaction
			const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
				calculateRewards(gameState);
			const totalReward =
				sixerReward + fourReward + wicketTakenReward + winMarginReward;

			if (totalReward > 0) {
				await tx.userInventory.update({
					where: { telegramId },
					data: {
						powerCoin: { increment: totalReward },
					},
				});
				await tx.transaction.create({
					data: {
						telegramId,
						amount: totalReward,
						type: 'MATCH_EARNINGS',
						balanceEffect: 'INCREMENT',
						description: `Earnings from ${gameState.matchSetup.format.toLowerCase()} match`,
					},
				});
			}

			// Calculate XP and check for level up
			const xpGain = calculateXPGain(gameState);

			const currentXPRecord = await tx.userProgression.findUnique({
				where: { telegramId },
			});

			if (!currentXPRecord) {
				throw new Error('XP record not found for user');
			}

			const oldTotalXP = currentXPRecord.totalXP;
			const newTotalXP = oldTotalXP + xpGain;

			// Calculate new level info
			const newLevelInfo: LevelInfo = calculateLevel(newTotalXP);

			await tx.userProgression.update({
				where: { telegramId },
				data: {
					totalXP: newTotalXP,
					level: newLevelInfo.level,
					levelName: newLevelInfo.name,
					xpForNextLevel: newLevelInfo.xpForNextLevel,
				},
			});
		});
	} catch (error) {
		if (error instanceof Error) {
			return { message: { error: error.message } };
		} else {
			return {
				message: {
					error: 'Failed to end match and claim reward. Please try again.',
				},
			};
		}
	}
	revalidatePath('/', 'layout');
	redirect('/miniapp');
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