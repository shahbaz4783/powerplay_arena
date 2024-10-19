import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getUserRankings,
  getUserStats,
  getUserTransactionById,
  PaginatedResponse,
} from "../actions/user.action";
import { getUserInfoById } from "../actions/user.action";

export const useGetUserInfo = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user-info", userId],
    queryFn: () => getUserInfoById(userId!),
    enabled: !!userId,
    staleTime: 60000,
    gcTime: 3600000,
  });
};

export const useGetUserTransaction = (userId: bigint | undefined) => {
  return useInfiniteQuery<PaginatedResponse, Error>({
    queryKey: ["user-transaction", JSON.stringify(userId?.toString())],
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
    queryKey: ["user-stats", userId],
    queryFn: () => getUserStats(userId!),
    enabled: !!userId,
    staleTime: 60000,
    gcTime: 3600000,
  });
};

export const useGetUserRanking = () => {
  return useQuery({
    queryKey: ["user-ranking"],
    queryFn: () => getUserRankings(),
    staleTime: 60000,
    gcTime: 3600000,
  });
};
