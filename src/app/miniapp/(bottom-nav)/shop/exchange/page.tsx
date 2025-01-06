import { InGameExchange } from '@/src/app/miniapp/(bottom-nav)/shop/exchange/exchange-center';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function ExchangeStorePage() {
	return (
		<div className='space-y-3 px-3'>
			<PageHeader
				title='Exchange Center'
				description='Convert your resources for what you need most.'
			/>
			<InGameExchange />
		</div>
	);
}
