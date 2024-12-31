'use client';

import { getCurrentInningsData } from '@/src/lib/game-logics';
import { useCricketGameState } from '@/src/lib/store';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Target, ArrowRightFromLine, SquareChartGantt } from 'lucide-react';
import { SectionHeader } from '../../common/elements/section-header';
import { IconButton } from '../../common/buttons/primary-button';
import RunsComparisonChart from './innings-comarison';
import RunsBarComparison from './bar-compare';
import { InfoCard } from '../../common/cards/info-card';
import { PiMathOperations } from 'react-icons/pi';
import { FaFoursquare } from 'react-icons/fa';
import { FaBaseball, FaSitrox } from 'react-icons/fa6';
import { BackgroundPattern } from '../../common/elements/background-pattern';

export function MidInnings() {
	const { gameState, updateGameState } = useCricketGameState();
	const { target, toss } = gameState;
	const {
		matchSetup: { overs },
	} = gameState;

	const { runs, wickets, oversPlayed, sixes, fours } = useMemo(
		() => getCurrentInningsData(gameState),
		[gameState]
	);
	const remainingBalls = useMemo(() => overs * 6, [overs]);
	const requiredRunRate = useMemo(
		() => ((target || 0) / (remainingBalls / 6)).toFixed(2),
		[target, remainingBalls]
	);

	const handleStartSecondInnings = () => {
		updateGameState({
			currentInnings: 2,
			gamePhase: toss.playMode === 'chase' ? 'batting' : 'bowling',
		});
	};

	if (!target) return null;

	return (
		<div className='flex flex-col min-h-svh'>
			<div className='flex-grow'>
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='p-3'
				>
					<BackgroundPattern />

					<section className='space-y-4 main-card'>
						<SectionHeader
							icon={SquareChartGantt}
							title='Innings'
							highlightedTitle='Summary'
						/>
						<div className='flex justify-between items-center'>
							<div className='text-center'>
								<div className='text-4xl text-slate-200 font-bold font-exo2'>
									<span>{runs}</span>
									<span>/</span>
									<span>{wickets}</span>
								</div>
								<p className='text-slate-400 text-xs mt-1 tracking-wider'>
									({oversPlayed} overs)
								</p>
							</div>
							<InfoCard
								title='Target'
								amount={target}
								icon={<Target />}
								color='green'
							/>
						</div>
						<div className='space-y-2'>
							<div className='grid grid-cols-2 gap-2'>
								<InfoCard
									title='Maximum Balls'
									amount={remainingBalls}
									icon={<FaBaseball />}
									color='pink'
								/>
								<InfoCard
									title='Required Run Rate'
									amount={requiredRunRate}
									icon={<PiMathOperations />}
									color='pink'
								/>
							</div>
							<div className='grid grid-cols-3 gap-2'>
								<div className='grid grid-cols-2 gap-2 '>
									<RunsComparisonChart />
									<RunsBarComparison />
								</div>
								<InfoCard
									title='Sixes'
									amount={sixes}
									icon={<FaSitrox />}
									color='yellow'
								/>
								<InfoCard
									title='Fours'
									amount={fours}
									icon={<FaFoursquare />}
									color='teal'
								/>
							</div>
						</div>
					</section>
				</motion.div>
			</div>

			<div className='sticky bottom-0 left-0 right-0 p-3'>
				<section className='sub-card grid grid-cols-2 gap-2'>
					<div>
						<p className='text-slate-300 text-xs'>
							{toss.playMode === 'chase'
								? 'Required Run Rate'
								: 'Defending Target'}
						</p>
						<p className='text-xl font-bold text-white'>
							{toss.playMode === 'chase' ? requiredRunRate : target}
						</p>
					</div>
					<IconButton
						onClick={handleStartSecondInnings}
						icon={ArrowRightFromLine}
						text='Start'
					/>
				</section>
			</div>
		</div>
	);
}
