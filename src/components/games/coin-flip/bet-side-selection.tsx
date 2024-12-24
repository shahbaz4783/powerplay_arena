import { betSides } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';
import { SectionHeader } from '../../common/elements/section-header';
import { LayoutDashboardIcon } from 'lucide-react';
import { GradientBorder } from '../../common/elements/gradient-border';

export function BetSideSelection({
	selectedSide,
	setSelectedSide,
}: {
	selectedSide: string | null;
	setSelectedSide: (side: string) => void;
}) {
	return (
		<GradientBorder>
			<SectionHeader
				title='Heads or Tails?'
				description='Whats your call?'
				icon={LayoutDashboardIcon}
			/>
			<div className='grid grid-cols-2 gap-2'>
				{betSides.map((side) => (
					<button
						key={side.value}
						type='button'
						className={cn(
							'w-full rounded-xl border h-auto py-4 flex flex-col items-center justify-center',
							{
								'text-slate-900 bg-white font-bold':
									selectedSide === side.value,
							}
						)}
						onClick={() => setSelectedSide(side.value)}
					>
						<span className='text-sm'>{side.name}</span>
					</button>
				))}
			</div>
		</GradientBorder>
	);
}
