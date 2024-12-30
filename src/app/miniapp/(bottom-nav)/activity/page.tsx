import { Header } from '@/src/components/common/elements/header';
import { TransactionLists } from '@/src/app/miniapp/(bottom-nav)/activity/all-transaction';
import { PageHeader } from '@/src/components/layouts/global/page-header';
import { Activity } from 'lucide-react';

export default function Treasury() {
	return (
		<div className='space-y-4'>
			<PageHeader
				title='Transaction History'

				description='Track your in-game economy and rewards'
			/>
			<TransactionLists />
		</div>
	);
}
