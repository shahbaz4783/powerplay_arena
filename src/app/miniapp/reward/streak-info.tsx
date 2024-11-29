import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { Progress } from '@/src/components/ui/progress';

interface StreakInfoProps {
	streak: number;
	weeklyStreak: number;
}

export function StreakInfo({ streak, weeklyStreak }: StreakInfoProps) {
	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 shadow-lg'>
					<Calendar className='text-blue-400 h-5 w-5' />
					<span className='font-semibold'>
						Streak: {streak} day{streak !== 1 ? 's' : ''}
					</span>
				</div>
				<div className='flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 shadow-lg'>
					<Award className='text-yellow-400 h-5 w-5' />
					<span className='font-semibold'>Week: {weeklyStreak}</span>
				</div>
			</div>

			<div className='space-y-2'>
				<div className='flex justify-between text-sm'>
					<span>Streak Progress</span>
					<span>{streak}/7 days</span>
				</div>
				<Progress value={(streak / 7) * 100} className='h-2 bg-gray-700'>
					<div
						className='h-full bg-gradient-to-r from-blue-500 to-purple-500'
						style={{ width: `${(streak / 7) * 100}%` }}
					/>
				</Progress>
			</div>
		</div>
	);
}
