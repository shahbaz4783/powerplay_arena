import React from 'react';
import { cn, formatCompactNumber } from '@/src/lib/utils';
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
	Star,
} from 'lucide-react';
import { TransactionDialog } from './transaction-dialog';
import { Transaction } from '@prisma/client';
import { InfoCard } from '@/src/components/common/cards/info-card';

const getTransactionIcon = (type: string) =>
	({
		GAME: <GamepadIcon className='w-4 h-4' />,
		STORE: <ShoppingCart className='w-4 h-4' />,
	}[type] || <ShoppingCart className='w-4 h-4' />);

const getDisplayAmount = (tx: Transaction) => {
	if (tx.starAmount !== 0) {
		return {
			icon: <Star className='size-3' />,
			amount: tx.starAmount,
			type: 'voucher',
		};
	}

	if (tx.coinAmount !== 0) {
		return {
			icon: <Coins className='size-3' />,
			amount: tx.coinAmount,
			type: 'coin',
		};
	}

	if (tx.passAmount !== 0) {
		return {
			icon: <Ticket className='size-3' />,
			amount: tx.passAmount,
			type: 'pass',
		};
	}

	return null;
};

const TransactionCard = ({ tx }: { tx: Transaction }) => {
	const displayAmount = getDisplayAmount(tx);
	const isDebit = tx.coinAmount + tx.passAmount + tx.starAmount < 0;

	return (
		<div className='pb-2 border-b-[1px] border-slate-700/50'>
			<div className='grid grid-cols-8 gap-1'>
				{/* Main */}
				<div className='col-span-6 flex items-center gap-3 flex-1 min-w-0'>
					<div
						className={cn(
							'p-2 rounded-lg transition-colors shrink-0',
							isDebit ? 'bg-red-500/10' : 'bg-blue-500/10'
						)}
					>
						{getTransactionIcon(tx.type)}
					</div>

					<div className='flex flex-col min-w-0 font-exo2'>
						<p className=' text-sm text-slate-300  truncate'>
							{tx.description || tx.type}
						</p>
						<div className='flex items-center gap-2'>
							<div className='flex items-center text-xs text-slate-400'>
								<Clock className='size-3 mr-1' />
								{tx.createdAt.toLocaleTimeString()}
							</div>
							{isDebit ? (
								<ArrowDownToLine className='w-3 h-3 text-red-400' />
							) : (
								<ArrowUpFromLine className='w-3 h-3 text-green-400' />
							)}
							<TransactionDialog transaction={tx} />
						</div>
					</div>
				</div>

				{/* Amount Info */}
				{displayAmount && (
					<div
						className={cn(
							'col-span-2 grid grid-cols-3 items-center border rounded-md bg-gradient-to-br',
							displayAmount.amount >= 0
								? 'from-teal-500/10 to-teal-600/5 border-teal-500/20 text-teal-400'
								: 'from-red-500/10 to-red-600/5 border-red-500/20 text-red-400'
						)}
					>
						<div className='col-span-1 grid place-items-center'>
							{displayAmount.icon}
						</div>
						<p
							className={cn(
								'font-exo2 text-center text-sm col-span-2',
								displayAmount.amount > 999 && 'text-xs',
								displayAmount.amount < -999 && 'text-xs'
							)}
						>
							{formatCompactNumber(displayAmount.amount)}
						</p>
					</div>
				)}
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
