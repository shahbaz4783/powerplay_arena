'use client';

import { iconMap } from '@/src/constants/challenges';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';

interface AwardProps {
	title: string;
	description: string;
	awardId: string;
	createdAt: Date;
}

const awardTypes = {
	blitz: { color: 'from-blue-300 to-blue-500', textColor: 'text-blue-300' },
	powerplay: {
		color: 'from-green-300 to-green-500',
		textColor: 'text-green-300',
	},
	classic: {
		color: 'from-purple-300 to-purple-500',
		textColor: 'text-purple-300',
	},
	total: {
		color: 'from-yellow-300 to-yellow-500',
		textColor: 'text-yellow-300',
	},
};

export function AwardCard({
	title,
	description,
	awardId,
	createdAt,
}: AwardProps) {
	const Icon = iconMap[awardId] || Award;
	const awardType = awardId.split('_')[0] as keyof typeof awardTypes;
	const { color, textColor } = awardTypes[awardType] || awardTypes.total;

	const formatDate = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		};
		return date.toLocaleDateString('en-US', options);
	};

	return (
		<motion.div
			className={`relative bg-gradient-to-br ${color} rounded-xl p-1 shadow-lg overflow-hidden`}
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			whileTap={{ scale: 0.95 }}
		>
			<div className='bg-gradient-to-br overflow-hidden from-slate-900 to-stone-800 rounded-xl p-6 h-full'>
				<motion.div
					className={`absolute top-0 left-0 bg-gradient-to-br ${color} rounded-full p-2 shadow-lg`}
					initial={{ rotate: -45, scale: 0 }}
					animate={{ rotate: 0, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
				>
					<Icon className='text-slate-900 w-6 h-6' />
				</motion.div>
				<motion.h3
					className={`text-2xl font-bold ${textColor} mb-3 mt-4`}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					{title}
				</motion.h3>
				<motion.p
					className='text-slate-300 text-sm mb-4'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				>
					{description}
				</motion.p>
				<motion.div
					className='flex justify-between items-center mt-4 pt-4 border-t border-slate-700'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<div>
						<div className='flex items-center text-slate-400 text-sm mb-1'>
							<Calendar className='w-4 h-4 mr-2' />
							<span className='font-semibold'>Claimed on:</span>
						</div>
						<div className='text-slate-300 text-sm pl-6'>
							{formatDate(createdAt)}
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}
