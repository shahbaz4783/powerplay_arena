import { useMemo } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { BarChart3 } from 'lucide-react';
import { useCricketGameState } from '@/src/lib/store';
import { motion } from 'framer-motion';
import { ScoreCard } from '../../common/cards/score-card';

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload || !payload.length) return null;

	return (
		<div className='main-card backdrop-blur-lg shadow-lg'>
			<p className='text-slate-300 text-sm font-exo2 mb-2'>Over {label}</p>
			{payload.map(
				(entry: any, index: number) =>
					entry.value !== null && (
						<div key={index} className='flex items-center gap-2'>
							<div
								className='w-3 h-3 rounded-full'
								style={{ backgroundColor: entry.color }}
							/>
							<p className='text-slate-300 text-sm'>
								{entry.name}: {entry.value} runs
								{entry.payload.balls && (
									<span className='text-slate-400 ml-2'>
										({entry.payload.balls} balls)
									</span>
								)}
							</p>
						</div>
					)
			)}
		</div>
	);
};

const RunsBarComparison = () => {
	const { gameState } = useCricketGameState();
	const { player, opponent } = gameState;

	const chartData = useMemo(() => {
		// Function to process runs for an over
		const processOver = (runs: (number | undefined)[], startIdx: number) => {
			let totalRuns = 0;
			let ballsPlayed = 0;

			for (let i = 0; i < 6; i++) {
				const run = runs[startIdx + i];
				if (run !== undefined && run !== -1) {
					totalRuns += run;
					ballsPlayed++;
				}
			}

			return { runs: totalRuns, balls: ballsPlayed };
		};

		// Calculate number of overs needed (including partial overs)
		const playerOvers = Math.ceil(player.overInfo.length / 6);
		const opponentOvers = Math.ceil(opponent.overInfo.length / 6);
		const maxOvers = Math.max(playerOvers, opponentOvers);

		return Array.from({ length: maxOvers }, (_, overIndex) => {
			const playerOverData =
				overIndex * 6 < player.overInfo.length
					? processOver(player.overInfo, overIndex * 6)
					: { runs: null, balls: 0 };

			const opponentOverData =
				overIndex * 6 < opponent.overInfo.length
					? processOver(opponent.overInfo, overIndex * 6)
					: { runs: null, balls: 0 };

			// Only include overs that have balls played
			if (playerOverData.balls === 0 && opponentOverData.balls === 0) {
				return null;
			}

			return {
				over: overIndex + 1,
				playerRuns: playerOverData.balls > 0 ? playerOverData.runs : null,
				playerBalls: playerOverData.balls || null,
				opponentRuns: opponentOverData.balls > 0 ? opponentOverData.runs : null,
				opponentBalls: opponentOverData.balls || null,
			};
		}).filter(Boolean);
	}, [player.overInfo, opponent.overInfo]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.button
					whileTap={{ scale: 0.9 }}
					className='flex items-center text-blue-400 justify-center bg-gradient-to-br p-3 from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-xl rounded-md shadow-xl'
				>
					<BarChart3 className='h-5 w-5' />
				</motion.button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl z-[200]'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-white'>
						Runs Per Over Comparison
					</DialogTitle>
				</DialogHeader>

				<div className='h-[240px] '>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={chartData}
							margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray='3 3'
								stroke='#334155'
								opacity={0.5}
							/>
							<XAxis
								dataKey='over'
								stroke='#94a3b8'
								tick={{ fill: '#94a3b8', fontSize: 9 }}
								label={{
									value: 'Overs',
									position: 'insideBottom',
									offset: -5,
									fill: '#94a3b8',
								}}
							/>
							<YAxis
								stroke='#94a3b8'
								tick={{ fill: '#94a3b8', fontSize: 9 }}
								label={{
									value: 'Runs',
									angle: -90,
									position: 'insideLeft',
									offset: 10,
									fill: '#94a3b8',
								}}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Legend
								wrapperStyle={{
									paddingTop: '20px',
									color: '#94a3b8',
								}}
							/>
							<Bar
								dataKey='playerRuns'
								name='Your Runs'
								fill='#3b82f6'
								radius={[4, 4, 0, 0]}
							/>
							<Bar
								dataKey='opponentRuns'
								name='Opponent Runs'
								fill='#ef4444'
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<ScoreCard
						title='Your Score'
						fours={player.fours}
						sixes={player.sixes}
						ballsFaced={player.ballsFaced}
						runs={player.runs}
					/>
					<ScoreCard
						title='Opponent Score'
						fours={opponent.fours}
						sixes={opponent.sixes}
						ballsFaced={opponent.ballsFaced}
						runs={opponent.runs}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RunsBarComparison;
