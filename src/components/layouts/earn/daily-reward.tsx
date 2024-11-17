'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useInitData } from '@telegram-apps/sdk-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Calendar,
	Clock,
	Award,
	Zap,
	Gift,
	Coins,
	TrendingUp,
} from 'lucide-react';
import { Progress } from '@/src/components/ui/progress';
import { dailyDrop } from '@/src/actions/tasks.action';
import { useUserProfile } from '@/src/hooks/useUserData';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { SubmitButton } from '../../common/buttons/submit-button';

export function DailyReward() {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);

	const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
		message: {},
	});

	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const rewardTiers = [
		{ day: 1, coins: '20-50', powerPass: '0' },
		{ day: 3, coins: '50-100', powerPass: '10-15' },
		{ day: 5, coins: '100-200', powerPass: '0' },
		{ day: 7, coins: '200-500', powerPass: '20-30' },
	];

	const weeklyBoost = 5;

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

	const calculateBoostedReward = (reward: string) => {
		const [min, max] = reward.split('-').map(Number);
		const boost = 1 + (weeklyStreak * weeklyBoost) / 100;
		return `${Math.floor(min * boost)}-${Math.floor(max * boost)}`;
	};

	return (
		<Card className='w-full max-w-md mx-auto overflow-hidden rounded-xl bg-gray-900 text-gray-100'>
			<CardHeader className='text-center bg-gradient-to-r from-gray-800 to-gray-900 py-6'>
				<CardTitle className='text-2xl font-bold'>
					{rewardClaimed
						? 'Daily Reward Claimed!'
						: 'Reward is Ready to Claim!'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2'>
						<Calendar className='text-blue-400 h-5 w-5' />
						<span className='font-semibold'>
							Streak: {streak} day{streak !== 1 ? 's' : ''}
						</span>
					</div>
					<div className='flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2'>
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
							className='h-full bg-blue-500'
							style={{ width: `${(streak / 7) * 100}%` }}
						/>
					</Progress>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					{rewardTiers.map((tier) => (
						<Dialog key={tier.day}>
							<DialogTrigger asChild>
								<motion.div
									className={`p-4 rounded-xl ${
										streak >= tier.day
											? 'bg-gray-700 cursor-pointer'
											: 'bg-gray-800 opacity-50'
									} text-center`}
									whileTap={streak >= tier.day ? { scale: 0.95 } : {}}
								>
									<Gift className='h-8 w-8 mx-auto mb-2 text-yellow-400' />
									<div className='font-semibold text-lg'>Day {tier.day}</div>
									<div className='flex items-center justify-center space-x-1 mt-2'>
										<Coins className='h-4 w-4 text-yellow-400' />
										<span className='text-sm'>{tier.coins}</span>
									</div>
									{tier.powerPass !== '0' && (
										<div className='flex items-center justify-center space-x-1 mt-1'>
											<Zap className='h-4 w-4 text-blue-400' />
											<span className='text-sm'>{tier.powerPass} Pass</span>
										</div>
									)}
								</motion.div>
							</DialogTrigger>
							<DialogContent className='bg-gray-800 text-gray-100 w-11/12 rounded-xl'>
								<DialogHeader>
									<DialogTitle className='text-2xl font-bold'>
										Day {tier.day} Reward
									</DialogTitle>
								</DialogHeader>
								<div className='space-y-4'>
									<div className='bg-gray-700 p-4 rounded-lg'>
										<h3 className='text-lg font-semibold mb-2'>Base Reward</h3>
										<div className='flex items-center space-x-2'>
											<Coins className='h-5 w-5 text-yellow-400' />
											<span>{tier.coins} coins</span>
										</div>
										{tier.powerPass !== '0' && (
											<div className='flex items-center space-x-2 mt-1'>
												<Zap className='h-5 w-5 text-blue-400' />
												<span>{tier.powerPass} Power Pass</span>
											</div>
										)}
									</div>
									{weeklyStreak > 0 && (
										<div className='bg-gray-700 p-4 rounded-lg'>
											<h3 className='text-lg font-semibold mb-2'>
												Boosted Reward
											</h3>
											<div className='flex items-center space-x-2'>
												<Coins className='h-5 w-5 text-yellow-400' />
												<span>{calculateBoostedReward(tier.coins)} coins</span>
											</div>
											{tier.powerPass !== '0' && (
												<div className='flex items-center space-x-2 mt-1'>
													<Zap className='h-5 w-5 text-blue-400' />
													<span>
														{calculateBoostedReward(tier.powerPass)} Power Pass
													</span>
												</div>
											)}
										</div>
									)}
								</div>
							</DialogContent>
						</Dialog>
					))}
				</div>

				<div className='bg-gray-800 p-4 rounded-lg flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<TrendingUp className='h-5 w-5 text-green-400' />
						<span className='font-semibold'>Weekly Boost</span>
					</div>
					<span className='text-green-400 font-bold'>
						{weeklyStreak * weeklyBoost}%
					</span>
				</div>

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
