'use client';

import { useActionState, useState } from 'react';
import { initInvoice } from '@telegram-apps/sdk-react';
import { generateItemInvoice } from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';
import { mintPowerUp } from '@/src/actions/powerups.action';
import { powerUps } from '@/src/constants/powerUps';
import { AllPowerUpsOwned } from '@/src/components/layouts/feedback/all-powerups-owned';
import { useUserInventory } from '@/src/hooks/useUserData';

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
	const {
		data: userInventory,
		isPending,
		refetch: refetchInventory,
	} = useUserInventory(telegramId); // Added refetch method

	const availablePowerUps =
		userInventory?.powerUps && !isPending
			? powerUps.filter(
					(powerup) =>
						!userInventory.powerUps.some(
							(item) => item.powerUpId === powerup.powerUp_Id
						)
			  )
			: []; // Default empty array during loading

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

					// Trigger a refresh of the inventory after successful minting
					if (mintResult.success) {
						await refetchInventory(); // Refresh the inventory
					}

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
				setNotificationMessage(result?.message!);
				setNotificationSuccess(false);
				setShowNotification(true);
				return {
					success: result.success,
					message: result.message || 'Purchase Failed',
				};
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
			{/* Show loading overlay while loading user data */}
			{(isLoading || isPending) && <LoadingOverlay scene='purchase' />}

			{/* Show power-ups if available */}
			{!isPending &&
				availablePowerUps.map((item) => (
					<ItemCard
						key={item.powerUp_Id}
						id={item.powerUp_Id}
						{...item}
						type='POWERUP'
						onPurchase={action}
					/>
				))}

			{/* Show "AllPowerUpsOwned" only when inventory is fully loaded */}
			{!isPending && availablePowerUps.length === 0 && <AllPowerUpsOwned />}

			{/* Notification Dialog */}
			{showNotification && (
				<NotificationDialog
					message={notificationMessage}
					success={notificationSuccess}
				/>
			)}
		</main>
	);
}
