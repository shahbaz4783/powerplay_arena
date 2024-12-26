import { MatchFormat } from '@prisma/client';
import { useCurrentUser } from './useCurrentUser';
import { useCricketStats } from './useUserData';

export interface CricketStats {
	totalMatches: number;
	totalWins: number;
	totalLosses: number;
	totalTies: number;
	winPercentage: string;
	totalRunsScored: number;
	totalWicketsTaken: number;
	highestScore: number;
	statsByFormat: Record<
		MatchFormat,
		{
			matchesPlayed: number;
			matchesWon: number;
			matchesLost: number;
			matchesTie: number;
			runsScored: number;
			wicketsTaken: number;
			highestRunsScored: number;
			bestBowlingWickets: number | null;
			bestBowlingRuns: number | null;
		}
	>;
}

export const usePowerStrike = () => {
	const { telegramId } = useCurrentUser();
	const formats: MatchFormat[] = ['BLITZ', 'POWERPLAY', 'CLASSIC'];

	const blitzStats = useCricketStats(telegramId, 'BLITZ');
	const powerplayStats = useCricketStats(telegramId, 'POWERPLAY');
	const classicStats = useCricketStats(telegramId, 'CLASSIC');

	const statsData = [blitzStats, powerplayStats, classicStats];

	const isLoading = statsData.some(({ isLoading }) => isLoading);
	const error = statsData.find(({ error }) => error)?.error;

	const stats = statsData.reduce<CricketStats>(
		(acc, { data }) => {
			if (data) {
				acc.totalMatches += data.matchesPlayed;
				acc.totalWins += data.matchesWon;
				acc.totalLosses += data.matchesLost;
				acc.totalTies += data.matchesTie;
				acc.totalRunsScored += data.runsScored;
				acc.totalWicketsTaken += data.wicketsTaken;
				acc.highestScore = Math.max(acc.highestScore, data.highestRunsScored);
				acc.statsByFormat[data.format] = {
					matchesPlayed: data.matchesPlayed,
					matchesWon: data.matchesWon,
					matchesLost: data.matchesLost,
					matchesTie: data.matchesTie,
					runsScored: data.runsScored,
					wicketsTaken: data.wicketsTaken,
					highestRunsScored: data.highestRunsScored,
					bestBowlingWickets: data.bestBowlingWickets,
					bestBowlingRuns: data.bestBowlingRuns,
				};
			}
			return acc;
		},
		{
			totalMatches: 0,
			totalWins: 0,
			totalLosses: 0,
			totalTies: 0,
			winPercentage: '0%',
			totalRunsScored: 0,
			totalWicketsTaken: 0,
			highestScore: 0,
			statsByFormat: {} as Record<
				MatchFormat,
				{
					matchesPlayed: number;
					matchesWon: number;
					matchesLost: number;
					matchesTie: number;
					runsScored: number;
					wicketsTaken: number;
					highestRunsScored: number;
					bestBowlingWickets: number | null;
					bestBowlingRuns: number | null;
				}
			>,
		}
	);

	stats.winPercentage =
		stats.totalMatches > 0
			? `${((stats.totalWins / stats.totalMatches) * 100).toFixed(2)}%`
			: '0%';

	return { stats, isLoading, error };
};
