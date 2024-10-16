import { useQuery } from "@tanstack/react-query";
import {
  getUserRankings,
  getUserStats,
  getUserTransactionById,
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

export const useGetUserTransaction = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user-transaction", userId],
    queryFn: () => getUserTransactionById(userId!),
    enabled: !!userId,
    staleTime: 60000,
    gcTime: 3600000,
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
