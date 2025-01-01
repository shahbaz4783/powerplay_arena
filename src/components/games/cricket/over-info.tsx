"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  PiNumberSixBold,
  PiNumberFourBold,
  PiNumberZeroBold,
} from "react-icons/pi";
import { FaW } from "react-icons/fa6";
import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";
import { RunOutcome } from '@/src/types/gameState';

const BallResult = ({ result }: { result: RunOutcome }) => {
	let bgColor = 'bg-gray-700';
	let textColor = 'text-white font-exo2';
	let icon = null;

	switch (result) {
		case 0:
			bgColor = 'bg-slate-600';
			icon = <PiNumberZeroBold className='size-4' />;
			break;
		case 1:
		case 2:
		case 3:
			bgColor = 'bg-blue-600';
			break;
		case 4:
			bgColor = 'bg-green-500';
			icon = <PiNumberFourBold className='size-4' />;
			break;
		case 6:
			bgColor = 'bg-yellow-500';
			icon = <PiNumberSixBold className='size-4 font-bold' />;
			break;
		case -1:
			bgColor = 'bg-red-600';
			icon = <FaW className='size-4' />;
			break;
	}

	return (
		<motion.div
			initial={{ scale: 0, rotate: -180 }}
			animate={{ scale: 1, rotate: 0 }}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			className={`size-8  ${bgColor} ${textColor} rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}
		>
			{icon || result}
		</motion.div>
	);
};

export function OverInfo() {
	const { gameState } = useCricketGameState();
	const { overInfo, ballsFaced } = getCurrentInningsData(gameState);

	// Determine the current over index and balls faced
	const currentOverIndex = Math.floor(ballsFaced / 6);
	const ballsInCurrentOver = ballsFaced % 6;

	// Get the current over's data
	const startIndex = currentOverIndex * 6;
	const currentOverInfo = overInfo.slice(
		startIndex,
		startIndex + ballsInCurrentOver
	);

	// Calculate runs in the current over
	const runsInCurrentOver = currentOverInfo.filter(
		(run) => run !== -1 && run !== null
	) as number[];
	const totalRunsInCurrentOver = runsInCurrentOver.reduce(
		(sum, run) => sum + run,
		0
	);

	// Get the previous over's data
	const previousOverStartIndex = (currentOverIndex - 1) * 6;
	const previousOverInfo =
		currentOverIndex > 0
			? overInfo.slice(previousOverStartIndex, previousOverStartIndex + 6)
			: [];

	// Calculate runs in the previous over
	const runsInPreviousOver = previousOverInfo.filter(
		(run) => run !== -1 && run !== null
	) as number[];
	const totalRunsInPreviousOver = runsInPreviousOver.reduce(
		(sum, run) => sum + run,
		0
	);

	return (
		<section className='space-y-2'>
			{/* Current Over */}
			{currentOverInfo.length > 0 && (
				<section className='mt-2 sub-card'>
					<div className='flex justify-between text-xs text-slate-300 mb-1'>
						<h3 className='font-jetbrains'>This Over</h3>
						<p className='font-exo2'>Runs: {totalRunsInCurrentOver}</p>
					</div>
					<div className='flex gap-2'>
						<AnimatePresence>
							{currentOverInfo.map((result, index) => (
								<motion.div
									key={`current-${index}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<BallResult result={result} />
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</section>
			)}
			{/* Previous Over */}
			{currentOverIndex > 0 && (
				<div className='mt-2 sub-card'>
					<div className='flex justify-between text-xs text-slate-300 mb-1'>
						<h3 className='font-jetbrains'>Previous Over</h3>
						<p className='font-exo2'>Runs: {totalRunsInPreviousOver}</p>
					</div>
					<div className='flex gap-2'>
						{previousOverInfo.map((result, index) => (
							<motion.div
								key={`previous-${index}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, delay: index * 0.1 }}
							>
								<BallResult result={result} />
							</motion.div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
