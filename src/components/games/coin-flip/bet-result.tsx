import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogOverlay,
} from '@/src/components/ui/dialog';
import { token } from '@/src/constants/app-config';
import { X, Trophy, Coins, TrendingUp, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InfoCard } from '../../common/cards/info-card';
import { formatCompactNumber } from '@/src/lib/utils';

interface ResultModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	success: boolean;
	result: 'win' | 'lose' | 'invalid' | null;
	winAmount: number;
	message: string | null;
	flipResult: 'heads' | 'tails' | null;
	xpGain: number;
	selectedSide: string | null;
	betAmount: number;
}

export function BetResult({
	isOpen,
	onOpenChange,
	success,
	result,
	winAmount,
	message,
	flipResult,
	xpGain,
	selectedSide,
	betAmount,
}: ResultModalProps) {
	useEffect(() => {
		if (isOpen && result === 'win') {
			const duration = 3 * 1000;
			const end = Date.now() + duration;

			const frame = () => {
				confetti({
					particleCount: 7,
					angle: 60,
					spread: 55,
					origin: { x: 0, y: 0.8 },
					colors: ['#22c55e', '#4ade80', '#86efac'],
					zIndex: 9999999,
				});
				confetti({
					particleCount: 7,
					angle: 120,
					spread: 55,
					origin: { x: 1, y: 0.8 },
					colors: ['#22c55e', '#4ade80', '#86efac'],
					zIndex: 9999999,
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			};
			frame();
		}
	}, [isOpen, result]);

	const getResultConfig = () => {
		switch (result) {
			case 'win':
				return {
					color: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700',
					icon: (
						<Trophy className='w-16 h-16 text-yellow-300 drop-shadow-glow' />
					),
					title: 'Victory!',
					glow: 'shadow-lg shadow-green-500/50',
				};
			case 'lose':
				return {
					color: 'bg-gradient-to-br from-red-500 via-red-600 to-red-700',
					icon: <X className='w-16 h-16 text-white drop-shadow-glow' />,
					title: 'Not This Time',
					glow: 'shadow-lg shadow-red-500/50',
				};
			case 'invalid':
				return {
					color:
						'bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700',
					icon: (
						<AlertTriangle className='w-16 h-16 text-white drop-shadow-glow' />
					),
					title: 'Invalid Bet',
					glow: 'shadow-lg shadow-yellow-500/50',
				};
			default:
				return {
					color: 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800',
					icon: null,
					title: 'Result',
					glow: 'shadow-lg shadow-gray-500/50',
				};
		}
	};

	const config = getResultConfig();

	return (
		<AnimatePresence>
			{isOpen && (
				<Dialog open={isOpen} onOpenChange={onOpenChange}>
					<DialogOverlay className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]' />
					<DialogContent className='w-11/12 z-[999999] max-w-md rounded-2xl p-0 overflow-hidden bg-gray-950 border border-gray-800'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							<DialogHeader className={`p-8 ${config.color} ${config.glow}`}>
								<motion.div
									className='flex flex-col items-center space-y-4'
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.1, type: 'spring' }}
								>
									<DialogTitle className='text-4xl font-bold text-white text-center tracking-tight'>
										{config.title}
									</DialogTitle>
								</motion.div>
							</DialogHeader>

							<div className='p-3 space-y-4 bg-gray-950'>
								{success && (
									<div className='space-y-6'>
										<motion.div
											className='flex flex-col items-center space-y-3 p-4 rounded-xl bg-gray-900/50 border border-gray-800'
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 }}
										>
											<p className='text-lg text-gray-400'>
												You called{' '}
												<span className='font-bold text-white uppercase'>
													{selectedSide}
												</span>
											</p>
											<div className='w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent' />
											<p className='text-lg text-gray-400'>
												The coin landed on{' '}
												<span className='font-bold text-white uppercase'>
													{flipResult}
												</span>
											</p>
										</motion.div>

										<motion.div
											initial={{ scale: 0.8, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{ delay: 0.3 }}
											className='grid grid-cols-2 gap-4'
										>
											<InfoCard
												title='XP Gained'
												icon={<TrendingUp />}
												amount={xpGain}
												color='green'
											/>
											<InfoCard
												title='Bet Amount'
												icon={<Coins />}
												amount={betAmount}
												color='yellow'
											/>
										</motion.div>
									</div>
								)}

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className='text-center'
								>
									{result === 'win' && (
										<div className='p-4 rounded-xl bg-green-950/30 border border-green-900/50'>
											<p className='text-2xl font-bold text-white'>
												You won{' '}
												<span className='text-green-400'>
													{formatCompactNumber(winAmount)} {token.symbol}
												</span>
											</p>
										</div>
									)}
									{result === 'lose' && (
										<div className='p-4 rounded-xl bg-red-950/30 border border-red-900/50'>
											<p className='text-2xl font-bold text-red-400'>
												You lost{' '}
												<span className='text-white'>
													{formatCompactNumber(betAmount)} {token.symbol}
												</span>
											</p>
										</div>
									)}
									{result === 'invalid' && (
										<div className='p-4 rounded-xl bg-yellow-950/30 border border-yellow-900/50'>
											<p className='text-xl text-yellow-400'>
												{message ||
													"Your bet couldn't be processed. Please try again."}
											</p>
										</div>
									)}
								</motion.div>
							</div>
						</motion.div>
					</DialogContent>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
