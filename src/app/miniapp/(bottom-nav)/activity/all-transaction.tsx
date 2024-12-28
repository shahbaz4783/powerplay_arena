'use client';

import React from 'react';
import { useGetUserTransaction } from '@/src/hooks/useUserData';
import {
	Clock,
	Ticket,
	Gift,
	TrendingDown,
	TrendingUp,
	Info,
	Coins,
	Wallet,
} from 'lucide-react';
import { formatDate } from '@/src/lib/utils';
import { Transaction } from '@prisma/client';
import { SubmitButton } from '../../../../components/common/buttons/submit-button';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { cn } from '@/src/lib/utils';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { IconButton } from '@/src/components/common/buttons/primary-button';

const TransactionDialog = ({ transaction }: { transaction: Transaction }) => {
	return (
		<DialogContent className='w-11/12 rounded-xl'>
			<DialogHeader>
				<DialogTitle className='text-xl font-bold flex items-center gap-2'>
					<Info className='w-5 h-5 text-blue-400' />
					Transaction Details
				</DialogTitle>
			</DialogHeader>
			<div className='space-y-4'>
				<div className='flex items-center justify-between p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm'>
					<span className='text-slate-300'>Transaction ID</span>
					<span className='font-mono text-sm bg-slate-950/50 px-3 py-1 rounded-lg'>
						{transaction.id.slice(0, 8)}
					</span>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-slate-800/70 transition-colors'>
						<div className='flex items-center gap-2 mb-2'>
							<Coins className='w-5 h-5 text-yellow-500' />
							<span className='text-slate-300 font-medium'>Coins</span>
						</div>
						<span
							className={`text-xl font-bold ${
								transaction.coinAmount >= 0 ? 'text-green-400' : 'text-red-400'
							}`}
						>
							{transaction.coinAmount >= 0 ? '+' : ''}
							{transaction.coinAmount}
						</span>
					</div>

					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-slate-800/70 transition-colors'>
						<div className='flex items-center gap-2 mb-2'>
							<Ticket className='w-5 h-5 text-blue-500' />
							<span className='text-slate-300 font-medium'>Pass</span>
						</div>
						<span
							className={`text-xl font-bold ${
								transaction.passAmount >= 0 ? 'text-green-400' : 'text-red-400'
							}`}
						>
							{transaction.passAmount >= 0 ? '+' : ''}
							{transaction.passAmount}
						</span>
					</div>

					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-slate-800/70 transition-colors'>
						<div className='flex items-center gap-2 mb-2'>
							<Gift className='w-5 h-5 text-purple-500' />
							<span className='text-slate-300 font-medium'>Voucher</span>
						</div>
						<span
							className={`text-xl font-bold ${
								transaction.voucherAmount >= 0
									? 'text-green-400'
									: 'text-red-400'
							}`}
						>
							{transaction.voucherAmount >= 0 ? '+' : ''}
							{transaction.voucherAmount}
						</span>
					</div>

					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-slate-800/70 transition-colors'>
						<div className='flex items-center gap-2 mb-2'>
							<Clock className='w-5 h-5 text-slate-400' />
							<span className='text-slate-300 font-medium'>Time</span>
						</div>
						<span className='text-sm font-medium text-slate-200'>
							{transaction.createdAt.toLocaleString()}
						</span>
					</div>
				</div>

				{transaction.description && (
					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm'>
						<span className='text-slate-300 font-medium block mb-2'>
							Description
						</span>
						<p className='text-sm text-slate-200'>{transaction.description}</p>
					</div>
				)}

				{transaction.metadata && (
					<div className='p-4 bg-slate-800/50 rounded-xl backdrop-blur-sm'>
						<span className='text-slate-300 font-medium block mb-2'>
							Additional Info
						</span>
						<pre className='text-sm overflow-x-auto bg-slate-950/50 p-3 rounded-lg'>
							{JSON.stringify(transaction.metadata, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</DialogContent>
	);
};

const groupTransactionsByDate = (transactions: Transaction[]) => {
	const grouped: Record<string, Transaction[]> = {};
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	transactions.forEach((tx) => {
		let date = formatDate(tx.createdAt);
		if (formatDate(tx.createdAt) === formatDate(today)) {
			date = 'Today';
		} else if (formatDate(tx.createdAt) === formatDate(yesterday)) {
			date = 'Yesterday';
		}
		if (!grouped[date]) {
			grouped[date] = [];
		}
		grouped[date].push(tx);
	});
	return grouped;
};

const calculateDailyTotals = (transactions: Transaction[]) => {
	return transactions.reduce(
		(totals, tx) => {
			return {
				coins: totals.coins + tx.coinAmount,
				pass: totals.pass + tx.passAmount,
				voucher: totals.voucher + tx.voucherAmount,
			};
		},
		{ coins: 0, pass: 0, voucher: 0 }
	);
};

const AmountBadge = ({
	amount,
	icon: Icon,
	className,
}: {
	amount: number;
	icon: React.ElementType;
	className?: string;
}) => {
	if (amount === 0) return null;

	return (
		<div
			className={cn(
				'flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium',
				amount >= 0
					? 'bg-green-500/20 text-green-400'
					: 'bg-red-500/20 text-red-400',
				className
			)}
		>
			<Icon className='w-3.5 h-3.5' />
			<span>
				{amount >= 0 ? '+' : ''}
				{amount}
			</span>
		</div>
	);
};

export function TransactionLists() {
	const { telegramId } = useCurrentUser();
	const { data, fetchNextPage, hasNextPage, isLoading } =
		useGetUserTransaction(telegramId);
	const allTransactions =
		data?.pages.flatMap((page) => page.transactions) || [];
	const groupedTransactions = groupTransactionsByDate(allTransactions);

	return (
		<div className='space-y-6'>
			{Object.entries(groupedTransactions).map(([date, transactions]) => {
				const dailyTotals = calculateDailyTotals(transactions);

				return (
					<GradientBorder key={date} className=''>
						<section className=''>
							<div className='flex items-center justify-between'>
								<div>
									<CardTitle className='text-lg font-semibold text-slate-100'>
										{date}
									</CardTitle>
									<p className='text-sm text-slate-400'>
										{transactions.length} transaction
										{transactions.length !== 1 ? 's' : ''}
									</p>
								</div>
								<div className='flex gap-2'>
									<AmountBadge amount={dailyTotals.coins} icon={Coins} />
									<AmountBadge amount={dailyTotals.pass} icon={Ticket} />
									<AmountBadge amount={dailyTotals.voucher} icon={Gift} />
								</div>
							</div>
						</section>
						<section>
							<ScrollArea className='h-[400px] pr-4'>
								<div className='space-y-3'>
									{transactions.map((tx) => (
										<Dialog key={tx.id}>
											<DialogTrigger asChild>
												<div className='sub-card'>
													<div className='flex items-center justify-between mb-2'>
														<div className='flex items-center gap-3'>
															<div
																className={cn(
																	'p-2 rounded-xl transition-colors',
																	tx.type === 'GAME'
																		? 'bg-red-500/20 group-hover:bg-red-500/30'
																		: 'bg-green-500/20 group-hover:bg-green-500/30'
																)}
															>
																{tx.coinAmount +
																	tx.passAmount +
																	tx.voucherAmount <
																0 ? (
																	<TrendingDown className='w-4 h-4 text-red-400' />
																) : (
																	<TrendingUp className='w-4 h-4 text-green-400' />
																)}
															</div>
															<div>
																<p className='font-medium text-sm text-slate-200 line-clamp-1'>
																	{tx.description || tx.type}
																</p>
																<div className='flex items-center text-xs text-slate-400'>
																	<Clock className='w-3 h-3 mr-1' />
																	{tx.createdAt.toLocaleTimeString()}
																</div>
															</div>
														</div>
														<div className='flex gap-2'>
															{tx.coinAmount !== 0 && (
																<div className='flex items-center gap-1 min-w-[60px] justify-end'>
																	<Coins className='w-4 h-4 text-yellow-500' />
																	<span
																		className={cn(
																			'font-medium',
																			tx.coinAmount >= 0
																				? 'text-green-400'
																				: 'text-red-400'
																		)}
																	>
																		{tx.coinAmount >= 0 ? '+' : ''}
																		{tx.coinAmount}
																	</span>
																</div>
															)}
															{tx.passAmount !== 0 && (
																<div className='flex items-center gap-1 min-w-[60px] justify-end'>
																	<Ticket className='w-4 h-4 text-blue-500' />
																	<span
																		className={cn(
																			'font-medium',
																			tx.passAmount >= 0
																				? 'text-green-400'
																				: 'text-red-400'
																		)}
																	>
																		{tx.passAmount >= 0 ? '+' : ''}
																		{tx.passAmount}
																	</span>
																</div>
															)}
															{tx.voucherAmount !== 0 && (
																<div className='flex items-center gap-1 min-w-[60px] justify-end'>
																	<Gift className='w-4 h-4 text-purple-500' />
																	<span
																		className={cn(
																			'font-medium',
																			tx.voucherAmount >= 0
																				? 'text-green-400'
																				: 'text-red-400'
																		)}
																	>
																		{tx.voucherAmount >= 0 ? '+' : ''}
																		{tx.voucherAmount}
																	</span>
																</div>
															)}
														</div>
													</div>
												</div>
											</DialogTrigger>
											<TransactionDialog transaction={tx} />
										</Dialog>
									))}
								</div>
							</ScrollArea>
						</section>
					</GradientBorder>
				);
			})}

			<section className={cn('sub-card grid ', { 'grid-cols-2': hasNextPage })}>
				{hasNextPage && (
					<>
						<div>Hello</div>
						<IconButton
							onClick={() => fetchNextPage()}
							icon={Wallet}
							text='Load more'
							loadingText='Loading...'
							isLoading={isLoading}
						/>
					</>
				)}

				{!hasNextPage && allTransactions.length > 0 && (
					<p className='text-center text-slate-400'>
						You've reached the end of the transaction list.
					</p>
				)}
			</section>
		</div>
	);
}