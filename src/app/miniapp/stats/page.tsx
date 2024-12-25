import { Header } from '@/src/components/common/elements/header';
import { StatsHomePage } from './stats-home';
import {
	headerGradients,
	PageHeader,
} from '@/src/components/layouts/global/page-header';
import { BarChart3Icon } from 'lucide-react';

export default function StatsPage() {
	return (
		<div className='space-y-8'>
			<PageHeader
				title='Statistics'
				description='Track your gaming performance'
				icon={<BarChart3Icon />}
				bgGradient={headerGradients.stats}
			/>
			<StatsHomePage />
		</div>
	);
}
