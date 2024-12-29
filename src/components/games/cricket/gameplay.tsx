"use client";

import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { Anaylsis } from './anaylsis';

export function Gameplay() {
	return (
		<main className='flex flex-col min-h-svh justify-between gap-3 '>
			<section className='space-y-2'>
				<ScoreBoard />
				<div className='main-card space-y-2'>
					<Anaylsis />
					<OverInfo />
				</div>
				<Commentary />
			</section>
			<div className='sticky bottom-0'>
				<GameControls />
			</div>
		</main>
	);
}
