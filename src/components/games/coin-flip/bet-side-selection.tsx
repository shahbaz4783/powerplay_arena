import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { betSides } from '@/src/constants/challenges';
import { cn } from '@/src/lib/utils';
import { SectionHeader } from '../../common/elements/section-header';
import { GradientBorder } from '../../common/elements/gradient-border';
import { Coins } from 'lucide-react';

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
				title='Choose Your Side'
				description='Flip the odds in your favor'
				icon={Coins}
			/>

			<div className='grid grid-cols-2 gap-3 mb-4 p-1'>
				{betSides.map((side) => {
					const isSelected = selectedSide === side.value;

					return (
						<motion.button
							key={side.value}
							type='button'
							whileTap={{ scale: 0.9 }}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 20,
								mass: 0.8,
							}}
							className={cn(
								'relative w-full rounded-xl p-3 flex flex-col items-center gap-3',
								'transition-all duration-300 ease-out',
								isSelected ? 'font-bold shadow-lg' : 'bg-slate-800/50'
							)}
							onClick={() => setSelectedSide(side.value)}
						>
							<AnimatePresence>
								{isSelected && (
									<motion.div
										layoutId='selected-coin-side'
										className='absolute inset-0 blue-gradient -z-10 rounded-xl'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</AnimatePresence>

							<motion.div
								className='relative z-10 flex flex-col items-center gap-2'
								initial={false}
								animate={isSelected ? { y: 0 } : { y: 0 }}
							>
								<span
									className={cn(
										'text-lg font-semibold transition-colors duration-200',
										isSelected ? 'font-bold' : 'text-slate-200'
									)}
								>
									{side.name}
								</span>
							</motion.div>
						</motion.button>
					);
				})}
			</div>

			<AnimatePresence>
				{selectedSide && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='text-center text-sm text-slate-400 px-4'
					>
						Ready to flip? Place your bet and test your luck!
					</motion.div>
				)}
			</AnimatePresence>
		</GradientBorder>
	);
}

export default BetSideSelection;
