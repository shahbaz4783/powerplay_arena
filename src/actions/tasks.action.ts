"use server";

import { revalidatePath } from "next/cache";
import { token } from '../constants/app-config';
import { db } from "../lib/db";
import { FormResponse } from '../types/types';
import { calculateReward, calculateStreak } from '../lib/utils';
import { saveAwardToDatabase } from './game.action';
import { Milestone } from '../types/db.types';

export const giveTaskReward = async (telegramId: number, reward: number) => {
	await db.profile.update({
		where: { telegramId },
		data: {
			balance: { increment: reward },
		},
	});
};

export const dailyDrop = async (
	telegramId: number,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	try {
		const result = await db.$transaction(async (tx) => {
			const profile = await tx.profile.findUnique({
				where: { telegramId },
			});

			if (!profile) {
				throw new Error('User not found');
			}

			const { streakLength, weeklyStreak, isMissed, canClaim } =
				calculateStreak(
					profile.lastClaimedAt,
					profile.streakLength,
					profile.weeklyStreak
				);

			if (!canClaim) {
				throw new Error('You have already claimed your daily reward');
			}

			const { coins, powerPass } = calculateReward(streakLength);

			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { increment: coins },
					powerPass: { increment: powerPass },
					lastClaimedAt: new Date(),
					streakLength,
					weeklyStreak,
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					amount: coins,
					type: 'REWARD',
					balanceEffect: 'INCREMENT',
					description: `Daily reward claim (Day ${streakLength}): ${coins} ${token.symbol} and ${powerPass} Power Pass`,
				},
			});

			return { coins, powerPass, streakLength, isMissed };
		});

		revalidatePath('/miniapp/reward');
		return {
			message: {
				success: `Congratulations! You've claimed ${result.coins} ${
					token.symbol
				} and ${result.powerPass} Power Pass on Day ${
					result.streakLength
				} of your streak!${
					result.isMissed
						? ' You missed a day, but your new streak starts now!'
						: ''
				}`,
			},
		};
	} catch (error) {
		if (error instanceof Error) {
			return { message: { error: error.message } };
		} else {
			return { message: { error: 'Something Went Wrong' } };
		}
	}
};

export async function claimAwardAction(telegramId: number, award: Milestone) {
	try {
		const response = await saveAwardToDatabase(telegramId, award);
		if (response?.message.error) {
			return { success: true, message: 'Award claimed successfully!' };
		} else {
			return {
				success: false,
				message: response?.message.error || 'Failed to claim award',
			};
		}
	} catch (error) {
		console.error('Error claiming award:', error);
		return {
			success: false,
			message: 'An error occurred while claiming the award',
		};
	}
}