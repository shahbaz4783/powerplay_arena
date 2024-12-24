import React from 'react';
import { token } from '@/src/constants/app-config';
import { Slider } from '@/src/components/ui/slider';
import { GradientBorder } from '../../common/elements/gradient-border';
import { InfoCard } from '../../common/cards/info-card';
import { Button } from '@/src/components/ui/button';
import { Coins, LayoutDashboard, Plus, Minus } from 'lucide-react';
import { SectionHeader } from '../../common/elements/section-header';

interface BetAmountProps {
	betAmount: number;
	setBetAmount: (amount: number) => void;
	userBalance: number;
	maxBet: number;
	bettingPasses: number;
}

export function BetAmount({
	betAmount,
	setBetAmount,
	userBalance,
	maxBet,
	bettingPasses,
}: BetAmountProps) {
	const adjustBet = (amount: number) => {
		const newAmount = Math.max(10, Math.min(maxBet, amount));
		setBetAmount(newAmount);
	};

	const applyPercentage = (percentage: number) => {
		const amount = Math.floor((maxBet * percentage) / 100);
		adjustBet(amount);
	};

	return (
		<GradientBorder>
			<SectionHeader
				title='Place Your Wager'
				description='Select your bet amount using the controls below'
				icon={LayoutDashboard}
			/>

			{/* Main Bet Display */}
			<div className='flex items-center justify-center gap-4 mb-6'>
				<Button
					type='button' // Prevents default submission behavior
					variant='outline'
					size='icon'
					onClick={() => adjustBet(betAmount - 10)}
					disabled={betAmount <= 10 || bettingPasses === 0}
				>
					<Minus className='h-4 w-4' />
				</Button>

				<div className='text-5xl font-bold text-blue-400'>
					{betAmount} <span className='text-2xl'>{token.symbol}</span>
				</div>

				<Button
					type='button'
					variant='outline'
					size='icon'
					onClick={() => adjustBet(betAmount + 10)}
					disabled={betAmount >= maxBet || bettingPasses === 0}
				>
					<Plus className='h-4 w-4' />
				</Button>
			</div>

			<div className='grid grid-cols-4 gap-2 mb-6'>
				{[25, 50, 75, 100].map((percentage) => (
					<Button
						key={percentage}
						type='button'
						variant='secondary'
						className='w-full'
						onClick={() => applyPercentage(percentage)}
						disabled={bettingPasses === 0}
					>
						{percentage}%
					</Button>
				))}
			</div>

			{/* Slider Section */}
			<div className='mb-8'>
				<Slider
					value={[betAmount]}
					max={maxBet}
					min={10}
					step={1}
					onValueChange={(value) => setBetAmount(value[0])}
					disabled={bettingPasses === 0}
					className='w-full'
				/>

				<div className='flex justify-between mt-2 text-sm text-slate-400'>
					<span>
						Min: {10} {token.symbol}
					</span>
					<span>
						Max: {maxBet} {token.symbol}
					</span>
				</div>
			</div>

			{/* Info Cards */}
			<section className='sub-card grid grid-cols-2 gap-3'>
				<InfoCard
					title='Available Balance'
					amount={userBalance}
					color='blue'
					icon={<Coins className='h-4 w-4' />}
				/>
				<InfoCard
					title='Betting Passes'
					amount={bettingPasses}
					color='purple'
					icon={<Coins className='h-4 w-4' />}
				/>
			</section>
		</GradientBorder>
	);
}

export default BetAmount;
