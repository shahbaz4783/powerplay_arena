'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	BoltIcon,
	BellIcon,
	TrophyIcon,
	TargetIcon,
	ZapIcon,
	AwardIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/src/components/ui/chart';
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	PieChart,
	Pie,
	Cell,
} from 'recharts';

// Dummy data (unchanged)
const dummyStats = {
	BLITZ: {
		matchesPlayed: 50,
		matchesWon: 30,
		matchesLost: 18,
		matchesTie: 2,
		runsScored: 1500,
		highestRunsScored: 120,
		ballsFaced: 1000,
		sixes: 25,
		fours: 150,
		wicketsTaken: 40,
		runsConceded: 1200,
		lowestRunsConceded: 15,
		highestWicketsTaken: 5,
		ballsBowled: 600,
		hattrick: 1,
		maidenOver: 3,
	},
	POWERPLAY: {
		matchesPlayed: 30,
		matchesWon: 20,
		matchesLost: 8,
		matchesTie: 2,
		runsScored: 1200,
		highestRunsScored: 150,
		ballsFaced: 800,
		sixes: 30,
		fours: 120,
		wicketsTaken: 35,
		runsConceded: 1000,
		lowestRunsConceded: 20,
		highestWicketsTaken: 4,
		ballsBowled: 500,
		hattrick: 0,
		maidenOver: 2,
	},
	CLASSIC: {
		matchesPlayed: 20,
		matchesWon: 12,
		matchesLost: 6,
		matchesTie: 2,
		runsScored: 800,
		highestRunsScored: 180,
		ballsFaced: 600,
		sixes: 15,
		fours: 80,
		wicketsTaken: 25,
		runsConceded: 700,
		lowestRunsConceded: 25,
		highestWicketsTaken: 6,
		ballsBowled: 400,
		hattrick: 1,
		maidenOver: 4,
	},
};

const StatCard: React.FC<{
	title: string;
	value: number | string;
	icon: React.ReactNode;
}> = ({ title, value, icon }) => (
	<Card>
		<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
			<CardTitle className='text-sm font-medium'>{title}</CardTitle>
			{icon}
		</CardHeader>
		<CardContent>
			<div className='text-2xl font-bold'>{value}</div>
		</CardContent>
	</Card>
);

