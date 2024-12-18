'use client';

import { useState } from 'react';
import {
	calculateRunsScored,
	getOpponentBattingStrategy,
	opponentBowling,
} from '@/src/lib/game-logics';
import { useCricketGameState } from '@/src/lib/store';
import {
	BattingStyle,
	BowlingType,
	GameParticipant,
} from '@/src/types/gameState';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { Swords, Shield, Target, Crosshair, Bomb, Hammer } from 'lucide-react';
import { InfoDialog } from '../../common/dialog/cricket-control';

type GameAction = BattingStyle | BowlingType;

export function GameControls() {
	const [disableControls, setDisableControls] = useState(false);
	const { gameState, updateInnings } = useCricketGameState();

	const handleAction = (action: GameAction) => {
		setDisableControls(true);
		const isBatting = gameState.gamePhase === 'batting';
		const runsScored = isBatting
			? calculateRunsScored(action as BattingStyle, opponentBowling(gameState))
			: calculateRunsScored(
					getOpponentBattingStrategy(action as BowlingType),
					action as BowlingType
			  );

		const battingTeam: GameParticipant = isBatting ? 'player' : 'opponent';

		updateInnings(battingTeam, runsScored);

		setTimeout(() => setDisableControls(false), 2000);
	};

	const renderButtons = (actions: GameAction[]) => (
		<>
			{actions.map((action, index) => (
				<motion.button
					key={action}
					onClick={() => handleAction(action)}
					whileTap={{ scale: 0.75 }}
					className={cn(
						'w-full p-4 text-sm font-bold uppercase tracking-wider',
						'bg-gradient-to-b from-slate-700 to-slate-800',
						'text-slate-200 shadow-md rounded-xl',
						'disabled:opacity-50 disabled:cursor-not-allowed',
						{ 'animate-pulse': disableControls },
						getButtonColor(index)
					)}
					disabled={disableControls}
				>
					{getBattingLabel(action as BattingStyle) ||
						getBowlingLabel(action as BowlingType)}
				</motion.button>
			))}
		</>
	);

	const getButtonColor = (index: number): string => {
		const colors = [
			'border-l-4 border-red-500',
			'border-l-4 border-yellow-500',
			'border-l-4 border-blue-500',
		];
		return colors[index];
	};

	const getBattingLabel = (action: BattingStyle): string => {
		switch (action) {
			case 'aggressive':
				return 'Slog';
			case 'normal':
				return 'Drive';
			case 'defensive':
				return 'Guard';
			default:
				return '';
		}
	};

	const getBowlingLabel = (action: BowlingType): string => {
		switch (action) {
			case 'seam':
				return 'Seam';
			case 'bouncer':
				return 'Bumper';
			case 'yorker':
				return 'Yorker';
			default:
				return '';
		}
	};

	const battingActions: BattingStyle[] = ['aggressive', 'normal', 'defensive'];
	const bowlingActions: BowlingType[] = ['seam', 'bouncer', 'yorker'];

	const battingControls = [
		{
			name: 'Slog',
			description:
				'High risk, high reward shot. Chance for boundaries but also wickets.',
			icon: <Swords className='w-5 h-5 text-red-400' />,
		},
		{
			name: 'Drive',
			description: 'Balanced shot. Good chance for runs with moderate risk.',
			icon: <Target className='w-5 h-5 text-yellow-400' />,
		},
		{
			name: 'Guard',
			description:
				'Defensive shot. Low chance of getting out, but also low scoring.',
			icon: <Shield className='w-5 h-5 text-blue-400' />,
		},
	];

	const bowlingControls = [
		{
			name: 'Seam',
			description:
				'Standard delivery. Balanced between wicket-taking and run prevention.',
			icon: <Crosshair className='w-5 h-5 text-green-400' />,
		},
		{
			name: 'Bumper',
			description:
				'Short-pitched delivery. Can surprise batsmen but risky if played well.',
			icon: <Bomb className='w-5 h-5 text-red-400' />,
		},
		{
			name: 'Yorker',
			description:
				'Full-length delivery. Hard to hit but difficult to bowl consistently.',
			icon: <Hammer className='w-5 h-5 text-yellow-400' />,
		},
	];

	return (
		<div className='grid p-4 sticky bottom-0 border-[0.1px] grid-cols-3 gap-4 space-y-4 w-full bg-slate-900/90 backdrop-blur-md rounded-xl shadow-lg border-t-2 border-slate-700'>
			<div className='col-span-3 flex gap-2 justify-between items-center'>
				<h2 className='text-center font-mono text-lg font-bold text-slate-200'>
					{gameState.gamePhase === 'batting'
						? 'Choose Your Shot'
						: 'Select Your Delivery'}
				</h2>
				<InfoDialog
					title={
						gameState.gamePhase === 'batting'
							? 'Batting Controls'
							: 'Bowling Controls'
					}
					description={
						gameState.gamePhase === 'batting'
							? 'Master these batting techniques to dominate the game and score big!'
							: 'Perfect these bowling styles to outsmart batsmen and take crucial wickets!'
					}
					controls={
						gameState.gamePhase === 'batting'
							? battingControls
							: bowlingControls
					}
				/>
			</div>

			{gameState.gamePhase === 'batting'
				? renderButtons(battingActions)
				: renderButtons(bowlingActions)}
		</div>
	);
}
