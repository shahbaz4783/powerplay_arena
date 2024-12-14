'use client';

import { useEffect, useCallback, useState } from 'react';
import { Gameplay } from './gameplay';
import { MidInnings } from './mid-innings';
import { Result } from './result';
import { Toss } from './toss';
import { useCricketGameState } from '@/src/lib/store';
import { getCurrentInningsData } from '@/src/lib/game-logics';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { pingMatchStatus, updateMatchData } from '@/src/actions/game.action';

export default function CricketGame() {
	const { gameState, updateGameState } = useCricketGameState();
	const { telegramId } = useCurrentUser();
	const [rewards, setRewards] = useState<number | null>(null);
	const {
		currentInnings,
		matchSetup: { overs, totalWickets },
		toss: { playMode },
		gamePhase,
		matchId,
	} = gameState;

	const handleAbandonedGame = useCallback(async () => {
		try {
			const result = await updateMatchData(matchId, gameState, true);
			if (result.success) {
				console.log('Match marked as abandoned');
			} else {
				console.error('Failed to mark match as abandoned:', result.message);
			}
		} catch (error) {
			console.error('Error marking match as abandoned:', error);
		}
	}, [matchId, gameState]);

	const handleGameOver = useCallback(async () => {
		try {
			const result = await updateMatchData(matchId, gameState);
			if (result.success) {
				console.log('Match data updated successfully');
				if (result.rewards) {
					setRewards(result.rewards);
				}
			} else {
				console.error('Failed to update match data:', result.message);
			}
		} catch (error) {
			console.error('Error updating match data:', error);
		}
	}, [matchId, gameState]);

	useEffect(() => {
		checkInningsEnd();
	});

	useEffect(() => {
		if (gamePhase === 'result') {
			handleGameOver();
		}

		const saveInterval = setInterval(() => {
			pingMatchStatus(matchId, gameState);
		}, 100000);

		const handleBeforeUnload = () => {
			handleAbandonedGame();
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		// Cleanup function
		return () => {
			clearInterval(saveInterval);
			window.removeEventListener('beforeunload', handleBeforeUnload);
			if (gamePhase !== 'result') {
				handleAbandonedGame();
			}
		};
	}, [gamePhase, handleAbandonedGame, handleGameOver, matchId, gameState]);

	const currentInningsData = getCurrentInningsData(gameState);

	const isInningsOver =
		currentInningsData.ballsFaced >= overs * 6 ||
		currentInningsData.wickets >= totalWickets;

	const checkInningsEnd = () => {
		if (currentInnings === 1) {
			if (isInningsOver) {
				updateGameState({
					target: currentInningsData.runs + 1,
					gamePhase: 'inningsOver',
				});
			}
		} else {
			checkMatchResult();
		}
	};

	const checkMatchResult = () => {
		const { player, opponent, target } = gameState;

		// Check for Tie
		if (isInningsOver) {
			if (player.runs === opponent.runs) {
				updateGameState({
					gamePhase: 'result',
					matchResult: {
						winner: 'tie',
						marginType: null,
						margin: null,
					},
				});
				return;
			}
		}

		if (playMode === 'chase') {
			if (player.runs > opponent.runs) {
				updateGameState({
					gamePhase: 'result',
					matchResult: {
						winner: 'player',
						marginType: 'wickets',
						margin: totalWickets - player.wickets,
					},
				});
			} else if (
				player.ballsFaced === overs * 6 ||
				player.wickets === totalWickets
			) {
				updateGameState({
					gamePhase: 'result',
					matchResult: {
						winner: 'opponent',
						marginType: 'runs',
						margin: opponent.runs - player.runs,
					},
				});
			}
		} else if (playMode === 'defend') {
			if (opponent.runs > target! - 1) {
				updateGameState({
					gamePhase: 'result',
					matchResult: {
						winner: 'opponent',
						marginType: 'wickets',
						margin: totalWickets - opponent.wickets,
					},
				});
			} else if (
				opponent.ballsFaced === overs * 6 ||
				opponent.wickets === totalWickets
			) {
				updateGameState({
					gamePhase: 'result',
					matchResult: {
						winner: 'player',
						marginType: 'runs',
						margin: target! - 1 - opponent.runs,
					},
				});
			}
		}
	};

	return (
		<div className='flex flex-col justify-between min-h-svh p-3'>
			<main className='flex-grow overflow-auto flex flex-col justify-between'>
				{gameState.gamePhase === 'toss' && <Toss />}
				{(gameState.gamePhase === 'batting' ||
					gameState.gamePhase === 'bowling') && <Gameplay />}
				{gameState.gamePhase === 'inningsOver' && <MidInnings />}
				{gameState.gamePhase === 'result' && <Result rewards={rewards} />}
			</main>
		</div>
	);
}
