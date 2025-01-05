'use server';

import { db } from '../lib/db';
import { responseMessages } from '../constants/messages';
import { getPowerUpInfo, powerUps, upgradeCosts } from '../constants/powerUps';
import * as model from '@/src/models';

export async function mintPowerUp(telegramId: string, itemId: string) {
	if (!itemId) {
		throw new Error('FormData is null or undefined');
	}
	const selectedItem = powerUps.find((item) => item.powerUp_Id === itemId);
	if (!selectedItem) {
		return {
			success: false,
			error: responseMessages.shop.error.itemNotFound,
		};
	}

	try {
		await db.powerUp.create({
			data: {
				telegramId,
				powerUpId: selectedItem.powerUp_Id,
				title: selectedItem.title,
				description: selectedItem.description,
				currentBoost: selectedItem.benefits[0].boost,
				rarity: 'COMMON',
				photoUrl: selectedItem.image,
				currentBenefit: selectedItem.benefits[0].info,
			},
		});
		return {
			success: true,
			message: 'Power-up minted successfully',
		};
	} catch (error) {
		if (error instanceof Error) {
			return { success: false, error: error.message };
		} else {
			return {
				success: false,
				error: responseMessages.transaction.error.transactionFailed,
			};
		}
	}
}

export async function upgradePowerUp(telegramId: string, powerUpId: string) {
	if (!powerUpId)
		throw new Error('Something went wrong. Please try again later.');

	try {
		const inventory = await model.getUserInventory(telegramId);

		const powerUp = await db.powerUp.findUnique({
			where: { id: powerUpId },
		});

		if (!powerUp) {
			return {
				success: false,
				message: 'Failed to find Power-up information',
			};
		}

		if (powerUp.rarity === 'LEGENDARY') {
			return {
				success: false,
				message: `${powerUp.title} is alreay at Max Level.`,
			};
		}

		const { benefitBoost, nextRarity, upgradeCost, benefitInfo } =
			getPowerUpInfo(powerUp.rarity, powerUp.powerUpId);

		if (!nextRarity)
			return { success: false, message: 'Power-up is alreay at max level' };

		if (inventory.powerCoin < upgradeCost.coin) {
			return {
				success: false,
				message: responseMessages.transaction.error.insufficientBalance,
			};
		}
		if (inventory.powerPass < upgradeCost.pass) {
			return {
				success: false,
				message: responseMessages.transaction.error.insufficientPass,
			};
		}

		await db.$transaction(async (tx) => {
			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { decrement: upgradeCost.coin },
					powerPass: { decrement: upgradeCost.pass },
				},
			});

			await tx.powerUp.update({
				where: { id: powerUpId },
				data: {
					rarity: nextRarity,
					currentBenefit: benefitInfo,
					currentBoost: benefitBoost,
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					type: 'PURCHASE',
					coinAmount: -upgradeCost.coin,
					passAmount: -upgradeCost.pass,
					description: `${powerUp.title} upgraded to ${nextRarity}`,
				},
			});
		});

		return {
			success: true,
			message: 'Power-up upgraded successfully',
		};
	} catch (error) {
		console.error('Error in mintPowerUp:', error);
		if (error instanceof Error) {
			return { success: false, error: error.message };
		} else {
			return {
				success: false,
				error: responseMessages.transaction.error.transactionFailed,
			};
		}
	}
}
