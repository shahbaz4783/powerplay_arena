'use client';

import { useMilestones } from '@/src/hooks/useMilestone';
import { MilestoneCard } from '../cards/milestone-card';

export function MilestonesPage() {
	const { challenges, unclaimedAwards, userId } = useMilestones();

	if (!userId) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			{unclaimedAwards.length > 0 && (
				<section className='space-y-2 bg-stone-900 rounded-xl p-4'>
					<h2 className='font-mono text-center text-sm text-slate-400'>
						Completed
					</h2>
					<div className='space-y-4'>
						{unclaimedAwards.map((award) => (
							<MilestoneCard key={award.id} {...award} userId={userId} />
						))}
					</div>
				</section>
			)}

			<section className='space-y-4'>
				{challenges.map((challenge) => (
					<MilestoneCard key={challenge.id} {...challenge} userId={userId} />
				))}
			</section>
		</div>
	);
}
