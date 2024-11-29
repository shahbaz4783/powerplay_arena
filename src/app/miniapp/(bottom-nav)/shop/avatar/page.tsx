import { Header } from '@/src/components/common/elements/header';
import { AvatarStore } from '@/src/app/miniapp/(bottom-nav)/shop/avatar/avatar-store';

export default function AvatarStorePage() {
	return (
		<div className='space-y-4'>
			<Header title='Consumable Store' subtitle='Low on balance? Fill it up.' />
			<AvatarStore />
		</div>
	);
}
