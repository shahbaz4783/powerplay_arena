'use server';

import { Bot } from 'grammy';
import { inGameItems } from '@/src/constants/powerUps';
import { responseMessages } from '../constants/messages';
import { db } from '../lib/db';
import { ServerResponseType } from '../types/types';

const bot = new Bot(process.env.BOT_TOKEN!);

// export type PurchaseState = {
// 	success: boolean;
// 	invoiceLink?: string;
// 	error?: string;
// };

export async function generateItemInvoice(
	telegramId: string,
	itemId: string
): Promise<ServerResponseType<{ invoiceLink?: string }>> {
	try {
		const selectedItem = inGameItems.find((item) => item.id === itemId);

		if (!selectedItem) {
			return {
				success: false,
				message: responseMessages.shop.error.itemNotFound,
			};
		}

		const title = selectedItem.title;
		const description = selectedItem.description;
		const payload = JSON.stringify({
			itemId: selectedItem.id,
			telegramId: telegramId.toString(),
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

export async function mintPowerUp(telegramId: string, itemId: string) {
	console.log('Starting mintPowerUp function');
	console.log('Item ID:', itemId);

	try {
		if (!itemId) {
			throw new Error('FormData is null or undefined');
		}

		const selectedItem = inGameItems.find((item) => item.id === itemId);
		console.log('Selected item:', selectedItem);

		if (!selectedItem) {
			console.error('Item not found');
			return {
				success: false,
				error: responseMessages.shop.error.itemNotFound,
			};
		}

		console.log('Creating power-up in database');
		const createdPowerUp = await db.powerUp.create({
			data: {
				title: selectedItem.title,
				description: selectedItem.description,
				currentBoost: selectedItem.price,
				currentLevel: 1,
				photoUrl: selectedItem.image,
				powerUpId: selectedItem.id,
				telegramId,
			},
		});

		console.log('Created power-up:', createdPowerUp);

		return {
			success: true,
			message: 'Power-up minted successfully',
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