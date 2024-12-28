"use client";

import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { ChaseSummary } from "./chase-summary";
import RunsComparisonChart from './innings-comarison';

export function Gameplay() {
  return (
		<main className='flex flex-col border min-h-svh justify-between gap-3 '>
			<section className='space-y-6'>
				<ScoreBoard />

				<div className='main-card'>
					<RunsComparisonChart />
				</div>
				<Commentary />
			</section>
			<ChaseSummary />
			<div className='sticky bottom-0'>
				<GameControls />
			</div>
		</main>
	);
}
