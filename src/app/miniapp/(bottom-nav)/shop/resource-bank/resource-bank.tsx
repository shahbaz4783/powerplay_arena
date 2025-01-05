'use client';

import { ItemCard } from '../../../../../components/common/cards/item-card';
import { useActionState, useCallback, useState } from 'react';
import { initInvoice } from '@telegram-apps/sdk-react';
import { generateItemInvoice } from '@/src/actions/invoice.action';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import LoadingOverlay from '@/src/components/common/dialog/loading-overlay';
import NotificationDialog from '@/src/components/layouts/global/notification';
import { inGameResources } from '@/src/constants/resources';

export function ConsumableItemCard() {
	return (
		<div className='space-y-3'>
			{inGameResources.map((item) => (
				<ItemCard
					key={item.id}
					type='RESOURCE'
					{...item}
					onPurchase={() => {}}
				/>
			))}
		</div>
	);
}
