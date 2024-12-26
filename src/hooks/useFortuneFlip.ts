import { BetType } from '@prisma/client';
import { useCurrentUser } from './useCurrentUser';
import { useGetUserBettingStats } from './useUserData';
import { FortuneFlipStats, GameStats } from '../types/stats.types';

export const useFortuneFlip = () => {
	const { telegramId } = useCurrentUser();
	const betTypes: BetType[] = [
		'SAFE_BET',
		'CLASSIC_FLIP',
		'TRIPLE_SHOT',
		'JACKPOT',
	];

	const statsData = betTypes.map((betType) =>
		useGetUserBettingStats(telegramId, betType)
	);

	const isLoading = statsData.some(({ isLoading }) => isLoading);
	const error = statsData.find(({ error }) => error)?.error;

	const stats = statsData.reduce<FortuneFlipStats>(
		(acc, { data }) => {
			if (data) {
				acc.totalBets += data.betsPlaced;
				acc.totalBetsWon += data.betsWon;
				acc.totalEarnings += data.totalEarning;
				acc.statsByType[data.betType] = data;
			}
			return acc;
		},
		{
			totalBets: 0,
			totalBetsWon: 0,
			totalEarnings: 0,
			winPercentage: '0%',
			statsByType: {} as Record<BetType, GameStats>,
		}
	);

	stats.winPercentage =
		stats.totalBets > 0
			? `${((stats.totalBetsWon / stats.totalBets) * 100).toFixed(2)}%`
			: '0%';

	return { stats, isLoading, error };
};
