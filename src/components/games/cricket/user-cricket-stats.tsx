'use client';

import { motion } from 'framer-motion';
import { StatCard } from '../../common/cards/stats-card';
import { useInitData } from '@telegram-apps/sdk-react';
import { useGetUserStats } from '@/src/hooks/useUserData';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { ChartContainer, ChartConfig } from '../../ui/chart';
import { Bar, BarChart } from 'recharts';
import { MATCH_FORMATS } from '@/src/constants/app-config';
import { MatchFormat } from '@prisma/client';

interface StatData {
	key: string;
	title: string;
	color: string;
	calculate?: (stats: FormatStats) => number | string;
}

interface StatSection {
	title: string;
	stats: StatData[];
}

interface FormatStats {
	matchesPlayed: number;
	matchesWon: number;
	matchesLost: number;
	matchesTie: number;
	runsScored: number;
	ballsFaced: number;
	sixes: number;
	fours: number;
	wicketsTaken: number;
	runsConceded: number;
	ballsBowled: number;
}

const statSections: StatSection[] = [
	{
		title: 'Performance',
		stats: [
			{
				key: 'matchesPlayed',
				title: 'Match Played',
				color: 'from-blue-500 to-cyan-300',
			},
			{
				key: 'matchesWon',
				title: 'Match Won',
				color: 'from-green-500 to-emerald-300',
			},
			{
				key: 'matchesLost',
				title: 'Match Lost',
				color: 'from-yellow-500 to-orange-300',
			},
			{
				key: 'matchesTie',
				title: 'Match Tie',
				color: 'from-yellow-500 to-orange-300',
			},
		],
	},
	{
		title: 'Batting Statistics',
		stats: [
			{
				key: 'runsScored',
				title: 'Total Runs',
				color: 'from-blue-500 to-cyan-300',
			},
			{
				key: 'average',
				title: 'Average Score',
				color: 'from-green-500 to-emerald-300',
				calculate: (stats: FormatStats) =>
					stats.matchesPlayed > 0
						? Number(Math.round(stats.runsScored / stats.matchesPlayed))
						: 0,
			},
			{ key: 'sixes', title: 'Sixes', color: 'from-purple-500 to-pink-300' },
			{ key: 'fours', title: 'Fours', color: 'from-red-500 to-orange-300' },
			{
				key: 'strikeRate',
				title: 'Strike Rate',
				color: 'from-indigo-500 to-blue-300',
				calculate: (stats: FormatStats) =>
					stats.ballsFaced > 0
						? Number(((stats.runsScored / stats.ballsFaced) * 100).toFixed(2))
						: 0,
			},
		],
	},
	{
		title: 'Bowling Statistics',
		stats: [
			{
				key: 'wicketsTaken',
				title: 'Wickets',
				color: 'from-blue-500 to-cyan-300',
			},
			{
				key: 'economy',
				title: 'Economy',
				color: 'from-yellow-500 to-orange-300',
				calculate: (stats: FormatStats) =>
					stats.matchesPlayed > 0
						? Number(
								Math.round(
									stats.runsConceded / (stats.ballsBowled / 6)
								).toFixed(2)
						  )
						: 0,
			},
		],
	},
];

interface StatSectionProps {
	title: string;
	stats: StatData[];
	formatStats: FormatStats;
}

const StatSection: React.FC<StatSectionProps> = ({
	title,
	stats,
	formatStats,
}) => (
	<div className='space-y-2'>
		<h2 className='text-slate-400 font-mono text-sm'>{title}</h2>
		<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
			{stats.map((stat, index) => (
				<motion.div
					key={stat.title}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1, duration: 0.5 }}
				>
					<StatCard
						title={stat.title}
						value={
							stat.calculate
								? stat.calculate(formatStats)
								: formatStats[stat.key as keyof FormatStats]
						}
						color={stat.color}
					/>
				</motion.div>
			))}
		</div>
	</div>
);

export function UserCricketStats() {
	const initData = useInitData();
	const user = initData?.user;
	const { data: stats } = useGetUserStats(user?.id);

	return (
		<motion.section
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className='space-y-6'
		>
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
				{Object.keys(MATCH_FORMATS).map((format) => (
					<TabsContent key={format} value={format} className='space-y-10'>
						{stats &&
							stats[format as MatchFormat] &&
							statSections.map((section) => (
								<StatSection
									key={section.title}
									title={section.title}
									stats={section.stats}
									formatStats={stats[format as MatchFormat]}
								/>
							))}
					</TabsContent>
				))}
			</Tabs>
		</motion.section>
	);
}
