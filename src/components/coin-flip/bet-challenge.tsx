import { betOptions } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';

interface BetOption {
	name: string;
	description: string;
	payout: number;
}

export function BetChallenge({
	selectedChallenge,
	setSelectedChallenge,
}: {
	selectedChallenge: BetOption;
	setSelectedChallenge: (challenge: BetOption) => void;
}) {
	return (
		<section className='bg-slate-900 rounded-xl p-3 space-y-4'>
			<h3 className='text-lg text-center font-semibold text-slate-200'>
				Choose Your Risk
			</h3>
			<div className='grid grid-cols-2 gap-2'>
				{betOptions.map((option) => (
					<button
						key={option.name}
						type='button'
						className={cn(
							'w-full rounded-xl border h-auto py-4 flex flex-col items-center justify-center',
							{
								'text-slate-900 bg-white font-bold':
									selectedChallenge === option,
							}
						)}
						onClick={() => setSelectedChallenge(option)}
					>
						<span className='text-sm'>{option.name}</span>
					</button>
				))}
			</div>
			<p className='text-sm text-slate-400 text-center'>
				{selectedChallenge.description}
			</p>
		</section>
	);
}
