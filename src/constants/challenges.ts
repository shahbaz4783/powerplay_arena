import { Award, Zap, Target, Star, Trophy } from 'lucide-react';

export const challenges = [
	{
		title: 'Lightning Striker',
		description: 'Unleash your fury! Take 50 wickets in Blitz matches.',
		icon: 'Award',
		totalGoal: 50,
		reward: 750,
		xp: 500,
	},
	{
		title: 'Boundary Blaster',
		description:
			'Paint the field with fours! Hit 20 boundaries in Blitz games.',
		icon: 'Award',
		totalGoal: 10,
		reward: 750,
		xp: 500,
	},
	{
		title: 'Powerplay Punisher',
		description:
			'Dominate the powerplay! Score 1000 runs in Powerplay matches.',
		icon: 'Award',
		totalGoal: 1000,
		reward: 1500,
		xp: 1000,
	},
	{
		title: 'Endurance Emperor',
		description: 'Outlast them all! Bowl 100 overs in Powerplay games.',
		icon: 'Award',
		totalGoal: 600,
		reward: 1500,
		xp: 1000,
	},
	{
		title: 'Immovable Object',
		description: 'Be the ultimate defender! Face 450 overs in Classic matches.',
		icon: 'Award',
		totalGoal: 450,
		reward: 6000,
		xp: 4000,
	},
	{
		title: 'Classic Conqueror',
		description: 'Master the long game! Win 50 Classic matches.',
		icon: 'Award',
		totalGoal: 50,
		reward: 10000,
		xp: 8000,
	},
	{
		title: 'Sixer Sensation',
		description: 'Light up the sky! Hit 1000 sixes across all formats.',
		icon: 'Zap',
		totalGoal: 1000,
		reward: 7500,
		xp: 6000,
	},
	{
		title: 'Stumps Shatterer',
		description:
			'Become a bowling legend! Take 1000 wickets across all formats.',
		icon: 'Target',
		totalGoal: 1000,
		reward: 15000,
		xp: 12000,
	},
	{
		title: 'Victory Virtuoso',
		description:
			'Be the ultimate champion! Win 500 matches across all formats.',
		icon: 'Star',
		totalGoal: 500,
		reward: 18000,
		xp: 1500,
	},
	{
		title: 'Run Machine',
		description: 'Reach cricket immortality! Score a total of 20,000 runs.',
		icon: 'Target',
		totalGoal: 20000,
		reward: 20000,
		xp: 1800,
	},
];

export const iconMap: { [key: string]: React.ElementType } = {
	blitz_wicket_50: Zap,
	blitz_boundary_200: Target,
	powerplay_run_1000: Trophy,
	powerplay_over_100: Award,
	classic_over_450: Award,
	classic_win_50: Trophy,
	total_sixes_1000: Zap,
	total_wickets_1000: Target,
	total_wins_500: Trophy,
	total_runs_20000: Star,
};

export const betOptions = [
	{
		name: 'Safe Horizon',
		description: '75% chance to win with a low-risk 1.2x return.',
		odds: 0.75,
		payout: 1.2,
	},
	{
		name: 'Classic Flip',
		description: '50/50 chance to double your bet',
		odds: 0.5,
		payout: 2,
	},
	{
		name: 'Triple Threat',
		description: '33% chance to triple your bet with a bold move.',
		odds: 0.33,
		payout: 3,
	},
	{
		name: 'Fortune’s Favour',
		description: '20% chance to 5x your bet and hit the jackpot',
		odds: 0.2,
		payout: 5,
	},
];

export const betSides = [
	{
		name: 'Heads',
		value: 'heads',
	},
	{
		name: 'Tails',
		value: 'tails',
	},
];