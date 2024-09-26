import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GameParticipant,
  GameState,
  InningsInterface,
  RunOutcome,
} from "../types/gameState";
import { saveMatchDataToDatabase } from "../actions/game.action";
import { useInitData } from "@telegram-apps/sdk-react";

const GAME_STATE_KEY = "cricketGameState";

const initialState: GameState = {
  gamePhase: "quick-setup",
  currentInnings: 1,
  target: null,

  matchSetup: {
    format: "blitz",
    entryFee: 50,
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
    oversPlayed: "0.0",
    fours: 0,
    sixes: 0,
    runRate: "0.00",
    overInfo: [],
  },

  opponent: {
    runs: 0,
    wickets: 0,
    ballsFaced: 0,
    oversPlayed: "0.0",
    fours: 0,
    sixes: 0,
    runRate: "0.00",
    overInfo: [],
  },

  matchResult: {
    winner: null,
    margin: null,
    marginType: null,
  },

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

const clearGameState = (): Promise<void> => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(GAME_STATE_KEY);
  }
  return Promise.resolve();
};

export const useCricketGameState = () => {
  const queryClient = useQueryClient();
  const initData = useInitData();
  const userId = initData?.user?.id;

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

  const updateInnings = (
    inningsType: GameParticipant,
    runOutcome: RunOutcome,
  ) => {
    const currentInnings = gameState[inningsType];
    const newBallsFaced = currentInnings.ballsFaced + 1;
    const newOversPlayed = `${Math.floor(newBallsFaced / 6)}.${newBallsFaced % 6}`;

    const newOverInfo = [...currentInnings.overInfo];
    newOverInfo.push(runOutcome);

    const newStats: InningsInterface = {
      ...currentInnings,
      runs:
        runOutcome > 0 ? currentInnings.runs + runOutcome : currentInnings.runs,
      wickets:
        runOutcome === -1 ? currentInnings.wickets + 1 : currentInnings.wickets,
      ballsFaced: newBallsFaced,
      runRate: (
        (currentInnings.runs + (runOutcome > 0 ? runOutcome : 0)) /
        (newBallsFaced / 6)
      ).toFixed(2),
      oversPlayed: newOversPlayed,
      fours: runOutcome === 4 ? currentInnings.fours + 1 : currentInnings.fours,
      sixes: runOutcome === 6 ? currentInnings.sixes + 1 : currentInnings.sixes,
      overInfo: newOverInfo,
    };

    updateGameState.mutate({
      [inningsType]: newStats,
    });
  };

  const endMatchAndClaimReward = async () => {
    try {
      if (!userId) throw new Error("User ID not found");
      await saveMatchDataToDatabase(gameState, BigInt(userId));
      await clearGameState();

      queryClient.setQueryData([GAME_STATE_KEY], initialState);

      console.log("Match ended, reward claimed, and state cleared");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.error("Error ending match and claiming reward:");
      }
    }
  };

  return {
    gameState,
    updateGameState: updateGameState.mutate,
    updateInnings,
    endMatchAndClaimReward,
  };
};
