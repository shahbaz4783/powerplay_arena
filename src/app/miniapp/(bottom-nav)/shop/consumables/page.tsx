import { Header } from '@/src/components/common/elements/header';
import { ConsumableItemCard } from '@/src/components/layouts/shop/consumable-items';
import React from 'react';

export default function ConsumableStorePage() {
	return (
		<div className='space-y-4'>
			<Header title='Consumable Store' subtitle='Low on balance? Fill it up.' />
			<ConsumableItemCard />
		</div>
	);
}
