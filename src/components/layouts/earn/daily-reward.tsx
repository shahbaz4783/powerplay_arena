'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useInitData } from '@telegram-apps/sdk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Award, Zap, Gift, ChevronRight } from 'lucide-react';
import { Progress } from '@/src/components/ui/progress';
import { dailyDrop } from '@/src/actions/tasks.action';
import { useUserProfile } from '@/src/hooks/useUserData';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/src/components/ui/tooltip';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';

export function DailyReward() {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);

	const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
		message: {},
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const rewardTiers = [
		{ day: 1, reward: '10-50', icon: Gift },
		{ day: 3, reward: '50-100', icon: Gift },
		{ day: 5, reward: '100-200', icon: Gift },
		{ day: 7, reward: '200-500', icon: Gift },
	];

	const grandRewards = [
		{ week: 2, coins: '2000', pass: 1 },
		{ week: 4, coins: '4000', pass: 1 },
		{ week: 8, coins: '8000', pass: 1 },
		{ week: 16, coins: '16000', pass: 1 },
	];

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
		<Card className='w-full max-w-md mx-auto overflow-hidden'>
			<CardHeader className='text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-primary-foreground'>
				<CardTitle className='text-2xl font-bold'>
					{rewardClaimed ? 'Daily Reward Claimed!' : 'Claim Your Daily Reward'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2'>
						<Calendar className='text-primary h-5 w-5' />
						<span className='font-semibold'>
							Streak: {streak} day{streak !== 1 ? 's' : ''}
						</span>
					</div>
					<div className='flex items-center space-x-2 bg-yellow-500/10 rounded-full px-4 py-2'>
						<Award className='text-yellow-500 h-5 w-5' />
						<span className='font-semibold'>Week: {weeklyStreak}</span>
					</div>
				</div>

				<div className='space-y-2'>
					<div className='flex justify-between text-sm'>
						<span>Streak Progress</span>
						<span>{streak}/7 days</span>
					</div>
					<Progress value={(streak / 7) * 100} className='h-2' />
				</div>

				<div className='space-y-4'>
					<h4 className='text-lg font-semibold'>Daily Rewards</h4>
					<div className='grid grid-cols-4 gap-3'>
						{rewardTiers.map((tier) => (
							<TooltipProvider key={tier.day}>
								<Tooltip>
									<TooltipTrigger asChild>
										<motion.div
											className={`p-3 rounded-xl ${
												streak >= tier.day ? 'bg-primary' : 'bg-secondary'
											} text-center cursor-pointer`}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<tier.icon
												className={`h-6 w-6 mx-auto ${
													streak >= tier.day
														? 'text-primary-foreground'
														: 'text-primary'
												}`}
											/>
											<div
												className={`font-semibold mt-1 ${
													streak >= tier.day
														? 'text-primary-foreground'
														: 'text-primary'
												}`}
											>
												Day {tier.day}
											</div>
										</motion.div>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tier.reward} coins</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							variant='outline'
							className='w-full flex justify-between items-center'
							onClick={() => setIsDialogOpen(true)}
						>
							<span>View Grand Rewards</span>
							<ChevronRight className='h-4 w-4' />
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Grand Rewards</DialogTitle>
						</DialogHeader>
						<div className='grid grid-cols-2 gap-4 mt-4'>
							{grandRewards.map((reward, index) => (
								<motion.div
									key={reward.week}
									className={`p-4 rounded-xl ${
										weeklyStreak >= reward.week
											? 'bg-gradient-to-br from-yellow-400 to-orange-500'
											: 'bg-secondary'
									} text-center`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<div className='font-bold text-lg mb-2'>
										Week {reward.week}
									</div>
									<div className='flex justify-center items-center space-x-2'>
										<Zap className='h-5 w-5' />
										<span>{reward.coins} coins</span>
									</div>
									<div className='flex justify-center items-center space-x-2 mt-1'>
										<Award className='h-5 w-5' />
										<span>{reward.pass} Power Pass</span>
									</div>
								</motion.div>
							))}
						</div>
					</DialogContent>
				</Dialog>

				<div className='flex items-center justify-center space-x-2 text-muted-foreground'>
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
						<Button
							type='submit'
							className='w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-primary-foreground font-semibold py-6 text-lg'
						>
							{response.message ? 'Claim Again' : 'Claim Reward'}
						</Button>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
