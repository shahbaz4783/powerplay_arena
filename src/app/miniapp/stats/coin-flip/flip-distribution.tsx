import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';

export interface ChartData {
	name: string;
	value: number;
	total: number;
}

export interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		name: string;
		value: number;
		payload: ChartData;
	}>;
}

export interface BetDistributionChartProps {
	data: Array<{
		name: string;
		value: number;
	}>;
}
const COLORS = ['#22C55E', '#3B82F6', '#A855F7', '#F59E0B'];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
	if (!active || !payload || !payload.length) return null;

	return (
		<div className='bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg'>
			<p className='text-white font-medium'>{payload[0].name}</p>
			<p className='text-sm text-gray-300'>
				Bets: {payload[0].value}
				<span className='ml-2 text-gray-400'>
					({((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%)
				</span>
			</p>
		</div>
	);
};

export const FlipDistributionChart: React.FC<BetDistributionChartProps> = ({
	data,
}) => {
	const total = data.reduce((sum, item) => sum + item.value, 0);
	const processedData = data.map((item) => ({
		...item,
		total,
	}));

	return (
		<GradientBorder>
			<div className=''>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={processedData}
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={80}
							paddingAngle={4}
							dataKey='value'
							animationBegin={0}
							animationDuration={1500}
						>
							{processedData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
									stroke='rgba(0,0,0,0.1)'
									className='hover:opacity-80 transition-opacity duration-300'
								/>
							))}
						</Pie>
						<Tooltip content={<CustomTooltip />} />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				{processedData.map((entry, index) => (
					<div key={`legend-${index}`} className='flex items-center gap-3'>
						<div className='flex items-center gap-2 flex-1'>
							<div
								className='w-4 h-4 rounded-full'
								style={{ backgroundColor: COLORS[index % COLORS.length] }}
							/>
							<span className='text-sm text-gray-300'>{entry.name}</span>
						</div>
						<span className='text-sm text-gray-400'>
							{((entry.value / total) * 100).toFixed(1)}%
						</span>
					</div>
				))}
			</div>
		</GradientBorder>
	);
};
