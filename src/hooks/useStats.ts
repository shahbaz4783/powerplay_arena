import {
	MatchFormat,
	BetType,
	CricketMatchStats,
	BetStats,
} from '@prisma/client';
import { useCricketStats, useGetUserBettingStats } from './useUserData';

export type CricketStats = {
	[key in MatchFormat]: CricketMatchStats | null;
};

export type BettingStats = {
	[key in BetType]: BetStats | null;
};

export const useStats = (userId: string) => {
	const { data: blitzStats } = useCricketStats(userId, 'BLITZ');
	const { data: powerplayStats } = useCricketStats(userId, 'POWERPLAY');
	const { data: classicStats } = useCricketStats(userId, 'CLASSIC');
	const { data: safeBet } = useGetUserBettingStats(userId, 'SAFE_BET');
	const { data: classicFlip } = useGetUserBettingStats(userId, 'CLASSIC_FLIP');
	const { data: tripleShot } = useGetUserBettingStats(userId, 'TRIPLE_SHOT');
	const { data: jackpot } = useGetUserBettingStats(userId, 'JACKPOT');

	const cricketStats: CricketStats = {
		[MatchFormat.BLITZ]: blitzStats || null,
		[MatchFormat.POWERPLAY]: powerplayStats || null,
		[MatchFormat.CLASSIC]: classicStats || null,
	};

	const bettingStats: BettingStats = {
		[BetType.SAFE_BET]: safeBet || null,
		[BetType.CLASSIC_FLIP]: classicFlip || null,
		[BetType.TRIPLE_SHOT]: tripleShot || null,
		[BetType.JACKPOT]: jackpot || null,
	};

	return { cricketStats, bettingStats };
};
