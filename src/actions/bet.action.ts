'use server';

import { db } from '@/src/lib/db';
import { betOptions } from '../constants/challenges';
import { calculateBettingPassCost, calculateLevel } from '../lib/utils';
import { token } from '../constants/app-config';
import { responseMessages } from '../constants/messages';
import * as models from '../models';
import { ServerResponseType } from '../types/types';

interface FormState {
	result: 'win' | 'lose' | 'invalid' | null;
	winAmount: number;
	xpGain: number;
	flipResult?: 'heads' | 'tails';
}

export async function placeBet(
	telegramId: string,
	prevState: ServerResponseType<FormState>,
	formData: FormData
): Promise<ServerResponseType<FormState>> {
	try {
		const betAmount = Number(formData.get('betAmount'));
		const challengeName = formData.get('challengeName') as string;
		const selectedSide = formData.get('selectedSide') as 'heads' | 'tails';
		const challenge = betOptions.find(
			(option) => option.name === challengeName
		);

		if (!betAmount || !challengeName || !selectedSide || !challenge) {
			return {
				success: false,
				message: 'Invalid input data',
				data: {
					result: 'invalid',
					winAmount: 0,
					xpGain: 0,
				},
			};
		}

		const bettingPassCost = calculateBettingPassCost(betAmount);
		const user = await models.getUserInfoById(telegramId);
		const inventory = await models.getUserInventory(telegramId);
		const progress = await models.getUserProgression(telegramId);
		const { referralRewardActive, referrerId } = await models.getReferralData(
			telegramId
		);

		let currentStats = await models.getUserBettingStats(
			telegramId,
			challenge.betType
		);

		// Validate sufficient resources
		const errors = [];
		if (inventory.powerCoin < betAmount)
			errors.push(responseMessages.transaction.error.insufficientBalance);
		if (inventory.powerPass < bettingPassCost)
			errors.push(responseMessages.transaction.error.insufficientPass);
		if (errors.length) {
			return {
				success: false,
				message: errors.join(' '),
				data: {
					result: 'invalid',
					winAmount: 0,
					xpGain: 0,
				},
			};
		}

		// Initialize stats if not available
		if (!currentStats) {
			await models.initializeBettingStats(telegramId, challenge.betType);
		}

		// Simulate the coin flip
		const randomOutcome = Math.random();
		const isWin = randomOutcome <= challenge.odds;
		const flipResult = isWin
			? selectedSide
			: selectedSide === 'heads'
			? 'tails'
			: 'heads';

		const winAmount = isWin ? Math.round(betAmount * challenge.payout) : 0;
		const netGain = winAmount - betAmount;
		const xpGain = Math.floor(
			betAmount * (isWin ? challenge.payout * 0.1 : 0.02)
		);
		const bonusForReferrer = Math.round(netGain * 0.1);

		// Calculate new level information
		const newTotalXP = progress.totalXP + xpGain;
		const newLevelInfo = calculateLevel(newTotalXP);

		return await db.$transaction(async (tx) => {
			// Update Referral bonus for first 4 weeks
			if (
				bonusForReferrer >= 1 &&
				isWin &&
				referralRewardActive &&
				referrerId
			) {
				await tx.userInventory.update({
					where: { telegramId: referrerId },
					data: {
						powerCoin: { increment: bonusForReferrer },
					},
				});

				await tx.referralRecord.updateMany({
					where: {
						referrerId: referrerId,
						referredId: telegramId,
					},
					data: {
						totalEarnedCoins: { increment: bonusForReferrer },
					},
				});

				await tx.transaction.create({
					data: {
						telegramId: referrerId,
						coinAmount: bonusForReferrer,
						type: 'REWARD',
						description: `Bonus from ${user?.firstName}. Won Coin Flip ${challengeName} Challenge. `,
					},
				});
			}

			// Update user progression
			await tx.userProgression.update({
				where: { telegramId },
				data: {
					totalXP: { increment: xpGain },
					level: newLevelInfo.level,
					levelName: newLevelInfo.name,
					xpForNextLevel: newLevelInfo.xpForNextLevel,
				},
			});

			// Update user inventory
			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { increment: netGain },
					powerPass: { decrement: bettingPassCost },
				},
			});

			// Update betting stats
			await tx.betStats.update({
				where: {
					telegramId_betType: {
						telegramId,
						betType: challenge.betType,
					},
				},
				data: {
					betsPlaced: { increment: 1 },
					betsWon: { increment: isWin ? 1 : 0 },
					totalWagered: { increment: betAmount },
					totalEarning: { increment: isWin ? netGain : 0 },
					totalLoss: { increment: isWin ? 0 : betAmount },
				},
			});

			// Log transaction
			await tx.transaction.create({
				data: {
					telegramId,
					coinAmount: netGain,
					passAmount: -bettingPassCost,
					type: 'GAME',
					description: `${
						isWin ? 'Won' : 'Lost'
					} Coin Flip Challenge: ${challengeName}`,
				},
			});

			const successMessage = isWin
				? `Congratulations! It's ${flipResult}. You won ${netGain} ${token.symbol}!`
				: `It was ${flipResult}. You lost ${betAmount} ${token.symbol}`;

			return {
				success: true,
				message: successMessage,
				data: {
					message: { success: successMessage },
					result: isWin ? 'win' : 'lose',
					winAmount: netGain,
					flipResult,
					xpGain,
				},
			};
		});
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error ? error.message : 'Unexpected error occurred',
			data: {
				result: null,
				winAmount: 0,
				xpGain: 0,
			},
		};
	}
}
