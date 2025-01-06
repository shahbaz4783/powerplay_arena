'use client';

// import { ItemCard } from '../../../../../components/common/cards/item-card';
// import { useActionState, useCallback, useState } from 'react';
// import { initInvoice } from '@telegram-apps/sdk-react';
// import { generateItemInvoice } from '@/src/actions/invoice.action';
// import { useCurrentUser } from '@/src/hooks/useCurrentUser';
// import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
// import NotificationDialog from '@/src/components/layouts/global/notification';
// import { inGameResources } from '@/src/constants/resources';

// export function ConsumableItemCard() {
// 	return (
		// <div className='space-y-3'>
		// 	{inGameResources.map((item) => (
		// 		<ItemCard
		// 			key={item.id}
		// 			type='RESOURCE'
		// 			{...item}
		// 			onPurchase={() => {}}
		// 		/>
		// 	))}
		// </div>
// 	);
// }

import { inGameResources } from '@/src/constants/resources';
import { useActionState, useState } from 'react';
import { initInvoice } from '@telegram-apps/sdk-react';
import { generateItemInvoice, generateResourceInvoice } from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';
import { mintPowerUp, mintResource } from '@/src/actions/powerups.action';
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

export function ConsumableItemCard() {
	const invoice = initInvoice();
	const { telegramId } = useCurrentUser();
	const {
		data: userInventory,
		isPending,
		refetch: refetchInventory,
	} = useUserInventory(telegramId);

	const availablePowerUps =
		userInventory?.powerUps && !isPending
			? powerUps.filter(
					(powerup) =>
						!userInventory.powerUps.some(
							(item) => item.powerUpId === powerup.powerUp_Id
						)
			  )
			: [];

	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationSuccess, setNotificationSuccess] = useState(false);

	const handlePurchase = async (prevState: ActionState, formData: FormData) => {
		const itemId = formData.get('itemId') as string;

		try {
			const result = await generateResourceInvoice(telegramId, itemId);
			if (result.success && result.data?.invoiceLink) {
				const status = await invoice.open(result.data.invoiceLink, 'url');
				if (status === 'paid') {
					const mintResult = await mintResource(telegramId, itemId);
					setNotificationMessage(mintResult.message || 'Purchase successful');
					setNotificationSuccess(mintResult.success);
					setShowNotification(true);

					if (mintResult.success) {
						await refetchInventory();
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
			{(isLoading || isPending) && <LoadingOverlay scene='purchase' />}

			{!isPending &&
				inGameResources.map((item) => (
					<ItemCard
						key={item.resource_id}
						id={item.resource_id}
						{...item}
						type='RESOURCE'
						onPurchase={action}
					/>
				))}

			{!isPending && availablePowerUps.length === 0 && <AllPowerUpsOwned />}

			{showNotification && (
				<NotificationDialog
					message={notificationMessage}
					success={notificationSuccess}
				/>
			)}
		</main>
	);
}
