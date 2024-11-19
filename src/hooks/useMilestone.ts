import { useState, useEffect } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { Award } from '@prisma/client';
import { Milestone } from '@/src/types/db.types';
import { fetchClaimedAwards } from '../db/user';
import { useStats } from './useStats';
import { calculateMilestones } from '../constants/milestones';

export const useMilestones = () => {
	const [challenges, setChallenges] = useState<Milestone[]>([]);
	const [unclaimedAwards, setUnclaimedAwards] = useState<Milestone[]>([]);
	const [claimedAwards, setClaimedAwards] = useState<Award[]>([]);

	const initData = useInitData();
	const user = initData?.user;
	const { cricketStats, bettingStats } = useStats(user?.id!);

	useEffect(() => {
		const loadMilestones = async () => {
			if (!user?.id || !cricketStats || !bettingStats) return;

			const allMilestones = calculateMilestones(cricketStats, bettingStats);
			const fetchedClaimedAwards = await fetchClaimedAwards(user.id);

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
	}, [user?.id, cricketStats, bettingStats]);

	return {
		challenges,
		unclaimedAwards,
		claimedAwards,
		userId: user?.id,
	};
};
