'use server';

import { getUserById, getWalletBalanceById } from '@/src/data/user';
import { db } from '@/src/lib/db';
import { User } from '@telegram-apps/sdk-react';

export const saveOrUpdateUser = async (user: User) => {
	try {
		const existingUser = await getUserById(user.id);

		if (existingUser) {
			await db.user.update({
				where: { telegramId: user.id },
				data: {
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					languageCode: user.languageCode,
					isPremium: user.isPremium,
				},
			});
		} else {
			await db.$transaction(async (db: any) => {
				await db.user.create({
					data: {
						telegramId: user.id,
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						languageCode: user.languageCode || 'en',
						isPremium: user.isPremium,
					},
				});

				await db.wallet.create({
					data: {
						userId: user.id,
						balance: 100,
					},
				});
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		} else {
			console.log('Something Went Wrong');
		}
	} finally {
		await db.$disconnect();
	}
};

export const getUserInfoById = async (userId: number) => {
	return db.wallet.findUnique({
		where: { userId },
		select: { balance: true },
	});
};
