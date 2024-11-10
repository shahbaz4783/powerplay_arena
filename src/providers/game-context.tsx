"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { GameState } from '@/src/types/types';

type Action =
  | { type: "UPDATE_GAME_STATE"; payload: Partial<GameState> }
  | { type: "ADD_COMMENTARY"; payload: string };

type Dispatch = (action: Action) => void;

const GameStateContext = createContext<GameState | undefined>(undefined);
const GameDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: GameState = {
  gamePhase: "toss",
  tossWinner: null,
  tossChoice: null,
  currentInnings: 1,
  playerScore: 0,
  computerAIScore: 0,
  wickets: 0,
  overs: 0,
  balls: 0,
  target: null,
  playerStats: {
    runs: 0,
    ballsFaced: 0,
    fours: 0,
    sixes: 0,
    strikeRate: 0,
  },
  bowlingStats: {
    wicketsTaken: 0,
    oversBowled: 0,
    runsConceded: 0,
    economy: 0,
  },
  matchResult: null,
  winMargin: null,
  entryFee: 50,
  dotBalls: 0,
  achievements: [],
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "UPDATE_GAME_STATE":
      const updatedState = { ...state, ...action.payload };
      // Update derived statistics
      if ("playerStats" in action.payload || "bowlingStats" in action.payload) {
        updatedState.playerStats.strikeRate =
          updatedState.playerStats.ballsFaced > 0
            ? (updatedState.playerStats.runs /
                updatedState.playerStats.ballsFaced) *
              100
            : 0;
        updatedState.bowlingStats.economy =
          updatedState.bowlingStats.oversBowled > 0
            ? updatedState.bowlingStats.runsConceded /
              updatedState.bowlingStats.oversBowled
            : 0;
      }
      return updatedState;
    default:
      throw new Error(`Unhandled action type`);
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
}

export function useGameDispatch() {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a GameProvider");
  }
  return context;
}
