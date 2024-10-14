import { useQuery } from "@tanstack/react-query";
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
