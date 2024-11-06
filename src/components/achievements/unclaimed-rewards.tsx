'use client';

import { MessageCard } from '../cards/message-card';
import { MilestoneCard } from '../cards/milestone-card';
import { useMilestones } from '@/src/hooks/useMilestone';

export function UnclaimedRewards() {
	const { unclaimedAwards, userId } = useMilestones();
	if (!userId) return <div>Loading...</div>;

	return (
		<div className='space-y-4'>
			{unclaimedAwards.length > 0 ? (
				<div className='space-y-4 '>
					{unclaimedAwards.map((award) => (
						<MilestoneCard key={award.id} {...award} userId={userId} />
					))}
				</div>
			) : (
				<MessageCard
					title='Nothing to claim'
					message="You're all caught up! Check back later for new rewards or complete more challenges to earn claimable items."
				/>
			)}
		</div>
	);
}
