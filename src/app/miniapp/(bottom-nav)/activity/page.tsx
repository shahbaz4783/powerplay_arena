import { TransactionLists } from '@/src/components/cards/transaction-card';
import { WalletOverview } from '@/src/components/cards/wallet-overview-card';
import { Header } from '@/src/components/shared/header';

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
