import { BetType } from '@prisma/client';
import { Award, Zap, Target, Star, Trophy } from 'lucide-react';

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

interface BetOptionsProps {
	betType: BetType;
	name: string;
	description: string;
	odds: number;
	payout: number;
}

export const betOptions: BetOptionsProps[] = [
	{
		betType: 'SAFE_BET',
		name: 'Safe Bet',
		description: '75% chance to win with a low-risk 1.25x return.',
		odds: 0.75,
		payout: 1.25,
	},
	{
		betType: 'CLASSIC_FLIP',
		name: 'Classic Flip',
		description: '50/50 chance to double your bet',
		odds: 0.5,
		payout: 2,
	},
	{
		betType: 'TRIPLE_SHOT',
		name: 'Triple Shot',
		description: '33% chance to triple your bet with a bold move.',
		odds: 0.33,
		payout: 3,
	},
	{
		betType: 'JACKPOT',
		name: 'Jackpot',
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
