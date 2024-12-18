import { Header } from '@/src/components/common/elements/header';
import { StatsHomePage } from './stats-home';

export default function StatsPage() {
	return (
		<div className='space-y-8'>
			<Header
				title='Player Statistics'
				subtitle='Dive into your performance metrics'
			/>
			<StatsHomePage />
		</div>
	);
}
