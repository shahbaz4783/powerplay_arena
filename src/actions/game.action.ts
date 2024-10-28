"use server";

import { FormResponse } from "@/src/lib/types";
import { db } from "../lib/db";
import { GameState, LevelInfo } from "../types/gameState";
import { redirect } from "next/navigation";
import { MatchFormat } from "@prisma/client";
import {
  calculateLevel,
  calculateXPGain,
  capitalizeFirstLetter,
  hasLeveledUp,
  isValidMatchFormat,
} from "../lib/utils";
import { calculateRewards } from "../lib/game-logics";
import { revalidatePath } from "next/cache";
import { Milestone } from "../types/db.types";

export async function startQuickMatch(
	telegramId: number,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> {
	try {
		const user = await db.user.findUnique({
			where: { telegramId: BigInt(telegramId) },
			include: { wallet: true },
		});

		if (!user) {
			return { message: { error: 'No user found' } };
		}
		const formatValue = formData.get('format');
		const entryFee = parseInt(formData.get('entryFee') as string);

		if (user.wallet!.balance < entryFee) {
			return { message: { error: 'Insufficient balance' } };
		}

		if (
			!formatValue ||
			typeof formatValue !== 'string' ||
			!isValidMatchFormat(formatValue)
		) {
			return { message: { error: 'Invalid match format' } };
		}

		const matchFormat: MatchFormat = formatValue as MatchFormat;

		console.log(matchFormat);

		if (isNaN(entryFee)) {
			return { message: { error: 'Invalid entry fee' } };
		}

		if (user.wallet!.balance < entryFee) {
			return { message: { error: 'Insufficient balance' } };
		}

		await db.$transaction(async (tx) => {
			await tx.wallet.update({
				where: { userId: user.telegramId },
				data: { balance: { decrement: entryFee } },
			});

			await tx.transaction.create({
				data: {
					userId: user.telegramId,
					amount: entryFee,
					type: 'MATCH_FEE',
					description: `${capitalizeFirstLetter(matchFormat)} match entry fees`,
				},
			});
		});
	} catch (error) {
		if (error instanceof Error) {
			return { message: { error: error.message } };
		} else {
			return { message: { error: 'Something went wrong' } };
		}
	}
	redirect('/game');
}

export async function saveMatchDataToDatabase(
	gameState: GameState,
	userId: bigint
): Promise<FormResponse> {
	try {
		if (!userId) return { message: { error: 'No user Found' } };
		await db.$transaction(async (tx) => {
			// Update stats
			await tx.stats.update({
				where: {
					userId_format: {
						userId,
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
				await tx.wallet.update({
					where: { userId },
					data: {
						balance: { increment: totalReward },
					},
				});
				await tx.transaction.create({
					data: {
						userId: userId,
						amount: totalReward,
						type: 'MATCH_WINNINGS',
						description: `Earnings from ${gameState.matchSetup.format.toLowerCase()} match`,
					},
				});
			}

			// Calculate XP and check for level up
			const xpGain = calculateXPGain(gameState);

			const currentXPRecord = await tx.xP.findUnique({
				where: { userId },
			});

			if (!currentXPRecord) {
				throw new Error('XP record not found for user');
			}

			const oldTotalXP = currentXPRecord.totalXP;
			const newTotalXP = oldTotalXP + xpGain;

			// Calculate new level info
			const newLevelInfo: LevelInfo = calculateLevel(newTotalXP);

			console.table(newLevelInfo);

			await tx.xP.update({
				where: { userId },
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

export async function saveAwardToDatabase(
	userId: number,
	challenge: Milestone
) {
	try {
		if (!userId) return { message: { error: 'No user Found' } };
		console.log('Saving challenge:', challenge);

		await db.$transaction(async (tx) => {
			await tx.wallet.update({
				where: { userId },
				data: {
					balance: { increment: challenge.reward },
				},
			});

			await tx.transaction.create({
				data: {
					userId: userId,
					amount: challenge.reward,
					type: 'REWARD',
					description: `Reward for completing ${challenge.title} challenge`,
				},
			});

			await tx.award.create({
				data: {
					userId,
					awardId: challenge.id,
					title: challenge.title,
					description: challenge.description,
				},
			});
		});
		return { message: { success: 'Challenge saved successfully' } };
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
}

export async function fetchClaimedAwards(userId: number) {
	if (!userId) return [];

	return await db.award.findMany({
		where: { userId },
	});
}