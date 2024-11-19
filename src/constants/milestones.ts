import { Milestone } from '@/src/types/db.types';
import { MatchFormat, BetType } from '@prisma/client';
import { BettingStats, CricketStats } from '../hooks/useStats';

const calculateTotalStats = (cricketStats: CricketStats) => {
	const formats = Object.values(MatchFormat);
	return {
		totalSixes: formats.reduce(
			(total, format) => total + (cricketStats[format]?.sixes || 0),
			0
		),
		totalWickets: formats.reduce(
			(total, format) => total + (cricketStats[format]?.wicketsTaken || 0),
			0
		),
		totalWins: formats.reduce(
			(total, format) => total + (cricketStats[format]?.matchesWon || 0),
			0
		),
		totalRuns: formats.reduce(
			(total, format) => total + (cricketStats[format]?.runsScored || 0),
			0
		),
	};
};

const calculateBettingTotals = (bettingStats: BettingStats) => {
	const betTypes = Object.values(BetType);
	return {
		totalBetEarnings: betTypes.reduce(
			(total, type) => total + (bettingStats[type]?.totalPayout || 0),
			0
		),
		totalBetsWon: betTypes.reduce(
			(total, type) => total + (bettingStats[type]?.betsWon || 0),
			0
		),
	};
};

export const calculateMilestones = (
	cricketStats: CricketStats,
	bettingStats: BettingStats
): Milestone[] => {
	const { totalSixes, totalWickets, totalWins, totalRuns } =
		calculateTotalStats(cricketStats);
	const { totalBetEarnings, totalBetsWon } =
		calculateBettingTotals(bettingStats);

	return [
		{
			id: 'blitz_wicket_50',
			title: 'Lightning Striker',
			description: 'Unleash your fury! Take 50 wickets in Blitz matches.',
			progress: cricketStats[MatchFormat.BLITZ]?.wicketsTaken || 0,
			total: 50,
			reward: 750,
			isCompleted: (cricketStats[MatchFormat.BLITZ]?.wicketsTaken || 0) >= 50,
		},
		{
			id: 'blitz_boundary_200',
			title: 'Boundary Blaster',
			description:
				'Paint the field with fours! Hit 200 boundaries in Blitz games.',
			progress: cricketStats[MatchFormat.BLITZ]?.fours || 0,
			total: 200,
			reward: 750,
			isCompleted: (cricketStats[MatchFormat.BLITZ]?.fours || 0) >= 200,
		},
		{
			id: 'powerplay_run_1000',
			title: 'Powerplay Punisher',
			description:
				'Dominate the powerplay! Score 1000 runs in Powerplay matches.',
			progress: cricketStats[MatchFormat.POWERPLAY]?.runsScored || 0,
			total: 1000,
			reward: 1500,
			isCompleted:
				(cricketStats[MatchFormat.POWERPLAY]?.runsScored || 0) >= 1000,
		},
		{
			id: 'powerplay_over_100',
			title: 'Endurance Emperor',
			description: 'Outlast them all! Bowl 100 overs in Powerplay games.',
			progress: Math.floor(
				(cricketStats[MatchFormat.POWERPLAY]?.ballsBowled || 0) / 6
			),
			total: 100,
			reward: 1500,
			isCompleted:
				(cricketStats[MatchFormat.POWERPLAY]?.ballsBowled || 0) >= 600,
		},
		{
			id: 'classic_over_450',
			title: 'Immovable Object',
			description:
				'Be the ultimate defender! Face 450 overs in Classic matches.',
			progress: Math.floor(
				(cricketStats[MatchFormat.CLASSIC]?.ballsFaced || 0) / 6
			),
			total: 450,
			reward: 6000,
			isCompleted: (cricketStats[MatchFormat.CLASSIC]?.ballsFaced || 0) >= 2700,
		},
		{
			id: 'classic_win_50',
			title: 'Classic Conqueror',
			description: 'Master the long game! Win 50 Classic matches.',
			progress: cricketStats[MatchFormat.CLASSIC]?.matchesWon || 0,
			total: 50,
			reward: 10000,
			isCompleted: (cricketStats[MatchFormat.CLASSIC]?.matchesWon || 0) >= 50,
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
			progress: bettingStats[BetType.SAFE_BET]?.totalPayout || 0,
			total: 50000,
			reward: 5000,
			isCompleted: (bettingStats[BetType.SAFE_BET]?.totalPayout || 0) >= 50000,
		},
		{
			id: 'classic_flip_100',
			title: 'Flip Master',
			description: 'Win 100 Classic Flips. Heads or tails, you decide!',
			progress: bettingStats[BetType.CLASSIC_FLIP]?.betsWon || 0,
			total: 100,
			reward: 2000,
			isCompleted: (bettingStats[BetType.CLASSIC_FLIP]?.betsWon || 0) >= 100,
		},
		{
			id: '300_triple_shot_bets',
			title: 'High Roller',
			description: 'Place 300 Triple Shot bets. Go big or go home!',
			progress: bettingStats[BetType.TRIPLE_SHOT]?.betsPlaced || 0,
			total: 300,
			reward: 3000,
			isCompleted: (bettingStats[BetType.TRIPLE_SHOT]?.betsPlaced || 0) >= 300,
		},
		{
			id: '50_jackpot_wins',
			title: 'Jackpot Juggernaut',
			description: 'Win 50 Jackpot bets. Hit the big time!',
			progress: bettingStats[BetType.JACKPOT]?.betsWon || 0,
			total: 50,
			reward: 2000,
			isCompleted: (bettingStats[BetType.JACKPOT]?.betsWon || 0) >= 50,
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
