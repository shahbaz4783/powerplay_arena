'use client';

import { consumableItems } from '@/src/constants/powerUps';
import { ItemCard } from '../../../../../components/common/cards/item-card';

export function ConsumableItemCard() {
	return (
		<div className='space-y-3'>
			{consumableItems.map((item) => (
				<ItemCard {...item} onPurchase={() => {}} />
			))}
		</div>
	);
}
