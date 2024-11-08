"use client";

import React from "react";
import { useGetUserTransaction } from "@/src/hooks/useUserData";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Calendar,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { formatDate } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { token } from "@/src/lib/constants";
import { Transaction } from "@prisma/client";
import { SubmitButton } from "../feedback/submit-button";

const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  transactions.forEach((tx) => {
    let date = formatDate(tx.createdAt);
    if (formatDate(tx.createdAt) === formatDate(today)) {
      date = "Today";
    } else if (formatDate(tx.createdAt) === formatDate(yesterday)) {
      date = "Yesterday";
    }
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(tx);
  });
  return grouped;
};

const calculateDailyTotal = (transactions: Transaction[]) => {
	return transactions.reduce((total, tx) => {
		return total + (tx.balanceEffect === 'DECREMENT' ? -tx.amount : tx.amount);
	}, 0);
};

export function TransactionLists() {
	const initData = useInitData();
	const user = initData?.user;

	const { data, fetchNextPage, hasNextPage } = useGetUserTransaction(
		user?.id ? BigInt(user.id) : undefined
	);

	const allTransactions =
		data?.pages.flatMap((page) => page.transactions) || [];
	const groupedTransactions = groupTransactionsByDate(allTransactions);

	return (
		<section className='space-y-4'>
			<ul className='space-y-4 '>
				{Object.entries(groupedTransactions).map(([date, transactions]) => {
					const dailyTotal = calculateDailyTotal(transactions);
					return (
						<li key={date} className='border rounded-xl overflow-hidden'>
							<div className='flex items-center justify-between p-3 bg-slate-900 backdrop-blur-md'>
								<div>
									<h3 className='text-md font-semibold'>{date}</h3>
									<p className='text-xs text-slate-400'>
										{transactions.length} transaction
										{transactions.length !== 1 ? 's' : ''}
									</p>
								</div>
								<div className='flex items-center space-x-4'>
									<span
										className={`font-bold ${
											dailyTotal >= 0 ? 'text-green-400' : 'text-red-400'
										}`}
									>
										{dailyTotal >= 0 ? '+' : '-'}
										{Math.abs(dailyTotal)} {token.symbol}
									</span>
								</div>
							</div>
							<ul className='space-y-4 p-3'>
								{transactions.map((tx) => (
									<motion.li
										key={tx.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
										className='flex border-slate-400 items-center justify-between'
									>
										<div className='flex items-center space-x-4'>
											<div
												className={`p-2 rounded-xl ${
													tx.type === 'MATCH_FEE'
														? 'bg-red-500/20'
														: 'bg-green-500/20'
												}`}
											>
												{tx.balanceEffect === 'DECREMENT' ? (
													<TrendingDown className='w-5 h-5 text-red-400' />
												) : (
													<TrendingUp className='w-5 h-5 text-green-400' />
												)}
											</div>
											<div>
												<p className='text-slate-200 text-sm line-clamp-1'>
													{tx.description}
												</p>
												<div className='flex items-center text-sm text-gray-400'>
													<Clock className='w-4 h-4 mr-1' />
													{tx.createdAt.toLocaleTimeString()}
												</div>
											</div>
										</div>
										<div
											className={`font-bold text-right ${
												tx.balanceEffect === 'DECREMENT'
													? 'text-red-400'
													: 'text-green-400'
											}`}
										>
											<span className=''>
												{tx.balanceEffect === 'DECREMENT' ? '-' : '+'}
												{tx.amount}
											</span>
										</div>
									</motion.li>
								))}
							</ul>
						</li>
					);
				})}
			</ul>

			<div>
				{hasNextPage && (
					<SubmitButton
						onClick={() => fetchNextPage()}
						title='Load More'
						loadingTitle='Loading...'
					/>
				)}

				{!hasNextPage && allTransactions.length > 0 && (
					<p className='text-center text-gray-400 mt-6'>
						You've reached the end of the transaction list.
					</p>
				)}
			</div>
		</section>
	);
}
