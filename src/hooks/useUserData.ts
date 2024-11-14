import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BetType, MatchFormat } from '@prisma/client';
import {
	getUserBettingStats,
	getUserFormatStats,
	getUserStats,
} from '../db/stats';
import {
	getUserAvatars,
	getUserProfileById,
	getUserTransactionById,
	PaginatedResponse,
} from '../db/user';
import { getUserRankings } from '../db/rankings';

// export const useUserProfile = (telegramId: number | undefined) => {
// 	return useQuery({
// 		queryKey: ['user-info', telegramId],
// 		queryFn: () => getUserProfileById(telegramId!),
// 		enabled: !!telegramId,
// 		staleTime: 60000,
// 		gcTime: 3600000,
// 	});
// };

export const useUserProfile = (telegramId: number | undefined) => {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ['user-info', telegramId],
		queryFn: () => getUserProfileById(telegramId!),
		enabled: !!telegramId,
		staleTime: 60000,
		gcTime: 3600000,
	});

	const mutation = useMutation({
		mutationFn: () => getUserProfileById(telegramId!),
		onSuccess: (data) => {
			queryClient.setQueryData(['user-info', telegramId], data);
		},
	});

	return {
		...query,
		mutate: mutation.mutate,
	};
};

export const useGetUserTransaction = (userId: bigint | undefined) => {
	return useInfiniteQuery<PaginatedResponse, Error>({
		queryKey: ['user-transaction', JSON.stringify(userId?.toString())],
		queryFn: ({ pageParam = 1 }) =>
			getUserTransactionById(userId!, pageParam as number),
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.hasMore ? allPages.length + 1 : undefined;
		},
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
		initialPageParam: 1,
	});
};

export const useGetUserStats = (userId: number | undefined) => {
	return useQuery({
		queryKey: ['user-stats', userId],
		queryFn: () => getUserStats(userId!),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useGetUserAvatar = (userId: number) => {
	return useQuery({
		queryKey: ['user-avatar', userId],
		queryFn: () => getUserAvatars(userId!),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useGetUserFormatStats = (
	userId: number | undefined,
	format: MatchFormat
) => {
	return useQuery({
		queryKey: ['user-format-stats', userId, format],
		queryFn: () => getUserFormatStats(userId!, format),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useGetUserBettingStats = (
	userId: number | undefined,
	betType: BetType
) => {
	return useQuery({
		queryKey: ['user-betting-stats', userId, betType],
		queryFn: () => getUserBettingStats(userId!, betType),
		enabled: !!userId,
		staleTime: 60000,
		gcTime: 3600000,
	});
};

export const useGetUserRanking = () => {
	return useQuery({
		queryKey: ['user-ranking'],
		queryFn: () => getUserRankings(),
		staleTime: 60000,
		gcTime: 3600000,
	});
};

