import { Header } from '@/src/components/common/elements/header';
import { DailyReward } from '@/src/app/miniapp/reward/daily-reward';

export default function RewardPage() {
	return (
		<div className='space-y-8'>
			<Header
				title='Daily Bounty'
				subtitle='Claim your rewards and keep your streak alive'
			/>
			<DailyReward />
		</div>
	);
}
