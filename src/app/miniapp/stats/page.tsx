import { Header } from '@/src/components/common/elements/header';
import { UserCricketStats } from '@/src/components/games/cricket/user-cricket-stats';

export default function StatsPage() {
	return (
		<div className='space-y-8'>
			<Header
				title='Your Cricket Journey'
				subtitle='Dive into your performance metrics'
			/>
			<UserCricketStats />
		</div>
	);
}
