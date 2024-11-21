'use client';

import { useMilestones } from '@/src/hooks/useMilestone';
import { MessageCard } from '../../common/cards/message-card';
import { MilestoneCard } from '../../common/cards/milestone-card';

export function MilestonesPage() {
	const { challenges, userId } = useMilestones();

	if (!userId) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<section className='space-y-4'>
				{challenges.length > 0 ? (
					<>
						{challenges.map((challenge) => (
							<MilestoneCard
								key={challenge.id}
								{...challenge}
								userId={userId}
							/>
						))}
					</>
				) : (
					<MessageCard
						title='Tracking Your Progress'
						message='Gathering your achievements and upcoming goals...'
						type='loading'
					/>
				)}
			</section>
		</div>
	);
}
