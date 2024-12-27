import { token } from '@/src/constants/app-config';
import { Slider } from '@/src/components/ui/slider';
import { GradientBorder } from '../../common/elements/gradient-border';
import { InfoCard } from '../../common/cards/info-card';
import { Coins, Plus, Minus, DollarSign } from 'lucide-react';
import { SectionHeader } from '../../common/elements/section-header';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
	const [inputValue, setInputValue] = useState<string>(betAmount.toString());

	useEffect(() => {
		setInputValue(betAmount.toString());
	}, [betAmount]);

	const adjustBet = (amount: number) => {
		const newAmount = Math.max(10, Math.min(maxBet, amount));
		setBetAmount(newAmount);
	};

	const applyPercentage = (percentage: number) => {
		const amount = Math.floor((maxBet * percentage) / 100);
		adjustBet(amount);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Remove any non-numeric characters
		const value = e.target.value.replace(/[^0-9]/g, '');
		setInputValue(value);

		const numValue = parseInt(value);
		if (!isNaN(numValue)) {
			adjustBet(numValue);
		}
	};

	const handleInputBlur = () => {
		const numValue = parseInt(inputValue);
		if (isNaN(numValue) || numValue < 10) {
			setInputValue(betAmount.toString());
		} else {
			adjustBet(numValue);
		}
	};

	return (
		<GradientBorder className='space-y-4'>
			<SectionHeader
				title='Place Your Wager'
				description='Select your bet amount using the controls below'
				icon={DollarSign}
			/>
			{/* Info Cards */}
			<section className='grid grid-cols-2 gap-3'>
				<InfoCard
					title='Available Coin'
					amount={userBalance}
					color='blue'
					icon={<Coins className='h-4 w-4' />}
				/>
				<InfoCard
					title='Available Pass'
					amount={bettingPasses}
					color='purple'
					icon={<Coins className='h-4 w-4' />}
				/>
			</section>
			{/* Main Bet Display */}
			<div className='sub-card space-y-2'>
				<section className='grid grid-cols-7 gap-3'>
					<motion.button
						type='button'
						onClick={() => adjustBet(betAmount - 10)}
						disabled={betAmount <= 10 || bettingPasses === 0}
						className='sub-card flex items-center'
						whileTap={{ scale: 0.9 }}
					>
						<Minus className='h-4 w-4' />
					</motion.button>

					<div className='col-span-5 flex items-baseline justify-center'>
						<motion.input
							type='number'
							value={inputValue}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							disabled={bettingPasses === 0}
							className={cn(
								'w-full text-center bg-transparent border-none outline-none',
								'font-poppins font-bold text-blue-400',
								'placeholder:text-slate-500',
								'disabled:opacity-50 disabled:cursor-not-allowed',
								'[appearance:textfield]',
								'[&::-webkit-outer-spin-button]:appearance-none',
								'[&::-webkit-inner-spin-button]:appearance-none',
								{
									'text-5xl': betAmount <= 99999,
									'text-2xl': betAmount > 99999,
									'text-xl': betAmount > 999999,
								}
							)}
							min={10}
							max={maxBet}
							whileFocus={{ scale: 1.05 }}
							transition={{ duration: 0.2 }}
						/>
						<span className='text-sm text-blue-300'>{token.symbol}</span>
					</div>

					<motion.button
						type='button'
						onClick={() => adjustBet(betAmount + 10)}
						disabled={betAmount >= maxBet || bettingPasses === 0}
						className='sub-card flex items-center'
						whileTap={{ scale: 0.9 }}
					>
						<Plus className='h-4 w-4' />
					</motion.button>
				</section>

				<section className='grid grid-cols-4 gap-2'>
					{[25, 50, 75, 100].map((percentage) => (
						<motion.button
							key={percentage}
							type='button'
							className='w-full text-xs font-poppins sub-card'
							onClick={() => applyPercentage(percentage)}
							disabled={bettingPasses === 0}
							whileTap={{ scale: 0.9 }}
						>
							{percentage}%
						</motion.button>
					))}
				</section>
			</div>

			{/* Slider Section */}
			<section className='sub-card'>
				<Slider
					value={[betAmount]}
					max={maxBet}
					min={10}
					step={1}
					onValueChange={(value) => setBetAmount(value[0])}
					disabled={bettingPasses === 0}
					className='w-full'
				/>

				<div className='flex justify-between mt-3 font-poppins text-xs text-slate-400'>
					<span>
						Min: {10} {token.symbol}
					</span>
					<span>
						Max: {maxBet} {token.symbol}
					</span>
				</div>
			</section>
		</GradientBorder>
	);
}
