import { Header } from '@/src/components/common/elements/header';
import { Leaderboard } from '@/src/components/layouts/global/rankings';

export default async function LeaderboardPage() {
	return (
		<div className='space-y-4'>
			<Header
				title='Leaderboard'
				subtitle='See how you stack up against the competition'
			/>
			<Leaderboard />
		</div>
	);
}
