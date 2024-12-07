import { useState, useEffect } from 'react';
import { Milestone } from '@/src/types/db.types';
import { fetchClaimedAwards } from '../db/user';
import { useStats, CricketStats, BettingStats } from './useStats';
import { calculateMilestones } from '../constants/milestones';
import { Badge } from '@prisma/client';
import { useCurrentUser } from './useCurrentUser';

export const useMilestones = () => {
	const [challenges, setChallenges] = useState<Milestone[]>([]);
	const [unclaimedAwards, setUnclaimedAwards] = useState<Milestone[]>([]);
	const [claimedAwards, setClaimedAwards] = useState<Badge[]>([]);

	const { telegramId } = useCurrentUser();

	const { cricketStats, bettingStats } = useStats(telegramId);

	useEffect(() => {
		const loadMilestones = async () => {
			if (!telegramId || !cricketStats || !bettingStats) return;

			const allMilestones = calculateMilestones(
				cricketStats as CricketStats,
				bettingStats as BettingStats
			);
			const fetchedClaimedAwards = await fetchClaimedAwards(telegramId);

			const unclaimedMilestones = allMilestones.filter(
				(milestone) =>
					!fetchedClaimedAwards.some(
						(claimed) => claimed.awardId === milestone.id
					)
			);

			setChallenges(unclaimedMilestones.filter((m) => !m.isCompleted));
			setUnclaimedAwards(unclaimedMilestones.filter((m) => m.isCompleted));
			setClaimedAwards(fetchedClaimedAwards);
		};

		loadMilestones();
	}, [telegramId, cricketStats, bettingStats]);

	return {
		challenges,
		unclaimedAwards,
		claimedAwards,
		userId: telegramId,
	};
};
