'use server';

import { db } from '@/src/lib/db';
import { FormResponse } from '../types/types';
import { powerPassPacks } from '../constants/shop-items';

export const purchasePowerPass = async (
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	console.log({ formData });

	const powerPassId = formData.get('powerPassId');
	const powerPassPackQuantity = Number(formData.get('quantity'));

	const packInfo = powerPassPacks.find(
		(pack) => pack.id.toString() === powerPassId
	);

	if (!packInfo)
		return {
			message: { error: 'Cant find the selected pack. Please try again later' },
		};

	const totalCost = packInfo?.price;
	const totalPass = packInfo.quantity * powerPassPackQuantity;
	try {
		await db.$transaction(async (tx) => {
			const profile = await tx.profile.findUnique({
				where: { telegramId },
			});

			if (!profile) {
				throw new Error('Profile not found');
			}

			if (profile.balance < totalCost) {
				return { message: { error: 'You dont have enough coins' } };
			}

			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { decrement: totalCost },
					powerPass: { increment: totalPass },
				},
			});
		});
		return { message: { success: 'Purcahse Successful' } };
	} catch (error) {
		if (error instanceof Error) {
			return {
				message: { error: error.message },
			};
		} else {
			return {
				message: { error: 'An error occurred while purchasing the pass.' },
			};
		}
	}
};
