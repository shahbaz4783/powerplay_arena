"use client";

import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { ChaseSummary } from "./chase-summary";

export function Gameplay() {
  return (
		<main className='flex flex-col justify-between gap-3 flex-grow'>
			<section className='space-y-6'>
				<ScoreBoard />
				<OverInfo />
				<Commentary />
			</section>
			<ChaseSummary />
			<GameControls />
		</main>
	);
}
