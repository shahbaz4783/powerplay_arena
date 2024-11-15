'use client';

import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface HeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
	showBackButton?: boolean;
}

export function Header({
	title,
	subtitle,
	className,
	showBackButton = true,
}: HeaderProps) {
	const router = useRouter();
	const [showInfo, setShowInfo] = useState(false);

	return (
		<header
			className={cn(
				'relative p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg overflow-hidden',
				className
			)}
		>
			<motion.div
				className='absolute inset-0 opacity-30'
				initial={{ backgroundPosition: '0% 0%' }}
				animate={{ backgroundPosition: '100% 100%' }}
				transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
				style={{
					backgroundImage:
						'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			/>

			<div className='relative z-10'>
				<div className='flex justify-between items-center'>
					{showBackButton ? (
						<motion.button
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3 }}
							onClick={() => router.back()}
							whileTap={{ scale: 0.95 }}
							className='text-gray-400 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2'
						>
							<ChevronLeft className='w-5 h-5' />
						</motion.button>
					) : (
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={() => setShowInfo(!showInfo)}
							className='text-gray-400 bg-slate-700 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2'
						>
							<Info className='w-5 h-5' />
						</motion.button>
					)}

					<motion.div
						className='flex items-center space-x-2'
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5, type: 'spring' }}
					>
						<Sparkles className='w-5 h-5 text-blue-400' />
						<h1 className='text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
							{title}
						</h1>
					</motion.div>
				</div>

				<AnimatePresence>
					{(subtitle || showInfo) && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className='mt-2 text-right'
						>
							<p className='text-xs sm:text-sm text-gray-400 w-3/4 ml-auto'>
								{showInfo
									? "Here's some additional info about this page."
									: subtitle}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 0.5, delay: 0.3 }}
			/>
		</header>
	);
}
