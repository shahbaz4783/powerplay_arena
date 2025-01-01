import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import {
	BattingStyle,
	BowlingType,
	GameParticipant,
	GameState,
	InningsInterface,
	RunOutcome,
} from '../types/gameState';

const GAME_STATE_KEY = 'cricketGameState';
const SECRET_KEY =
	process.env.NEXT_PUBLIC_GAME_STATE_SECRET_KEY || 'fallback-secret-key';

const initialState: GameState = {
	matchId: '',
	transactionId: '',
	gamePhase: 'toss',
	currentInnings: 1,
	target: null,

	gameControls: {
		loft: 6,
		yorker: 6,
	},
	currentOver: {
		loftUsed: 0,
		yorkerUsed: 0,
	},

	matchSetup: {
		format: 'BLITZ',
		entryFee: 50,
		passRequired: 2,
		overs: 2,
		totalWickets: 2,
		rewards: {
			four: 4,
			six: 6,
			runMargin: 10,
			wicket: 20,
		},
	},
	toss: {
		winner: null,
		choice: null,
		playMode: null,
	},
	player: {
		runs: 0,
		wickets: 0,
		ballsFaced: 0,
		oversPlayed: '0.0',
		fours: 0,
		sixes: 0,
		runRate: '0.00',
		overInfo: [],
	},
	opponent: {
		runs: 0,
		wickets: 0,
		ballsFaced: 0,
		oversPlayed: '0.0',
		fours: 0,
		sixes: 0,
		runRate: '0.00',
		overInfo: [],
	},
	matchResult: {
		winner: null,
		margin: null,
		marginType: null,
	},
	achievements: [],
};

const encryptState = (state: GameState): string => {
	return CryptoJS.AES.encrypt(JSON.stringify(state), SECRET_KEY).toString();
};

const decryptState = (encryptedState: string): GameState => {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedState, SECRET_KEY);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		console.error('Failed to decrypt game state:', error);
		return initialState;
	}
};

const getGameState = (): GameState => {
	if (typeof window !== 'undefined') {
		const encryptedState = localStorage.getItem(GAME_STATE_KEY);
		return encryptedState ? decryptState(encryptedState) : initialState;
	}
	return initialState;
};

const setGameState = (state: GameState): Promise<GameState> => {
	if (typeof window !== 'undefined') {
		const encryptedState = encryptState(state);
		localStorage.setItem(GAME_STATE_KEY, encryptedState);
	}
	return Promise.resolve(state);
};

const clearGameState = (): Promise<void> => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(GAME_STATE_KEY);
	}
	return Promise.resolve();
};

const validateGameState = (state: GameState): GameState => {
	const validatedState = { ...state };

	if (validatedState.player.runs < 0) validatedState.player.runs = 0;
	if (validatedState.player.wickets < 0) validatedState.player.wickets = 0;
	if (validatedState.player.wickets > validatedState.matchSetup.totalWickets) {
		validatedState.player.wickets = validatedState.matchSetup.totalWickets;
	}
	return validatedState;
};

export const useCricketGameState = () => {
	const queryClient = useQueryClient();

	const { data: gameState } = useQuery({
		queryKey: [GAME_STATE_KEY],
		queryFn: getGameState,
		initialData: initialState,
	});

	const updateGameState = useMutation({
		mutationFn: (newState: Partial<GameState>) => {
			const updatedState = validateGameState({ ...gameState, ...newState });
			return setGameState(updatedState);
		},
		onSuccess: (data) => {
			queryClient.setQueryData([GAME_STATE_KEY], data);
		},
	});

	 const updateInnings = (
			inningsType: GameParticipant,
			runOutcome: RunOutcome,
			action: BattingStyle | BowlingType
		) => {
			const currentInnings = gameState[inningsType];
			const newBallsFaced = currentInnings.ballsFaced + 1;
			const newOversPlayed = `${Math.floor(newBallsFaced / 6)}.${
				newBallsFaced % 6
			}`;

			const newOverInfo = [...currentInnings.overInfo, runOutcome];

			const newStats: InningsInterface = {
				...currentInnings,
				runs:
					runOutcome > 0
						? currentInnings.runs + runOutcome
						: currentInnings.runs,
				wickets:
					runOutcome === -1
						? currentInnings.wickets + 1
						: currentInnings.wickets,
				ballsFaced: newBallsFaced,
				runRate: (
					(currentInnings.runs + (runOutcome > 0 ? runOutcome : 0)) /
					(newBallsFaced / 6)
				).toFixed(2),
				oversPlayed: newOversPlayed,
				fours:
					runOutcome === 4 ? currentInnings.fours + 1 : currentInnings.fours,
				sixes:
					runOutcome === 6 ? currentInnings.sixes + 1 : currentInnings.sixes,
				overInfo: newOverInfo,
			};

			let newCurrentOver = { ...gameState.currentOver };
			if (action === 'aggressive') {
				newCurrentOver.loftUsed += 1;
			} else if (action === 'yorker') {
				newCurrentOver.yorkerUsed += 1;
			}

			// Reset currentOver if a new over starts
			if (newBallsFaced % 6 === 0) {
				newCurrentOver = {
					loftUsed: 0,
					yorkerUsed: 0,
				};
			}

			updateGameState.mutate({
				[inningsType]: newStats,
				currentOver: newCurrentOver,
			});
		};

	const resetGameState = useMutation({
		mutationFn: clearGameState,
		onSuccess: () => {
			queryClient.setQueryData([GAME_STATE_KEY], initialState);
		},
	});

	return {
		gameState,
		updateGameState: updateGameState.mutate,
		updateInnings,
		resetGameState: resetGameState.mutate,
	};
};
