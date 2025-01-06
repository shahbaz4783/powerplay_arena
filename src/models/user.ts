'use server';

import { Transaction } from '@prisma/client';
import { responseMessages } from '../constants/messages';
import { db } from '../lib/db';

export interface PaginatedResponse {
	transactions: Transaction[];
	hasMore: boolean;
}

export const getUserInfoById = async (telegramId: string) => {
	try {
		return await db.user.findUnique({
			where: { telegramId },
			include: {
				referredBy: true,
				referrals: true,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user info:', error.message);
		} else {
			console.error('Something went wrong while fetching user info');
		}
		throw error;
	}
};

export const getUserInfoByInviteCode = async (inviteCode: string) => {
	try {
		return await db.user.findUnique({
			where: { inviteCode },
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user info:', error.message);
		} else {
			console.error('Something went wrong while fetching user info');
		}
		throw error;
	}
};

export const getUserProgressById = async (telegramId: string) => {
	try {
		return await db.userProgression.findUnique({
			where: { telegramId },
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user info:', error.message);
		} else {
			console.error('Something went wrong while fetching user info');
		}
		throw error;
	}
};

// ToDo: Fix Decimal Issue
export const getUserInventoryById = async (telegramId: string) => {
	try {
		return await db.userInventory.findUnique({
			where: { telegramId },
			include: {
				avatars: true,
				powerUps: true,
				badge: true,
				resources: { where: { isRedeem: false } },
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching user inventory:', error.message);
		} else {
			console.error('Something went wrong while fetching user inventory');
		}
		throw error;
	}
};

export const getUserTransactionById = async (
	telegramId: string,
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

export async function fetchClaimedAwards(telegramId: string) {
	if (!telegramId) return [];

	return await db.badge.findMany({
		where: { telegramId },
		orderBy: { createdAt: 'desc' },
	});
}

export const getUserAvatars = async (telegramId: string) => {
	try {
		return await db.avatar.findMany({
			where: {
				telegramId,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(responseMessages.general.error.unexpectedError);
		}
		throw error;
	}
};
