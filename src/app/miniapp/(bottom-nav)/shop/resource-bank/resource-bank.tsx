'use client';

import { consumableItems } from '@/src/constants/powerUps';
import { ItemCard } from '../../../../../components/common/cards/item-card';
import { useActionState, useCallback, useState } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { initInvoice } from '@telegram-apps/sdk-react';
import { generateItemInvoice, mintPowerUp } from '@/src/actions/invoice.action';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';

export function ConsumableItemCard() {
	return (
		<div className='space-y-3'>
			{consumableItems.map((item) => (
				<ItemCard key={item.id} {...item} onPurchase={() => {}} />
			))}
		</div>
	);
}
