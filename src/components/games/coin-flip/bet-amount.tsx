import { token } from '@/src/constants/app-config';
import { Slider } from '../../ui/slider';

export function BetAmount({
	betAmount,
	setBetAmount,
	userBalance,
	maxBet,
	bettingPasses,
}: {
	betAmount: number;
	setBetAmount: (amount: number) => void;
	userBalance: number;
	maxBet: number;
	bettingPasses: number;
}) {
	return (
		<section className='w-full bg-slate-900 rounded-xl p-4 space-y-6'>
			<div className='flex justify-between text-sm text-muted-foreground'>
				<span>
					Min Bet:{' '}
					<span className='font-mono text-slate-300 font-bold'>10</span>
				</span>
				<span>
					Balance:{' '}
					<span className='font-mono text-slate-300 font-bold'>
						{userBalance}
					</span>
				</span>
				<span>
					Max Bet:{' '}
					<span className='font-mono text-slate-300 font-bold'>{maxBet}</span>
				</span>
			</div>
			<Slider
				min={0}
				max={maxBet}
				step={10}
				name='betAmount'
				value={[betAmount]}
				onValueChange={(value) => setBetAmount(value[0])}
				className='w-full'
				disabled={bettingPasses === 0}
			/>
			<div className='flex justify-between text-sm text-slate-400'>
				<p>
					Betting Pass:{' '}
					<span className='font-mono text-slate-300 font-bold'>
						{bettingPasses}
					</span>
				</p>
				<p>
					Bet Amount:{' '}
					<span className='font-mono text-slate-300 font-bold'>
						{betAmount} {token.symbol}{' '}
					</span>
				</p>
			</div>
		</section>
	);
}
