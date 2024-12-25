'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const loadingMessages = [
	'Preparing the pitch...',
	'Aligning your perfect strike...',
	'Setting up the field...',
	'Calculating your power stats...',
	'Loading match conditions...',
	'Warming up the bowlers...',
];

const CricketBall = () => (
	<div className='relative w-24 h-24'>
		<motion.div
			className='absolute inset-0'
			animate={{
				rotate: [0, 360],
				scale: [1, 1.05, 1],
			}}
			transition={{
				rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
				scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
			}}
		>
			{/* Cricket Ball */}
			<div className='w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-[0_0_30px_rgba(220,38,38,0.3)]'>
				{/* Seam */}
				<motion.div
					className='absolute top-1/2 left-0 w-full h-1 bg-white/80'
					animate={{ rotate: [0, 180] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
				/>
				<motion.div
					className='absolute top-0 left-1/2 w-1 h-full bg-white/80'
					animate={{ rotate: [0, 180] }}
					transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
				/>
			</div>
		</motion.div>
	</div>
);

const EnergyParticle = ({ delay = 0 }) => (
	<motion.div
		className='absolute w-2 h-2 rounded-full bg-blue-400'
		animate={{
			scale: [1, 1.5, 1],
			opacity: [0.5, 1, 0.5],
			y: [-10, 10, -10],
		}}
		transition={{
			duration: 2,
			delay,
			repeat: Infinity,
			ease: 'easeInOut',
		}}
	/>
);

export default function LoadingCricketGame() {
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
			{/* Background Effect - Cricket Field Pattern */}
			<div className='absolute inset-0 opacity-5'>
				<div className='absolute inset-0 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_10px)]' />
			</div>

			{/* Energy Field Effects */}
			<div className='absolute inset-0 opacity-30'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent animate-pulse' />
			</div>

			{/* Main Content Container */}
			<div className='relative w-full max-w-md aspect-square mb-8'>
				{/* Power Rings */}
				<motion.div
					className='absolute inset-0 rounded-full border-2 border-red-500/20'
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
					className='absolute inset-4 rounded-full border-2 border-blue-500/20'
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
						<CricketBall />
					</motion.div>
				</div>

				{/* Energy Particles */}
				<div className='absolute inset-0'>
					{Array.from({ length: 12 }).map((_, i) => (
						<EnergyParticle key={i} delay={i * 0.2} />
					))}
				</div>

				{/* Power Sparks */}
				<Sparkles className='absolute top-1/4 left-1/4 w-6 h-6 text-blue-400/60' />
				<Sparkles className='absolute bottom-1/4 right-1/4 w-6 h-6 text-red-400/60' />
			</div>

			{/* Game Title and Loading Text */}
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
						className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 bg-clip-text text-transparent'
						animate={{
							backgroundPosition: ['0% center', '100% center'],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'linear',
						}}
					>
						Power Strike
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
				<span className='text-blue-200/80 text-lg'>Loading your game...</span>
			</motion.div>
		</div>
	);
}
