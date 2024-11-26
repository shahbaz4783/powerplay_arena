'use client';

import { useCallback } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { useFormState } from 'react-dom';
import { useInitData } from '@telegram-apps/sdk-react';
import {
	purchaseInGameItems,
	PurchaseState,
} from '@/src/actions/invoice.action';
import { SubmitButton } from '../../common/buttons/submit-button';

export function InGameStore() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id!);

	const initialState: PurchaseState = {
		success: false,
	};

	const handlePurchase = useCallback(
		async (prevState: PurchaseState, formData: FormData) => {
			const result = await purchaseInGameItems(telegramId, prevState, formData);
			if (result.success && result.invoiceLink) {
				if (window.Telegram?.WebApp?.openInvoice) {
					window.Telegram.WebApp.openInvoice(result.invoiceLink, (status) => {
						if (status === 'paid') {
							alert('Payment successful!');
						}
					});
				} else {
					alert('Telegram WebApp SDK not available');
				}
			}
			return result;
		},
		[telegramId]
	);

	const [response, formAction] = useFormState(handlePurchase, initialState);

	return (
		<div>
			{inGameItems.map((pack) => (
				<div key={pack.id} className='border m-2 p-4 rounded-lg'>
					<p className='font-bold'>{pack.title}</p>
					<p>Price: {pack.price} XTR</p>
					<form action={formAction}>
						<input type='hidden' name='itemId' value={pack.id} />
						<SubmitButton title='Pay now' loadingTitle='Please wait' />
					</form>
					<p>{response.success}</p>
					<p>{response.error}</p>
					<p>{response.invoiceLink}</p>
				</div>
			))}
		</div>
	);
}
