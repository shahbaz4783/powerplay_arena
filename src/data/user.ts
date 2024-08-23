import { db } from '../lib/db';

export const getUserById = async (telegramId: number) => {
	return await db.user.findUnique({
		where: { telegramId },
	});
};

export const getWalletBalanceById = async (telegramId: number) => {
	return await db.wallet.findUnique({
		where: { userId: telegramId },
	});
};
