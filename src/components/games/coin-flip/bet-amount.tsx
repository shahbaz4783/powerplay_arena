import { token } from '@/src/lib/constants';
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
				<span>Min Bet: 10</span>
				<span>Balance: {userBalance}</span>
				<span>Max Bet: {maxBet}</span>
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
				<p>Betting Pass: {bettingPasses}</p>
				<p>
					Bet Amount: {betAmount} {token.symbol}
				</p>
			</div>
		</section>
	);
}
