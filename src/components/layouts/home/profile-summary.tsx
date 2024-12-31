'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUserInventory, useUserProgress } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { Progress } from '@/src/components/ui/progress';
import { token } from '@/src/constants/app-config';
import { Coins, Zap, Star, Award, Crown } from 'lucide-react';
import { Skeleton } from '@/src/components/ui/skeleton';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { InfoCard } from '../../common/cards/info-card';
import { GradientBorder } from '../../common/elements/gradient-border';
import { ErrorComponent } from '../feedback/error-ui';

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

	if (isError) {
		return <ErrorComponent error={error} />;
	}

	const totalXP = userProgress?.totalXP ?? 0;
	const xpForLevelUp = userProgress?.xpForNextLevel ?? 0;
	const xpForNextLevel = xpForLevelUp - totalXP;
	const currentLevel = userProgress?.level ?? 0;
	const isMaxLevel = currentLevel >= MAX_LEVEL;

	const getLevelIcon = (level: number) => {
		if (level < 5) return <Star className='h-6 w-6 text-yellow-400' />;
		if (level < 10) return <Award className='h-6 w-6 text-blue-400' />;
		return <Crown className='h-6 w-6 text-purple-400' />;
	};

	const MaxLevelIndicator = () => (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className='flex items-center p-2 justify-between rounded-lg'
		>
			<div className='flex items-center'>
				<Crown className='h-5 w-5 text-yellow-400 mr-2' />
				<span className='text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-400'>
					Max Level
				</span>
			</div>
			<span className='text font-exo2 font-medium text-gray-300'>
				<span className='text-xs font-poppins '>Total XP:</span>{' '}
				{totalXP.toLocaleString()}
			</span>
		</motion.div>
	);

	return (
		<GradientBorder className='overflow-hidden backdrop-blur-sm rounded-xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-900/80 shadow-xl'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='relative space-y-3'
			>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2'>
							{getLevelIcon(currentLevel)}
						</div>
						<div>
							<h2 className='text-2xl font-bold text-white'>
								{user?.firstName ?? 'Guest User'}
							</h2>
							{isLoading ? (
								<Skeleton className='h-4 w-24 bg-gray-700' />
							) : (
								<div className='flex items-center space-x-2'>
									<p className='text-sm font-medium text-yellow-400/80'>
										Level {currentLevel}
									</p>
									<span className='text-xs text-gray-400'>•</span>
									<p className='text-sm font-medium text-gray-300'>
										{userProgress?.levelName}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<InfoCard
						icon={<Coins />}
						title={token.name}
						amount={inventory?.powerCoin!}
						color='blue'
					/>
					<InfoCard
						icon={<Zap />}
						title={token.pass}
						amount={inventory?.powerPass!}
						color='blue'
					/>
				</div>

				<div className='space-y-2 sub-card'>
					{isMaxLevel ? (
						<MaxLevelIndicator />
					) : (
						<>
							<div className='flex justify-between text-sm text-gray-400'>
								<span>Progress to Next Level</span>
								<span>{Math.round((totalXP / xpForLevelUp) * 100)}%</span>
							</div>
							{isLoading ? (
								<Skeleton className='h-2 w-full bg-gray-700' />
							) : (
								<Progress
									value={(totalXP / xpForLevelUp) * 100}
									className='h-2 bg-gray-700'
								/>
							)}
							<div className='flex justify-between text-xs text-gray-500'>
								<span>Total XP: {totalXP.toLocaleString()}</span>
								<span>
									{xpForNextLevel.toLocaleString()} XP to level{' '}
									{currentLevel + 1}
								</span>
							</div>
						</>
					)}
				</div>
			</motion.div>
		</GradientBorder>
	);
}
