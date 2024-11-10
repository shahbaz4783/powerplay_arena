'use server';

import { db } from '@/src/lib/db';
import { FormResponse } from '../types/types';

export async function purchasePowerPass(
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
) {
	const powerPassId = formData.get('powerPassId');
	const powerPassQuantity = formData.get('quantity');

	const totalCost = 99;
	const totalPass = 5;
	try {
		await db.$transaction(async (tx) => {
			const profile = await tx.profile.findUnique({
				where: { telegramId },
			});

			if (!profile) {
				throw new Error('Profile not found');
			}

			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { decrement: totalCost },
					powerPass: { increment: totalPass },
				},
			});
		});
	} catch (error) {
		console.error('Error placing bet:', error);
		return {
			message: { error: 'An error occurred while placing the bet' },
			result: null,
			winAmount: 0,
		};
	}
}
