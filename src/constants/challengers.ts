export const RARITY_LEVELS = [
	'common',
	'uncommon',
	'rare',
	'epic',
	'legendary',
	'mythic',
] as const;
export type Rarity = (typeof RARITY_LEVELS)[number];

export interface ChallengersPack {
	name: string;
	challengerCount: number;
	price: number;
	imageUrl: string;
	rarityChances: Record<Rarity, number>;
}

export const challengersPacks: ChallengersPack[] = [
	{
		name: 'Starter Pack',
		challengerCount: 3,
		price: 1000,
		imageUrl: '',
		rarityChances: {
			common: 60,
			uncommon: 30,
			rare: 5,
			epic: 2,
			legendary: 1,
			mythic: 0.5,
		},
	},
	{
		name: 'Elite Pack',
		challengerCount: 5,
		price: 2000,
		imageUrl: '',
		rarityChances: {
			common: 50,
			uncommon: 30,
			rare: 10,
			epic: 5,
			legendary: 3,
			mythic: 1,
		},
	},
	{
		name: 'Ultimate Pack',
		challengerCount: 7,
		price: 3000,
		imageUrl: '',
		rarityChances: {
			common: 40,
			uncommon: 30,
			rare: 15,
			epic: 8,
			legendary: 5,
			mythic: 2,
		},
	},
];
