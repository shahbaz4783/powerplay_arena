'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { token } from '@/src/constants/app-config';
import { Check, X, AlertTriangle, Coins, Trophy, Target } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import confetti from 'canvas-confetti';

interface ResultModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	result: 'win' | 'lose' | 'failed' | null;
	winAmount: number;
	message: {
		error?: string;
		success?: string;
	};
	flipResult: 'heads' | 'tails' | null;
	xpGain: number;
	selectedSide: string | null;
	betAmount: number;
}

export function BetResult({
	isOpen,
	onOpenChange,
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
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	}, [isOpen, result]);

	const getResultColor = () => {
		switch (result) {
			case 'win':
				return 'bg-gradient-to-r from-green-400 to-green-600';
			case 'lose':
				return 'bg-gradient-to-r from-red-400 to-red-600';
			case 'failed':
				return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
			default:
				return 'bg-gradient-to-r from-gray-400 to-gray-600';
		}
	};

	const getResultIcon = () => {
		switch (result) {
			case 'win':
				return <Trophy className='w-12 h-12 text-white' />;
			case 'lose':
				return <X className='w-12 h-12 text-white' />;
			case 'failed':
				return <AlertTriangle className='w-12 h-12 text-white' />;
			default:
				return null;
		}
	};

	const getResultTitle = () => {
		switch (result) {
			case 'win':
				return 'Congratulations!';
			case 'lose':
				return 'Better luck next time!';
			case 'failed':
				return 'Bet Failed';
			default:
				return 'Result';
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<Dialog open={isOpen} onOpenChange={onOpenChange}>
					<DialogContent className='w-11/12 max-w-md rounded-xl p-0 overflow-hidden'>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 50 }}
							transition={{ duration: 0.3 }}
						>
							<DialogHeader className={`p-6 ${getResultColor()}`}>
								<div className='flex flex-col items-center space-y-4'>
									{getResultIcon()}
									<DialogTitle className='text-3xl font-bold text-white text-center'>
										{getResultTitle()}
									</DialogTitle>
								</div>
							</DialogHeader>
							<div className='p-6 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800'>
								{result !== 'failed' && (
									<div className='space-y-4'>
										<div className='text-center'>
											<p className='text-lg text-gray-300'>
												You called{' '}
												<span className='font-bold text-white uppercase'>
													{selectedSide}
												</span>
											</p>
											<p className='text-lg text-gray-300 mt-2'>
												The coin landed on{' '}
												<span className='font-bold text-white uppercase'>
													{flipResult}
												</span>
											</p>
										</div>
										<motion.div
											initial={{ scale: 0.8, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{ delay: 0.3, duration: 0.5 }}
											className='flex justify-center items-center p-3 bg-blue-600 rounded-xl'
										>
											<Trophy className='w-6 h-6 text-yellow-300 mr-2' />
											<span className='text-white text-lg'>
												XP Gained:{' '}
												<span className='font-bold text-xl'>+{xpGain}</span>
											</span>
										</motion.div>
									</div>
								)}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className='text-center'
								>
									{result === 'win' && (
										<p className='text-2xl font-bold text-green-400'>
											You won{' '}
											<span className='text-white'>
												{winAmount} {token.symbol}
											</span>
											!
										</p>
									)}
									{result === 'lose' && (
										<p className='text-2xl font-bold text-red-400'>
											You lost{' '}
											<span className='text-white'>
												{betAmount} {token.symbol}
											</span>
										</p>
									)}
									{result === 'failed' && (
										<p className='text-xl text-yellow-400'>{message.error}</p>
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
