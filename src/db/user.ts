'use server';

import { Transaction } from '@prisma/client';
import { responseMessages } from '../constants/messages';
import { db } from '../lib/db';

export interface PaginatedResponse {
	transactions: Transaction[];
	hasMore: boolean;
}

export const getUserProfileById = async (telegramId: number) => {
	try {
		return await db.profile.findUnique({
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

export const getUserInfoById = async (telegramId: number) => {
	try {
		return await db.user.findUnique({
			where: { telegramId: telegramId },
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

export async function fetchClaimedAwards(telegramId: number) {
	if (!telegramId) return [];

	return await db.award.findMany({
		where: { telegramId },
		orderBy: { createdAt: 'desc' },
	});
}

export const getUserAvatars = async (telegramId: number) => {
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
