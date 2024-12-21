"use server";

import { revalidatePath } from "next/cache";
import { token } from '../constants/app-config';
import { db } from "../lib/db";
import { FormResponse } from '../types/types';
import {
	calculateReward,
	getStreakStatus,
	incrementStreak,
} from '../lib/utils';
import { saveAwardToDatabase } from './game.action';
import { Milestone } from '../types/db.types';

export const dailyDrop = async (
	telegramId: string,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	try {
		const profile = await db.userProgression.findUnique({
			where: { telegramId },
		});

		if (!profile) {
			throw new Error('User not found');
		}

		const { canClaim, isMissed } = getStreakStatus(profile.lastClaimedAt);

		if (!canClaim) {
			throw new Error('You have already claimed your daily reward');
		}

		const { newStreak, newWeeklyStreak } = incrementStreak(
			profile.streakLength,
			profile.weeklyStreak,
			profile.lastClaimedAt
		);

		const { coins, powerPass } = calculateReward(newStreak);

		const result = await db.$transaction(async (tx) => {
			await tx.userProgression.update({
				where: { telegramId },
				data: {
					lastClaimedAt: new Date(),
					streakLength: newStreak,
					weeklyStreak: newWeeklyStreak,
				},
			});

			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { increment: coins },
					powerPass: { increment: powerPass },
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					type: 'REWARD',
					description: `Daily reward claim (Day ${
						newStreak === 0 ? '7' : newStreak
					}): ${coins} ${token.symbol} and ${powerPass} Power Pass`,
				},
			});

			return { coins, powerPass, newStreak, isMissed };
		});

		revalidatePath('/miniapp/reward');
		return {
			message: {
				success: `You've got ${result.coins} ${token.symbol} and ${
					result.powerPass
				} Power Pass on Day ${result.newStreak} of your streak!${
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
			return {
				message: {
					error:
						'Something Went Wrong. Please check your internet connection or try again later.',
				},
			};
		}
	}
};

export async function claimAwardAction(telegramId: string, award: Milestone) {
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