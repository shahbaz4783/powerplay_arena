import { IconButton } from '@/src/components/common/buttons/primary-button';
import { cn } from '@/src/lib/utils';
import { RefreshCcw } from 'lucide-react';

interface FetchTransactionProps {
	transactions: {
		hasNextPage: boolean;
		fetchNextPage: () => void;
		isFetching: boolean;
		total: number;
	};
}

export const FetchTransaction = ({ transactions }: FetchTransactionProps) => {
	return (
		<section
			className={cn('sub-card grid sticky bottom-3', {
				'grid-cols-2 gap-1': transactions.hasNextPage,
			})}
		>
			{transactions.hasNextPage && (
				<>
					<div className=''>
						<p className='text-slate-400 text-xs'>Total</p>
						<p className='font-exo2 text-sm text-slate-300'>
							{transactions.total} Transactions
						</p>
					</div>
					<IconButton
						onClick={transactions.fetchNextPage}
						icon={RefreshCcw}
						text='Fetch more'
						loadingText='Fetching...'
						isLoading={transactions.isFetching}
					/>
				</>
			)}

			{!transactions.hasNextPage && length > 0 && (
				<div className='text-center text-slate-400 font-exo2'>
					<div>
						<span className='text-xs text-slate-300 font-fira-code'>
							Total transactions:
						</span>{' '}
						<span className=' font-jetbrains text-slate-200'>
							{transactions.total}
						</span>
					</div>
					You've reached the end of the transaction list.
				</div>
			)}
		</section>
	);
};
