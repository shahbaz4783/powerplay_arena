import React from 'react';
import { cn } from '@/src/lib/utils';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog';
import {
	ArrowUpFromLine,
	ArrowDownToLine,
	Coins,
	Ticket,
	Gift,
	Clock,
	Info,
	GamepadIcon,
	ShoppingCart,
} from 'lucide-react';
import { TransactionDialog } from './transaction-dialog';
import { Transaction } from '@prisma/client';

const getTransactionIcon = (type: string) =>
	({
		GAME: <GamepadIcon className='w-4 h-4' />,
		STORE: <ShoppingCart className='w-4 h-4' />,
	}[type] || <ShoppingCart className='w-4 h-4' />);

const getDisplayAmount = (tx: Transaction) => {
	if (tx.voucherAmount !== 0) {
		return {
			icon: <Gift className='w-4 h-4 text-purple-500' />,
			amount: tx.voucherAmount,
			type: 'voucher',
		};
	}

	if (tx.coinAmount !== 0) {
		return {
			icon: <Coins className='w-4 h-4 text-yellow-500' />,
			amount: tx.coinAmount,
			type: 'coin',
		};
	}

	if (tx.passAmount !== 0) {
		return {
			icon: <Ticket className='w-4 h-4 text-blue-500' />,
			amount: tx.passAmount,
			type: 'pass',
		};
	}

	return null;
};

const TransactionCard = ({ tx }: { tx: Transaction }) => {
	const displayAmount = getDisplayAmount(tx);
	const isDebit = tx.coinAmount + tx.passAmount + tx.voucherAmount < 0;

	return (
		<div className='pb-2 border-b-[1px] border-slate-700/50'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3 flex-1 min-w-0'>
					<div
						className={cn(
							'p-2 rounded-lg transition-colors shrink-0',
							isDebit ? 'bg-red-500/10' : 'bg-blue-500/10'
						)}
					>
						{getTransactionIcon(tx.type)}
					</div>

					<div className='flex flex-col min-w-0'>
						<p className='font-medium text-sm text-slate-200 truncate'>
							{tx.description || tx.type}
						</p>
						<div className='flex items-center gap-2'>
							<div className='flex items-center text-xs text-slate-400'>
								<Clock className='w-3 h-3 mr-1' />
								{tx.createdAt.toLocaleTimeString()}
							</div>
							{isDebit ? (
								<ArrowDownToLine className='w-3 h-3 text-red-400' />
							) : (
								<ArrowUpFromLine className='w-3 h-3 text-green-400' />
							)}
						</div>
					</div>
				</div>

				<div className='flex items-center gap-2 shrink-0'>
					{displayAmount && (
						<div
							className={cn(
								'flex items-center gap-1.5 px-3 py-1.5 rounded-md',
								displayAmount.amount >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
							)}
						>
							{displayAmount.icon}
							<span
								className={cn(
									'font-medium text-sm',
									displayAmount.amount >= 0 ? 'text-green-400' : 'text-red-400'
								)}
							>
								{displayAmount.amount}
							</span>
						</div>
					)}

					<TransactionDialog transaction={tx} />
				</div>
			</div>
		</div>
	);
};

export const TransactionList = ({
	transactions,
}: {
	transactions: Transaction[];
}) => (
	<section className='sub-card'>
		<ScrollArea
			className={cn('h-[400px]', { 'h-auto': transactions.length < 8 })}
		>
			<div className='space-y-2'>
				{transactions.map((tx) => (
					<TransactionCard key={tx.id} tx={tx} />
				))}
			</div>
		</ScrollArea>
	</section>
);
