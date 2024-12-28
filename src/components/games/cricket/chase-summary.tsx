"use client";

import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";
import { GradientBorder } from '../../common/elements/gradient-border';

export function ChaseSummary() {
	const { gameState } = useCricketGameState();
	if (gameState.currentInnings === 1) return null;
	if (!gameState.target) return null;

	const {
		matchSetup: { overs },
	} = gameState;

	const { ballsFaced, runs } = getCurrentInningsData(gameState);

	return (
		<GradientBorder className='space-y-4'>
			<div className='flex justify-between'>
				<div className='text-gray-300 space-x-1'>
					<span className='text-sm text-slate-400'>Target</span>
					<span className='text-2xl font-bold'>{gameState.target}</span>
				</div>
				<div className='space-x-1'>
					<span className='text-xs text-slate-400'>Req. Run Rate:</span>
					<span className='text-2xl font-bold'>
						{(
							(gameState.target - runs) /
							((overs * 6 - ballsFaced) / 6)
						).toFixed(2)}
					</span>
				</div>
			</div>
			<div className='sub-card'>
				<p className='text-center text-slate-400'>
					<span className='text-blue-500 font-fira-code'>
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
		</GradientBorder>
	);
}
