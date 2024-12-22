import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BetType, MatchFormat } from '@prisma/client';
import {
	getUserInfoById,
	getUserInventoryById,
	getUserProgressById,
	getUserTransactionById,
	PaginatedResponse,
} from '../models/user';
import { getUserRankings } from '../models/rankings';
import { getCricketStatsByFormat, getUserBettingStats } from '../models/stats';

export const useUserInfo = (telegramId: string) => {
	return useQuery({
		queryKey: ['user-info', telegramId],
		queryFn: () => getUserInfoById(telegramId),
		enabled: !!telegramId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useUserProgress = (telegramId: string) => {
	return useQuery({
		queryKey: ['user-stats', telegramId],
		queryFn: () => getUserProgressById(telegramId!),
		enabled: !!telegramId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useUserInventory = (telegramId: string) => {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ['user-inventory', telegramId],
		queryFn: () => getUserInventoryById(telegramId),
		enabled: !!telegramId,
		staleTime: 60000,
		gcTime: 3600000,
	});

	const mutation = useMutation({
		mutationFn: () => getUserInventoryById(telegramId!),
		onSuccess: (data) => {
			queryClient.setQueryData(['user-inventory', telegramId], data);
		},
	});

	return {
		...query,
		mutate: mutation.mutate,
	};
};

export const useGetUserTransaction = (userId: string) => {
	return useInfiniteQuery<PaginatedResponse, Error>({
		queryKey: ['user-transaction', JSON.stringify(userId?.toString())],
		queryFn: ({ pageParam = 1 }) =>
			getUserTransactionById(userId, pageParam as number),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.hasMore ? allPages.length + 1 : undefined;
		},
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
		initialPageParam: 1,
	});
};

export const useCricketStats = (userId: string, format: MatchFormat) => {
	return useQuery({
		queryKey: ['cricket-format-stats', format],
		queryFn: () => getCricketStatsByFormat(userId, format),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useGetUserBettingStats = (userId: string, betType: BetType) => {
	return useQuery({
		queryKey: ['user-betting-stats', userId, betType],
		queryFn: () => getUserBettingStats(userId, betType),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useUserRanking = () => {
	return useQuery({
		queryKey: ['user-ranking'],
		queryFn: () => getUserRankings(),
		staleTime: 60000,
	});
};

