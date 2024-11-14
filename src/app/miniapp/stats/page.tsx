import { Header } from '@/src/components/common/elements/header';
import { BettingStats } from '@/src/components/games/coin-flip/betting-stats';
import { UserCricketStats } from '@/src/components/games/cricket/user-cricket-stats';

export default function StatsPage() {
	return (
		<div className='space-y-8'>
			<Header
				title='Your Cricket Journey'
				subtitle='Dive into your performance metrics'
			/>
			<BettingStats />
			<UserCricketStats />
		</div>
	);
}
