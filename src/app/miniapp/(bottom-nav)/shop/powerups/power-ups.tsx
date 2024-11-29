'use client';

import { useCallback } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { useFormState } from 'react-dom';
import { initInvoice, useInitData } from '@telegram-apps/sdk-react';
import {
	generateItemInvoice,
	PurchaseState,
} from '@/src/actions/invoice.action';
import { ItemCard } from '../../../../../components/common/cards/item-card';

export function PowerUps() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id!);
	const invoice = initInvoice();

	const initialState: PurchaseState = {
		success: false,
	};

	const handlePurchase = useCallback(
		async (prevState: PurchaseState, formData: FormData) => {
			const result = await generateItemInvoice(telegramId, prevState, formData);
			if (result.success && result.invoiceLink) {
				invoice.open(result.invoiceLink, 'url').then((status) => {
					if (status === 'cancelled') return alert('You cancelled it bro.');
					return alert(status);
				});
			}
			return result;
		},
		[telegramId]
	);

	const [response, formAction] = useFormState(handlePurchase, initialState);

	return (
		<main className='space-y-4'>
			{inGameItems.map((item) => (
				<ItemCard key={item.id} {...item} onPurchase={formAction} />
			))}
		</main>
	);
}
