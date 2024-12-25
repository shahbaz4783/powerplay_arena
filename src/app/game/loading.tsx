'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const loadingMessages = [
	'Flipping the coins of destiny...',
	'Aligning the stars for your fortune...',
	'Charging up your luck...',
	'Preparing the cosmic flip...',
	'Balancing the scales of fate...',
];

const CoinFlip = () => (
	<div className='relative w-24 h-24'>
		<motion.div
			className='absolute inset-0'
			animate={{
				rotateY: [0, 180, 360],
				filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
			}}
			transition={{
				rotateY: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
				filter: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
			}}
		>
			<div className='w-full h-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)]'>
				<div className='absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 opacity-80' />
			</div>
		</motion.div>
	</div>
);

const GlowingOrb = ({ delay = 0 }) => (
	<motion.div
		className='absolute w-3 h-3 rounded-full bg-blue-400'
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

export default function LoadingGame() {
	const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentMessage((prevMessage) => {
				const currentIndex = loadingMessages.indexOf(prevMessage);
				return loadingMessages[(currentIndex + 1) % loadingMessages.length];
			});
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className='fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center p-4'
			style={{ height: '100svh' }}
		>
			{/* Background Effects */}
			<div className='absolute inset-0 opacity-30'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse' />
			</div>

			{/* Main Content Container */}
			<div className='relative w-full max-w-md aspect-square mb-8'>
				{/* Orbital Rings */}
				<motion.div
					className='absolute inset-0 rounded-full border-2 border-blue-500/20'
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
					className='absolute inset-4 rounded-full border-2 border-purple-500/20'
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
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<CoinFlip />
					</motion.div>
				</div>

				{/* Floating Orbs */}
				<div className='absolute inset-0'>
					{Array.from({ length: 12 }).map((_, i) => (
						<GlowingOrb key={i} delay={i * 0.2} />
					))}
				</div>

				{/* Sparkle Effects */}
				<Sparkles className='absolute top-1/4 left-1/4 w-6 h-6 text-yellow-300/60' />
				<Sparkles className='absolute bottom-1/4 right-1/4 w-6 h-6 text-yellow-300/60' />
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
						className='text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent'
						animate={{
							backgroundPosition: ['0% center', '100% center'],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'linear',
						}}
					>
						Fortune Flip
					</motion.h1>
					<p className='text-xl text-blue-200/80'>{currentMessage}</p>
				</motion.div>
			</AnimatePresence>

			{/* Loading Indicator */}
			<motion.div
				className='mt-8 flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm'
				animate={{
					boxShadow: [
						'0 0 0 0 rgba(59, 130, 246, 0)',
						'0 0 0 8px rgba(59, 130, 246, 0.1)',
						'0 0 0 0 rgba(59, 130, 246, 0)',
					],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			>
				<Loader2 className='w-5 h-5 text-blue-400 animate-spin' />
				<span className='text-blue-200/80 text-lg'>
					Loading your destiny...
				</span>
			</motion.div>
		</div>
	);
}
