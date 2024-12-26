import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/src/components/ui/accordion';
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
} from 'recharts';
import { Trophy, Flame, Coins, Target, TrendingUp } from 'lucide-react';
import { InfoCard } from '@/src/components/common/cards/info-card';
import { ChartContainer, ChartTooltipContent } from '@/src/components/ui/chart';
import { BetType } from '@prisma/client';

interface BetStats {
	id: string;
	telegramId: string;
	betType: BetType;
	betsPlaced: number;
	betsWon: number;
	totalWagered: number;
	totalEarning: number;
	totalLoss: number;
}

interface StatsCardProps {
	stats: BetStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
	const winRate =
		stats.betsPlaced > 0
			? ((stats.betsWon / stats.betsPlaced) * 100).toFixed(1)
			: '0';

	const profit = stats.totalEarning;
	const loss = stats.totalLoss;

	const chartData = [
		{ name: 'Wins', value: stats.betsWon },
		{ name: 'Losses', value: stats.betsPlaced - stats.betsWon },
	];

	const getTypeColor = (
		type: BetType
	): 'yellow' | 'green' | 'purple' | 'blue' => {
		switch (type) {
			case 'SAFE_BET':
				return 'green';
			case 'CLASSIC_FLIP':
				return 'blue';
			case 'TRIPLE_SHOT':
				return 'purple';
			case 'JACKPOT':
				return 'yellow';
			default:
				return 'blue';
		}
	};

	const getTypeIcon = (type: BetType) => {
		switch (type) {
			case 'SAFE_BET':
				return <Target className='w-6 h-6' />;
			case 'CLASSIC_FLIP':
				return <Coins className='w-6 h-6' />;
			case 'TRIPLE_SHOT':
				return <Flame className='w-6 h-6' />;
			case 'JACKPOT':
				return <Trophy className='w-6 h-6' />;
			default:
				return <Coins className='w-6 h-6' />;
		}
	};

	return (
		<Accordion
			className='bg-gray-900 border-gray-800 border backdrop-blur-sm overflow-hidden shadow-lg rounded-xl'
			type='single'
			collapsible
		>
			<AccordionItem value={stats.betType}>
				<AccordionTrigger className='px-4 py-2 gap-4'>
					<div className='w-full'>
						<InfoCard
							icon={getTypeIcon(stats.betType)}
							title={stats.betType
								.split('_')
								.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
								.join(' ')}
							amount={'Total Flips: ' + stats.betsPlaced}
							color={getTypeColor(stats.betType)}
						/>
						<p className='text-sm text-left font-exo2 text-gray-400 mt-2'>
							Win Rate: {winRate}%
						</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className='p-4 space-y-6'>
						{/* Horizontal Bar Chart */}
						<ChartContainer
							config={{
								wins: {
									label: 'Wins',
									color: 'hsl(var(--chart-1))',
								},
								losses: {
									label: 'Losses',
									color: 'hsl(var(--chart-2))',
								},
							}}
							className='h-48'
						>
							<ResponsiveContainer
								className={'sub-card'}
								width='100%'
								height='100%'
							>
								<BarChart
									layout='vertical'
									data={chartData}
									margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
								>
									<XAxis type='number' />
									<YAxis dataKey='name' type='category' />
									<Tooltip content={<ChartTooltipContent />} />
									<Bar dataKey='value' radius={[0, 4, 4, 0]}>
										{chartData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={index === 0 ? 'green' : 'red'}
											/>
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>

						{/* Stats Grid */}
						<div className='grid grid-cols-2 gap-4'>
							<InfoCard
								icon={<Trophy className='w-4 h-4' />}
								title='Wins'
								amount={stats.betsWon}
								color='green'
							/>
							<InfoCard
								icon={<TrendingUp className='w-4 h-4' />}
								title='Total Wagered'
								amount={stats.totalWagered}
								color='blue'
							/>
							<InfoCard
								icon={<Coins className='w-4 h-4' />}
								title='Loss'
								amount={loss}
								color='purple'
							/>
							<InfoCard
								icon={<Flame className='w-4 h-4' />}
								title={'Earned'}
								amount={profit}
								color='yellow'
							/>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default StatsCard;
