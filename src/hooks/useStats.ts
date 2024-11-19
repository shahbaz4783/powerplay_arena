import { useGetUserBettingStats, useGetUserFormatStats } from "./useUserData";


export const useStats = (telegramId: number) => {
	const { data: blitzStats } = useGetUserFormatStats(telegramId, 'BLITZ');
	const { data: powerplayStats } = useGetUserFormatStats(
		telegramId,
		'POWERPLAY'
	);
	const { data: classicStats } = useGetUserFormatStats(telegramId, 'CLASSIC');
	const { data: safeBet } = useGetUserBettingStats(telegramId, 'SAFE_BET');
	const { data: classicFlip } = useGetUserBettingStats(
		telegramId,
		'CLASSIC_FLIP'
	);
	const { data: tripleShot } = useGetUserBettingStats(
		telegramId,
		'TRIPLE_SHOT'
	);
	const { data: jackpot } = useGetUserBettingStats(telegramId, 'JACKPOT');

	const cricketStats = { blitzStats, powerplayStats, classicStats };
	const bettingStats = { safeBet, classicFlip, tripleShot, jackpot };

	return { cricketStats, bettingStats };
};
