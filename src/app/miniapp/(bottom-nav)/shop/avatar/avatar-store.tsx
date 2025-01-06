'use client';

import { allAvatars } from '@/src/constants/avatars';
import { useActionState, useState } from 'react';
import { initInvoice } from '@telegram-apps/sdk-react';
import {
	generateAvatarInvoice,
	generateItemInvoice,
} from '@/src/actions/invoice.action';
import { ItemCard } from '@/src/components/common/cards/item-card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';
import { mintAvatar, mintPowerUp } from '@/src/actions/powerups.action';
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

export function AvatarStore() {
	const invoice = initInvoice();
	const { telegramId } = useCurrentUser();
	const {
		data: userInventory,
		isPending,
		refetch: refetchInventory,
	} = useUserInventory(telegramId);

	const availableAvatar =
		userInventory?.avatars && !isPending
			? allAvatars.filter(
					(avatar) =>
						!userInventory.avatars.some(
							(item) => item.avatarId === avatar.avatar_id
						)
			  )
			: [];

	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState('');
	const [notificationSuccess, setNotificationSuccess] = useState(false);

	const handlePurchase = async (prevState: ActionState, formData: FormData) => {
		const itemId = formData.get('itemId') as string;

		try {
			const result = await generateAvatarInvoice(telegramId, itemId);
			if (result.success && result.data?.invoiceLink) {
				const status = await invoice.open(result.data.invoiceLink, 'url');
				if (status === 'paid') {
					const mintResult = await mintAvatar(telegramId, itemId);
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
				availableAvatar.map((item) => (
					<ItemCard
						key={item.avatar_id}
						id={item.avatar_id}
						{...item}
						type='RESOURCE'
						onPurchase={action}
					/>
				))}

			{!isPending && availableAvatar.length === 0 && <AllPowerUpsOwned />}

			{showNotification && (
				<NotificationDialog
					message={notificationMessage}
					success={notificationSuccess}
				/>
			)}
		</main>
	);
}
