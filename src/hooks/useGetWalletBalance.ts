import { useQuery } from '@tanstack/react-query';
import { getUserInfoById } from '../actions/user.action';

export const useGetWalletBalance = (userId: number) => {
	return useQuery({
		queryKey: ['wallet-balance', userId],
		queryFn: () => getUserInfoById(userId),
	});
};
