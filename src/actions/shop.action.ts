'use server';

import { db } from '@/src/lib/db';
import { FormResponse, ServerResponseType } from '../types/types';
import { avatars, powerPassPacks } from '../constants/shop-items';
import { responseMessages } from '../constants/messages';
import { LevelInfo } from '../types/gameState';
import { calculateExchangeValues, calculateLevel } from '../lib/utils';
import { inGameItems } from '../constants/powerUps';
import { token } from '../constants/app-config';

export const purchaseAvatar = async (
	telegramId: string,
	prevState: FormResponse,
	formData: FormData
): Promise<FormResponse> => {
	try {
		const profile = await db.userInventory.findUnique({
			where: { telegramId },
		});

		const progress = await db.userProgression.findUnique({
			where: { telegramId },
		});

		if (!progress) {
			throw new Error(responseMessages.general.error.unexpectedError);
		}

		if (!profile) {
			throw new Error(responseMessages.general.error.unexpectedError);
		}

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

		if (profile.powerCoin < avatarInfo.price) {
			return {
				message: {
					error: responseMessages.transaction.error.insufficientBalance,
				},
			};
		}

		await db.$transaction(async (tx) => {
			await tx.avatar.create({
				data: {
					telegramId,
					title: avatarInfo.name,
					avatarId: avatarInfo.id,
					description: avatarInfo.description,
					photoUrl: avatarInfo.href,
					xpBoost: 1,
				},
			});

			const newTotalXP = progress.totalXP + avatarInfo.xpGain;
			const newLevelInfo: LevelInfo = calculateLevel(newTotalXP);

			await tx.userProgression.update({
				where: { telegramId },
				data: {
					totalXP: { increment: avatarInfo.xpGain },
					level: newLevelInfo.level,
					levelName: newLevelInfo.name,
					xpForNextLevel: newLevelInfo.xpForNextLevel,
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
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

export const executePowerExchange = async (
	telegramId: string,
	prevState: ServerResponseType,
	formData: FormData
): Promise<ServerResponseType> => {
	console.log({ formData });

	const totalPass = Number(formData.get('totalPass'));
	const exchangeDirection = formData.get('exchangeDirection');
	const { netPassSaleAmount, totalPassCost, exchangeFee } =
		calculateExchangeValues(totalPass);

	if (totalPass <= 0 || totalPassCost === 0) {
		return {
			success: false,
			message: 'Invalid input: values must be greater than 0.',
		};
	}

	try {
		const inventory = await db.userInventory.findUnique({
			where: { telegramId },
		});

		if (!inventory) {
			throw new Error(responseMessages.general.error.unexpectedError);
		}

		return await db.$transaction(async (tx) => {
			if (exchangeDirection === 'buyPasses') {
				if (inventory.powerCoin < totalPassCost) {
					return {
						success: false,
						message: responseMessages.transaction.error.insufficientBalance,
					};
				}
				await tx.userInventory.update({
					where: { telegramId },
					data: {
						powerCoin: { decrement: totalPassCost },
						powerPass: { increment: totalPass },
					},
				});
				await tx.transaction.create({
					data: {
						telegramId,
						type: 'EXCHANGE',
						description: `Exchanged ${token.name} for ${token.pass}`,
						coinAmount: -totalPassCost,
						passAmount: totalPass,
						metadata: {
							fees: `${exchangeFee} ${token.symbol}`,
						},
					},
				});
				return {
					success: true,
					message: responseMessages.shop.success.exchangeCompleted,
				};
			}

			if (exchangeDirection === 'sellPasses') {
				if (inventory.powerPass < totalPass) {
					return {
						success: false,
						message: responseMessages.transaction.error.insufficientBalance,
					};
				}
				await tx.userInventory.update({
					where: { telegramId },
					data: {
						powerCoin: { increment: netPassSaleAmount },
						powerPass: { decrement: totalPass },
					},
				});
				await tx.transaction.create({
					data: {
						telegramId,
						type: 'EXCHANGE',
						coinAmount: netPassSaleAmount,
						passAmount: -totalPass,
						description: `Exchanged ${token.pass} for ${token.name}`,
						metadata: {
							exchangeFee: `${exchangeFee} ${token.symbol}`,
						},
					},
				});
				return {
					success: true,
					message: responseMessages.shop.success.exchangeCompleted,
				};
			}

			// If exchangeDirection is neither 'buyPasses' nor 'sellPasses'
			return {
				success: false,
				message: responseMessages.general.error.unexpectedError,
			};
		});
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		} else {
			return {
				success: false,
				message: responseMessages.general.error.unexpectedError,
			};
		}
	}
};