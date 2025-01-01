'use client';

import { getCurrentInningsData } from '@/src/lib/game-logics';
import { useCricketGameState } from '@/src/lib/store';
import RunsComparisonChart from './innings-comarison';
import { InfoCard } from '../../common/cards/info-card';
import { Target } from 'lucide-react';
import { GameBalanceCard } from '../../common/cards/balance-card';
import { PiMathOperations } from 'react-icons/pi';
import RunsBarComparison from './bar-compare';

export function Anaylsis() {
	const { gameState } = useCricketGameState();
	const { runRate, sixes, fours } = getCurrentInningsData(gameState);

	const isFirstInning: boolean = !gameState.target;
	const {
		matchSetup: { overs },
	} = gameState;

	const projectedScore = Math.ceil(Number(runRate) * overs);

	const { ballsFaced, runs } = getCurrentInningsData(gameState);

	const reqRR =
		gameState?.target &&
		((gameState?.target - runs) / ((overs * 6 - ballsFaced) / 6)).toFixed(2);

	return (
		<section>
			<aside className='grid grid-cols-3 gap-x-2'>
				<div className='grid grid-cols-2 gap-2'>
					<RunsComparisonChart />
					<RunsBarComparison />
				</div>
				<InfoCard
					iconSize={3}
					icon={<PiMathOperations />}
					amount={isFirstInning ? `${sixes}/${fours}` : reqRR!}
					title={isFirstInning ? 'Six/Four' : 'Req RR'}
					color='blue'
					info={{
						title: isFirstInning ? 'Sixes and Four' : 'Required Run Rate',
						description: isFirstInning
							? 'Total number of sixes and fours hit.'
							: 'The average runs needed per over to achieve the target.',
					}}
				/>
				<InfoCard
					iconSize={3}
					icon={<Target className='size-3' />}
					amount={isFirstInning ? projectedScore : gameState.target!}
					title={isFirstInning ? 'Est.' : 'Target'}
					color='blue'
					info={{
						title: isFirstInning ? 'Estimated Score' : 'What is Target?',
						description: isFirstInning
							? 'The total estimated score if the current run rate is maintained.'
							: 'The total runs needed to win.',
					}}
				/>
			</aside>
			{gameState.target && (
				<div className='sub-card mt-2'>
					<p className='text-center text-slate-400'>
						<span className='text-blue-400 font-semibold font-poppins'>
							{gameState.toss.playMode === 'chase' ? 'You' : 'Opponent'}
						</span>
						<span> need </span>
						<span className='text-xl font-bold text-white font-exo2'>
							{gameState.target - runs}
						</span>{' '}
						runs from{' '}
						<span className='text-xl font-bold text-white font-exo2'>
							{overs * 6 - ballsFaced}
						</span>{' '}
						balls
					</p>
				</div>
			)}
		</section>
	);
}
