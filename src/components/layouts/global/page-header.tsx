'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
	title: string;
	description?: string;
	icon?: React.ReactNode;
	bgGradient?: string;
	showBack?: boolean;
	children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	icon,
	showBack = true,
	bgGradient,
	children,
}) => {
	const router = useRouter();

	const defaultGradient = 'from-gray-900 via-gray-800/50 to-gray-900';
	const gradient = bgGradient || defaultGradient;

	return (
		<div className='relative backdrop-blur-sm rounded-2xl overflow-hidden text-slate-200'>
			<div
				className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-50`}
			/>
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent)]' />

			<div className='relative px-4 py-6'>
				<div className='flex items-center gap-4 mb-1'>
					{showBack && (
						<motion.button
							whileTap={{ scale: 0.94 }}
							onClick={() => router.back()}
							className='p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors'
						>
							<ChevronLeft className='w-5 h-5 text-white/70' />
						</motion.button>
					)}

					{icon && (
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							className='p-2.5 rounded-xl bg-white/5 border border-white/10'
						>
							{React.cloneElement(icon as React.ReactElement)}
						</motion.div>
					)}

					<div className='flex-1 min-w-0'>
						<h1 className='text-2xl font-bold text-white tracking-tight truncate'>
							{title}
						</h1>
						{description && (
							<p className='text-sm text-white/60 mt-0.5'>{description}</p>
						)}
					</div>
				</div>

				{children && <div className='mt-4'>{children}</div>}
			</div>
		</div>
	);
};

// Preset gradients for different sections
export const headerGradients = {
	shop: 'from-emerald-500/20 via-teal-500/20 to-emerald-500/20',
	wallet: 'from-amber-500/20 via-orange-500/20 to-amber-500/20',
	achievements: 'from-blue-500/20 via-indigo-500/20 to-blue-500/20',
	stats: 'from-purple-500/20 via-violet-500/20 to-purple-500/20',
	transactions: 'from-rose-500/20 via-pink-500/20 to-rose-500/20',
};

export { PageHeader };