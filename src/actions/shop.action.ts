'use server';

import { db } from '@/src/lib/db';
import { FormResponse } from '../types/types';
import { avatars, powerPassPacks } from '../constants/shop-items';
import { token } from '../lib/constants';
import { revalidatePath } from 'next/cache';
import { responseMessages } from '../constants/messages';

export const purchasePowerPass = async (
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	console.log({ formData });

	const itemId = formData.get('itemId');
	const itemQuantity = Number(formData.get('itemQuantity'));

	const packInfo = powerPassPacks.find((pack) => pack.id.toString() === itemId);
	if (!packInfo)
		return {
			message: { error: responseMessages.shop.error.itemNotFound },
		};

	const totalCost = packInfo?.price * itemQuantity;
	const totalPass = packInfo.quantity * itemQuantity;
	try {
		const profile = await db.profile.findUnique({
			where: { telegramId },
		});

		if (!profile) {
			throw new Error(responseMessages.general.error.unexpectedError);
		}

		if (profile.balance < totalCost) {
			return {
				message: {
					error: responseMessages.transaction.error.insufficientBalance,
				},
			};
		}
		const packInfo = powerPassPacks.find(
			(pack) => pack.id.toString() === itemId
		);
		if (!packInfo)
			return {
				message: { error: responseMessages.shop.error.itemNotFound },
			};

		return await db.$transaction(async (tx) => {
			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { decrement: totalCost },
					powerPass: { increment: totalPass },
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					amount: totalCost,
					balanceEffect: 'DECREMENT',
					type: 'PURCHASE',
					description: `Purchase ${itemQuantity} ${packInfo.name}`,
				},
			});
			return {
				message: { success: responseMessages.shop.success.itemPurchased },
			};
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
};

export const purchaseAvatar = async (
	telegramId: bigint,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	try {
		const itemId = formData.get('itemId');

		const avatarInfo = avatars.find(
			(avatar) => avatar.id.toString() === itemId
		);

		const purchasedAvatat = await db.avatar.findMany({
			where: { telegramId },
		});

		const existingAvatar = purchasedAvatat.find(
			(avatar) => avatar.avatarId === avatarInfo?.id
		);

		if (existingAvatar) {
			return {
				message: { error: responseMessages.shop.error.itemAlreadyOwned },
			};
		}

		if (!avatarInfo)
			return {
				message: { error: responseMessages.shop.error.itemNotFound },
			};

		const profile = await db.profile.findUnique({
			where: { telegramId },
		});

		if (!profile) {
			throw new Error('Profile not found');
		}

		await db.$transaction(async (tx) => {
			await tx.avatar.create({
				data: {
					telegramId,
					title: avatarInfo.name,
					avatarId: avatarInfo.id,
					description: avatarInfo.description,
					href: avatarInfo.href,
				},
			});

			await tx.profile.update({
				where: { telegramId },
				data: {
					balance: { decrement: avatarInfo.price },
					totalXP: { increment: avatarInfo.xpGain },
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					amount: avatarInfo.price,
					balanceEffect: 'DECREMENT',
					type: 'PURCHASE',
					description: `Purchase ${avatarInfo.name} avatar`,
				},
			});
		});
		return {
			message: { success: responseMessages.shop.success.itemPurchased },
		};
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
};