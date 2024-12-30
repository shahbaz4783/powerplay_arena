'use client';

import React from 'react';
import { useGetUserTransaction } from '@/src/hooks/useUserData';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { PageLoadingScreen } from '@/src/components/layouts/global/page-loading-screen';
import { FetchTransaction } from './fetch-transaction';

import {
	calculateDailyTotals,
	groupTransactionsByDate,
} from '@/src/lib/transaction';
import { TransactionHeader } from './transacttion-header';
import { TransactionList } from './transaction-list';

export function TransactionLists() {
	const { telegramId } = useCurrentUser();
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
		useGetUserTransaction(telegramId);

	if (isLoading) {
		return <PageLoadingScreen pageType='history' />;
	}

	const allTransactions =
		data?.pages.flatMap((page) => page.transactions) || [];
	const groupedTransactions = groupTransactionsByDate(allTransactions);

	return (
		<div className='space-y-4'>
			{Object.entries(groupedTransactions).map(([date, transactions]) => {
				const dailyTotals = calculateDailyTotals(transactions);

				return (
					<GradientBorder key={date} className='space-y-2'>
						<TransactionHeader
							dailyTotals={dailyTotals}
							date={date}
							total={transactions.length}
						/>
						<TransactionList transactions={transactions} />
					</GradientBorder>
				);
			})}
			<FetchTransaction
				transactions={{
					fetchNextPage,
					hasNextPage,
					isFetching,
					total: allTransactions.length,
				}}
			/>
		</div>
	);
}