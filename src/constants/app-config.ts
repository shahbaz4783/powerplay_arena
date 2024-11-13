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
	{
		level: 1,
		name: 'Rookie Batsman',
		xpThreshold: 0,
	},
	{
		level: 2,
		name: 'Club Player',
		xpThreshold: 2000,
	},
	{
		level: 3,
		name: 'First-Class Contender',
		xpThreshold: 5000,
	},
	{
		level: 4,
		name: 'National Prospect',
		xpThreshold: 15000,
	},
	{
		level: 5,
		name: 'International Debutant',
		xpThreshold: 30000,
	},
	{
		level: 6,
		name: 'Test Match Regular',
		xpThreshold: 50000,
	},
	{
		level: 7,
		name: 'World Cup Hero',
		xpThreshold: 100000,
	},
	{
		level: 8,
		name: 'Cricket Maestro',
		xpThreshold: 200000,
	},
	{
		level: 9,
		name: 'Living Legend',
		xpThreshold: 500000,
	},
	{
		level: 10,
		name: 'Immortal of the Game',
		xpThreshold: 1000000,
	},
];

export const MATCH_FORMATS: Record<MatchFormat, MatchSetup> = {
	BLITZ: {
		format: 'BLITZ',
		overs: 2,
		entryFee: 50,
		passRequired: 2,
		totalWickets: 2,
		rewards: {
			six: 12,
			four: 6,
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
			six: 6,
			four: 4,
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
			six: 6,
			four: 4,
			wicket: 10,
			runMargin: 3,
		},
	},
};
