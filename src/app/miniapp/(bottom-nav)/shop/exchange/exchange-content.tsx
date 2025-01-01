'use client';

import { SectionHeader } from '@/src/components/common/elements/section-header';
import { Slider } from '@/src/components/ui/slider';
import { token } from '@/src/constants/app-config';
import { calculateExchangeValues } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { ArrowBigDown, Coins } from 'lucide-react';

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
		<div className='sub-card space-y-3'>
			{/* Header Section */}
			<SectionHeader
				title='Exchange'
				highlightedTitle='Powers'
				icon={Coins}
				description={`Select the amount to ${
					direction === 'buyPasses' ? 'purchase pass' : 'sell pass'
				}`}
			/>

			{/* Amount Display */}
			<div className=''>
				<div className='flex justify-between items-center mb-2'>
					<span className='text-gray-400'>Amount</span>
					<div className='flex items-center gap-2'>
						<span className='text-2xl font-bold text-white'>
							{passesToExchange}
						</span>
						<span className='text-sm text-gray-400'>Pass</span>
					</div>
				</div>

				<Slider
					min={0}
					max={maxPasses}
					value={[passesToExchange]}
					onValueChange={([value]) => setPassesToExchange(value)}
					step={1}
					className='my-6'
				/>

				{/* Quick Select Buttons */}
				<div className='grid grid-cols-3 gap-3'>
					{presetButtons.map((btn) => (
						<motion.button
							key={btn.label}
							onClick={() =>
								setPassesToExchange(Math.min(btn.value, maxPasses))
							}
							whileTap={{ scale: 0.9 }}
							className='bg-gradient-to-r from-blue-600/20 to-blue-400/10 
                         border border-blue-500/20 py-2 px-3 rounded-lg disabled:opacity-50'
							disabled={btn.value > maxPasses}
						>
							<span className='relative z-10 text-sm font-medium text-white'>
								{btn.label}
							</span>
						</motion.button>
					))}
				</div>
			</div>

			{/* Summary Section */}
			<div className='sub-card'>
				<div className='flex justify-between items-center'>
					<span className='text-gray-400'>
						{direction === 'buyPasses' ? 'Base Cost' : 'Base Amount'}
					</span>
					<div className='flex items-center gap-2'>
						<span className='text-xl font-bold text-white'>{baseAmount}</span>
						<span className='text-sm text-gray-400'>{token.symbol}</span>
					</div>
				</div>
				<p className='text-xs text-gray-500 mt-1'>
					{direction === 'buyPasses'
						? 'Exchange fees not included'
						: 'Before exchange fees'}
				</p>
			</div>
		</div>
	);
};
