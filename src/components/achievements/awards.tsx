'use client';

import { useMilestones } from '@/src/hooks/useMilestone';

export function Awards() {
	const { claimedAwards } = useMilestones();
	return (
		<div className='space-y-4'>
			{claimedAwards.map((award) => (
				<p>{award.title}</p>
			))}
		</div>
	);
}
