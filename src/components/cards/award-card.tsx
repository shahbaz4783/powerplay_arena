'use client';

import { iconMap } from '@/src/constants/challenges';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface AwardProps {
	title: string;
	description: string;
	userId: bigint;
	awardId: string;
}

export function AwardCard({ title, description, awardId }: AwardProps) {
	const Icon = iconMap[awardId] || Award;

	return (
		<motion.div
			className='bg-gradient-to-br from-slate-900 to-stone-800 border border-slate-700 rounded-xl p-6 shadow-lg'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				className='flex items-center justify-between mb-4'
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<Icon className='text-yellow-300 w-10 h-10' />
				<motion.div
					className='text-yellow-300 font-bold'
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				></motion.div>
			</motion.div>
			<motion.h3
				className='text-xl font-bold text-white mb-2'
				initial={{ x: -20 }}
				animate={{ x: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				{title}
			</motion.h3>
			<motion.p
				className='text-slate-300'
				initial={{ x: -20 }}
				animate={{ x: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				{description}
			</motion.p>
		</motion.div>
	);
}
