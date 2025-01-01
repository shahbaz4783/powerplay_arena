import { useState } from 'react';
import { Swords, Shield, Target, Crosshair, Bomb, Hammer } from 'lucide-react';
import { InfoDialog } from '../../common/dialog/cricket-control';
import {
	BattingStyle,
	BowlingType,
	GameParticipant,
} from '@/src/types/gameState';
import {
	calculateRunsScored,
	getOpponentBattingStrategy,
	opponentBowling,
} from '@/src/lib/game-logics';
import { useCricketGameState } from '@/src/lib/store';
import { ActionButton } from './control.buttons';

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

	const actions =
		gameState.gamePhase === 'batting'
			? (['aggressive', 'normal', 'defensive'] as BattingStyle[])
			: (['seam', 'bouncer', 'yorker'] as BowlingType[]);

	return (
		<section className='sticky bottom-3 main-card'>
			<div className='relative flex items-center justify-between mb-3'>
				<div>
					<h2 className='text-lg font-bold text-slate-100'>
						{gameState.gamePhase === 'batting'
							? 'You are batting'
							: 'You are bowling'}
					</h2>
					<div className='h-0.5 w-12 bg-gradient-to-r from-slate-500 to-transparent rounded-full' />
				</div>
				<InfoDialog gameState={gameState} />
			</div>

			{/* Game Control Buttons */}
			<div className='relative grid grid-cols-3 gap-3'>
				{actions.map((action) => {
					const details = getActionDetails(action);
					const usageCount =
						action === 'aggressive'
							? gameState.currentOver.loftUsed
							: action === 'yorker'
							? gameState.currentOver.yorkerUsed
							: undefined;
					const maxUses =
						action === 'aggressive'
							? gameState.gameControls.loft
							: action === 'yorker'
							? gameState.gameControls.yorker
							: undefined;

					return (
						<ActionButton
							key={action}
							icon={details.icon}
							label={details.label}
							disabled={disableControls || isActionDisabled(action)}
							onClick={() => handleAction(action)}
							usageCount={usageCount}
							maxUses={maxUses}
							isAnimating={disableControls}
						/>
					);
				})}
			</div>
		</section>
	);
}

const getActionDetails = (
	action: GameAction
): {
	icon: React.ReactNode;
	label: string;
} => {
	const details = {
		aggressive: {
			icon: <Swords className='size-8 text-rose-400' />,
			label: 'Loft',
		},
		normal: {
			icon: <Target className='size-8 text-emerald-400' />,
			label: 'Drive',
		},
		defensive: {
			icon: <Shield className='size-8 text-sky-400' />,
			label: 'Guard',
		},
		seam: {
			icon: <Crosshair className='size-8 text-violet-400' />,
			label: 'Seam',
		},
		bouncer: {
			icon: <Bomb className='size-8 text-amber-400' />,
			label: 'Bouncer',
		},
		yorker: {
			icon: <Hammer className='size-8 text-indigo-400' />,
			label: 'Yorker',
		},
	};
	return details[action];
};
