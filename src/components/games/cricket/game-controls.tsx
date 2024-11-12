'use client';

import { useState } from 'react';
import {
	calculateRunsScored,
	computerBowling,
	getOpponentBattingStrategy,
} from '@/src/lib/game-logics';
import ShinyButton from '@/src/components/magicui/shiny-button';
import { useCricketGameState } from '@/src/lib/store';
import {
	BattingStyle,
	BowlingType,
	GameParticipant,
} from '@/src/types/gameState';

// Define types for the game actions
type GameAction = BattingStyle | BowlingType;

export function GameControls() {
	const [disableControls, setDisableControls] = useState(false);
	const { gameState, updateInnings } = useCricketGameState();

	const handleAction = (action: GameAction) => {
		setDisableControls(true);
		const isBatting = gameState.gamePhase === 'batting';
		const runsScored = isBatting
			? calculateRunsScored(action as BattingStyle, computerBowling(gameState))
			: calculateRunsScored(
					getOpponentBattingStrategy(gameState, action as BowlingType),
					action as BowlingType
			  );

		const battingTeam: GameParticipant = isBatting ? 'player' : 'opponent';

		updateInnings(battingTeam, runsScored);

		setTimeout(() => setDisableControls(false), 2000);
	};

	const renderButtons = (actions: GameAction[], colors: string[]) => (
		<>
			{actions.map((action, index) => (
				<ShinyButton
					key={action}
					onClick={() => handleAction(action)}
					className={`w-full ${colors[index]}`}
					text={action.charAt(0).toUpperCase() + action.slice(1)}
					disabled={disableControls}
				/>
			))}
		</>
	);

	const battingActions: BattingStyle[] = ['aggressive', 'normal', 'defensive'];
	const bowlingActions: BowlingType[] = ['normal', 'bouncer', 'yorker'];
	const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500'];

	return (
		<div className='grid p-2 sticky bottom-0 grid-cols-3 gap-4 w-full bg-slate-800/50 backdrop-blur-md rounded-xl'>
			{gameState.gamePhase === 'batting'
				? renderButtons(battingActions, colors)
				: renderButtons(bowlingActions, colors)}
		</div>
	);
}
