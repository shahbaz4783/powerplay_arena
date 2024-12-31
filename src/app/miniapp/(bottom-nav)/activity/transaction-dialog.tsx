import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ChevronRight, Info } from 'lucide-react';
import { Transaction } from '@prisma/client';
import { InfoCard } from '@/src/components/common/cards/info-card';
import { token } from '@/src/constants/app-config';

export const TransactionDialog = ({ transaction }: { transaction: Transaction }) => {
	const MetadataView = ({ data, depth = 0 }: { data: any; depth?: number }) => {
		if (typeof data !== 'object' || data === null) {
			return (
				<span
					className={`text-sm font-mono ${
						typeof data === 'number'
							? 'text-emerald-400'
							: typeof data === 'boolean'
							? 'text-amber-400'
							: typeof data === 'string'
							? 'text-blue-400'
							: 'text-slate-300'
					}`}
				>
					{String(data)}
				</span>
			);
		}

		return (
			<div className={`${depth > 0 ? 'ml-3' : ''}`}>
				{Object.entries(data).map(([key, value], index) => (
					<div
						key={key}
						className={`
            ${depth === 0 ? 'bg-slate-900/40 rounded-lg' : ''}
            ${depth === 0 && index > 0 ? 'mt-2' : ''}
          `}
					>
						<div className='flex items-center gap-1'>
							{depth === 0 && (
								<ChevronRight className='w-3 h-3 text-slate-500' />
							)}
							<span className='text-sm text-slate-400'>{key}:</span>
							{typeof value !== 'object' ? (
								<MetadataView data={value} depth={depth + 1} />
							) : (
								<span>{Array.isArray(value) ? 'Array' : 'Object'}</span>
							)}
						</div>
						{typeof value === 'object' && (
							<div className='border-l border-slate-700/50'>
								<MetadataView data={value} depth={depth + 1} />
							</div>
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.button className='rounded-full' whileTap={{ scale: 0.9 }}>
					<Info className='size-3 text-slate-400' />
				</motion.button>
			</DialogTrigger>

			<DialogContent className='w-11/12 rounded-lg'>
				<DialogHeader>
					<DialogTitle className='text-lg font-semibold flex items-center gap-2 text-slate-200'>
						<Info className='w-4 h-4 text-blue-400' />
						Transaction Details
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-3'>
					<div className='grid grid-cols-3 gap-2'>
						<InfoCard
							title={token.name}
							amount={transaction.coinAmount}
							color={transaction.coinAmount >= 0 ? 'teal' : 'red'}
						/>
						<InfoCard
							title={token.pass}
							amount={transaction.passAmount}
							color={transaction.passAmount >= 0 ? 'teal' : 'red'}
						/>
						<InfoCard
							title='Voucher'
							amount={transaction.voucherAmount}
							color={transaction.voucherAmount >= 0 ? 'teal' : 'red'}
						/>
					</div>
					{transaction.description && (
						<div className='main-card space-y-3'>
							<div className='flex items-center justify-between border-b border-slate-700/50 pb-2'>
								<span className='text-sm font-medium text-slate-300'>
									Description
								</span>
								<span className='text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full'>
									#{transaction.id.slice(0, 8)}
								</span>
							</div>

							<div className='flex items-center gap-2 text-xs text-slate-400'>
								<Calendar className='w-3 h-3' />
								{format(transaction.createdAt, 'MMM dd, yyyy, hh:mm:ss a')}
							</div>

							<div className='relative'>
								<div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-purple-500/50 rounded-full' />
								<div className='pl-4'>
									<p className='text-sm leading-relaxed text-slate-200'>
										{transaction.description}
									</p>
								</div>
							</div>
						</div>
					)}
					{transaction.metadata && (
						<div className='main-card'>
							<span className='text-sm text-slate-400 block border-b border-slate-700/50 pb-2 mb-2'>
								Additional Info
							</span>
							<MetadataView data={transaction.metadata} />
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};