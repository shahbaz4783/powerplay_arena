import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Trophy, Target } from 'lucide-react';
import { CoinFlip } from '../../common/elements/rotating-coin';

type GameType = 'fortuneFlip' | 'powerStrike' | 'luckyDraw';

interface GameConfig {
	title: string;
	loadingMessages: string[];
	icon: React.ReactNode;
	primaryColor: string;
	secondaryColor: string;
}

const gameConfigs: Record<GameType, GameConfig> = {
	fortuneFlip: {
		title: 'Fortune Flip',
		loadingMessages: [
			'Flipping the coins of destiny...',
			'Aligning the stars for your fortune...',
			'Charging up your luck...',
			'Preparing the cosmic flip...',
			'Balancing the scales of fate...',
		],
		icon: <CoinFlip />,
		primaryColor: 'yellow',
		secondaryColor: 'blue',
	},
	powerStrike: {
		title: 'Power Strike',
		loadingMessages: [
			'Preparing the pitch...',
			'Warming up the bowlers...',
			'Setting up the field...',
			'Checking the weather...',
			'Getting the crowd ready...',
		],
		icon: <Target className='w-16 h-16 text-green-400' />,
		primaryColor: 'green',
		secondaryColor: 'emerald',
	},
	luckyDraw: {
		title: 'Underdog Victory',
		loadingMessages: [
			'Shuffling the odds...',
			'Calculating probabilities...',
			'Rolling the dice...',
			'Mixing up the chances...',
			'Preparing your luck...',
		],
		icon: <Trophy className='w-16 h-16 text-purple-400' />,
		primaryColor: 'purple',
		secondaryColor: 'indigo',
	},
};

interface GameLoadingScreenProps {
	gameType: GameType;
	onLoadingComplete?: () => void;
	loadingDuration?: number;
}

const GlowingOrb = ({ delay = 0, color }: { delay: number; color: string }) => (
	<motion.div
		className={`absolute w-3 h-3 rounded-full bg-${color}-400`}
		animate={{
			scale: [1, 1.5, 1],
			opacity: [0.5, 1, 0.5],
		}}
		transition={{
			duration: 2,
			delay,
			repeat: Infinity,
			ease: 'easeInOut',
		}}
	/>
);

export const GameLoadingScreen: React.FC<GameLoadingScreenProps> = ({
	gameType,
	onLoadingComplete,
	loadingDuration = 3000,
}) => {
	const [currentMessage, setCurrentMessage] = useState<string>('');
	const config = gameConfigs[gameType];

	useEffect(() => {
		const messageInterval = setInterval(() => {
			setCurrentMessage((prevMessage) => {
				const currentIndex = config.loadingMessages.indexOf(prevMessage);
				return config.loadingMessages[
					(currentIndex + 1) % config.loadingMessages.length
				];
			});
		}, 3000);

		// Simulate loading completion
		const loadingTimeout = setTimeout(() => {
			onLoadingComplete?.();
		}, loadingDuration);

		return () => {
			clearInterval(messageInterval);
			clearTimeout(loadingTimeout);
		};
	}, [config.loadingMessages, loadingDuration, onLoadingComplete]);

	return (
		<div
			className={`fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center p-4`}
			style={{ height: '100svh' }}
		>
			{/* Background Effects */}
			<div className='absolute inset-0 opacity-30'>
				<div
					className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${config.primaryColor}-500/20 via-transparent to-transparent`}
				/>
				<div
					className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${config.secondaryColor}-500/20 via-transparent to-transparent animate-pulse`}
				/>
			</div>

			{/* Main Content Container */}
			<div className='relative w-full max-w-md aspect-square mb-8'>
				{/* Orbital Rings */}
				<motion.div
					className={`absolute inset-0 rounded-full border-2 border-${config.primaryColor}-500/20`}
					animate={{
						rotate: [0, 360],
						scale: [1, 1.05, 1],
					}}
					transition={{
						rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
						scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
					}}
				/>
				<motion.div
					className={`absolute inset-4 rounded-full border-2 border-${config.secondaryColor}-500/20`}
					animate={{
						rotate: [360, 0],
						scale: [1.05, 1, 1.05],
					}}
					transition={{
						rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
						scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
					}}
				/>

				{/* Center Content */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<motion.div
						animate={{
							scale: [0.98, 1.02, 0.98],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						{config.icon}
					</motion.div>
				</div>

				{/* Floating Orbs */}
				<div className='absolute inset-0'>
					{Array.from({ length: 12 }).map((_, i) => (
						<GlowingOrb key={i} delay={i * 0.2} color={config.primaryColor} />
					))}
				</div>

				{/* Sparkle Effects */}
				<Sparkles
					className={`absolute top-1/4 left-1/4 w-6 h-6 text-${config.primaryColor}-300/60`}
				/>
				<Sparkles
					className={`absolute bottom-1/4 right-1/4 w-6 h-6 text-${config.primaryColor}-300/60`}
				/>
			</div>

			{/* Loading Text */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentMessage}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className='text-center space-y-4'
				>
					<motion.h1
						className={`text-4xl font-bold bg-gradient-to-r from-${config.primaryColor}-200 via-${config.primaryColor}-300 to-${config.primaryColor}-200 bg-clip-text text-transparent`}
						animate={{
							backgroundPosition: ['0% center', '100% center'],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'linear',
						}}
					>
						{config.title}
					</motion.h1>
					<p className={`text-xl text-${config.secondaryColor}-200/80`}>
						{currentMessage}
					</p>
				</motion.div>
			</AnimatePresence>

			{/* Loading Indicator */}
			<motion.div
				className={`mt-8 flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm`}
				animate={{
					boxShadow: [
						`0 0 0 0 rgba(${config.primaryColor}, 0)`,
						`0 0 0 8px rgba(${config.primaryColor}, 0.1)`,
						`0 0 0 0 rgba(${config.primaryColor}, 0)`,
					],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			>
				<Loader2
					className={`w-5 h-5 text-${config.primaryColor}-400 animate-spin`}
				/>
				<span className={`text-${config.secondaryColor}-200/80 text-lg`}>
					Loading your game...
				</span>
			</motion.div>
		</div>
	);
};
