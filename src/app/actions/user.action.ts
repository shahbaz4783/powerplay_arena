'use server';

import { getUserById } from '../data/user';
import { db } from '../lib/db';
import { UserData } from '../lib/types';

export const saveOrUpdateUser = async (user: UserData) => {
	try {
		const existingUser = await getUserById(user.id);

		if (existingUser) {
			await db.user.update({
				where: { telegramId: user.id },
				data: {
					username: user.username,
					firstName: user.first_name,
					lastName: user.last_name,
					languageCode: user.language_code,
					isPremium: user.is_premium,
				},
			});
		} else {
			await db.$transaction(async (db) => {
				await db.user.create({
					data: {
						telegramId: user.id,
						username: user.username,
						firstName: user.first_name,
						lastName: user.last_name,
						languageCode: user.language_code,
						isPremium: user.is_premium,
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
	if (!userId) return null;

	return await db.wallet.findUnique({
		where: { userId },
	});
};