import { Header } from '@/src/components/common/elements/header';
import { PowerUps } from '@/src/app/miniapp/(bottom-nav)/shop/powerups/power-ups';
import React from 'react';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function UpgradeStorePage() {
	return (
		<div className='space-y-4'>
			<PageHeader
				title='Power-Ups'
				description='Level up your gaming experience with powerful upgrades'
			/>
			<PowerUps />
		</div>
	);
}
