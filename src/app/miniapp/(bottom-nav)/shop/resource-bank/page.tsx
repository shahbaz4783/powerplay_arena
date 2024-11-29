import { Header } from '@/src/components/common/elements/header';
import { ConsumableItemCard } from '@/src/app/miniapp/(bottom-nav)/shop/resource-bank/resource-bank';
import React from 'react';

export default function ConsumableStorePage() {
	return (
		<div className='space-y-4'>
			<Header
				title='Resource Bank'
				subtitle='Stock up on resources for endless play.'
			/>
			<ConsumableItemCard />
		</div>
	);
}
