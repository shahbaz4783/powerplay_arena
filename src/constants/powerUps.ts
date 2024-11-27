export interface InGameItem {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	levels: {
		level: number;
		price: number;
		effect: string;
	}[];
}

export const inGameItems: InGameItem[] = [
	{
		id: 'streak-shield',
		title: 'Streak Shield',
		description: 'Protects your daily reward streak from interruptions.',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 199,
		levels: [
			{ level: 1, price: 1000, effect: 'Preserves streak for 1 missed day' },
			{ level: 5, price: 5000, effect: 'Preserves streak for 2 missed days' },
			{
				level: 10,
				price: 10000,
				effect: 'Preserves streak for 3 missed days',
			},
		],
	},
	{
		id: 'fortune-amplifier',
		title: 'Fortune Amplifier',
		description: 'Permanently increases your betting payouts.',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 299,
		levels: [
			{ level: 1, price: 2000, effect: '+5% increase to all betting payouts' },
			{
				level: 5,
				price: 10000,
				effect: '+25% increase to all betting payouts',
			},
			{
				level: 10,
				price: 20000,
				effect: '+50% increase to all betting payouts',
			},
		],
	},
	{
		id: 'reward-multiplier',
		title: 'Reward Multiplier',
		description: 'Permanently increases your daily reward.',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 299,
		levels: [
			{ level: 1, price: 1500, effect: '+5% increase to daily reward' },
			{ level: 5, price: 7500, effect: '+25% increase to daily reward' },
			{ level: 10, price: 15000, effect: '+50% increase to daily reward' },
		],
	},
	{
		id: 'batting-enhancer',
		title: 'Batting Enhancer',
		description: 'Permanently boosts your batting skills in cricket matches.',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 99,
		levels: [
			{
				level: 1,
				price: 2500,
				effect: '+5% batting performance in all matches',
			},
			{
				level: 5,
				price: 12500,
				effect: '+25% batting performance in all matches',
			},
			{
				level: 10,
				price: 25000,
				effect: '+50% batting performance in all matches',
			},
		],
	},
	{
		id: 'bowling-precision',
		title: 'Bowling Precision',
		description:
			'Permanently enhances your bowling accuracy and speed in all games.',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 99,
		levels: [
			{
				level: 1,
				price: 2500,
				effect: '+5% bowling performance in all matches',
			},
			{
				level: 5,
				price: 12500,
				effect: '+25% bowling performance in all matches',
			},
			{
				level: 10,
				price: 25000,
				effect: '+50% bowling performance in all matches',
			},
		],
	},
];

export interface RepeatablePurchaseItem {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	coins?: number;
	passes?: number;
	stars?: number;
}

export const consumableItems: RepeatablePurchaseItem[] = [
	{
		id: 'star-striker-bundle',
		title: 'Star Striker Bundle',
		description:
			'A powerful combination of in-game coins and power pass to boost your gaming experience!',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 149,
		coins: 10000,
		stars: 500,
	},
	{
		id: 'coin-cache',
		title: 'Coin Cache',
		description:
			'A hefty stash of coins to fuel your gameplay and betting adventures!',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 49,
		coins: 5000,
	},
	{
		id: 'pass-pack',
		title: 'Pass Pack',
		description:
			'A bundle of game passes for extended playtime and more opportunities!',
		image: 'v1731132322/Untitled_design_ueqh9m.jpg',
		price: 49,
		passes: 250,
	},
];