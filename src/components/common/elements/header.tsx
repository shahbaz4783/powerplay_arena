'use client';

import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

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

	return (
		<header
			className={cn(
				'relative p-6 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg overflow-hidden',
				className
			)}
		>
			<motion.div
				className='absolute inset-0 opacity-50'
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
							className='text-gray-400 bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1'
						>
							<ChevronLeft className='w-6 h-6' />
						</motion.button>
					) : (
						<Info />
					)}

					<motion.div
						className='flex items-center space-x-2'
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, type: 'spring' }}
					>
						<h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
							{title}
						</h1>
					</motion.div>
				</div>

				{subtitle && (
					<motion.p
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='text-xs mt-1 text-gray-400 max-w-md text-right mx-auto'
					>
						{subtitle}
					</motion.p>
				)}
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
