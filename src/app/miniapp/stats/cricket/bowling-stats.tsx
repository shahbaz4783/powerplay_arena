import { StatCard } from '@/src/components/common/cards/stats-card';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { BellIcon, BoltIcon } from 'lucide-react';
import {
	ChartConfig,
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
	LabelList,
	Cell,
} from 'recharts';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useCricketStats } from '@/src/hooks/useUserData';
import { MatchFormat } from '@prisma/client';

export function BowlingStats({ gameMode }: { gameMode: MatchFormat }) {
	const { telegramId } = useCurrentUser();
	const { data: stats } = useCricketStats(telegramId, gameMode);

	const bowlingData = [
		{ name: 'Balls Bowled', value: stats?.ballsBowled || 0 },
		{ name: 'Runs Conceded', value: stats?.runsConceded || 0 },
	];

	const chartConfig: ChartConfig = {
		'Balls Bowled': { label: 'Sixes', color: 'hsl(320, 100%, 50%)' },
		'Runs Conceded': { label: 'Fours', color: 'hsl(180, 100%, 50%)' },
	};

	return (
		<Card className='rounded-xl'>
			<CardHeader>
				<CardTitle className='text-lg font-semibold flex items-center'>
					<BellIcon className='mr-2 text-green-400 w-5 h-5' /> Bowling Stats
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 gap-4 mb-4'>
					<StatCard title='Wickets' value={stats?.wicketsTaken || 0} />
					<StatCard
						title='Best Bowling'
						value={`${stats?.bestBowlingWickets}/${
							stats?.bestBowlingRuns || 0
						}`}
					/>
					<StatCard
						title='Economy'
						value={
							Math.round(
								stats?.runsConceded! / (stats?.ballsBowled! / 6)
							).toFixed(2) || 0
						}
					/>
					<StatCard
						title='Bowling Avg'
						value={
							(stats?.runsConceded! / stats?.wicketsTaken!).toFixed(2) || 0
						}
					/>
				</div>

				<ChartContainer
					config={chartConfig}
					className='w-full h-[200px] bg-slate-800/50 rounded-lg'
				>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={bowlingData}
							layout='vertical'
							margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid
								strokeDasharray='3 3'
								horizontal={false}
								stroke='rgba(255, 255, 255, 0.1)'
							/>
							<XAxis type='number' stroke='#fff' />
							<YAxis dataKey='name' type='category' width={60} stroke='#fff' />
							<ChartTooltip
								content={<ChartTooltipContent />}
								cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
							/>
							<Bar dataKey='value' barSize={45} radius={4}>
								{bowlingData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={chartConfig[entry.name].color}
									/>
								))}
								<LabelList dataKey='value' position='right' fill='#fff' />
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
