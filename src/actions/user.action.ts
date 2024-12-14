"use server";

import { db } from '@/src/lib/db';
import { responseMessages } from '../constants/messages';
import { revalidatePath } from 'next/cache';


export const updateAvatar = async (telegramId: string, avatarUrl: string) => {
	try {
		await db.user.update({
			where: { telegramId },
			data: {
				avatarUrl,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: { error: error.message },
			};
		} else {
			return {
				message: { error: responseMessages.general.error.unexpectedError },
			};
		}
	}
	revalidatePath('/miniapp');
};
