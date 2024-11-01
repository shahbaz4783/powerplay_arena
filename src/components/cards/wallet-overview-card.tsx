"use client";

import { token } from "@/src/lib/constants";
import { Header } from "../shared/header";
import { useInitData } from "@telegram-apps/sdk-react";
import { useUserProfile } from '@/src/hooks/useUserData';

export function WalletOverview() {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);

	return (
		<section className='border rounded-xl overflow-hidden'>
			<Header title='Overview' />
			<div className='p-4'>
				<span className='text-4xl font-bold text-gray-100'>
					{data?.userProfile.balance}{' '}
				</span>
				<span>{token.symbol}</span>
				<p className='text-gray-400 mt-2'>Your current balance</p>
			</div>
		</section>
	);
}
