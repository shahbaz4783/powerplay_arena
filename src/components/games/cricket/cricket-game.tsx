'use client';

import { useEffect, useCallback, useState, useMemo } from 'react';
import { Gameplay } from './gameplay';
import { MidInnings } from './mid-innings';
import { Result } from './result';
import { Toss } from './toss';
import { useCricketGameState } from '@/src/lib/store';
import { getCurrentInningsData } from '@/src/lib/game-logics';
import { updateMatchData } from '@/src/actions/game.action';
import { Toast } from '../../common/elements/toast';

export default function CricketGame() {
	const { gameState, updateGameState } = useCricketGameState();
	const [rewards, setRewards] = useState<number | null>(null);

	const [toastMessage, setToastMessage] = useState<{
		message: string;
		type: 'info' | 'success';
	} | null>(null);
	const {
		currentInnings,
		matchSetup: { overs, totalWickets },
		toss: { playMode },
		gamePhase,
		matchId,
	} = gameState;

	const handleGameOver = useCallback(async () => {
		setToastMessage({ message: 'Saving your match data...', type: 'info' });
		try {
			const result = await updateMatchData(matchId, gameState);
			if (result.success) {
				setToastMessage({
					message: result.message,
					type: 'success',
				});
				if (result.rewards) {
					setRewards(result.rewards);
				}
			} else if (!result.success) {
				setToastMessage({
					message: result.message,
					type: 'info',
				});
			} else {
				setToastMessage({
					message: 'Failed to save match data. Please try again.',
					type: 'info',
				});
			}
		} catch (error) {
			setToastMessage({
				message: 'An error occurred while saving. Please try again.',
				type: 'info',
			});
		}
	}, [matchId, gameState]);

	const currentInningsData = useMemo(
		() => getCurrentInningsData(gameState),
		[gameState]
	);

	const isInningsOver = useMemo(
		() =>
			currentInningsData.ballsFaced >= overs * 6 ||
			currentInningsData.wickets >= totalWickets,
		[currentInningsData, overs, totalWickets]
	);

	useEffect(() => {
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

		checkInningsEnd();

		if (gamePhase === 'result') {
			handleGameOver();
		}
	}, [
		gamePhase,
		handleGameOver,
		matchId,
		gameState,
		currentInnings,
		isInningsOver,
		currentInningsData.runs,
	]);

	const checkMatchResult = useCallback(() => {
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
	}, [
		gameState,
		isInningsOver,
		playMode,
		overs,
		totalWickets,
		updateGameState,
	]);

	return (
		<div className='flex flex-col justify-between min-h-svh p-3 bg-gray-900'>
			<main className='flex-grow overflow-auto flex flex-col justify-between'>
				{gameState.gamePhase === 'toss' && <Toss />}
				{(gameState.gamePhase === 'batting' ||
					gameState.gamePhase === 'bowling') && <Gameplay />}
				{gameState.gamePhase === 'inningsOver' && <MidInnings />}
				{gameState.gamePhase === 'result' && <Result rewards={rewards} />}
			</main>
			{toastMessage && (
				<Toast message={toastMessage.message} type={toastMessage.type} />
			)}
		</div>
	);
}
