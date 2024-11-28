import { Header } from '@/src/components/common/elements/header';
import { PowerUps } from '@/src/components/layouts/shop/power-ups';
import React from 'react';

export default function UpgradeStorePage() {
	return (
		<div className='space-y-4'>
			<Header
				title='Power-Ups'
				subtitle='Level up your gaming experience with powerful upgrades'
			/>
			<PowerUps />
		</div>
	);
}
