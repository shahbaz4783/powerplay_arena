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
import { Check, X, AlertTriangle } from 'lucide-react';

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
	selectedSide,
	betAmount,
}: ResultModalProps) {
	useEffect(() => {
		if (!isOpen) {
			onOpenChange(false);
		}
	}, [isOpen, onOpenChange]);

	const getResultColor = () => {
		switch (result) {
			case 'win':
				return 'bg-green-500';
			case 'lose':
				return 'bg-red-500';
			case 'failed':
				return 'bg-yellow-500';
			default:
				return 'bg-gray-500';
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
								<DialogTitle className='text-2xl font-bold text-white text-center'>
									{getResultTitle()}
								</DialogTitle>
							</DialogHeader>
							<div className='p-6 space-y-4'>
								{result !== 'failed' && (
									<div className='text-center space-y-2'>
										<p className='text-lg'>
											Your call:{' '}
											<span className='font-bold uppercase text-slate-300'>
												{selectedSide}
											</span>
										</p>
										<p className='text-lg'>
											The coin landed on{' '}
											<span className='font-bold uppercase text-slate-400'>
												{flipResult}
											</span>
										</p>
									</div>
								)}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className={`text-2xl font-bold text-center ${
										result === 'win'
											? 'text-green-600'
											: result === 'lose'
											? 'text-red-600'
											: 'text-yellow-600'
									}`}
								>
									{result === 'win' && (
										<>
											You won {winAmount} {token.symbol}!
										</>
									)}
									{result === 'lose' && (
										<>
											You lost {betAmount} {token.symbol}
										</>
									)}
									{result === 'failed' && (
										<>
											<code className='text-center text-lg text-red-200'>
												{message.error}
											</code>
										</>
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
