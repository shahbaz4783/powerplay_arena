import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Transaction } from '@prisma/client';
import { Clock, Coins, Gift, Info, Ticket } from 'lucide-react';

export const TransactionDialog = ({
	transaction,
}: {
	transaction: Transaction;
}) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className='p-2 rounded-full hover:bg-slate-700/50 transition-colors'>
					<Info className='w-4 h-4 text-slate-400 hover:text-slate-200' />
				</button>
			</DialogTrigger>

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
									transaction.coinAmount >= 0
										? 'text-green-400'
										: 'text-red-400'
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
									transaction.passAmount >= 0
										? 'text-green-400'
										: 'text-red-400'
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
							<p className='text-sm text-slate-200'>
								{transaction.description}
							</p>
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
		</Dialog>
	);
};
