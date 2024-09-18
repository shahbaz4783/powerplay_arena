import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GameState, InningsInterface } from "../types/gameState";

const GAME_STATE_KEY = "cricketGameState";

const initialState: GameState = {
  gamePhase: "toss",
  tossWinner: null,
  tossChoice: null,
  currentInnings: 1,
  target: null,
  entryFee: 0,

  playerInnings: {
    runs: 0,
    wickets: 0,
    ballsFaced: 0,
    fours: 0,
    sixes: 0,
    runRate: 0,
  },

  opponentInnings: {
    runs: 0,
    wickets: 0,
    ballsFaced: 0,
    fours: 0,
    sixes: 0,
    runRate: 0,
  },

  matchResult: null,
  resultMargin: null,
  achievements: [],
};

const getGameState = (): GameState => {
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem(GAME_STATE_KEY);
    return storedState ? JSON.parse(storedState) : initialState;
  }
  return initialState;
};

const setGameState = (state: GameState): Promise<GameState> => {
  if (typeof window !== "undefined") {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  }
  return Promise.resolve(state);
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
      const updatedState = setGameState({ ...gameState, ...newState });
      return updatedState;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([GAME_STATE_KEY], data);
    },
  });

  const updatePlayerInnings = (
    runs: number,
    wickets: number,
    isFour: boolean,
    isSix: boolean,
  ) => {
    const newStats: InningsInterface = {
      ...gameState.playerInnings,
      runs: gameState.playerInnings.runs + runs,
      wickets: gameState.playerInnings.wickets + wickets,
      ballsFaced: gameState.playerInnings.ballsFaced + 1,
      fours: isFour
        ? gameState.playerInnings.fours + 1
        : gameState.playerInnings.fours,
      sixes: isSix
        ? gameState.playerInnings.sixes + 1
        : gameState.playerInnings.sixes,
    };

    updateGameState.mutate({
      playerInnings: newStats,
    });
  };

  const updateOpponentInnings = (
    runs: number,
    wickets: number,
    isFour: boolean,
    isSix: boolean,
  ) => {
    const newStats: InningsInterface = {
      ...gameState.opponentInnings,
      runs: gameState.opponentInnings.runs + runs,
      wickets: gameState.opponentInnings.wickets + wickets,
      ballsFaced: gameState.opponentInnings.ballsFaced + 1,
      fours: isFour
        ? gameState.opponentInnings.fours + 1
        : gameState.opponentInnings.fours,
      sixes: isSix
        ? gameState.opponentInnings.sixes + 1
        : gameState.opponentInnings.sixes,
    };
    updateGameState.mutate({
      opponentInnings: newStats,
    });
  };

  return {
    gameState,
    updateGameState: updateGameState.mutate,
    updatePlayerInnings,
    updateOpponentInnings,
  };
};
