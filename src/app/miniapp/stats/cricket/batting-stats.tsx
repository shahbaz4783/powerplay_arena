import { StatCard } from '@/src/components/common/cards/stats-card';
import { BoltIcon } from 'lucide-react';
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
	LabelList,
	Cell,
} from 'recharts';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useCricketStats } from '@/src/hooks/useUserData';
import { MatchFormat } from '@prisma/client';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';

type ChartDataItem = {
	name: 'Sixes' | 'Fours';
	value: number;
};

type ChartConfig = {
	[K in ChartDataItem['name']]: {
		label: string;
		color: string;
	};
};

export function BattingStats({ gameMode }: { gameMode: MatchFormat }) {
	const { telegramId } = useCurrentUser();
	const { data: stats } = useCricketStats(telegramId, gameMode);

	const battingData: ChartDataItem[] = [
		{ name: 'Sixes', value: stats?.sixes || 0 },
		{ name: 'Fours', value: stats?.fours || 0 },
	];

	const chartConfig: ChartConfig = {
		Sixes: { label: 'Sixes', color: 'hsl(320, 100%, 50%)' },
		Fours: { label: 'Fours', color: 'hsl(180, 100%, 50%)' },
	};

	return (
		<GradientBorder className='space-y-3'>
			<div className='text-lg font-semibold flex items-center'>
				<BoltIcon className='mr-2 text-purple-400 w-5 h-5' /> Batting Stats
			</div>

			<div className='grid grid-cols-2 gap-4 mb-4'>
				<StatCard title='Total Runs' value={stats?.runsScored || 0} />
				<StatCard title='Highest Score' value={stats?.highestRunsScored || 0} />
				<StatCard
					title='Avg. Score'
					value={(
						(stats?.runsScored || 0) / (stats?.matchesPlayed || 1)
					).toFixed(2)}
				/>
				<StatCard
					title='Strike Rate'
					value={(
						((stats?.runsScored || 0) / (stats?.ballsFaced || 1)) *
						100
					).toFixed(2)}
				/>
			</div>
			<ChartContainer
				config={chartConfig}
				className='w-full h-[200px] bg-slate-800/50 rounded-lg'
			>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						data={battingData}
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
							{battingData.map((entry, index) => (
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
		</GradientBorder>
	);
}
