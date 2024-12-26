import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/src/components/ui/card';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { cn, formatCompactNumber } from '@/src/lib/utils';
import { StatCardProps } from '@/src/types/stats.types';

export const StatCard: React.FC<StatCardProps> = ({
	title,
	description,
	icon,
	href,
	stats,
	disabled = false,
	gradient = 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
}) => (
	<Link
		href={disabled ? '#' : href}
		className={cn(disabled && 'cursor-not-allowed')}
	>
		<motion.div
			whileTap={{ scale: 0.98 }}
			transition={{ type: 'spring', stiffness: 400, damping: 17 }}
		>
			<Card className='relative h-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm'>
				<div
					className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`}
				/>
				<div className='absolute inset-0 bg-grid-white/[0.02] bg-grid-16' />

				<CardContent className='relative h-full p-6 flex flex-col justify-between space-y-4'>
					{/* Header */}
					<div className='space-y-4'>
						<div className='flex justify-between items-start'>
							<div>
								<h3 className='text-lg font-semibold text-white'>{title}</h3>
								<p className='text-sm text-gray-400 mt-1'>{description}</p>
							</div>
							<motion.div className='p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
								{React.cloneElement(icon as React.ReactElement)}
							</motion.div>
						</div>

						{/* Stats Grid */}
						{stats && (
							<div className='grid grid-cols-2 gap-3'>
								{stats.map((stat, index) => (
									<div
										key={index}
										className='bg-black/30 rounded-xl p-3 border border-white/[0.08] backdrop-blur-sm'
									>
										<div className='text-neutral-400 text-xs font-medium'>
											{stat.label}
										</div>
										<div
											className={cn(
												'text-white font-bold mt-1 text-lg',
												stat.color
											)}
										>
											{typeof stat.value === 'number'
												? formatCompactNumber(stat.value)
												: stat.value}
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Footer */}
					<footer className='flex justify-between items-center pt-2'>
						<div className='flex items-center gap-3'>
							<div className='flex -space-x-2'>
								{[...Array(3)].map((_, i) => (
									<div
										key={i}
										className='w-6 h-6 rounded-full border-2 border-gray-900 bg-gray-800'
									/>
								))}
							</div>
							<span className='text-sm text-gray-400'>+124 players</span>
						</div>
						<motion.button className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors'>
							<span className='text-sm text-white/70'>View Stats</span>
							<ArrowUpRight size={14} className='text-white/70' />
						</motion.button>
					</footer>
				</CardContent>

				{/* Disabled Overlay */}
				{disabled && (
					<div className='absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center'>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10'
						>
							<Sparkles size={16} className='text-blue-400' />
							<span className='text-neutral-300 font-medium'>Coming Soon</span>
						</motion.div>
					</div>
				)}
			</Card>
		</motion.div>
	</Link>
);
