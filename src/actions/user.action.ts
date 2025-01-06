"use server";

import { db } from '@/src/lib/db';
import { responseMessages } from '../constants/messages';
import { revalidatePath } from 'next/cache';
import { ServerResponseType } from '../types/types';

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

// export async function extendBenefits(
// 	prevState: ServerResponseType,
// 	formData: FormData
// ): Promise<ServerResponseType<{ newExpiryDate: Date }>> {
// 	try {
// 		const referrerId = formData.get('referrerId') as string;
// 		const cost = Number(formData.get('cost'));

// 		const result = await db.$transaction(async (tx) => {
// 			// Get the user's current referral record
// 			const referralRecord = await tx.referralRecord.findFirst({
// 				where: { referrerId },
// 				orderBy: { expiresAt: 'desc' },
// 			});

// 			if (!referralRecord) {
// 				throw new Error('No referral record found');
// 			}

// 			// Check if the user has enough vouchers
// 			const userInventory = await tx.userInventory.findUnique({
// 				where: { telegramId: referrerId },
// 			});

// 			if (!userInventory || userInventory.starVoucher < cost) {
// 				throw new Error('Insufficient vouchers');
// 			}

// 			// Calculate new expiry date
// 			const newExpiryDate = new Date(referralRecord.expiresAt);
// 			newExpiryDate.setDate(newExpiryDate.getDate() + duration * 7);

// 			// Update the referral record
// 			await tx.referralRecord.update({
// 				where: { id: referralRecord.id },
// 				data: {
// 					expiresAt: newExpiryDate,
// 					// maxVouchers: referralRecord.maxVouchers + maxCapIncrease,
// 				},
// 			});

// 			// Deduct vouchers from user's inventory
// 			await tx.userInventory.update({
// 				where: { telegramId: referrerId },
// 				data: {
// 					starVoucher: { decrement: cost },
// 				},
// 			});

// 			// Create a transaction record
// 			await tx.transaction.create({
// 				data: {
// 					telegramId: referrerId,
// 					voucherAmount: -cost,
// 					type: 'EXCHANGE',
// 					description: `Extended referral benefits for ${duration} weeks`,
// 					metadata: {
// 						duration,
// 						maxCapIncrease,
// 						newExpiryDate,
// 					},
// 				},
// 			});

// 			return {
// 				success: true,
// 				message: 'Extended',
// 				data: { newExpiryDate },
// 			};
// 		});

// 		return result;
// 	} catch (error) {
// 		console.error('Error extending benefits:', error);
// 		return { success: false, message: (error as Error).message };
// 	}
// }

export async function extendBenefits(
	prevState: ServerResponseType<{ newExpiryDate: Date | null }>,
	payload: { referrerId: string; duration: number; cost: number }
): Promise<ServerResponseType<{ newExpiryDate: Date | null }>> {
	console.log({ payload });
	try {
		const { referrerId, duration, cost } = payload;

		const result = await db.$transaction(async (tx) => {
			// Get the user's current referral record
			const referralRecord = await tx.referralRecord.findFirst({
				where: { referrerId },
				orderBy: { expiresAt: 'desc' },
			});

			if (!referralRecord) {
				throw new Error('No referral record found');
			}

			// Check if the user has enough vouchers
			const userInventory = await tx.userInventory.findUnique({
				where: { telegramId: referrerId },
			});

			// Calculate new expiry date
			const newExpiryDate = new Date(referralRecord.expiresAt);
			newExpiryDate.setDate(newExpiryDate.getDate() + duration * 7);

			// Update the referral record
			await tx.referralRecord.update({
				where: { id: referralRecord.id },
				data: {
					expiresAt: newExpiryDate,
				},
			});

			// Create a transaction record
			await tx.transaction.create({
				data: {
					telegramId: referrerId,
					type: 'EXCHANGE',
					description: `Extended referral benefits for ${duration} weeks`,
					metadata: {
						duration,
						newExpiryDate,
					},
				},
			});

			return {
				success: true,
				message: 'Benefits extended successfully',
				data: { newExpiryDate },
			};
		});

		return result;
	} catch (error) {
		console.error('Error extending benefits:', error);
		return {
			success: false,
			message: (error as Error).message,
			data: { newExpiryDate: null },
		};
	}
}
