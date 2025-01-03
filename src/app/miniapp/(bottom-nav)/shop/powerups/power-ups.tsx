'use client';

import { useActionState, useState } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { initInvoice } from '@telegram-apps/sdk-react';
import { generateItemInvoice, mintPowerUp } from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';

type ActionState = {
	success: boolean;
	message: string;
	invoiceLink?: string;
};

const initialState: ActionState = {
	success: false,
	message: '',
};

export function PowerUps() {
	const invoice = initInvoice();
	const { telegramId } = useCurrentUser();

	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationSuccess, setNotificationSuccess] = useState(false);

	const handlePurchase = async (prevState: ActionState, formData: FormData) => {
		const itemId = formData.get('itemId') as string;

		try {
			const result = await generateItemInvoice(telegramId, itemId);
			if (result.success && result.data?.invoiceLink) {
				const status = await invoice.open(result.data.invoiceLink, 'url');
				if (status === 'paid') {
					const mintResult = await mintPowerUp(telegramId, itemId);
					setNotificationMessage(mintResult.message || 'Purchase successful');
					setNotificationSuccess(mintResult.success);
					setShowNotification(true);
					return {
						success: mintResult.success,
						message: mintResult.message || 'Purchase successful',
					};
				} else {
					setNotificationMessage(`Purchase ${status}`);
					setNotificationSuccess(false);
					setShowNotification(true);
					return {
						success: false,
						message: `Purchase ${status}`,
					};
				}
			} else {
				throw new Error('Failed to generate invoice');
			}
		} catch (error) {
			console.error('Error in handlePurchase:', error);
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			setNotificationMessage(errorMessage);
			setNotificationSuccess(false);
			setShowNotification(true);
			return {
				success: false,
				message: errorMessage,
			};
		}
	};

	const [state, action, isLoading] = useActionState(
		handlePurchase,
		initialState
	);

	return (
		<main className='space-y-4'>
			{isLoading && <LoadingOverlay scene='purchase' />}

			{inGameItems.map((item) => (
				<ItemCard key={item.id} {...item} onPurchase={action} />
			))}

			{showNotification && (
				<NotificationDialog
					message={notificationMessage}
					success={notificationSuccess}
				/>
			)}
		</main>
	);
}
