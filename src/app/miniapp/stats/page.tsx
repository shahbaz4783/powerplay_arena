import { StatsHomePage } from './stats-home';
import {
	PageHeader,
} from '@/src/components/layouts/global/page-header';

export default function StatsPage() {
	return (
		<div className='space-y-6'>
			<PageHeader
				title='Statistics'
				description='Track your gaming performance'
			/>
			<StatsHomePage />
		</div>
	);
}
