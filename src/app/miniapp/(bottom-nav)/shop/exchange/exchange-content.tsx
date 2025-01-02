'use client';

import { IconButton } from '@/src/components/common/buttons/primary-button';
import { SectionHeader } from '@/src/components/common/elements/section-header';
import { Slider } from '@/src/components/ui/slider';
import { token } from '@/src/constants/app-config';
import { calculateExchangeValues } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { ArrowBigDown, ArrowLeftRight, Coins, Minus, Plus } from 'lucide-react';

interface ExchangeContentProps {
	direction: 'buyPasses' | 'sellPasses';
	passesToExchange: number;
	setPassesToExchange: (value: number) => void;
	presetButtons: { label: string; value: number }[];
	maxPasses: number;
}

export const ExchangeContent = ({
	direction,
	passesToExchange,
	setPassesToExchange,
	presetButtons,
	maxPasses,
}: ExchangeContentProps) => {
	const { totalPassCost, netPassSaleAmount, exchangeFee } =
		calculateExchangeValues(passesToExchange);

	const baseAmount =
		direction === 'buyPasses'
			? totalPassCost - exchangeFee
			: netPassSaleAmount + exchangeFee;

	return (
		<div className=' space-y-3'>
			{/* Amount Display */}
			<div className='space-y-3 sub-card'>
				<div className='flex justify-between items-baseline'>
					<span className='text-gray-400 text-sm font-poppins'>Amount</span>
					<div className='flex gap-2 items-baseline'>
						<span className='text-2xl font-bold font-exo2 text-white'>
							{passesToExchange}
						</span>
						<span className='text-sm text-gray-400 font-exo2'>Pass</span>
					</div>
				</div>

				<div className='grid grid-cols-12 items-center gap-2'>
					<IconButton
						icon={Minus}
						className='col-span-2'
						variant={'glass'}
						onClick={() =>
							setPassesToExchange(Math.max(0, passesToExchange - 1))
						}
					/>
					<div className='col-span-8'>
						<Slider
							min={0}
							max={maxPasses}
							value={[passesToExchange]}
							onValueChange={([value]) => setPassesToExchange(value)}
							step={1}
						/>
					</div>
					<IconButton
						icon={Plus}
						className='col-span-2'
						variant={'glass'}
						onClick={() =>
							setPassesToExchange(Math.min(maxPasses, passesToExchange + 1))
						}
					/>
				</div>

				{/* Quick Select Buttons */}
				<div className='grid grid-cols-3 gap-3'>
					{presetButtons.map((btn) => (
						<motion.button
							key={btn.label}
							onClick={() =>
								setPassesToExchange(Math.min(btn.value, maxPasses))
							}
							whileTap={{ scale: 0.9 }}
							disabled={btn.value > maxPasses}
							className='bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/20 py-2 px-3 rounded-lg disabled:opacity-50'
						>
							<span className='relative z-10 text-sm font-jetbrains font-medium text-white'>
								{btn.label}
							</span>
						</motion.button>
					))}
				</div>

				<div className='sub-card'>
					<div className='flex justify-between items-baseline'>
						<span className='text-slate-300 font-poppins'>
							{direction === 'buyPasses' ? 'Base Cost' : 'Base Amount'}
						</span>
						<div className='flex items-baseline gap-1'>
							<span className='text-xl font-exo2 font-bold text-white'>
								{baseAmount}
							</span>
							<span className='text-xs text-slate-400'>{token.symbol}</span>
						</div>
					</div>
					<div className='grid grid-cols-8 items-baseline'>
						<p className='text-xs text-slate-500 mt-1 col-span-5'>
							Exchange fees: 3%
						</p>
						<p className='text-xs font-exo2 text-slate-300 col-span-3 text-right'>
							{direction === 'buyPasses' ? '+' : '-'}
							{exchangeFee} {token.symbol}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
