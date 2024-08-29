'use server'

import { db } from '../lib/db';

export const giveTaskReward = async (telegramId: number, reward: number) => {
	await db.wallet.update({
		where: { userId: telegramId },
		data: {
			balance: { increment: reward },
		},
	});
};

export const dailyDrop = async (telegramId: number, formData: FormData) => {
	const reward = Math.floor(Math.random() * 41) + 10;
	await db.wallet.update({
		where: { userId: telegramId },
		data: {
			balance: { increment: reward },
		},
	});
};
