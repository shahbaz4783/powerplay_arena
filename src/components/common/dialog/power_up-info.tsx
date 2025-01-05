import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { getPowerUpBenefits } from '@/src/constants/powerUps';
import { motion } from 'framer-motion';
import { Info, Star, ChevronRight, Sparkles, Lock, Coins } from 'lucide-react';

export function PowerUpInfo({
	powerUpId,
	title,
}: {
	powerUpId: string;
	title: string;
}) {
	const powerup = getPowerUpBenefits(powerUpId);

	return (
		<Dialog>
			<DialogTrigger className='absolute top-2 right-2'>
				<motion.div whileTap={{ scale: 0.95 }}>
					<Info className='size-5 font-bold text-slate-100 shadow-2x' />
				</motion.div>
			</DialogTrigger>

			<DialogContent className='w-11/12 bg-gradient-to-b from-gray-900 to-gray-950 border border-slate-800 mx-auto rounded-xl p-0 overflow-hidden shadow-2xl max-h-[80svh] flex flex-col'>
				<DialogHeader className='relative py-3 px-4 bg-slate-800/50 border-b border-slate-700 flex-shrink-0'>
					<DialogTitle className='relative flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<span className='text-lg font-bold text-white'>{title}</span>
						</div>
					</DialogTitle>
				</DialogHeader>

				<div className='flex-1 overflow-y-auto px-3'>
					{/* Info message */}
					<div className='bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 mb-4'>
						<p className='text-sm text-slate-300 text-center'>
							Start with <span className='text-white font-medium'>Common</span>{' '}
							rarity and level up your benefits!
						</p>
					</div>

					{/* Grid layout for benefits */}
					<div className='grid grid-cols-2 gap-3'>
						{powerup.map((benefit, index) => (
							<div
								key={benefit.rarity}
								className={`relative group rounded-lg transition-all duration-200
                  ${
										index === 0
											? 'bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700'
											: 'bg-slate-800/20 border border-slate-800/50'
									}`}
							>
								<div className='p-3'>
									{/* Rarity header */}
									<div className='flex items-center justify-between mb-2'>
										<div className='flex items-center gap-2'>
											{benefit.rarity === 'LEGENDARY' ? (
												<Sparkles className='w-4 h-4 text-yellow-500' />
											) : (
												<ChevronRight className='w-4 h-4 text-slate-400' />
											)}
											<span
												className={`text-sm font-medium
                        ${
													benefit.rarity === 'LEGENDARY'
														? 'text-yellow-500'
														: index === 0
														? 'text-white'
														: 'text-slate-400'
												}`}
											>
												{benefit.rarity}
											</span>
										</div>
										{index > 0 && <Lock className='w-3 h-3 text-slate-500' />}
									</div>

									{/* Benefit content */}
									<p
										className={`text-xs leading-relaxed
                    ${index === 0 ? 'text-slate-300' : 'text-slate-400'}`}
									>
										{benefit.info}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='flex-shrink-0 p-3 bg-slate-800/30 border-t border-slate-700/50'>
					<p className='text-xs text-center text-slate-400'>
						Purchase to start at Common rarity and unlock the progression path
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
