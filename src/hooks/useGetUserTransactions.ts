import { useQuery } from "@tanstack/react-query";
import {  getUserTransactionById } from "../actions/user.action";

export const useGetUserTransaction = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user-transaction", userId],
    queryFn: () => getUserTransactionById(userId!),
    enabled: !!userId,
    staleTime: 60000,
    gcTime: 3600000,
  });
};
