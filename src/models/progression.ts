'use server';

import { UserProgression } from '@prisma/client';
import { db } from '../lib/db';

export const getUserProgression = async (
	telegramId: string
): Promise<UserProgression> => {
	const userProgression = await db.userProgression.findUnique({
		where: { telegramId },
	});

	if (!userProgression)
		throw new Error('Failed to fetch your inventory. Please try again later.');

	return userProgression;
};
