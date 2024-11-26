'use server';

import { Bot } from 'grammy';
import { inGameItems } from '@/src/constants/powerUps';

const bot = new Bot(process.env.BOT_TOKEN!);

export type PurchaseState = {
	success: boolean;
	invoiceLink?: string;
	error?: string;
};

export async function purchaseInGameItems(
	telegramId: bigint,
	prevState: PurchaseState,
	formData: FormData
): Promise<PurchaseState> {
	try {
		console.log({ formData });
		console.log({ telegramId });

		const itemId = formData.get('itemId') as string;
		const quantity = Number(formData.get('quantity'));

		const item = inGameItems.find((item) => item.id === itemId);

		if (!item) {
			return { success: false, error: 'Item not found' };
		}

		console.log({ item });

		const title = item.title;
		const description = item.description;
		const payload = JSON.stringify({
			itemId,
			quantity,
			telegramId: telegramId.toString(),
		});
		const currency = 'XTR';
		const prices = [{ amount: item.price * 100, label: item.title }];

		const invoiceLink = await bot.api.createInvoiceLink(
			title,
			description,
			payload,
			'',
			currency,
			prices
		);

		console.log('invoice link: ', invoiceLink);

		return { success: true, invoiceLink };
	} catch (error) {
		console.error('Error generating invoice:', error);
		return { success: false, error: 'Failed to generate invoice' };
	}
}
