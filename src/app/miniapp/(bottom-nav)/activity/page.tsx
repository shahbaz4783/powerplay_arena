import { Header } from '@/src/components/common/elements/header';
import { TransactionLists } from '@/src/app/miniapp/(bottom-nav)/activity/all-transaction';

export default function Treasury() {
	return (
		<div className='space-y-6'>
			<Header
				title='Transaction History'
				subtitle='Track your in-game economy and rewards'
			/>
			<TransactionLists />
		</div>
	);
}
