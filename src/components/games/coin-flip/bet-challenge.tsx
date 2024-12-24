import { betOptions } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';
import { GradientBorder } from '../../common/elements/gradient-border';
import { SectionHeader } from '../../common/elements/section-header';
import { LayoutDashboardIcon } from 'lucide-react';

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
		<GradientBorder>
			<SectionHeader
				title='Pick Odds'
				description='How much risk you can take?'
				icon={LayoutDashboardIcon}
			/>
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
		</GradientBorder>
	);
}
