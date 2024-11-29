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
		id: 'streak-guardian',
		title: 'Streak Guardian',
		description: 'Protects your daily reward streak from interruptions.',
		image: 'v1732801673/bdfc8b5f-0ba9-4296-b7ab-327af0e29778_cwuatt.jpg',
		price: 249,
		levels: [
			{ level: 1, price: 1000, effect: 'Preserves streak for 1 missed day' },
			{ level: 5, price: 5000, effect: 'Preserves streak for 2 missed days' },
			{ level: 10, price: 10000, effect: 'Preserves streak for 3 missed days' },
		],
	},

	{
		id: 'daily-bounty-booster',
		title: 'Daily Bounty Booster',
		description: 'Permanently increases your daily reward.',
		image: 'v1732802010/573f3e02-9976-41a2-a206-2c1e64e6be8c_vwnisk.jpg',
		price: 299,
		levels: [
			{ level: 1, price: 1500, effect: '+5% increase to daily reward' },
			{ level: 5, price: 7500, effect: '+25% increase to daily reward' },
			{ level: 10, price: 15000, effect: '+50% increase to daily reward' },
		],
	},
	{
		id: 'cricket-bat-maestro',
		title: 'Cricket Bat Maestro',
		description: 'Enhance your batting performance in every match.',
		image: 'v1732799875/1f7cc70d-d61a-4fb9-a85c-a19c25f9c0af_qqkk9b.jpg',
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
		id: 'exchange_optimizer',
		title: 'Exchange Optimizer',
		description: 'Save coins with reduced exchange fees.',
		image: 'v1732804104/5604eaaa-3cfe-4bcd-a8ae-9c03c65ca184_h51izx.jpg',
		price: 149,
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
	{
		id: 'winnings-xcelerator',
		title: 'Winnings Xcelerator',
		description: 'Increase betting payouts up to double rewards',
		image: 'v1732802822/76ae53a7-6abd-426c-af53-b2c4ce111b13_f550n5.jpg',
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
		id: 'bowling-dominator',
		title: 'Bowling Dominator',
		description: 'Improve bowling accuracy and wicket-taking abilities.',
		image: 'v1732803683/48f94361-7b1f-4f38-b648-7bdcf8667807_tjehg5.jpg',
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
		id: 'stellar-boost-bundle',
		title: 'Stellar Boost Bundle',
		description:
			'A dynamic combo of coins and passes to accelerate your progress!',
		image: 'v1732874371/dd1adff0-944d-4b4d-aa52-0195c994ddd6_fawqvd.jpg',
		price: 149,
		coins: 10000,
		passes: 500,
	},
	{
		id: 'treasure-vault',
		title: 'Treasure Vault',
		description: 'A bountiful reserve of coins to enhance your gameplay!',
		image: 'v1732874370/0bbe8c70-2d0a-4661-852f-b7b584a8b9a6_z0hbxn.jpg',
		price: 49,
		coins: 5000,
	},
	{
		id: 'pass-stash',
		title: 'Pass Stash',
		description:
			'A collection of game passes for uninterrupted play!',
		image: 'v1732874370/acdb409d-a9e5-44cb-a4e7-dd365c2c13b0_mdo6y2.jpg',
		price: 49,
		passes: 250,
	},
];