'use client';

import { getCurrentInningsData } from '@/src/lib/game-logics';
import { useCricketGameState } from '@/src/lib/store';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight, Target, Clock } from 'lucide-react';
import { Header } from '../../common/elements/header';

export function MidInnings() {
	const { gameState, updateGameState } = useCricketGameState();
	const { target, currentInnings, toss, matchSetup } = gameState;
	const {
		matchSetup: { overs },
	} = gameState;

	const { runs, wickets, oversPlayed } = useMemo(
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
		<>
			<Header
				title='Innings Over'
				subtitle='First innings have been completed'
				showBackButton={false}
			/>
			<motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<section className='space-y-6 p-6'>
					<div className='flex justify-between items-center'>
						<div className='text-center'>
							<div className='text-4xl font-bold space-x-1'>
								<span className='text-white'>{runs}</span>
								<span className='text-slate-300'>/</span>
								<span className='text-slate-300'>{wickets}</span>
							</div>
							<p className='text-slate-400 text-sm mt-1'>
								({oversPlayed} overs)
							</p>
						</div>
						<div className='text-center'>
							<span className='text-4xl font-bold text-cyan-400'>{target}</span>
							<span className='text-sm text-slate-400 block mb-1'>Target</span>
						</div>
					</div>
					<div className='bg-slate-700/50 rounded-xl p-4 space-y-3'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Target className='w-5 h-5 text-cyan-400 mr-2' />
								<span className='text-slate-300'>Required Runs</span>
							</div>
							<span className='text-xl font-bold text-white'>{target}</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<Clock className='w-5 h-5 text-cyan-400 mr-2' />
								<span className='text-slate-300'>Balls Remaining</span>
							</div>
							<span className='text-xl font-bold text-white'>
								{remainingBalls}
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<ArrowRight className='w-5 h-5 text-cyan-400 mr-2' />
								<span className='text-slate-300'>Required Run Rate</span>
							</div>
							<span className='text-xl font-bold text-white'>
								{requiredRunRate}
							</span>
						</div>
					</div>
				</section>
			</motion.div>
			<section className='p-6'>
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={handleStartSecondInnings}
					className='w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 rounded-xl'
				>
					Start Second Innings
				</motion.button>
			</section>
		</>
	);
}
