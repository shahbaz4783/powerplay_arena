'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserInventory, useUserProgress } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { Progress } from '@/src/components/ui/progress';
import { token } from '@/src/constants/app-config';
import { Coins, Zap, Star, Award, Crown, Sparkles } from 'lucide-react';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { ErrorComponent } from '../feedback/error-ui';
import { InfoCard } from '../../common/cards/info-card';
import { GradientBorder } from '../../common/elements/gradient-border';

const MAX_LEVEL = 10;

export function ProfileSummary() {
	const initData = useInitData();
	const user = initData?.user;
	const { telegramId } = useCurrentUser();
	const {
		data: inventory,
		isLoading,
		isError,
		error,
	} = useUserInventory(telegramId);
	const { data: userProgress } = useUserProgress(telegramId);

	if (isError) return <ErrorComponent error={error} />;

	const totalXP = userProgress?.totalXP ?? 0;
	const xpForLevelUp = userProgress?.xpForNextLevel ?? 0;
	const xpForNextLevel = xpForLevelUp - totalXP;
	const currentLevel = userProgress?.level ?? 0;
	const isMaxLevel = currentLevel >= MAX_LEVEL;
	const progressPercentage = Math.round((totalXP / xpForLevelUp) * 100);

	const getLevelIcon = (level: number) => {
		if (level < 5) return <Star className='h-8 w-8 text-yellow-400' />;
		if (level < 10) return <Award className='h-8 w-8 text-blue-400' />;
		return <Crown className='h-8 w-8 text-purple-400' />;
	};

	return (
		<GradientBorder>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='relative rounded-2xl'
			>
				<div className='relative space-y-6'>
					{/* Profile Header */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<motion.div
								whileHover={{ scale: 1.05, rotate: 5 }}
								className='relative rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 p-3'
							>
								<div className='absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-md' />
								<div className='relative'>{getLevelIcon(currentLevel)}</div>
							</motion.div>

							<div>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='relative'
								>
									<h2 className='text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent'>
										{user?.firstName ?? 'Guest User'}
									</h2>
									{isLoading ? (
										<Skeleton className='h-4 w-24 bg-gray-700' />
									) : (
										<div className='flex items-center space-x-2 mt-1'>
											<Sparkles className='h-4 w-4 text-yellow-400' />
											<p className='text-sm font-medium bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent'>
												Level {currentLevel}
											</p>
											<span className='text-gray-500'>•</span>
											<p className='text-sm font-medium text-gray-300'>
												{userProgress?.levelName}
											</p>
										</div>
									)}
								</motion.div>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className='grid grid-cols-2 gap-4'>
						<InfoCard
							icon={<Coins />}
							title={token.name}
							amount={inventory?.powerCoin ?? 0}
							color='yellow'
						/>
						<InfoCard
							icon={<Zap />}
							title={token.pass}
							amount={inventory?.powerPass ?? 0}
							color='yellow'
						/>
					</div>

					{/* Progress Section */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={isMaxLevel ? 'max' : 'progress'}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className='space-y-3 rounded-xl p-3 border'
						>
							{isMaxLevel ? (
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-3'>
										<div className='rounded-lg bg-yellow-500/20 p-2'>
											<Crown className='h-5 w-5 text-yellow-400' />
										</div>
										<span className='text-lg font-bold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent'>
											Maximum Level Achieved!
										</span>
									</div>
									<span className='text-sm text-gray-400'>
										Total XP: {totalXP.toLocaleString()}
									</span>
								</div>
							) : (
								<>
									<div className='flex justify-between text-sm'>
										<span className='text-gray-300 font-medium'>
											Progress to Next Level
										</span>
										<span className='text-gray-400'>{progressPercentage}%</span>
									</div>
									{isLoading ? (
										<Skeleton className='h-3 w-full bg-gray-700' />
									) : (
										<div className='relative h-3 w-full overflow-hidden rounded-full bg-gray-800/50'>
											
											<Progress value={progressPercentage} />
										</div>
									)}
									<div className='flex justify-between text-xs'>
										<span className='text-gray-400'>
											Total XP: {totalXP.toLocaleString()}
										</span>
										<span className='text-gray-400'>
											{xpForNextLevel.toLocaleString()} XP to level{' '}
											{currentLevel + 1}
										</span>
									</div>
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
		</GradientBorder>
	);
}
