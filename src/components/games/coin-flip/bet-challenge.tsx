import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { betOptions } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';
import { GradientBorder } from '../../common/elements/gradient-border';
import { SectionHeader } from '../../common/elements/section-header';
import { LayoutDashboardIcon, Sparkles, TrendingUp } from 'lucide-react';

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

			<div className='grid grid-cols-2 gap-3 mb-6'>
				{betOptions.map((option) => {
					const isSelected = selectedChallenge === option;

					return (
						<motion.button
							key={option.name}
							type='button'
							whileTap={{ scale: 0.9 }}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 20,
								mass: 0.8,
							}}
							className={cn(
								'relative w-full rounded-xl p-4 flex flex-col items-center gap-2 overflow-hidden',
								'transition-all duration-300 ease-out',
								isSelected
									? 'text-slate-900 shadow-lg border-transparent'
									: 'border border-slate-800'
							)}
							onClick={() => setSelectedChallenge(option)}
						>
							<AnimatePresence>
								{isSelected && (
									<motion.div
										layoutId='selected-bg'
										className='absolute inset-0 blue-gradient -z-10'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>

							<motion.div
								className='relative z-10 flex flex-col items-center gap-2'
								animate={isSelected ? { y: 0 } : { y: 0 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<span
									className={cn(
										'text-sm font-medium transition-colors duration-200 text-slate-200',
										isSelected ? 'text-white font-bold' : 'text-slate-200'
									)}
								>
									{option.name}
								</span>

								<motion.div
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									className={cn(
										'flex items-center gap-1.5 text-xs font-medium',
										isSelected
											? 'text-green-700 bg-white p-1 rounded-xl transition-all ease-in'
											: 'text-blue-400'
									)}
								>
									{option.payout > 2 ? (
										<Sparkles className='w-3.5 h-3.5' />
									) : (
										<TrendingUp className='w-3.5 h-3.5' />
									)}
									<span>{option.payout}x Payout</span>
								</motion.div>
							</motion.div>
						</motion.button>
					);
				})}
			</div>

			<AnimatePresence mode='wait'>
				<motion.div
					key={selectedChallenge.description}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{
						duration: 0.2,
						type: 'spring',
						stiffness: 200,
						damping: 20,
					}}
					className='relative px-4'
				>
					<motion.p
						className='text-sm text-slate-400 text-center'
						layoutId='description'
					>
						{selectedChallenge.description}
					</motion.p>
				</motion.div>
			</AnimatePresence>
		</GradientBorder>
	);
}

export default BetChallenge;
