import { Milestone } from '@/src/types/db.types';

const calculateTotalStats = (cricketStats: any) => {
	const { blitzStats, powerplayStats, classicStats } = cricketStats;
	return {
		totalSixes:
			(blitzStats?.sixes || 0) +
			(powerplayStats?.sixes || 0) +
			(classicStats?.sixes || 0),
		totalWickets:
			(blitzStats?.wicketsTaken || 0) +
			(powerplayStats?.wicketsTaken || 0) +
			(classicStats?.wicketsTaken || 0),
		totalWins:
			(blitzStats?.matchesWon || 0) +
			(powerplayStats?.matchesWon || 0) +
			(classicStats?.matchesWon || 0),
		totalRuns:
			(blitzStats?.runsScored || 0) +
			(powerplayStats?.runsScored || 0) +
			(classicStats?.runsScored || 0),
	};
};

const calculateBettingTotals = (bettingStats: any) => {
	const { safeBet, classicFlip, tripleShot, jackpot } = bettingStats;
	return {
		totalBetEarnings:
			(safeBet?.totalPayout || 0) +
			(classicFlip?.totalPayout || 0) +
			(tripleShot?.totalPayout || 0) +
			(jackpot?.totalPayout || 0),
		totalBetsWon:
			(safeBet?.betsWon || 0) +
			(classicFlip?.betsWon || 0) +
			(tripleShot?.betsWon || 0) +
			(jackpot?.betsWon || 0),
	};
};

export const calculateMilestones = (
	cricketStats: any,
	bettingStats: any
): Milestone[] => {
	const { blitzStats, powerplayStats, classicStats } = cricketStats;
	const { safeBet, classicFlip, tripleShot, jackpot } = bettingStats;
	const { totalSixes, totalWickets, totalWins, totalRuns } =
		calculateTotalStats(cricketStats);
	const { totalBetEarnings, totalBetsWon } =
		calculateBettingTotals(bettingStats);

	return [
		{
			id: 'blitz_wicket_50',
			title: 'Lightning Striker',
			description: 'Unleash your fury! Take 50 wickets in Blitz matches.',
			progress: blitzStats?.wicketsTaken || 0,
			total: 50,
			reward: 750,
			isCompleted: (blitzStats?.wicketsTaken || 0) >= 50,
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
			isCompleted: totalWickets >= 1,
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
			description: 'Reach cricket immortality! Score a total of 20,000 runs.',
			progress: totalRuns,
			total: 20000,
			reward: 20000,
			isCompleted: totalRuns >= 20000,
		},
		{
			id: 'safe_rich',
			title: 'Safe Rich',
			description: 'Accumulate 50,000 in safe winnings from bets.',
			progress: safeBet?.totalPayout || 0,
			total: 50000,
			reward: 5000,
			isCompleted: (safeBet?.totalPayout || 0) >= 50000,
		},
		{
			id: 'classic_flip_100',
			title: 'Flip Master',
			description: 'Win 100 Classic Flips. Heads or tails, you decide!',
			progress: classicFlip?.betsWon || 0,
			total: 100,
			reward: 2000,
			isCompleted: (classicFlip?.betsWon || 0) >= 20,
		},
		{
			id: '300_triple_shop_bets',
			title: 'High Roller',
			description: 'Place 300 Triple Shot bets. Go big or go home!',
			progress: tripleShot?.betsPlaced || 0,
			total: 300,
			reward: 3000,
			isCompleted: (tripleShot?.betsPlaced || 0) >= 300,
		},
		{
			id: '50_jackpot_wins',
			title: 'Jackpot Juggernaut',
			description: 'Win 20 Jackpot bets. Hit the big time!',
			progress: jackpot?.betsWon || 0,
			total: 50,
			reward: 2000,
			isCompleted: (jackpot?.betsWon || 0) >= 50,
		},
		{
			id: '1000_bet_wins',
			title: 'Betting Baron',
			description: 'Win 1000 bets total. Master of predictions!',
			progress: totalBetsWon,
			total: 1000,
			reward: 2000,
			isCompleted: totalBetsWon >= 1000,
		},
		{
			id: 'bet_millionaire',
			title: 'Bet Millionaire',
			description:
				'Accumulate 1,000,000 in total winnings from bets. Fortune favors the bold!',
			progress: totalBetEarnings,
			total: 1000000,
			reward: 50000,
			isCompleted: totalBetEarnings >= 1000000,
		},
	];
};
