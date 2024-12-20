'use client';

import { useGetUserBettingStats } from '@/src/hooks/useUserData';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	BarChart,
	Bar,
	XAxis,
	YAxis,
} from 'recharts';
import {
	CurrencyIcon as CurrencyDollarIcon,
	BarChartIcon as ChartBarIcon,
	TrophyIcon,
	PercentIcon,
	Percent,
} from 'lucide-react';
import { StatCard } from '@/src/components/common/cards/stats-card';

const betTypes = [
	'SAFE_BET',
	'CLASSIC_FLIP',
	'TRIPLE_SHOT',
	'JACKPOT',
] as const;

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0'];

export function BettingStats() {
	const { telegramId } = useCurrentUser();

	const bettingStats = {
		SAFE_BET: useGetUserBettingStats(telegramId, 'SAFE_BET').data,
		CLASSIC_FLIP: useGetUserBettingStats(telegramId, 'CLASSIC_FLIP').data,
		TRIPLE_SHOT: useGetUserBettingStats(telegramId, 'TRIPLE_SHOT').data,
		JACKPOT: useGetUserBettingStats(telegramId, 'JACKPOT').data,
	};

	const renderPieChart = (data: any) => {
		if (!data || data.betsPlaced === 0) return null;

		const chartData = [
			{ name: 'Won', value: data.betsWon },
			{ name: 'Lost', value: data.betsPlaced - data.betsWon },
		];

		return (
			<ResponsiveContainer width='100%' height={150}>
				<PieChart>
					<Pie
						data={chartData}
						cx='50%'
						cy='50%'
						innerRadius={40}
						outerRadius={60}
						paddingAngle={5}
						dataKey='value'
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		);
	};

	const renderBarChart = (data: any) => {
		if (!data || data.betsPlaced === 0) return null;

		const chartData = [
			{ name: 'Total Bets', value: data.betsPlaced },
			{ name: 'Bets Won', value: data.betsWon },
			{ name: 'Earnings', value: data.totalEarning },
		];

		return (
			<ResponsiveContainer width='100%' height={150}>
				<BarChart data={chartData}>
					<XAxis dataKey='name' tick={{ fill: '#A0AEC0' }} />
					<YAxis tick={{ fill: '#A0AEC0' }} />
					<Tooltip />
					<Bar dataKey='value' fill='#4FD1C5' />
				</BarChart>
			</ResponsiveContainer>
		);
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='space-y-6 bg-gray-900 rounded-xl p-6 shadow-xl'
		>
			<h2 className='text-xl font-semibold text-white tracking-wide mb-6 bg-gradient-to-r from-sky-900 to-slate-800 p-3 rounded-xl'>
				Your Betting Performance
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				{betTypes.map((betType, index) => {
					const data = bettingStats[betType];
					const winPercentage = data?.betsPlaced
						? ((data.betsWon / data.betsPlaced) * 100).toFixed(2)
						: '0';

					return (
						<Card
							key={index}
							className=' border-gray-700 rounded-xl overflow-hidden'
						>
							<CardTitle className='p-4 text-center text-lg font-bold'>
								{betType.replace(/_/g, ' ')}
							</CardTitle>
							<CardContent className='p-4'>
								{data && data.betsPlaced > 0 ? (
									<>{renderPieChart(data)}</>
								) : (
									<div className='text-center text-gray-400 py-8'>
										No betting data available
									</div>
								)}
								<section className='col-span-2 bg-yellow-900/30 rounded-xl p-4 flex justify-between items-center'>
									<div className='flex items-center space-x-3'>
										<TrophyIcon className='w-8 h-8 text-yellow-400' />
										<span className='text-sm font-mono text-yellow-300'>
											Win Rate
										</span>
									</div>
									<div className='flex items-center text-2xl font-bold font-mono text-yellow-400 glow'>
										<span className=''>{winPercentage}</span>
										<Percent />
									</div>
								</section>
								<div className='grid grid-cols-2 gap-4 mt-4'>
									<StatCard title='Total Bets' value={data?.betsPlaced ?? 0} />
									<StatCard title='Bets Won' value={data?.betsWon ?? 0} />
									<StatCard title='Earnings' value={data?.totalEarning ?? 0} />
									<StatCard title='Invested' value={data?.totalWagered ?? 0} />
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</motion.section>
	);
}
