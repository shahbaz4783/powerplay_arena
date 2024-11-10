"use server";

import { db } from "@/src/lib/db";
import { User } from "@telegram-apps/sdk-react";
import { MatchFormat, Transaction } from '@prisma/client';
import { LEVEL_DATA } from '../lib/constants';
import { avatars } from '../constants/shop-items';

export interface PaginatedResponse {
	transactions: Transaction[];
	hasMore: boolean;
}

export const saveOrUpdateUser = async (user: User) => {
	try {
		const formats: MatchFormat[] = ['BLITZ', 'POWERPLAY', 'CLASSIC'];

		const result = await db.$transaction(async (tx) => {
			const upsertedUser = await tx.user.upsert({
				where: { telegramId: user.id },
				update: {
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					languageCode: user.languageCode,
					isPremium: user.isPremium,
				},
				create: {
					telegramId: user.id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					languageCode: user.languageCode || 'en',
					isPremium: user.isPremium,
					profile: {
						create: {
							balance: 100,
							avatarUrl: avatars[0].href,
							powerPass: 5,
							levelName: LEVEL_DATA[0].name,
							xpForNextLevel: LEVEL_DATA[1].xpThreshold,
						},
					},
					stats: {
						create: formats.map((format) => ({
							format,
						})),
					},
					transaction: {
						create: {
							amount: 100,
							type: 'REWARD',
							balanceEffect: 'INCREMENT',
							description: 'Joining bonus',
						},
					},
					award: {
						create: {
							awardId: 'new_player_join',
							title: 'Welcome to the Crease',
							description:
								'Your cricket journey begins with the first step onto the pitch',
						},
					},
				},
			});

			// Fetch the wallet balance within the same transaction
			const walletInfo = await tx.profile.findUnique({
				where: { telegramId: user.id },
				select: { balance: true },
			});

			return { user: upsertedUser, walletBalance: walletInfo?.balance };
		});

		console.log('User data saved/updated successfully');
		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error saving/updating user:', error.message);
		} else {
			console.error('Something went wrong while saving/updating user');
		}
		throw error;
	}
};

export const getUserProfileById = async (telegramId: number) => {
	try {
		const result = await db.$transaction(async (tx) => {
			const userProfile = await tx.profile.findUnique({
				where: { telegramId },
			});

			const userInfo = await tx.user.findUnique({
				where: { telegramId: telegramId },
			});

			if (!userProfile) {
				throw new Error('User wallet not found');
			}

			return { userProfile, userInfo };
		});

		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user info:', error.message);
		} else {
			console.error('Something went wrong while fetching user info');
		}
		throw error;
	}
};

export const getUserTransactionById = async (
	telegramId: bigint,
	page: number = 1,
	pageSize: number = 20
): Promise<PaginatedResponse> => {
	try {
		const skip = (page - 1) * pageSize;
		const transactions = await db.transaction.findMany({
			where: { telegramId },
			orderBy: { createdAt: 'desc' },
			skip,
			take: pageSize + 1,
		});

		const hasMore = transactions.length > pageSize;
		const paginatedTransactions = transactions.slice(0, pageSize);

		return {
			transactions: paginatedTransactions,
			hasMore,
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user transaction info:', error.message);
		} else {
			console.error('Something went wrong while fetching transaction info');
		}
		throw error;
	}
};

export const getUserStats = async (telegramId: number) => {
	try {
		const stats = await db.stats.findMany({
			where: { telegramId },
		});

		const formattedStats = stats.reduce((acc, stat) => {
			acc[stat.format] = stat;
			return acc;
		}, {} as Record<string, (typeof stats)[0]>);

		return formattedStats;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user stats info:', error.message);
		} else {
			console.error('Something went wrong while fetching stats info');
		}
		throw error;
	}
};

export const getUserRankings = async () => {
	try {
		return await db.profile.findMany({
			where: {
				totalXP: {
					gt: 0,
				},
			},
			select: {
				totalXP: true,
				level: true,
				levelName: true,
				avatarUrl: true,
				user: true,
			},
			orderBy: { totalXP: 'desc' },
			take: 20,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user transaction info:', error.message);
		} else {
			console.error('Something went wrong while fetching transaction info');
		}
		throw error;
	}
};

export const getUserFormatStats = async (
	userId: number,
	format: MatchFormat
) => {
	try {
		return await db.stats.findUnique({
			where: {
				telegramId_format: {
					telegramId: BigInt(userId),
					format: format,
				},
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user stats info:', error.message);
		} else {
			console.error('Something went wrong while fetching stats info');
		}
		throw error;
	}
};
