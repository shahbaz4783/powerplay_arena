import {
	Activity,
	Award,
	House,
	ShoppingBag,
	WalletMinimal,
} from 'lucide-react';
import { MatchSetup } from '../types/gameState';
import { MatchFormat } from '@prisma/client';

export const token = {
	name: 'Power Coin',
	pass: 'Power Pass',
	symbol: 'PWR',
};

export const NAVIGATION_LINKS = [
	{
		title: 'Home',
		href: '/miniapp',
		icon: House,
	},
	{
		title: 'Milestones',
		href: '/miniapp/milestones',
		icon: Award,
	},
	{
		title: 'Shop',
		href: '/miniapp/shop',
		icon: ShoppingBag,
	},
	{
		title: 'Activity',
		href: '/miniapp/activity',
		icon: Activity,
	},
	{
		title: 'Wallet',
		href: '/miniapp/wallet',
		icon: WalletMinimal,
	},
];

export const LEVEL_DATA = [
	{ level: 1, name: 'Beginner', xpThreshold: 0 },
	{ level: 2, name: 'Rookie', xpThreshold: 2000 },
	{ level: 3, name: 'Amateur', xpThreshold: 5000 },
	{ level: 4, name: 'Skilled', xpThreshold: 15000 },
	{ level: 5, name: 'Professional', xpThreshold: 30000 },
	{ level: 6, name: 'Expert', xpThreshold: 50000 },
	{ level: 7, name: 'Master', xpThreshold: 100000 },
	{ level: 8, name: 'Grandmaster', xpThreshold: 200000 },
	{ level: 9, name: 'Legend', xpThreshold: 500000 },
	{ level: 10, name: 'Mythic', xpThreshold: 1000000 },
];

export const MATCH_FORMATS: Record<MatchFormat, MatchSetup> = {
	BLITZ: {
		format: 'BLITZ',
		overs: 2,
		entryFee: 50,
		passRequired: 2,
		totalWickets: 2,
		rewards: {
			six: 15,
			four: 8,
			wicket: 20,
			runMargin: 5,
		},
	},
	POWERPLAY: {
		format: 'POWERPLAY',
		overs: 5,
		entryFee: 100,
		passRequired: 3,
		totalWickets: 5,
		rewards: {
			six: 12,
			four: 8,
			wicket: 15,
			runMargin: 4,
		},
	},
	CLASSIC: {
		format: 'CLASSIC',
		overs: 10,
		entryFee: 200,
		passRequired: 5,
		totalWickets: 10,
		rewards: {
			six: 8,
			four: 5,
			wicket: 12,
			runMargin: 3,
		},
	},
};


export interface RewardTier {
	day: number;
	coins: string;
	powerPass: string;
}

export const rewardTiers: RewardTier[] = [
	{ day: 1, coins: '20-30', powerPass: '2-3' },
	{ day: 2, coins: '30-50', powerPass: '3-5' },
	{ day: 3, coins: '50-100', powerPass: '5-10' },
	{ day: 4, coins: '100-150', powerPass: '10-15' },
	{ day: 5, coins: '150-200', powerPass: '15-20' },
	{ day: 6, coins: '200-300', powerPass: '20-25' },
	{ day: 7, coins: '300-500', powerPass: '25-30' },
];