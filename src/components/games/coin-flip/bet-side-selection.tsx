import { betSides } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';

export function BetSideSelection({
	selectedSide,
	setSelectedSide,
}: {
	selectedSide: string | null;
	setSelectedSide: (side: string) => void;
}) {
	return (
		<section className='bg-slate-900 rounded-xl p-3 space-y-4'>
			<h3 className='text-lg text-center font-semibold text-slate-200'>
				Choose Your Side
			</h3>
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
		</section>
	);
}
