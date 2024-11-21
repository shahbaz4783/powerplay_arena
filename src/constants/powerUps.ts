import { Crosshair, Gift, Shield, Target, Zap } from 'lucide-react';

export const shopItems = [
	{
		id: 'streak-guardian',
		title: 'Streak Guardian',
		description: 'Preserves your daily reward streak if you miss a day.',
		image: 'placeholderImage',
		price: 100,
		icon: Shield,
	},
	{
		id: 'fortunes-favor',
		title: "Fortune's Favor",
		description:
			'Increases your chances of better outcomes for a limited time.',
		image: '',
		price: 150,
		icon: Zap,
	},
	{
		id: 'bounty-booster',
		title: 'Bounty Booster',
		description: 'Doubles your daily reward for the next 24 hours.',
		image: '',
		price: 200,
		icon: Gift,
	},
	{
		id: 'batsmans-edge',
		title: "Batsman's Edge",
		description: 'Enhances your batting performance for the next match.',
		image: '',
		price: 250,
		icon: Target,
	},
	{
		id: 'bowlers-boon',
		title: "Bowler's Boon",
		description: 'Improves your bowling accuracy and speed for one game.',
		image: '',
		price: 250,
		icon: Crosshair,
	},
];
