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

		updateInnings(battingTeam, runsScored, action);

		setTimeout(() => setDisableControls(false), 2000);
	};

	const isActionDisabled = (action: GameAction) => {
		if (action === 'aggressive') {
			return gameState.currentOver.loftUsed >= gameState.gameControls.loft;
		}
		if (action === 'yorker') {
			return gameState.currentOver.yorkerUsed >= gameState.gameControls.yorker;
		}
		return false;
	};

	const getActionIcon = (action: GameAction) => {
		switch (action) {
			case 'aggressive':
				return <Swords className='w-6 h-6' />;
			case 'normal':
				return <Target className='w-6 h-6' />;
			case 'defensive':
				return <Shield className='w-6 h-6' />;
			case 'seam':
				return <Crosshair className='w-6 h-6' />;
			case 'bouncer':
				return <Bomb className='w-6 h-6' />;
			case 'yorker':
				return <Hammer className='w-6 h-6' />;
		}
	};

	const getActionLabel = (action: GameAction): string => {
		switch (action) {
			case 'aggressive':
				return 'Loft';
			case 'normal':
				return 'Drive';
			case 'defensive':
				return 'Guard';
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

	const renderUsageDots = (action: GameAction) => {
		const maxUses =
			action === 'aggressive'
				? gameState.gameControls.loft
				: gameState.gameControls.yorker;
		const usedCount =
			action === 'aggressive'
				? gameState.currentOver.loftUsed
				: gameState.currentOver.yorkerUsed;

		return (
			<div className='flex justify-center mt-2'>
				{[...Array(maxUses)].map((_, index) => (
					<div
						key={index}
						className={cn(
							'w-2 h-2 rounded-full mx-1',
							index < usedCount ? 'bg-red-500' : 'bg-slate-400'
						)}
					/>
				))}
			</div>
		);
	};

	const renderButtons = (actions: GameAction[]) => (
		<div className='grid grid-cols-3 gap-4'>
			{actions.map((action) => (
				<motion.button
					key={action}
					onClick={() => handleAction(action)}
					whileTap={{ scale: 0.95 }}
					className={cn(
						'flex flex-col items-center justify-center p-4 rounded-lg',
						'bg-gradient-to-br from-slate-700 to-slate-800',
						'text-slate-200 shadow-lg transition-all duration-200',
						'disabled:opacity-50 disabled:cursor-not-allowed',
						{ 'animate-pulse': disableControls }
					)}
					disabled={disableControls || isActionDisabled(action)}
				>
					<div className='mb-2'>{getActionIcon(action)}</div>
					<span className='text-sm font-semibold'>
						{getActionLabel(action)}
					</span>
					{(action === 'aggressive' || action === 'yorker') && (
						<>
							{renderUsageDots(action)}
							
						</>
					)}
				</motion.button>
			))}
		</div>
	);

	const battingActions: BattingStyle[] = ['aggressive', 'normal', 'defensive'];
	const bowlingActions: BowlingType[] = ['seam', 'bouncer', 'yorker'];

	const controls =
		gameState.gamePhase === 'batting' ? battingActions : bowlingActions;

	const getActionDescription = (action: GameAction): string => {
		switch (action) {
			case 'aggressive':
				return 'High-risk, high-reward shot. Chance for boundaries but also wickets. Max 2 lofts allowed per over. Upgrade to increase limit!';
			case 'normal':
				return 'Balanced shot. Good chance for runs with moderate risk.';
			case 'defensive':
				return 'Low-risk shot. Reduces chance of getting out, but also limits scoring.';
			case 'seam':
				return 'Standard delivery. Balanced between wicket-taking and run prevention.';
			case 'bouncer':
				return 'Short-pitched delivery. Can surprise batsmen but risky if played well.';
			case 'yorker':
				return 'Full-length delivery. Hard to hit but difficult to bowl consistently. Max 2 yorkers allowed per over. Upgrade to increase limit!';
		}
	};

	return (
		<div className='main-card sticky bottom-3'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-bold text-slate-200'>
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
							? 'Master these batting techniques to dominate the game and score big! Upgrade your Loft ability to use it more often.'
							: 'Perfect these bowling styles to outsmart batsmen and take crucial wickets! Upgrade your Yorker ability to use it more frequently.'
					}
					controls={controls.map((action) => ({
						name: getActionLabel(action),
						description: getActionDescription(action),
						icon: getActionIcon(action),
					}))}
				/>
			</div>
			{renderButtons(controls)}
		</div>
	);
}
