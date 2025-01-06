import { PowerUps } from '@/src/app/miniapp/(bottom-nav)/shop/powerups/power-ups';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function UpgradeStorePage() {
	return (
		<div className='space-y-4 px-3'>
			<PageHeader
				title='The Upgrade Hub'
				description='Level up your gaming experience with powerful upgrades'
			/>
			<PowerUps />
		</div>
	);
}
