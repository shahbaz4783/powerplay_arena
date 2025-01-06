import { TransactionLists } from '@/src/app/miniapp/(bottom-nav)/activity/all-transaction';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function TransactionPage() {
	return (
		<div className='space-y-4 px-3'>
			<PageHeader
				title='Transaction Overview'
				description='Monitor your in-game earnings, expenses, and rewards.'
			/>
			<TransactionLists />
		</div>
	);
}