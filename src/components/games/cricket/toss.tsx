'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Circle, Coins, HandCoins, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { useCricketGameState } from '@/src/lib/store';
import confetti from 'canvas-confetti';
import { useCallback, useState } from 'react';
import { PiCoinThin } from 'react-icons/pi';
import { BackgroundPattern } from '../../common/elements/background-pattern';
import { IconButton } from '../../common/buttons/primary-button';

type GameParticipant = 'opponent' | 'player';
type TossChoice = 'bat' | 'bowl';

interface TossState {
	winner: GameParticipant | null;
	choice: TossChoice | null;
	playMode: 'chase' | 'defend' | null;
}

export function Toss() {
	const [isAnimating, setIsAnimating] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { gameState, updateGameState } = useCricketGameState();

	const handleToss = useCallback(() => {
		setIsAnimating(true);

		setTimeout(() => {
			const result: GameParticipant =
				Math.random() < 0.5 ? 'player' : 'opponent';
			setIsAnimating(false);
			setShowResult(true);

			if (result === 'opponent') {
				const choice: TossChoice = Math.random() < 0.5 ? 'bat' : 'bowl';
				updateGameState({
					toss: {
						winner: 'opponent',
						choice,
						playMode: choice === 'bat' ? 'chase' : 'defend',
					},
				});
				setTimeout(() => {
					setShowResult(false);
					updateGameState({
						gamePhase: choice === 'bat' ? 'bowling' : 'batting',
					});
				}, 4000);
			} else {
				updateGameState({
					toss: { winner: 'player', choice: null, playMode: null },
				});
				confetti({
					particleCount: 200,
					spread: 90,
					origin: { y: 0.6 },
					colors: ['#60A5FA', '#34D399', '#FBBF24'],
				});
			}
		}, 2500);
	}, [updateGameState]);

	const selectChoice = useCallback(
		(choice: TossChoice) => {
			updateGameState({
				toss: {
					...gameState.toss,
					choice,
					playMode: choice === 'bat' ? 'defend' : 'chase',
				},
				gamePhase: choice === 'bat' ? 'batting' : 'bowling',
			});
			setShowResult(false);
		},
		[gameState.toss, updateGameState]
	);

	const renderTossChoices = () => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className='space-y-8 text-center'
		>
			<motion.div
				animate={{ scale: [1, 1.05, 1] }}
				transition={{ duration: 2, repeat: Infinity }}
				className='text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'
			>
				You won the toss!
			</motion.div>
			<div className='grid grid-cols-2 gap-6'>
				{(['bat', 'bowl'] as TossChoice[]).map((choice) => (
					<Button
						key={choice}
						onClick={() => selectChoice(choice)}
						className={`h-24 rounded-2xl transform transition-all duration-200
              ${
								choice === 'bat'
									? 'blue-gradient text-slate-200'
									: 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-slate-200'
							}`}
					>
						<div className='flex flex-col items-center space-y-2'>
							<span className='text-2xl font-jetbrains font-bold capitalize'>{choice}</span>
							<span className='text-sm opacity-80 font-poppins'>Choose to {choice}</span>
						</div>
					</Button>
				))}
			</div>
		</motion.div>
	);

	const renderOpponentChoice = () => (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			className='text-center space-y-6'
		>
			<div className='text-2xl font-medium text-red-400'>
				Opponent won the toss
			</div>
			<motion.div
				animate={{ scale: [1, 1.05, 1] }}
				transition={{ duration: 1.5, repeat: Infinity }}
				className='text-3xl font-bold text-yellow-400'
			>
				They chose to {gameState.toss.choice}
			</motion.div>
		</motion.div>
	);

	const renderInitialState = () => (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='space-y-12 flex flex-col items-center text-center'
		>
			<motion.div className='space-y-8' initial={{ y: 20 }} animate={{ y: 0 }}>
				<motion.div
					animate={{
						rotateY: 360,
						boxShadow: [
							'0 0 20px #FCD34D',
							'0 0 40px #FCD34D',
							'0 0 20px #FCD34D',
						],
					}}
					transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
					className='inline-block rounded-full p-6'
				>
					<Circle className='w-32 h-32 text-yellow-400' />
				</motion.div>
				<motion.p
					className='tex text-gray-300 font-exo2 font-medium tracking-wide'
					animate={{ opacity: [0.7, 1, 0.7] }}
					transition={{ duration: 3, repeat: Infinity }}
				>
					Flip the coin and let the game begin!
				</motion.p>
			</motion.div>

			<IconButton onClick={handleToss} icon={HandCoins} text='Flip the Coin' />
		</motion.div>
	);

	const renderAnimation = () => (
		<motion.div className='text-center space-y-8'>
			<motion.div
				animate={{
					rotateX: [0, 1440, 2880],
					scale: [1, 1.2, 1],
				}}
				transition={{ duration: 2.5, ease: 'easeInOut' }}
				className='inline-block'
			>
				<PiCoinThin className='w-32 h-32 text-yellow-400' />
			</motion.div>
			<div className='flex items-center justify-center space-x-3'>
				<Loader2 className='w-5 h-5 animate-spin' />
				<span className='text-xl text-gray-300'>Flipping coin...</span>
			</div>
		</motion.div>
	);

	return (
		<div className='min-h-svh flex flex-col main-card items-center justify-center'>
			<BackgroundPattern />
			<AnimatePresence mode='wait'>
				{isAnimating && renderAnimation()}
				{showResult &&
					(gameState.toss.winner === 'player'
						? renderTossChoices()
						: renderOpponentChoice())}
				{!isAnimating && !showResult && renderInitialState()}
			</AnimatePresence>
		</div>
	);
}
