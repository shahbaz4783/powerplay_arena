'use server';

import { db } from '@/src/lib/db';
import { betOptions } from '../constants/challenges';
import { calculateBettingPassCost } from '../lib/utils';
import { token } from '../lib/constants';

interface FormState {
	message: {
		error?: string;
		success?: string;
	};
	result: 'win' | 'lose' | null;
	winAmount: number;
}

export async function placeBet(
	telegramId: bigint,
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	try {
		const betAmount = Number(formData.get('betAmount'));
		const challengeName = formData.get('challengeName') as string;
		const selectedSide = formData.get('selectedSide') as string;

		if (!betAmount || !challengeName || !selectedSide) {
			return {
				message: { error: 'Invalid input data' },
				result: null,
				winAmount: 0,
			};
		}

		const challenge = betOptions.find(
			(option) => option.name === challengeName
		);
		if (!challenge) {
			return {
				message: { error: 'Invalid challenge' },
				result: null,
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
					result: null,
					winAmount: 0,
				};
			}

			if (profile.powerPass < bettingPassCost) {
				return {
					message: { error: 'Insufficient betting passes' },
					result: null,
					winAmount: 0,
				};
			}

			// Simulate the coin flip
			const isWin = Math.random() <= challenge.odds;
			const winAmount = isWin ? Math.round(betAmount * challenge.payout) : 0;
			const netGain = winAmount - betAmount;

			// Update user's balance and betting passes
			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { increment: netGain },
					powerPass: { decrement: bettingPassCost },
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
						success: `Congratulations! You won ${netGain} ${token.symbol}!`,
					},
					result: 'win',
					winAmount: netGain,
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
						error: `Better luck next time! You lost ${betAmount} ${token.symbol}`,
					},
					result: 'lose',
					winAmount: 0,
				};
			}
		});
	} catch (error) {
		console.error('Error placing bet:', error);
		return {
			message: { error: 'An error occurred while placing the bet' },
			result: null,
			winAmount: 0,
		};
	}
}
