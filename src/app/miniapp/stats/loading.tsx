'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, TrendingUp, Trophy } from 'lucide-react';

interface StatsLoadingScreenProps {
	className?: string;
}

const StatsLoadingScreen: React.FC<StatsLoadingScreenProps> = () => {
	return (
		<div className='min-h-screen bg-gray-950'>
			<div className='max-w-6xl mx-auto space-y-6'>
				{/* Header Skeleton */}
				<div className='space-y-2'>
					<motion.div
						className='h-8 w-64 bg-gray-800/50 rounded-lg'
						animate={{ opacity: [0.5, 0.7, 0.5] }}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					/>
					<motion.div
						className='h-4 w-96 bg-gray-800/30 rounded-lg'
						animate={{ opacity: [0.3, 0.5, 0.3] }}
						transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</div>

				{/* Stats Cards Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{[...Array(4)].map((_, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className='relative rounded-2xl border border-gray-800 bg-gray-900/80 overflow-hidden'
						>
							{/* Animated gradient background */}
							<div className='absolute inset-0'>
								<motion.div
									className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10'
									animate={{
										opacity: [0.1, 0.15, 0.1],
										scale: [1, 1.05, 1],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
								<div className='absolute inset-0 bg-grid-white/[0.02]' />
							</div>

							{/* Card Content */}
							<div className='relative p-6 h-full'>
								<div className='flex justify-between items-start mb-6'>
									<div className='space-y-2'>
										<motion.div
											className='h-6 w-32 bg-gray-800/50 rounded-lg'
											animate={{ opacity: [0.5, 0.7, 0.5] }}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: index * 0.2,
											}}
										/>
										<motion.div
											className='h-4 w-48 bg-gray-800/30 rounded-lg'
											animate={{ opacity: [0.3, 0.5, 0.3] }}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: index * 0.2,
											}}
										/>
									</div>

									<motion.div
										className='p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'
										animate={{ rotate: [0, 10, 0] }}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: index * 0.3,
										}}
									>
										{
											[
												<Activity key={1} />,
												<BarChart3 key={1} />,
												<TrendingUp key={1} />,
												<Trophy key={1} />,
											][index % 4]
										}
									</motion.div>
								</div>

								{/* Stats Grid */}
								<div className='grid grid-cols-2 gap-3'>
									{[...Array(4)].map((_, statIndex) => (
										<motion.div
											key={statIndex}
											className='bg-black/30 rounded-xl p-3 border border-white/[0.08]'
											animate={{
												opacity: [0.7, 0.9, 0.7],
												scale: [1, 1.02, 1],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: (index + statIndex) * 0.1,
											}}
										>
											<motion.div
												className='h-3 w-16 bg-gray-800/50 rounded-md mb-2'
												animate={{ opacity: [0.3, 0.5, 0.3] }}
												transition={{
													duration: 1.5,
													repeat: Infinity,
													ease: 'easeInOut',
													delay: (index + statIndex) * 0.1,
												}}
											/>
											<motion.div
												className='h-5 w-20 bg-gray-800/30 rounded-md'
												animate={{ opacity: [0.5, 0.7, 0.5] }}
												transition={{
													duration: 1.5,
													repeat: Infinity,
													ease: 'easeInOut',
													delay: (index + statIndex) * 0.1,
												}}
											/>
										</motion.div>
									))}
								</div>

								{/* Footer */}
								<div className='flex justify-between items-center mt-6'>
									<motion.div
										className='h-4 w-24 bg-gray-800/30 rounded-lg'
										animate={{ opacity: [0.3, 0.5, 0.3] }}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: index * 0.2,
										}}
									/>
									<motion.div
										className='h-8 w-24 bg-gray-800/50 rounded-lg'
										animate={{ opacity: [0.5, 0.7, 0.5] }}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: 'easeInOut',
											delay: index * 0.2,
										}}
									/>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Loading Indicator */}
			<motion.div
				className='fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 border border-gray-800 backdrop-blur-sm'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<motion.div
					className='w-2 h-2 rounded-full bg-blue-400'
					animate={{ scale: [1, 1.5, 1] }}
					transition={{ duration: 1, repeat: Infinity }}
				/>
				<motion.div
					className='w-2 h-2 rounded-full bg-purple-400'
					animate={{ scale: [1, 1.5, 1] }}
					transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
				/>
				<motion.div
					className='w-2 h-2 rounded-full bg-pink-400'
					animate={{ scale: [1, 1.5, 1] }}
					transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
				/>
				<span className='text-white/70 text-sm ml-2'>Loading stats...</span>
			</motion.div>
		</div>
	);
};

export default StatsLoadingScreen;
