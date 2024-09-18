import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GameState, PlayerStats, BowlingStats } from "../types/gameState";

const GAME_STATE_KEY = "cricketGameState";

const initialState: GameState = {
  gamePhase: "toss",
  tossWinner: null,
  tossChoice: null,
  currentInnings: 1,
  entryFee: 0,
  playerScore: 0,
  computerAIScore: 0,
  target: null,
  playerWickets: 0,
  computerAIWickets: 0,
  overs: 0,
  balls: 0,
  dotBalls: 0,
  playerStats: { runs: 0, ballsFaced: 0, fours: 0, sixes: 0, strikeRate: 0 },
  computerAIStats: {
    runs: 0,
    ballsFaced: 0,
    fours: 0,
    sixes: 0,
    strikeRate: 0,
  },
  playerBowlingStats: {
    wicketsTaken: 0,
    oversBowled: 0,
    runsConceded: 0,
    economy: 0,
  },
  computerAIBowlingStats: {
    wicketsTaken: 0,
    oversBowled: 0,
    runsConceded: 0,
    economy: 0,
  },
  matchResult: null,
  winMargin: null,
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

  const updatePlayerStats = (runs: number, isFour: boolean, isSix: boolean) => {
    const newStats: PlayerStats = {
      ...gameState.playerStats,
      runs: gameState.playerStats.runs + runs,
      ballsFaced: gameState.playerStats.ballsFaced + 1,
      fours: isFour
        ? gameState.playerStats.fours + 1
        : gameState.playerStats.fours,
      sixes: isSix
        ? gameState.playerStats.sixes + 1
        : gameState.playerStats.sixes,
    };
    newStats.strikeRate = (newStats.runs / newStats.ballsFaced) * 100;
    updateGameState.mutate({
      playerScore: gameState.playerScore + runs,
      playerStats: newStats,
      balls: gameState.balls + 1,
      overs: Math.floor((gameState.balls + 1) / 6),
      dotBalls: runs === 0 ? gameState.dotBalls + 1 : gameState.dotBalls,
    });
  };

  const updateComputerAIStats = (
    runs: number,
    isFour: boolean,
    isSix: boolean,
  ) => {
    const newStats: PlayerStats = {
      ...gameState.computerAIStats,
      runs: gameState.computerAIStats.runs + runs,
      ballsFaced: gameState.computerAIStats.ballsFaced + 1,
      fours: isFour
        ? gameState.computerAIStats.fours + 1
        : gameState.computerAIStats.fours,
      sixes: isSix
        ? gameState.computerAIStats.sixes + 1
        : gameState.computerAIStats.sixes,
    };
    newStats.strikeRate = (newStats.runs / newStats.ballsFaced) * 100;
    updateGameState.mutate({
      computerAIScore: gameState.computerAIScore + runs,
      computerAIStats: newStats,
      balls: gameState.balls + 1,
      overs: Math.floor((gameState.balls + 1) / 6),
      dotBalls: runs === 0 ? gameState.dotBalls + 1 : gameState.dotBalls,
    });
  };

  const updatePlayerBowlingStats = (wickets: number, runs: number) => {
    const newStats: BowlingStats = {
      ...gameState.playerBowlingStats,
      wicketsTaken: gameState.playerBowlingStats.wicketsTaken + wickets,
      oversBowled: (gameState.balls + 1) / 6,
      runsConceded: gameState.playerBowlingStats.runsConceded + runs,
    };
    newStats.economy = newStats.runsConceded / newStats.oversBowled;
    updateGameState.mutate({
      computerAIWickets: gameState.computerAIWickets + wickets,
      playerBowlingStats: newStats,
    });
  };

  const updateComputerAIBowlingStats = (wickets: number, runs: number) => {
    const newStats: BowlingStats = {
      ...gameState.computerAIBowlingStats,
      wicketsTaken: gameState.computerAIBowlingStats.wicketsTaken + wickets,
      oversBowled: (gameState.balls + 1) / 6,
      runsConceded: gameState.computerAIBowlingStats.runsConceded + runs,
    };
    newStats.economy = newStats.runsConceded / newStats.oversBowled;
    updateGameState.mutate({
      playerWickets: gameState.playerWickets + wickets,
      computerAIBowlingStats: newStats,
    });
  };

  return {
    gameState,
    updateGameState: updateGameState.mutate,
    updatePlayerStats,
    updateComputerAIStats,
    updatePlayerBowlingStats,
    updateComputerAIBowlingStats,
  };
};
