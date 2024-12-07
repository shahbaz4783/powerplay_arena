'use server';

import { Bot } from 'grammy';
import { inGameItems } from '@/src/constants/powerUps';
import { responseMessages } from '../constants/messages';

const bot = new Bot(process.env.BOT_TOKEN!);

export type PurchaseState = {
	success: boolean;
	invoiceLink?: string;
	error?: string;
};

export async function generateItemInvoice(
	telegramId: string,
	prevState: PurchaseState,
	formData: FormData
): Promise<PurchaseState> {
	try {
		const itemId = formData.get('itemId') as string;
		const selectedItem = inGameItems.find((item) => item.id === itemId);

		if (!selectedItem) {
			return {
				success: false,
				error: responseMessages.shop.error.itemNotFound,
			};
		}

		const title = selectedItem.title;
		const description = selectedItem.description;
		const payload = JSON.stringify({
			itemId,
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
		return { success: true, invoiceLink };
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



export async function mintPowerUp(
	telegramId: bigint,
	prevState: PurchaseState,
	formData: FormData
) {
	try {
		const itemId = formData.get('itemId') as string;
		const selectedItem = inGameItems.find((item) => item.id === itemId);

		if (!selectedItem) {
			return {
				success: false,
				error: responseMessages.shop.error.itemNotFound,
			};
		}
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
