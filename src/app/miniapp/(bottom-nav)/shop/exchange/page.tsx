import { Header } from '@/src/components/common/elements/header';
import { PowerPassStore } from '@/src/components/layouts/shop/powerpass-store';
import React from 'react';

export default function ExchangeStorePage() {
	return (
		<div className='space-y-4'>
			<Header title='Consumable Store' subtitle='Low on balance? Fill it up.' />
			<PowerPassStore />
		</div>
	);
}
