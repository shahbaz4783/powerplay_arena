import React, { useMemo } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Dot,
} from 'recharts';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { BarChart3, LineChartIcon } from 'lucide-react';
import { useCricketGameState } from '@/src/lib/store';
import { motion } from 'framer-motion';
import { IconButton } from '../../common/buttons/primary-button';

interface RunsData {
	ball: number;
	playerRuns: number | null;
	opponentRuns: number | null;
	playerWicket: boolean;
	opponentWicket: boolean;
}

// Custom dot for wickets
const WicketDot = (props: any) => {
	const { cx, cy } = props;
	if (!cx || !cy) return null;

	return (
		<svg x={cx - 10} y={cy - 10} width={20} height={20}>
			<circle
				cx='10'
				cy='10'
				r='6'
				fill='#1e293b'
				stroke='#ef4444'
				strokeWidth='2'
			/>
			<line x1='5' y1='10' x2='15' y2='10' stroke='#ef4444' strokeWidth='2' />
			<line x1='10' y1='5' x2='10' y2='15' stroke='#ef4444' strokeWidth='2' />
		</svg>
	);
};

// Custom active dot
const CustomActiveDot = (props: any) => {
	const { cx, cy, stroke } = props;
	if (!cx || !cy) return null;

	return (
		<svg x={cx - 6} y={cy - 6} width={12} height={12}>
			<circle cx='6' cy='6' r='5' fill={stroke} />
			<circle cx='6' cy='6' r='3' fill='white' />
		</svg>
	);
};

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload || !payload.length) return null;

	return (
		<div className='bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg'>
			<p className='text-slate-300 font-medium mb-2'>Ball {label}</p>
			{payload.map(
				(entry: any, index: number) =>
					entry.value !== null && (
						<div key={index} className='flex items-center gap-2'>
							<div
								className='w-3 h-3 rounded-full'
								style={{ backgroundColor: entry.color }}
							/>
							<p className='text-slate-300'>
								{entry.name}: {entry.value} runs
							</p>
						</div>
					)
			)}
		</div>
	);
};

const RunsComparisonChart = () => {
	const { gameState } = useCricketGameState();
	const { player, opponent } = gameState;

	const chartData = useMemo(() => {
		const maxLength = Math.max(
			player.overInfo.length,
			opponent.overInfo.length
		);
		let playerTotal = 0;
		let opponentTotal = 0;

		return Array.from({ length: maxLength }, (_, i) => {
			const playerRun = player.overInfo[i];
			const opponentRun = opponent.overInfo[i];

			if (playerRun !== undefined && playerRun !== null && playerRun !== -1) {
				playerTotal += playerRun;
			}
			if (
				opponentRun !== undefined &&
				opponentRun !== null &&
				opponentRun !== -1
			) {
				opponentTotal += opponentRun;
			}

			return {
				ball: i + 1,
				playerRuns: playerRun !== undefined ? playerTotal : null,
				opponentRuns: opponentRun !== undefined ? opponentTotal : null,
				playerWicket: playerRun === -1,
				opponentWicket: opponentRun === -1,
			};
		});
	}, [player.overInfo, opponent.overInfo]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.button
					whileTap={{ scale: 0.9 }}
					className='flex items-center text-blue-400 justify-center bg-gradient-to-br p-3 from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-xl rounded-md shadow-xl'
				>
					<LineChartIcon className='h-5 w-5 ' />
				</motion.button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl z-[200]'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-white'>
						Innings Comparison
					</DialogTitle>
				</DialogHeader>

				<div className='h-[240px] main-card'>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={chartData}
							margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id='playerGradient' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='5%' stopColor='#3b82f6' stopOpacity={0.2} />
									<stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
								</linearGradient>
								<linearGradient
									id='opponentGradient'
									x1='0'
									y1='0'
									x2='0'
									y2='1'
								>
									<stop offset='5%' stopColor='#ef4444' stopOpacity={0.2} />
									<stop offset='95%' stopColor='#ef4444' stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray='3 3'
								stroke='#334155'
								opacity={0.5}
							/>
							<XAxis
								dataKey='ball'
								stroke='#94a3b8'
								tick={{ fill: '#94a3b8', fontSize: 9 }}
								tickCount={5}
								interval='preserveStartEnd'
							/>
							<YAxis
								stroke='#94a3b8'
								tick={{ fill: '#94a3b8', fontSize: 9 }}
								tickCount={5}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Legend
								wrapperStyle={{
									paddingTop: '20px',
									color: '#94a3b8',
								}}
							/>
							<Line
								type='monotone'
								dataKey='playerRuns'
								name='Your Innings'
								stroke='#3b82f6'
								strokeWidth={2}
								dot={false}
								activeDot={<CustomActiveDot />}
								connectNulls
								fill='url(#playerGradient)'
							/>
							<Line
								type='monotone'
								dataKey='opponentRuns'
								name='Opponent Innings'
								stroke='#ef4444'
								strokeWidth={2}
								dot={false}
								activeDot={<CustomActiveDot />}
								connectNulls
								fill='url(#opponentGradient)'
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className='grid grid-cols-2 gap-4 main-card'>
					<div className='space-y-2 sub-card'>
						<h3 className='text-sm font-medium text-slate-400'>Your Score</h3>
						<div className='text-2xl font-bold text-blue-400'>
							{player.runs}
							<span className='text-sm text-slate-400 ml-2'>
								({player.ballsFaced} balls)
							</span>
						</div>
						<div className='flex gap-3 text-sm text-slate-300'>
							<span>{player.fours} fours</span>
							<span>{player.sixes} sixes</span>
						</div>
					</div>
					<div className='space-y-2 sub-card'>
						<h3 className='text-sm font-medium text-slate-400'>
							Opponent Score
						</h3>
						<div className='text-2xl font-bold text-red-400'>
							{opponent.runs}
							<span className='text-sm text-slate-400 ml-2'>
								({opponent.ballsFaced} balls)
							</span>
						</div>
						<div className='flex gap-3 text-sm text-slate-300'>
							<span>{opponent.fours} fours</span>
							<span>{opponent.sixes} sixes</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RunsComparisonChart;
