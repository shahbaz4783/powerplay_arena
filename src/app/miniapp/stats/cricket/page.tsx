'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BoltIcon, BellIcon } from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
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
} from 'recharts';
import { MATCH_FORMATS } from '@/src/constants/app-config';
import { StatCard } from '@/src/components/common/cards/stats-card';
import { useCricketStats } from '@/src/hooks/useUserData';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { OverallPerformance } from './performance';

interface MatchStats {
	matchesPlayed: number;
	matchesWon: number;
	matchesLost: number;
	matchesTie: number;
}

interface GameModeContentProps {
	gameMode: 'BLITZ' | 'POWERPLAY' | 'CLASSIC';
}

const GameModeContent: React.FC<GameModeContentProps> = ({ gameMode }) => {
	const { telegramId } = useCurrentUser();
	const { data: stats } = useCricketStats(telegramId, gameMode);

	const battingData = [
		{ name: 'Runs', value: stats?.runsScored },
		{ name: 'Balls', value: stats?.ballsFaced },
		{ name: 'Sixes', value: stats?.sixes },
		{ name: 'Fours', value: stats?.fours },
	];

	const bowlingData = [
		{ name: 'Wickets', value: stats?.wicketsTaken },
		{ name: 'Runs Conceded', value: stats?.runsConceded },
		{ name: 'Balls Bowled', value: stats?.ballsBowled },
	];

	const defaultStats: MatchStats = {
		matchesPlayed: 0,
		matchesWon: 0,
		matchesLost: 0,
		matchesTie: 0,
	};

	const { matchesPlayed, matchesWon, matchesLost, matchesTie } =
		stats || defaultStats;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className='space-y-4'
		>
			<OverallPerformance
				won={matchesWon}
				lost={matchesLost}
				tie={matchesTie}
				total={matchesPlayed}
			/>

			<Card className='rounded-xl'>
				<CardHeader>
					<CardTitle className='text-lg font-semibold flex items-center'>
						<BoltIcon className='mr-2 text-purple-400 w-5 h-5' /> Batting Stats
					</CardTitle>
				</CardHeader>
				<CardContent>
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

			<Card className='rounded-xl'>
				<CardHeader>
					<CardTitle className='text-lg font-semibold flex items-center'>
						<BellIcon className='mr-2 text-green-400 w-5 h-5' /> Bowling Stats
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={{}}
						className='w-full pt-3 pr-2 rounded-xl bg-slate-800/50 backdrop-blur-md'
					>
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

const CricketStatsPage: React.FC = () => {
	return (
		<div className='min-h-screen bg-background text-foreground p-4 max-w-[480px] mx-auto'>
			<Tabs defaultValue='BLITZ' className='w-full'>
				<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<TabsTrigger
							key={key}
							value={key}
							className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
						>
							<span className='font-bold uppercase'>{format.format}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value='BLITZ'>
					<GameModeContent gameMode='BLITZ' />
				</TabsContent>
				<TabsContent value='POWERPLAY'>
					<GameModeContent gameMode='POWERPLAY' />
				</TabsContent>
				<TabsContent value='CLASSIC'>
					<GameModeContent gameMode='CLASSIC' />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CricketStatsPage;
