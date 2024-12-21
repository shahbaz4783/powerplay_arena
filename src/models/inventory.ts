'use server';

import { UserInventory } from '@prisma/client';
import { db } from '../lib/db';

export const getUserInventory = async (
	telegramId: string
): Promise<UserInventory> => {
	const userInventory = await db.userInventory.findUnique({
		where: { telegramId },
	});

	if (!userInventory)
		throw new Error('Failed to fetch your inventory. Please try again later.');

	return userInventory;
};
