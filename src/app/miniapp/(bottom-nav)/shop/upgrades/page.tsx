import { Header } from '@/src/components/common/elements/header';
import { PowerUps } from '@/src/components/layouts/shop/power-ups';
import React from 'react';

export default function UpgradeStorePage() {
	return (
		<div className='space-y-4'>
			<Header title='Consumable Store' subtitle='Low on balance? Fill it up.' />
			<PowerUps />
		</div>
	);
}
