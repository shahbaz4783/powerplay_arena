import { ConsumableItemCard } from '@/src/app/miniapp/(bottom-nav)/shop/resource-bank/resource-bank';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function ResourceBankPage() {
	return (
		<div className='space-y-4 px-3'>
			<PageHeader
				title='Resource Depot'
				description='Fuel your progress with an endless supply of essential resources.'
			/>
			<ConsumableItemCard />
		</div>
	);
}
