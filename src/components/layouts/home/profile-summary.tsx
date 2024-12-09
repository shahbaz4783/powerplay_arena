'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserInventory, useUserProgress } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { Progress } from '@/src/components/ui/progress';
import { token } from '@/src/constants/app-config';
import { Card } from '@/src/components/ui/card';
import { saveOrUpdateUser } from '@/src/actions/user.action';
import { Coins, Zap } from 'lucide-react';
import { AvatarDialog } from '../../common/dialog/avatar-dialog';
import { Skeleton } from '../../ui/skeleton';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

export function ProfileSummary() {
	const initData = useInitData();
	const user = initData?.user;
	const { telegramId } = useCurrentUser();

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!user) return;
				// await saveOrUpdateUser(user);
			} catch (error) {
				console.error('Error saving/updating user data:', error);
			}
		};
		fetchData();
	}, [user]);

	const { data: inventory, isLoading } = useUserInventory(telegramId);

	const { data: userProgress } = useUserProgress(telegramId);
	const totalXP = userProgress?.totalXP;
	const xpForLevelUp = userProgress?.xpForNextLevel;
	const xpForNextLevel = xpForLevelUp! - totalXP!;

	return (
		<Card className='rounded-xl p-3 space-y-4 bg-gradient-to-r backdrop-blur-lg from-gray-800/50 to-gray-900 shadow-lg'>
			<motion.div
				className='flex gap-2 items-center justify-between'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<AvatarDialog userId={user?.id!} currentAvatar={user?.photoUrl!} />
				<UserStats
					isLoading={isLoading}
					level={userProgress?.level}
					balance={inventory?.powerCoin}
					name={user?.firstName}
					levelName={userProgress?.levelName}
				/>
			</motion.div>
			<motion.div
				className='grid grid-cols-2 gap-4'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<BalanceCard
					icon={<Coins className='w-6 h-6 text-yellow-500' />}
					title={token.name}
					value={inventory?.powerCoin}
					symbol={token.symbol}
					isLoading={isLoading}
				/>
				<BalanceCard
					icon={<Zap className='w-6 h-6 text-blue-400' />}
					title={token.pass}
					value={inventory?.powerPass}
					isLoading={isLoading}
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

interface UserStatsProps {
	level: number | undefined;
	balance: number | undefined;
	isLoading: boolean;
	levelName: string | undefined;
	name: string | undefined;
}

function UserStats({
	level,
	balance,
	name,
	levelName,
	isLoading,
}: UserStatsProps) {
	return (
		<section className='flex justify-between w-full'>
			<div>
				<h2 className='text-xl font-bold'>{name ?? 'Guest Users'}</h2>
				{isLoading ? (
					<Skeleton className='h-3 w-16 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<p className='text-sm text-yellow-300'>Level {level}</p>
				)}
			</div>
			<div className='text-right flex flex-col justify-end items-end'>
				{isLoading ? (
					<Skeleton className='h-2 mt-1 w-20 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<span className='text-sm text-yellow-300'>{levelName}</span>
				)}
			</div>
		</section>
	);
}

interface XPProgressProps {
	totalXP: number | undefined;
	xpForLevelUp: number | undefined;
	xpForNextLevel: number | undefined;
	isLoading: boolean;
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
					className='w-full h-1 bg-slate-400 bg-opacity-20'
				/>
			)}

			<div className='flex justify-between text-sm'>
				{isLoading ? (
					<Skeleton className='h-3 w-1/6 bg-slate-100 bg-opacity-20 rounded-xl' />
				) : (
					<div className='text-xs font-mono text-slate-300'>
						<span>XP:</span> <span>{totalXP}</span>
					</div>
				)}
				{isLoading ? (
					<Skeleton className='h-3 w-1/4 bg-slate-100 bg-opacity-20 rounded-xl' />
				) : (
					<div className='text-xs font-mono text-slate-300'>
						<span>Next Level:</span> <span>{xpForNextLevel}</span>{' '}
						<span>XP</span>
					</div>
				)}
			</div>
		</motion.div>
	);
}

interface BalanceCardProps {
	icon: React.ReactNode;
	title: string;
	value: number | undefined;
	symbol?: string;
	isLoading: boolean;
}

function BalanceCard({
	icon,
	title,
	value,
	symbol,
	isLoading,
}: BalanceCardProps) {
	return (
		<div className='bg-gray-800 rounded-xl border border-slate-700 p-4 flex items-center space-x-3'>
			{icon}
			<div>
				<h3 className='text-sm text-gray-400'>{title}</h3>
				{isLoading ? (
					<Skeleton className='h-3 mt-3 bg-slate-100 bg-opacity-20 rounded-xl' />
				) : (
					<span className={'font-bold text-white'}>{value}</span>
				)}
			</div>
		</div>
	);
}
