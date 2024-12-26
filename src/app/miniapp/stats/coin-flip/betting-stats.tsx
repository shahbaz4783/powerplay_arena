'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Target, TrendingUp, Trophy } from 'lucide-react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useGetUserBettingStats } from '@/src/hooks/useUserData';
import { InfoCard } from '@/src/components/common/cards/info-card';
import { PageHeader } from '@/src/components/layouts/global/page-header';
import { Card, CardContent } from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import StatsCard from './stats-card';
import { BetType } from '@prisma/client';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
const betTypes: BetType[] = [
	'SAFE_BET',
	'CLASSIC_FLIP',
	'TRIPLE_SHOT',
	'JACKPOT',
];

export function FortuneFlipStats() {
	const { telegramId } = useCurrentUser();

	const safeBetStats = useGetUserBettingStats(telegramId, 'SAFE_BET');
	const classicFlipStats = useGetUserBettingStats(telegramId, 'CLASSIC_FLIP');
	const tripleShotStats = useGetUserBettingStats(telegramId, 'TRIPLE_SHOT');
	const jackpotStats = useGetUserBettingStats(telegramId, 'JACKPOT');

	const statsData = [
		safeBetStats,
		classicFlipStats,
		tripleShotStats,
		jackpotStats,
	];

	const totalEarnings = statsData.reduce(
		(sum, { data }) => sum + (data?.totalEarning || 0),
		0
	);
	const totalBets = statsData.reduce(
		(sum, { data }) => sum + (data?.betsPlaced || 0),
		0
	);
	const totalWins = statsData.reduce(
		(sum, { data }) => sum + (data?.betsWon || 0),
		0
	);

	const pieData = statsData
		.map(({ data }, index) => ({
			name: betTypes[index]
				.split('_')
				.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
				.join(' '),
			value: data?.betsPlaced || 0,
		}))
		.filter((item) => item.value > 0);

	const LoadingOverview = () => (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
			{[...Array(4)].map((_, i) => (
				<Skeleton key={i} className='h-24 bg-slate-800 rounded-xl' />
			))}
		</div>
	);

	const isLoading = statsData.some(({ isLoading }) => isLoading);

	return (
		<div className='space-y-5'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<PageHeader
					title='Fortune Flip Dashboard'
					description='Track your betting performance and statistics'
				/>
			</motion.div>

			{isLoading ? (
				<LoadingOverview />
			) : (
				<div className='grid grid-cols-2 sub-card backdrop-blur-sm gap-3'>
					<InfoCard
						icon={<Target className='w-5 h-5' />}
						title='Total Bets'
						amount={totalBets}
						color='blue'
					/>
					<InfoCard
						icon={<Trophy className='w-5 h-5' />}
						title='Total Wins'
						amount={totalWins}
						color='green'
					/>
					<InfoCard
						icon={<Coins className='w-5 h-5' />}
						title='Total Earnings'
						amount={totalEarnings}
						color='yellow'
					/>
					<InfoCard
						icon={<TrendingUp className='w-5 h-5' />}
						title='Win Rate'
						amount={`${((totalWins / totalBets) * 100).toFixed(1)}%`}
						color='purple'
					/>
				</div>
			)}

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2 space-y-4'>
					{statsData.map(({ data, error }, index) => {
						if (error) {
							return (
								<Card
									key={`error-${index}`}
									className='bg-red-900/10 border-red-900'
								>
									<CardContent className='p-4 text-red-400'>
										Error loading data for {betTypes[index]}
									</CardContent>
								</Card>
							);
						}
						return data && <StatsCard key={data.id} stats={data} />;
					})}
				</div>

				<div>
					<Card className='bg-gray-900 border-gray-800 h-full'>
						<CardContent className='p-6'>
							<h3 className='text-lg font-semibold mb-4'>Bet Distribution</h3>
							<div className='h-64'>
								<ResponsiveContainer width='100%' height='100%'>
									<PieChart>
										<Pie
											data={pieData}
											cx='50%'
											cy='50%'
											innerRadius={60}
											outerRadius={80}
											paddingAngle={5}
											dataKey='value'
										>
											{pieData.map((_, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</div>
							<div className='mt-4 space-y-2'>
								{pieData.map((entry, index) => (
									<div
										key={`legend-${index}`}
										className='flex items-center gap-2'
									>
										<div
											className='w-3 h-3 rounded-full'
											style={{ backgroundColor: COLORS[index % COLORS.length] }}
										/>
										<span className='text-sm text-gray-400'>{entry.name}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
