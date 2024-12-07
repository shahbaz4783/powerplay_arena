'use client';

import { useCallback } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { useFormState } from 'react-dom';
import { initInvoice } from '@telegram-apps/sdk-react';
import {
	generateItemInvoice,
	PurchaseState,
} from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

export function PowerUps() {
	const { telegramId } = useCurrentUser(); 

	const invoice = initInvoice();

	const initialState: PurchaseState = {
		success: false,
	};

	const handlePurchase = useCallback(
		async (prevState: PurchaseState, formData: FormData) => {
			const result = await generateItemInvoice(telegramId, prevState, formData);
			if (result.success && result.invoiceLink) {
				invoice.open(result.invoiceLink, 'url').then((status) => {
					if (status === 'cancelled') return alert('You cancelled it.');
					if (status === 'paid') {
					}
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
