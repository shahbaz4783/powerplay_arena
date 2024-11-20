'use server';

import { db } from '@/src/lib/db';
import { betOptions } from '../constants/challenges';
import { calculateBettingPassCost, calculateLevel } from '../lib/utils';
import { token } from '../constants/app-config';
import { BetType } from '@prisma/client';
import { LevelInfo } from '../types/gameState';

interface FormState {
	message: {
		error?: string;
		success?: string;
	};
	result: 'win' | 'lose' | 'failed' | null;
	winAmount: number;
	xpGain?: number;
	flipResult?: 'heads' | 'tails';
}

export async function placeBet(
	telegramId: bigint,
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	try {
		const betAmount = Number(formData.get('betAmount'));
		const challengeName = formData.get('challengeName') as string;
		const selectedSide = formData.get('selectedSide') as 'heads' | 'tails';

		if (!betAmount || !challengeName || !selectedSide) {
			return {
				message: { error: 'Invalid input data' },
				result: 'failed',
				winAmount: 0,
			};
		}

		const challenge = betOptions.find(
			(option) => option.name === challengeName
		);
		if (!challenge) {
			return {
				message: { error: 'Invalid challenge' },
				result: 'failed',
				winAmount: 0,
			};
		}

		const bettingPassCost = calculateBettingPassCost(betAmount);

		return await db.$transaction(async (tx) => {
			const profile = await tx.profile.findUnique({
				where: { telegramId },
			});

			if (!profile) {
				throw new Error('Profile not found');
			}

			if (profile.balance < betAmount) {
				return {
					message: { error: 'Insufficient balance' },
					result: 'failed',
					winAmount: 0,
				};
			}

			if (profile.powerPass < bettingPassCost) {
				return {
					message: { error: 'Insufficient betting passes' },
					result: 'failed',
					winAmount: 0,
				};
			}

			// Simulate the coin flip
			let flipResult = selectedSide;
			const randomOutcome = Math.random();
			const isWin = randomOutcome <= challenge.odds;

			if (isWin) {
				flipResult === (selectedSide as 'heads' | 'tails');
			} else {
				flipResult = selectedSide === 'heads' ? 'tails' : 'heads';
			}

			const winAmount = isWin ? Math.round(betAmount * challenge.payout) : 0;
			const netGain = winAmount - betAmount;

			const xpGain = Math.floor(
				isWin
					? betAmount * challenge.payout * 0.1
					: betAmount * challenge.payout * 0.02
			);

			const newTotalXP = profile.totalXP + xpGain;
			const newLevelInfo: LevelInfo = calculateLevel(newTotalXP);

			// Update user's balance and betting passes
			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { increment: netGain },
					powerPass: { decrement: bettingPassCost },
					totalXP: { increment: xpGain },
					level: newLevelInfo.level,
					levelName: newLevelInfo.name,
					xpForNextLevel: newLevelInfo.xpForNextLevel,
				},
			});

			await tx.betStats.update({
				where: {
					telegramId_betType: {
						telegramId: telegramId,
						betType: challenge.betType,
					},
				},
				data: {
					betsPlaced: { increment: 1 },
					betsWon: { increment: isWin ? 1 : 0 },
					totalWagered: { increment: betAmount },
					totalEarning: { increment: isWin ? netGain : 0 },
					totalLoss: { increment: !isWin ? betAmount : 0 },
				},
			});

			// Record the result transaction
			if (isWin) {
				await tx.transaction.create({
					data: {
						telegramId,
						amount: netGain,
						type: 'BET_WON',
						balanceEffect: 'INCREMENT',
						description: `${
							isWin ? 'Won' : 'Lost'
						} Coin Flip Challenge: ${challengeName}`,
					},
				});

				return {
					message: {
						success: `Congratulations! Its ${flipResult}. You won ${netGain} ${token.symbol}!`,
					},
					result: 'win',
					winAmount: netGain,
					flipResult,
					xpGain,
				};
			} else {
				await tx.transaction.create({
					data: {
						telegramId,
						amount: betAmount,
						type: 'BET_PLACED',
						balanceEffect: 'DECREMENT',
						description: `Coin Flip Challenge: ${challengeName}, Side: ${selectedSide}`,
					},
				});
				return {
					message: {
						success: `It was ${flipResult}. You lost ${betAmount} ${token.symbol}`,
					},
					result: 'lose',
					winAmount: 0,
					flipResult,
					xpGain,
				};
			}
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: { error: error.message },
				result: 'failed',
				winAmount: 0,
			};
		} else {
			return {
				message: { error: 'An error occurred while placing the bet' },
				result: 'failed',
				winAmount: 0,
			};
		}
	}
}
