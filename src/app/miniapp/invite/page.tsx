import { Header } from '@/src/components/common/elements/header';
import { InviteBonusInfo } from '@/src/components/layouts/earn/invite-bonus-info';
import { InviteLink } from '@/src/components/layouts/earn/invite-link';
import { InviteList } from '@/src/components/layouts/earn/invite-list';

const InvitePage = () => {
	return (
		<div className='space-y-5'>
			<Header
				title='Grow Your Team'
				subtitle='Invite friends and earn bonuses together'
			/>
			<InviteLink />
			<InviteBonusInfo />
			<InviteList />
		</div>
	);
};

export default InvitePage;
