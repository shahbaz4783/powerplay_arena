import { useState, useEffect } from 'react';
import { useGetUserFormatStats } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { Star, Zap, Target, Award, LucideIcon } from 'lucide-react';
import {
	fetchClaimedAwards,
	saveAwardToDatabase,
} from '../actions/game.action';
import { Milestone } from '../types/db.types';
import { Award as AwardType } from '@prisma/client';

export const useMilestones = () => {
	const [challenges, setChallenges] = useState<Milestone[]>([]);
	const [unclaimedAwards, setUnclaimedAwards] = useState<Milestone[]>([]);
	const [claimedAwards, setClaimedAwards] = useState<AwardType[]>([]);

	const initData = useInitData();
	const user = initData?.user;
	const { data: blitzStats } = useGetUserFormatStats(user?.id, 'BLITZ');
	const { data: powerplayStats } = useGetUserFormatStats(user?.id, 'POWERPLAY');
	const { data: classicStats } = useGetUserFormatStats(user?.id, 'CLASSIC');

	useEffect(() => {
		const loadMilestones = async () => {
			const totalSixes =
				(blitzStats?.sixes || 0) +
				(powerplayStats?.sixes || 0) +
				(classicStats?.sixes || 0);
			const totalWickets =
				(blitzStats?.wicketsTaken || 0) +
				(powerplayStats?.wicketsTaken || 0) +
				(classicStats?.wicketsTaken || 0);
			const totalWins =
				(blitzStats?.matchesWon || 0) +
				(powerplayStats?.matchesWon || 0) +
				(classicStats?.matchesWon || 0);
			const totalRuns =
				(blitzStats?.runsScored || 0) +
				(powerplayStats?.runsScored || 0) +
				(classicStats?.runsScored || 0);

			const allMilestones: Milestone[] = [
				{
					id: 'blitz_wicket_50',
					title: 'Lightning Striker',
					description: 'Unleash your fury! Take 50 wickets in Blitz matches.',
					progress: blitzStats?.wicketsTaken || 0,
					total: 1,
					reward: 750,
					isCompleted: (blitzStats?.wicketsTaken || 0) >= 1,
				},
				{
					id: 'blitz_boundary_200',
					title: 'Boundary Blaster',
					description:
						'Paint the field with fours! Hit 200 boundaries in Blitz games.',
					progress: blitzStats?.fours || 0,
					total: 200,
					reward: 750,
					isCompleted: (blitzStats?.fours || 0) >= 200,
				},
				{
					id: 'powerplay_run_1000',
					title: 'Powerplay Punisher',
					description:
						'Dominate the powerplay! Score 1000 runs in Powerplay matches.',
					progress: powerplayStats?.runsScored || 0,
					total: 1000,
					reward: 1500,
					isCompleted: (powerplayStats?.runsScored || 0) >= 1000,
				},
				{
					id: 'powerplay_over_100',
					title: 'Endurance Emperor',
					description: 'Outlast them all! Bowl 100 overs in Powerplay games.',
					progress: Math.floor((powerplayStats?.ballsBowled || 0) / 6),
					total: 100,
					reward: 1500,
					isCompleted: (powerplayStats?.ballsBowled || 0) >= 600,
				},
				{
					id: 'classic_over_450',
					title: 'Immovable Object',
					description:
						'Be the ultimate defender! Face 450 overs in Classic matches.',
					progress: Math.floor((classicStats?.ballsFaced || 0) / 6),
					total: 450,
					reward: 6000,
					isCompleted: (classicStats?.ballsFaced || 0) >= 2700,
				},
				{
					id: 'classic_win_50',
					title: 'Classic Conqueror',
					description: 'Master the long game! Win 50 Classic matches.',
					progress: classicStats?.matchesWon || 0,
					total: 50,
					reward: 10000,
					isCompleted: (classicStats?.matchesWon || 0) >= 50,
				},
				{
					id: 'total_sixes_1000',
					title: 'Sixer Sensation',
					description: 'Light up the sky! Hit 1000 sixes across all formats.',
					progress: totalSixes,
					total: 1000,
					reward: 7500,
					isCompleted: totalSixes >= 1000,
				},
				{
					id: 'total_wickets_1000',
					title: 'Stumps Shatterer',
					description:
						'Become a bowling legend! Take 1000 wickets across all formats.',
					progress: totalWickets,
					total: 1000,
					reward: 15000,
					isCompleted: totalWickets >= 1000,
				},
				{
					id: 'total_wins_500',
					title: 'Victory Virtuoso',
					description:
						'Be the ultimate champion! Win 500 matches across all formats.',
					progress: totalWins,
					total: 500,
					reward: 18000,
					isCompleted: totalWins >= 500,
				},
				{
					id: 'total_runs_20000',
					title: 'Run Machine',
					description:
						'Reach cricket immortality! Score a total of 20,000 runs.',
					progress: totalRuns,
					total: 20000,
					reward: 20000,
					isCompleted: totalRuns >= 6,
				},
			];

			const fetchedClaimedAwards = await fetchClaimedAwards(user?.id!);

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
		if (user?.id) {
			loadMilestones();
		}
	}, [user?.id, blitzStats, powerplayStats, classicStats]);

	return { challenges, unclaimedAwards, claimedAwards, userId: user?.id };
};
