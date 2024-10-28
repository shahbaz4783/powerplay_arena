'use client';

import { useMilestones } from '@/src/hooks/useMilestone';
import { motion } from 'framer-motion';
import { AwardCard } from '../cards/award-card';

export function Awards() {
	const { claimedAwards } = useMilestones();
	return (
		<motion.div
			className='space-y-3'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, staggerChildren: 0.1 }}
		>
			{claimedAwards.length > 0 ? (
				<>
					{claimedAwards.map((award) => (
						<AwardCard key={award.awardId} {...award} />
					))}
				</>
			) : (
				<div className='text-sm text-slate-400 font-mono text-center'>
					<p>You don't have any awards yet.</p>
					<p>Keep playing to earn them!</p>
				</div>
			)}
		</motion.div>
	);
}
