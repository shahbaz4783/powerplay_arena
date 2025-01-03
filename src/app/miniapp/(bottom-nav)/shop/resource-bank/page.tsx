import { ConsumableItemCard } from '@/src/app/miniapp/(bottom-nav)/shop/resource-bank/resource-bank';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function ResourceBankPage() {
	return (
		<div className='space-y-4'>
			<PageHeader
				title='Resource Bank'
				description='Stock up on resources for endless play'
			/>
			<ConsumableItemCard />
		</div>
	);
}
