import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Info, X } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/src/components/ui/dialog';

interface WeeklyBoostProps {
	weeklyStreak: number;
}

export function WeeklyBoost({ weeklyStreak }: WeeklyBoostProps) {
	const weeklyBoost = 5;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					className='bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl shadow-lg flex items-center justify-between cursor-pointer'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<div className='flex items-center space-x-2'>
						<TrendingUp className='h-5 w-5 text-green-400' />
						<span className='font-semibold'>Weekly Boost</span>
					</div>
					<div className='flex items-center space-x-2'>
						<span className='text-green-400 font-bold'>
							{weeklyStreak * weeklyBoost}%
						</span>
						<Info className='h-4 w-4 text-gray-400' />
					</div>
				</motion.div>
			</DialogTrigger>
			<DialogContent className='bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 w-11/12 max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden'>
				<div className='bg-gradient-to-r from-green-600 to-teal-600'>
					<div className='flex items-center justify-center'>
						<TrendingUp className='h-24 w-24 text-white' />
					</div>
				</div>
				<div className='p-6'>
					<DialogHeader>
						<DialogTitle className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400'>
							Weekly Boost
						</DialogTitle>
					</DialogHeader>
					<div className='mt-6 space-y-4'>
						<p className='text-gray-300 text-sm'>
							Claim your daily reward for 7 consecutive days to unlock a weekly
							boost! Each completed week increases your base rewards by 5%.
						</p>
						<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl shadow-inner'>
							<h3 className='text-xl font-semibold mb-2 text-green-400'>
								Current Boost
							</h3>
							<div className='flex items-center justify-between'>
								<span>Week {weeklyStreak}</span>
								<span className='text-2xl font-bold text-green-400'>
									+{weeklyStreak * weeklyBoost}%
								</span>
							</div>
						</div>
						<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl shadow-inner'>
							<h3 className='text-xl font-semibold mb-2 text-blue-400'>
								Next Boost
							</h3>
							<div className='flex items-center justify-between'>
								<span>Week {weeklyStreak + 1}</span>
								<span className='text-2xl font-bold text-blue-400'>
									+{(weeklyStreak + 1) * weeklyBoost}%
								</span>
							</div>
						</div>
						<p className='text-sm text-gray-400 italic'>
							Keep your streak going to maximize your rewards!
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
