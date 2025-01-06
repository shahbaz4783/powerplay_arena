import { Header } from '@/src/components/common/elements/header';
import { AvatarStore } from '@/src/app/miniapp/(bottom-nav)/shop/avatar/avatar-store';
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function AvatarStorePage() {
	return (
		<div className='space-y-4 px-3'>
			<PageHeader
				title='The Avatar Gallery'
				description='Customize your look with exclusive avatars and stand out from the crowd'
			/>
			<AvatarStore />
		</div>
	);
}
