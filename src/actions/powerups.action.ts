'use server';

import { db } from '../lib/db';
import { responseMessages } from '../constants/messages';
import { getPowerUpInfo, powerUps, upgradeCosts } from '../constants/powerUps';
import * as model from '@/src/models';
import { inGameResources } from '../constants/resources';
import { allAvatars } from '../constants/avatars';

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

export async function mintResource(telegramId: string, itemId: string) {
	if (!itemId) {
		throw new Error('FormData is null or undefined');
	}
	const selectedItem = inGameResources.find(
		(item) => item.resource_id === itemId
	);
	if (!selectedItem) {
		return {
			success: false,
			error: responseMessages.shop.error.itemNotFound,
		};
	}

	try {
		await db.resource.create({
			data: {
				telegramId,
				photoUrl: selectedItem.image,
				description: selectedItem.description,
				resourceId: selectedItem.resource_id,
				title: selectedItem.title,
				coinAmount: selectedItem.coins,
				passAmount: selectedItem.passes,
			},
		});
		return {
			success: true,
			message: 'Resource purchased successfully',
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

export async function redeemResource(telegramId: string, resourceId: string) {
	if (!resourceId)
		throw new Error('Something went wrong. Please try again later.');

	try {
		const resource = await db.resource.findUnique({
			where: { id: resourceId },
		});

		if (!resource) {
			return {
				success: false,
				message: 'Failed to find Power-up information',
			};
		}

		if (resource.isRedeem) {
			return {
				success: false,
				message: `${resource.title} is already redeemed.`,
			};
		}

		await db.$transaction(async (tx) => {
			await tx.userInventory.update({
				where: { telegramId },
				data: {
					powerCoin: { increment: resource.coinAmount },
					powerPass: { increment: resource.passAmount },
				},
			});

			await tx.resource.update({
				where: { id: resourceId },
				data: {
					isRedeem: true,
				},
			});

			await tx.transaction.create({
				data: {
					telegramId,
					type: 'PURCHASE',
					coinAmount: resource.coinAmount,
					passAmount: resource.passAmount,
					description: `Redeemed ${resource.title}`,
				},
			});
		});

		return {
			success: true,
			message: 'Resource redeemed successfully',
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

export async function mintAvatar(telegramId: string, itemId: string) {
	if (!itemId) {
		throw new Error('FormData is null or undefined');
	}
	const selectedItem = allAvatars.find((item) => item.avatar_id === itemId);
	if (!selectedItem) {
		return {
			success: false,
			error: responseMessages.shop.error.itemNotFound,
		};
	}

	try {
		await db.avatar.create({
			data: {
				telegramId,
				photoUrl: selectedItem.image,
				description: selectedItem.description,
				avatarId: selectedItem.avatar_id,
				title: selectedItem.title,
				currentBenefit: 'Boost your base XP',
				xpBoost: 1.2,
			},
		});
		return {
			success: true,
			message: 'Avatar minted successfully',
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