const CricketStatsPage: React.FC = () => {
	const renderGameModeContent = (
		gameMode: 'BLITZ' | 'POWERPLAY' | 'CLASSIC'
	) => {
		const stats = dummyStats[gameMode];

		const battingData = [
			{ name: 'Runs', value: stats.runsScored },
			{ name: 'Balls', value: stats.ballsFaced },
			{ name: 'Sixes', value: stats.sixes },
			{ name: 'Fours', value: stats.fours },
		];

		const bowlingData = [
			{ name: 'Wickets', value: stats.wicketsTaken },
			{ name: 'Runs Conceded', value: stats.runsConceded },
			{ name: 'Balls Bowled', value: stats.ballsBowled },
		];

		const matchResultData = [
			{ name: 'Won', value: stats.matchesWon },
			{ name: 'Lost', value: stats.matchesLost },
			{ name: 'Tie', value: stats.matchesTie },
		];

		const COLORS = ['#00C49F', '#FF8042', '#FFBB28'];

		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
				className='space-y-4'
			>
				<Card>
					<CardHeader>
						<CardTitle className='text-lg font-semibold flex items-center'>
							<TrophyIcon className='mr-2 text-yellow-400 w-5 h-5' /> Match
							Results
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between items-center'>
							<div className='space-y-1'>
								<p className='text-sm'>
									Played:{' '}
									<span className='font-bold'>{stats.matchesPlayed}</span>
								</p>
								<p className='text-sm'>
									Won:{' '}
									<span className='font-bold text-green-400'>
										{stats.matchesWon}
									</span>
								</p>
								<p className='text-sm'>
									Lost:{' '}
									<span className='font-bold text-red-400'>
										{stats.matchesLost}
									</span>
								</p>
								<p className='text-sm'>
									Tie:{' '}
									<span className='font-bold text-yellow-400'>
										{stats.matchesTie}
									</span>
								</p>
							</div>
							<ChartContainer config={{}} className='w-[50%] h-[100px]'>
								<ResponsiveContainer width='100%' height='100%'>
									<PieChart>
										<Pie
											data={matchResultData}
											cx='50%'
											cy='50%'
											innerRadius={25}
											outerRadius={40}
											fill='#8884d8'
											paddingAngle={5}
											dataKey='value'
										>
											{matchResultData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<ChartTooltip content={<ChartTooltipContent />} />
									</PieChart>
								</ResponsiveContainer>
							</ChartContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-lg font-semibold flex items-center'>
							<BoltIcon className='mr-2 text-purple-400 w-5 h-5' /> Batting
							Stats
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-2 gap-4 mb-4'>
							<StatCard
								title='Total Runs'
								value={stats.runsScored}
								icon={<ZapIcon className='text-yellow-400 w-4 h-4' />}
							/>
							<StatCard
								title='Highest Score'
								value={stats.highestRunsScored}
								icon={<TrophyIcon className='text-purple-400 w-4 h-4' />}
							/>
							<StatCard
								title='Sixes'
								value={stats.sixes}
								icon={<TargetIcon className='text-red-400 w-4 h-4' />}
							/>
							<StatCard
								title='Fours'
								value={stats.fours}
								icon={<TargetIcon className='text-blue-400 w-4 h-4' />}
							/>
						</div>
						<ChartContainer config={{}} className='w-full h-[200px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart data={battingData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar dataKey='value' fill='#8884d8' />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-lg font-semibold flex items-center'>
							<BellIcon className='mr-2 text-green-400 w-5 h-5' /> Bowling Stats
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-2 gap-4 mb-4'>
							<StatCard
								title='Wickets'
								value={stats.wicketsTaken}
								icon={<AwardIcon className='text-green-400 w-4 h-4' />}
							/>
							<StatCard
								title='Best Bowling'
								value={`${stats.highestWicketsTaken}/${stats.lowestRunsConceded}`}
								icon={<TrophyIcon className='text-yellow-400 w-4 h-4' />}
							/>
							<StatCard
								title='Economy'
								value={(stats.runsConceded / (stats.ballsBowled / 6)).toFixed(
									2
								)}
								icon={<TargetIcon className='text-blue-400 w-4 h-4' />}
							/>
							<StatCard
								title='Bowling Avg'
								value={(stats.runsConceded / stats.wicketsTaken).toFixed(2)}
								icon={<ZapIcon className='text-purple-400 w-4 h-4' />}
							/>
						</div>
						<ChartContainer config={{}} className='w-full h-[200px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<BarChart data={bowlingData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<ChartTooltip content={<ChartTooltipContent />} />
									<Bar dataKey='value' fill='#82ca9d' />
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</CardContent>
				</Card>
			</motion.div>
		);
	};

	return (
		<div className='min-h-screen bg-background text-foreground p-4 max-w-[480px] mx-auto'>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Cricket Statistics
			</h1>
			<Tabs defaultValue='BLITZ' className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='BLITZ'>BLITZ</TabsTrigger>
					<TabsTrigger value='POWERPLAY'>POWERPLAY</TabsTrigger>
					<TabsTrigger value='CLASSIC'>CLASSIC</TabsTrigger>
				</TabsList>
				<TabsContent value='BLITZ'>
					{renderGameModeContent('BLITZ')}
				</TabsContent>
				<TabsContent value='POWERPLAY'>
					{renderGameModeContent('POWERPLAY')}
				</TabsContent>
				<TabsContent value='CLASSIC'>
					{renderGameModeContent('CLASSIC')}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CricketStatsPage;
