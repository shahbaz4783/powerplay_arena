'use server';

import { db } from '@/src/lib/db';
import { revalidatePath } from 'next/cache';
import { betOptions } from '../constants/challenges';
import { FormResponse } from '../lib/types';
import { calculateBettingPassCost } from '../lib/utils';
import { token } from '../lib/constants';

export async function placeBet(
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> {
	try {
		const betAmount = Number(formData.get('betAmount'));
		const challengeName = formData.get('challengeName') as string;
		const selectedSide = formData.get('selectedSide') as string;

		if (!betAmount || !challengeName || !selectedSide) {
			return { message: { error: 'Invalid input data' } };
		}

		const challenge = betOptions.find(
			(option) => option.name === challengeName
		);
		if (!challenge) {
			return { message: { error: 'Invalid challenge' } };
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
				return { message: { error: 'Insufficient balance' } };
			}

			if (profile.bettingPasses < bettingPassCost) {
				return { message: { error: 'Insufficient betting passes' } };
			}

			// Simulate the coin flip
			const isWin = Math.random() <= challenge.odds;
			const winAmount = isWin ? Math.round(betAmount * challenge.payout) : 0;
			const netGain = winAmount - betAmount;

			// Record the bet transaction
			await tx.transaction.create({
				data: {
					telegramId,
					amount: betAmount,
					type: 'BET_PLACED',
					balanceEffect: 'DECREMENT',
					description: `Coin Flip Challenge: ${challengeName}, Side: ${selectedSide}`,
				},
			});

			// Update user's balance and betting passes
			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { increment: netGain },
					bettingPasses: { decrement: bettingPassCost },
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
						success: `Congratulations! You won ${winAmount} ${token.symbol}!`,
					},
				};
			}

			return {
				message: {
					error: `Better luck next time! You lost ${betAmount} ${token.symbol}`,
				},
			};
		});
	} catch (error) {
		console.error('Error placing bet:', error);
		return {
			message: { error: 'An error occurred while placing the bet' },
		};
	}
}
