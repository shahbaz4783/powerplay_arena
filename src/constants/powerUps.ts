import { Rarity } from '@prisma/client';

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



export const upgradeCosts = [
	{ rarity: 'COMMON', coin: 0, pass: 0 },
	{ rarity: 'UNCOMMON', coin: 2000, pass: 40 },
	{ rarity: 'RARE', coin: 8000, pass: 60 },
	{ rarity: 'EPIC', coin: 15000, pass: 100 },
	{ rarity: 'LEGENDARY', coin: 25000, pass: 300 },
];

export const powerUps = [
	{
		powerUp_Id: 'streak-guardian',
		title: 'Streak Guardian',
		description: 'Shield your daily bounty reward streak from resets.',
		image: 'v1732801673/bdfc8b5f-0ba9-4296-b7ab-327af0e29778_cwuatt.jpg',
		price: 249,
		benefits: [
			{ rarity: 'COMMON', boost: 1, info: 'Save 1 days of missed claim' },
			{ rarity: 'UNCOMMON', boost: 2, info: 'Save 2 days of missed claim' },
			{ rarity: 'RARE', boost: 3, info: 'Save 3 days of missed claim' },
			{ rarity: 'EPIC', boost: 4, info: 'Save 4 days of missed claim' },
			{ rarity: 'LEGENDARY', boost: 5, info: 'Save 5 days of missed claim' },
		],
	},
	{
		powerUp_Id: 'daily-bounty-booster',
		title: 'Daily Bounty Booster',
		description: 'Boost your daily rewards permanently.',
		image: 'v1732802010/573f3e02-9976-41a2-a206-2c1e64e6be8c_vwnisk.jpg',
		price: 299,
		benefits: [
			{ rarity: 'COMMON', boost: 1.1, info: '+10% boost to daily bounty.' },
			{ rarity: 'UNCOMMON', boost: 1.2, info: '+20% boost to daily bounty.' },
			{ rarity: 'RARE', boost: 1.5, info: '+50% boost to daily bounty.' },
			{ rarity: 'EPIC', boost: 2, info: '2x boost to daily bounty.' },
			{ rarity: 'LEGENDARY', boost: 3, info: '3x boost to daily bounty.' },
		],
	},
	{
		powerUp_Id: 'cricket-bat-maestro',
		title: 'Cricket Bat Maestro',
		description: 'Master the art of lofted shots.',
		image: 'v1732799875/1f7cc70d-d61a-4fb9-a85c-a19c25f9c0af_qqkk9b.jpg',
		price: 299,
		benefits: [
			{ rarity: 'COMMON', boost: 2, info: 'Play upto 2 lofted shots per over' },
			{
				rarity: 'UNCOMMON',
				boost: 3,
				info: 'Play upto 3 lofted shots per over',
			},
			{ rarity: 'RARE', boost: 4, info: 'Play upto 4 lofted shots per over' },
			{ rarity: 'EPIC', boost: 5, info: 'Play upto 5 lofted shots per over' },
			{ rarity: 'LEGENDARY', boost: 6, info: 'No limit to play lofted shots' },
		],
	},
	{
		powerUp_Id: 'exchange_optimizer',
		title: 'Exchange Optimizer',
		description: 'Slash exchange fees and save coins.',
		image: 'v1732804104/5604eaaa-3cfe-4bcd-a8ae-9c03c65ca184_h51izx.jpg',
		price: 149,
		benefits: [
			{ rarity: 'COMMON', boost: 0.9, info: '-10% exchange fees' },
			{ rarity: 'UNCOMMON', boost: 0.8, info: '-20% exchange fees' },
			{ rarity: 'RARE', boost: 0.6, info: '-40% exchange fees' },
			{ rarity: 'EPIC', boost: 0.35, info: '-65% exchange fees' },
			{ rarity: 'LEGENDARY', boost: 0, info: '0% fees' },
		],
	},
	{
		powerUp_Id: 'winnings-xcelerator',
		title: 'Winnings Xcelerator',
		description: 'Amplify your betting payouts.',
		image: 'v1732802822/76ae53a7-6abd-426c-af53-b2c4ce111b13_f550n5.jpg',
		price: 299,
		benefits: [
			{ rarity: 'COMMON', boost: 1.1, info: '+10% boost to bet payouts.' },
			{ rarity: 'UNCOMMON', boost: 1.2, info: '+20% boost to bet payouts.' },
			{ rarity: 'RARE', boost: 1.5, info: '+50% boost to bet payouts.' },
			{ rarity: 'EPIC', boost: 2, info: '2x boost to bet payouts.' },
			{ rarity: 'LEGENDARY', boost: 3, info: '5x boost to bet payouts.' },
		],
	},
	{
		powerUp_Id: 'bowling-dominator',
		title: 'Bowling Dominator',
		description: 'Command the pitch with precision yorkers.',
		image: 'v1732803683/48f94361-7b1f-4f38-b648-7bdcf8667807_tjehg5.jpg',
		price: 299,
		benefits: [
			{ rarity: 'COMMON', boost: 2, info: 'Bowl upto 2 yorkers per over' },
			{ rarity: 'UNCOMMON', boost: 3, info: 'Bowl upto 3 yorkers per over' },
			{ rarity: 'RARE', boost: 4, info: 'Bowl upto 4 yorkers per over' },
			{ rarity: 'EPIC', boost: 5, info: 'Bowl upto 5 yorkers per over' },
			{ rarity: 'LEGENDARY', boost: 6, info: 'No limits to bowl yorkers' },
		],
	},
];

interface PowerUpInfo {
	nextRarity: Rarity | null;
	upgradeCost: { coin: number; pass: number };
	benefitBoost: number;
	benefitInfo: string;
}

export function getPowerUpInfo(rarity: Rarity, powerUpId: string): PowerUpInfo {
	const powerUp = powerUps.find((p) => p.powerUp_Id === powerUpId);
	if (!powerUp) {
		throw new Error(`Power-up with ID ${powerUpId} not found.`);
	}

	const rarityIndex = upgradeCosts.findIndex((u) => u.rarity === rarity);
	if (rarityIndex === -1) {
		throw new Error(`Invalid rarity: ${rarity}`);
	}

	const nextRarity =
		rarityIndex < upgradeCosts.length - 1
			? (upgradeCosts[rarityIndex + 1].rarity as Rarity)
			: null;

	const upgradeCost = nextRarity
		? {
				coin: upgradeCosts[rarityIndex + 1].coin,
				pass: upgradeCosts[rarityIndex + 1].pass,
		  }
		: { coin: 0, pass: 0 };

	const nextBenefit = nextRarity
		? powerUp.benefits.find((b) => b.rarity === nextRarity)
		: null;

	if (nextRarity && !nextBenefit) {
		throw new Error(
			`Benefit for next rarity ${nextRarity} not found in power-up ${powerUpId}`
		);
	}

	return {
		nextRarity,
		upgradeCost,
		benefitBoost: nextBenefit ? nextBenefit.boost : 0,
		benefitInfo: nextBenefit ? nextBenefit.info : 'Max level reached',
	};
}

export function getPowerUpBenefits(powerUpId: string) {
	const powerUp = powerUps.find((p) => p.powerUp_Id === powerUpId);

	if (!powerUp) {
		throw new Error(`Power-up with ID ${powerUpId} not found.`);
	}

	return powerUp.benefits;
}
