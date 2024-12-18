'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiCoinThin } from 'react-icons/pi';
import { useCricketGameState } from '@/src/lib/store';
import { GameParticipant, TossChoice } from '@/src/types/gameState';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';
import confetti from 'canvas-confetti';

export function Toss() {
	const [isCoinSpinning, setIsCoinSpinning] = useState(false);
	const [showTossResult, setShowTossResult] = useState(false);
	const { gameState, updateGameState } = useCricketGameState();

	const performToss = useCallback(() => {
		setIsCoinSpinning(true);

		setTimeout(() => {
			const random = Math.floor(Math.random() * 1000);
			const result: GameParticipant = random % 2 === 0 ? 'opponent' : 'player';
			setIsCoinSpinning(false);
			setShowTossResult(true);

			if (result === 'opponent') {
				const tossChoice: TossChoice = Math.random() < 0.5 ? 'bat' : 'bowl';
				updateGameState({
					toss: {
						winner: 'opponent',
						choice: tossChoice,
						playMode: tossChoice === 'bat' ? 'chase' : 'defend',
					},
				});
				setTimeout(() => {
					setShowTossResult(false);
					updateGameState({
						gamePhase: tossChoice === 'bat' ? 'bowling' : 'batting',
					});
				}, 4000);
			} else {
				updateGameState({
					toss: {
						winner: 'player',
						choice: null,
						playMode: null,
					},
				});
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			}
		}, 3000);
	}, [updateGameState]);

	const handleTossChoice = useCallback(
		(choice: TossChoice) => {
			updateGameState({
				toss: {
					...gameState.toss,
					choice: choice,
					playMode: choice === 'bat' ? 'defend' : 'chase',
				},
				gamePhase: choice === 'bat' ? 'batting' : 'bowling',
			});
			setShowTossResult(false);
		},
		[gameState.toss, updateGameState]
	);

	const renderTossResult = () => {
		if (gameState.toss.winner === 'player') {
			return (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className='space-y-6'
				>
					<motion.p
						className='text-2xl font-medium text-yellow-300'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{
							repeat: Infinity,
							repeatType: 'reverse',
							duration: 1,
						}}
					>
						What's your choice?
					</motion.p>
					<div className='flex justify-center gap-4'>
						<Button
							onClick={() => handleTossChoice('bat')}
							className='rounded-xl w-32 h-14 text-lg font-semibold bg-blue-600 text-white active:bg-blue-700'
						>
							Bat
						</Button>
						<Button
							onClick={() => handleTossChoice('bowl')}
							className='rounded-xl w-32 h-14 text-lg font-semibold bg-green-600 text-white active:bg-green-700'
						>
							Bowl
						</Button>
					</div>
				</motion.div>
			);
		} else if (gameState.toss.winner === 'opponent' && gameState.toss.choice) {
			return (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className='text-center'
				>
					<p className='text-2xl font-semibold text-red-400 mb-4'>
						Opponent won the toss
					</p>
					<motion.p
						className='text-3xl font-bold text-yellow-300'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{
							repeat: Infinity,
							repeatType: 'reverse',
							duration: 1,
						}}
					>
						They chose to {gameState.toss.choice}
					</motion.p>
				</motion.div>
			);
		}
		return null;
	};

	const renderContent = () => {
		if (isCoinSpinning) {
			return (
				<div className='flex flex-col items-center'>
					<motion.div
						animate={{
							rotateX: [0, 1800, 3600],
							rotateZ: [0, -10, 0],
							rotateY: [0, 10, 0],
						}}
						transition={{ duration: 3, ease: 'easeInOut', times: [0, 0.5, 1] }}
						className='w-40 h-40 rounded-full flex items-center justify-center mb-8'
					>
						<PiCoinThin size={100} className='text-yellow-400' />
					</motion.div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='text-2xl font-semibold text-white'
					>
						Flipping the coin...
					</motion.p>
				</div>
			);
		}

		if (showTossResult) {
			return (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					className='text-center w-full space-y-6'
				>
					<motion.h2
						className='text-4xl font-bold mb-6 text-white'
						initial={{ y: -20 }}
						animate={{ y: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 10 }}
					>
						{gameState.toss.winner === 'player'
							? 'You won the toss!'
							: 'Toss Result'}
					</motion.h2>
					{renderTossResult()}
				</motion.div>
			);
		}

		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className='w-full flex flex-col justify-between items-center min-h-[60svh]'
			>
				<div className='flex flex-col justify-center items-center flex-grow'>
					<PiCoinThin className='w-32 h-32 text-yellow-400 mb-6 animate-spin-slow' />
					<p className='text-slate-200 font-mono font-medium text-center'>
						The coin toss will determine the starting advantage.
					</p>
				</div>

				<Button
					onClick={performToss}
					className='w-48 h-14 rounded-xl text-xl font-semibold bg-blue-600 text-white active:bg-yellow-700'
				>
					Call the Toss
				</Button>
			</motion.div>
		);
	};

	return (
		<Card className='w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-lg backdrop-blur-sm opacity-80 rounded-xl'>
			<CardContent className='p-8'>
				<main className='min-h-[85svh] flex flex-col items-center h-full justify-center'>
					<AnimatePresence mode='wait'>{renderContent()}</AnimatePresence>
				</main>
			</CardContent>
		</Card>
	);
}
