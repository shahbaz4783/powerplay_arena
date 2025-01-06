'use server';

import { Bot } from 'grammy';
import { powerUps } from '@/src/constants/powerUps';
import { responseMessages } from '../constants/messages';
import { ServerResponseType } from '../types/types';
import * as models from '@/src/models';
import { inGameResources } from '../constants/resources';
import { allAvatars } from '../constants/avatars';

const bot = new Bot(process.env.BOT_TOKEN!);

export async function generateItemInvoice(
	telegramId: string,
	itemId: string
): Promise<ServerResponseType<{ invoiceLink?: string }>> {
	try {
		const selectedItem = powerUps.find((item) => item.powerUp_Id === itemId);

		if (!selectedItem) {
			return {
				success: false,
				message: responseMessages.shop.error.itemNotFound,
			};
		}

		const powerUp = await models.fetchUserPowerUps(telegramId);
		const existingPowerUp = powerUp?.find(
			(item) => item.powerUpId === selectedItem.powerUp_Id
		);
		if (existingPowerUp) {
			return {
				success: false,
				message: `You already own ${selectedItem.title}`,
			};
		}

		const title = selectedItem.title;
		const description = selectedItem.description;
		const payload = JSON.stringify({
			itemId: selectedItem.powerUp_Id,
			title,
		});
		const currency = 'XTR';
		const prices = [{ amount: 1, label: selectedItem.title }];

		const invoiceLink = await bot.api.createInvoiceLink(
			title,
			description,
			payload,
			'',
			currency,
			prices
		);
		return {
			success: true,
			message: 'Successfully generated invoice link.',
			data: { invoiceLink },
		};
	} catch (error) {
		if (error instanceof Error) {
			return { success: false, message: error.message };
		} else {
			return {
				success: false,
				message: responseMessages.transaction.error.transactionFailed,
			};
		}
	}
}

export async function generateResourceInvoice(
	telegramId: string,
	itemId: string
): Promise<ServerResponseType<{ invoiceLink?: string }>> {
	try {
		const selectedItem = inGameResources.find((item) => item.resource_id === itemId);

		if (!selectedItem) {
			return {
				success: false,
				message: responseMessages.shop.error.itemNotFound,
			};
		}

		const powerUp = await models.fetchUserPowerUps(telegramId);
		const existingPowerUp = powerUp?.find(
			(item) => item.powerUpId === selectedItem.resource_id
		);
		if (existingPowerUp) {
			return {
				success: false,
				message: `You already own ${selectedItem.title}`,
			};
		}

		const title = selectedItem.title;
		const description = selectedItem.description;
		const payload = JSON.stringify({
			itemId: selectedItem.resource_id,
			title,
		});
		const currency = 'XTR';
		const prices = [{ amount: 1, label: selectedItem.title }];

		const invoiceLink = await bot.api.createInvoiceLink(
			title,
			description,
			payload,
			'',
			currency,
			prices
		);
		return {
			success: true,
			message: 'Successfully generated invoice link.',
			data: { invoiceLink },
		};
	} catch (error) {
		if (error instanceof Error) {
			return { success: false, message: error.message };
		} else {
			return {
				success: false,
				message: responseMessages.transaction.error.transactionFailed,
			};
		}
	}
}

export async function generateAvatarInvoice(
	telegramId: string,
	itemId: string
): Promise<ServerResponseType<{ invoiceLink?: string }>> {
	try {
		const selectedItem = allAvatars.find(
			(item) => item.avatar_id === itemId
		);

		if (!selectedItem) {
			return {
				success: false,
				message: responseMessages.shop.error.itemNotFound,
			};
		}

		const powerUp = await models.fetchUserPowerUps(telegramId);
		const existingPowerUp = powerUp?.find(
			(item) => item.powerUpId === selectedItem.avatar_id
		);
		if (existingPowerUp) {
			return {
				success: false,
				message: `You already own ${selectedItem.title}`,
			};
		}

		const title = selectedItem.title;
		const description = selectedItem.description;
		const payload = JSON.stringify({
			itemId: selectedItem.avatar_id,
			title,
		});
		const currency = 'XTR';
		const prices = [{ amount: 1, label: selectedItem.title }];

		const invoiceLink = await bot.api.createInvoiceLink(
			title,
			description,
			payload,
			'',
			currency,
			prices
		);
		return {
			success: true,
			message: 'Successfully generated invoice link.',
			data: { invoiceLink },
		};
	} catch (error) {
		if (error instanceof Error) {
			return { success: false, message: error.message };
		} else {
			return {
				success: false,
				message: responseMessages.transaction.error.transactionFailed,
			};
		}
	}
}