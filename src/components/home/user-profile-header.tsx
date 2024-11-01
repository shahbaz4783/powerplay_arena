'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserProfile } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { Progress } from '@/src/components/ui/progress';
import { token } from '@/src/lib/constants';
import { AvatarDialog } from '../dialog/avatar-dialog';
import { Card } from '@/src/components/ui/card';
import { saveOrUpdateUser } from '@/src/actions/user.action';
import { Skeleton } from '../ui/skeleton';

interface UserProfile {
	level: number;
	totalXP: number;
	xpForNextLevel: number;
	levelName: string;
	balance: number;
}

interface UserProfileHookResult {
	data: {
		userProfile: UserProfile | null;
	} | null;
	isLoading: boolean;
}

interface UserStatsProps {
	level: number | undefined;
	balance: number | undefined;
	isLoading: boolean;
	levelName: string | undefined;
	name: string | undefined;
}

interface XPProgressProps {
	totalXP: number | undefined;
	xpForLevelUp: number | undefined;
	xpForNextLevel: number | undefined;
	isLoading: boolean;
}

export function UserProfileHeader() {
	const initData = useInitData();
	const user = initData?.user;

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!user) return;
				await saveOrUpdateUser(user);
			} catch (error) {
				console.error('Error saving/updating user data:', error);
			}
		};
		fetchData();
	}, [user]);

	const { data, isLoading } = useUserProfile(user?.id) as UserProfileHookResult;
	const profile = data?.userProfile;
	const totalXP = profile?.totalXP;
	const xpForLevelUp = profile?.xpForNextLevel;
	const xpForNextLevel = xpForLevelUp! - totalXP!;

	return (
		<Card className='rounded-xl p-4 space-y-5 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg'>
			<motion.div
				className='flex gap-2 items-center justify-between'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<AvatarDialog />
				<UserStats
					isLoading={isLoading}
					level={profile?.level}
					balance={profile?.balance}
					name={user?.firstName}
					levelName={profile?.levelName}
				/>
			</motion.div>

			<XPProgress
				totalXP={totalXP}
				xpForLevelUp={xpForLevelUp}
				xpForNextLevel={xpForNextLevel}
				isLoading={isLoading}
			/>
		</Card>
	);
}

function UserStats({
	level,
	balance,
	name,
	levelName,
	isLoading,
}: UserStatsProps) {
	return (
		<section className='border flex justify-between w-full'>
			<div>
				<h2 className='text-xl font-bold'>{name ?? 'Guest Users'}</h2>
				{isLoading ? (
					<Skeleton className='h-2 mt-1 w-20 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<span className='text-sm text-yellow-300'>{levelName}</span>
				)}
			</div>
			<div className='text-right flex flex-col items-end'>
				{isLoading ? (
					<Skeleton className='h-3 w-16 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<p className='text-sm text-yellow-300'>Level {level}</p>
				)}
				{isLoading ? (
					<Skeleton className='h-3 mt-2 w-20 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<p className='text-xl font-bold'>
						{balance} <span className='text-sm'>{token.symbol}</span>
					</p>
				)}
			</div>
		</section>
	);
}

function XPProgress({
	totalXP,
	xpForLevelUp,
	xpForNextLevel,
	isLoading,
}: XPProgressProps) {
	const progressValue =
		totalXP && xpForLevelUp ? (totalXP / xpForLevelUp) * 100 : 0;

	return (
		<motion.div
			className='space-y-3'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{isLoading ? (
				<Skeleton className='h-2 w-full bg-slate-100 bg-opacity-20 rounded-xl' />
			) : (
				<Progress
					value={progressValue}
					className='w-full h-2 bg-slate-400 bg-opacity-20'
				/>
			)}

			<div className='flex justify-between text-sm'>
				{isLoading ? (
					<Skeleton className='h-3 w-1/6 bg-slate-100 bg-opacity-20 rounded-xl' />
				) : (
					<span>XP: {totalXP ?? 0}</span>
				)}
				{isLoading ? (
					<Skeleton className='h-3 w-1/4 bg-slate-100 bg-opacity-20 rounded-xl' />
				) : (
					<span>Next Level: {xpForNextLevel ?? 0} XP</span>
				)}
			</div>
		</motion.div>
	);
}
