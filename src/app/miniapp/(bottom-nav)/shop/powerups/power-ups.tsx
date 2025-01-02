'use client';

import { useCallback, useActionState } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { initInvoice } from '@telegram-apps/sdk-react';
import {
	generateItemInvoice,
	PurchaseState,
} from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';

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
					if (status === 'cancelled')
						return (
							<NotificationDialog message='You cancelled it' success={false} />
						);
					if (status === 'paid') {
						<NotificationDialog message='You Bought' success={true} />;
					}
					return alert(status);
				});
			}
			return result;
		},
		[telegramId, invoice]
	);

	const [response, formAction, isLoading] = useActionState(
		handlePurchase,
		initialState
	);

	return (
		<main className='space-y-4'>
			{isLoading && <LoadingOverlay scene='purchase' />}

			{inGameItems.map((item) => (
				<ItemCard key={item.id} {...item} onPurchase={formAction} />
			))}
		</main>
	);
}
