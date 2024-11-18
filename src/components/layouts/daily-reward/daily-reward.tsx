'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useInitData } from '@telegram-apps/sdk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { dailyDrop } from '@/src/actions/tasks.action';
import { useUserProfile } from '@/src/hooks/useUserData';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { SubmitButton } from '@/src/components/common/buttons/submit-button';
import { StreakInfo } from './streak-info';
import { RewardGrid } from './reward-grid';
import { WeeklyBoost } from './weekly-boost';

export function DailyReward() {
	const initData = useInitData();
	const user = initData?.user;
	const { data } = useUserProfile(user?.id);
	const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
		message: {},
	});

	const streak = data?.userProfile.streakLength || 0;
	const weeklyStreak = data?.userProfile.weeklyStreak || 0;
	const lastClaimed = data?.userProfile.lastClaimedAt
		? new Date(data.userProfile.lastClaimedAt)
		: null;

	const isRewardClaimed = () => {
		if (!lastClaimed) return false;
		const now = new Date();
		const lastClaimedUTC = new Date(
			Date.UTC(
				lastClaimed.getUTCFullYear(),
				lastClaimed.getUTCMonth(),
				lastClaimed.getUTCDate()
			)
		);
		const nowUTC = new Date(
			Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
		);
		return lastClaimedUTC.getTime() === nowUTC.getTime();
	};

	const getTimeUntilNextReward = () => {
		const now = new Date();
		const utcMidnight = new Date(
			Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
		);
		const timeLeft = utcMidnight.getTime() - now.getTime();
		const hours = Math.floor(timeLeft / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}h ${minutes}m`;
	};

	const rewardClaimed = isRewardClaimed();

	return (
		<Card className='w-full max-w-2xl mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 shadow-xl'>
			<CardHeader className='text-center bg-gradient-to-r from-indigo-600 to-purple-600 py-6'>
				<CardTitle className='text-3xl font-bold'>
					{rewardClaimed ? 'Daily Reward Claimed!' : 'Reward is Ready!'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				<StreakInfo streak={streak} weeklyStreak={weeklyStreak} />
				<RewardGrid streak={streak} weeklyStreak={weeklyStreak} />
				<WeeklyBoost weeklyStreak={weeklyStreak} />

				<div className='flex items-center justify-center space-x-2 text-gray-400'>
					<Clock size={16} />
					<span className='text-sm'>
						{rewardClaimed
							? `Next reward in: ${getTimeUntilNextReward()}`
							: 'You can claim your reward now!'}
					</span>
				</div>

				<AnimatePresence>
					{(response.message.error || response.message.success) && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='text-center'
						>
							{response.message.error && (
								<p className='text-red-500'>{response.message.error}</p>
							)}
							{response.message.success && (
								<p className='text-green-500'>{response.message.success}</p>
							)}
						</motion.div>
					)}
				</AnimatePresence>

				<form className='w-full' action={action}>
					{!rewardClaimed && (
						<SubmitButton title='Claim Now' loadingTitle='Claiming' />
					)}
				</form>
			</CardContent>
		</Card>
	);
}
