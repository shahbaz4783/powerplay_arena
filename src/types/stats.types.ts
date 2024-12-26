import { BetType } from '@prisma/client';

export interface StatInfo {
	label: string;
	value: string | number;
	trend?: number;
	color?: string;
}

export interface StatCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	href: string;
	stats?: StatInfo[];
	disabled?: boolean;
	gradient?: string;
}

export interface GameStats {
	betsPlaced: number;
	betsWon: number;
	totalEarning: number;
}

export interface FortuneFlipStats {
	totalBets: number;
	totalBetsWon: number;
	totalEarnings: number;
	winPercentage: string;
	statsByType: Record<BetType, GameStats>;
}
