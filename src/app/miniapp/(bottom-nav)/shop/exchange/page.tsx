import { Header } from '@/src/components/common/elements/header';
import { InGameExchange } from '@/src/app/miniapp/(bottom-nav)/shop/exchange/exchange-center';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function ExchangeStorePage() {
	return (
		<div className='space-y-3'>
			<PageHeader
				title='Power Exchange'
				description='Convert between Power Coins and Power Pass seamlessly'
			/>
			<InGameExchange />
		</div>
	);
}
