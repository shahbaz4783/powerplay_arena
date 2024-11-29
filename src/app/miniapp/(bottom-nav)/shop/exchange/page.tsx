import { Header } from '@/src/components/common/elements/header';
import { InGameExchange } from '@/src/app/miniapp/(bottom-nav)/shop/exchange/exchange-center';

export default function ExchangeStorePage() {
	return (
		<div className='space-y-4'>
			<Header
				title='Power Exchange'
				subtitle='Convert between Power Coins and Power Pass seamlessly'
			/>
			<InGameExchange />
		</div>
	);
}
