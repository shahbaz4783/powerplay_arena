"use server";

import { revalidatePath } from "next/cache";
import { token } from '../constants/app-config';
import { db } from "../lib/db";
import { FormResponse } from '../types/types';
import { calculateReward } from "../lib/utils";
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

			const now = new Date();
			const lastClaimedAt = profile.lastClaimedAt
				? new Date(profile.lastClaimedAt)
				: null;

			if (lastClaimedAt) {
				const startOfToday = new Date(
					Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
				);
				const endOfToday = new Date(
					Date.UTC(
						now.getUTCFullYear(),
						now.getUTCMonth(),
						now.getUTCDate() + 1
					)
				);

				if (lastClaimedAt >= startOfToday && lastClaimedAt < endOfToday) {
					throw new Error('You have already claimed your daily reward');
				}
			}

			let streakLength = profile.streakLength;
			let weeklyStreak = profile.weeklyStreak;
			streakLength++;

			if (streakLength > 7) {
				streakLength = 1;
				weeklyStreak++;
			}

			const reward = calculateReward(streakLength);

			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { increment: reward },
					lastClaimedAt: now,
					streakLength,
					weeklyStreak,
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					amount: reward,
					type: 'REWARD',
					balanceEffect: 'INCREMENT',
					description: `Daily reward claim (Day ${streakLength})`,
				},
			});

			return { reward, streakLength };
		});

		revalidatePath('/miniapp/reward');
		return {
			message: {
				success: `Congratulations! You've claimed ${result.reward} ${token.symbol} on Day ${result.streakLength} of your streak!`,
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