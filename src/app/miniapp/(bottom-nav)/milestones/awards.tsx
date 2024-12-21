'use client';

import { useMilestones } from '@/src/hooks/useMilestone';
import { motion } from 'framer-motion';
import { AwardCard } from '../../../../components/common/cards/award-card';
import { MessageCard } from '../../../../components/common/cards/message-card';

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
						<AwardCard key={award.badgeId} awardId={award.badgeId} {...award} />
					))}
				</>
			) : (
				<MessageCard
					title='Loading Your Awards'
					message='Polishing your trophies and medals...'
					type='loading'
				/>
			)}
		</motion.div>
	);
}
