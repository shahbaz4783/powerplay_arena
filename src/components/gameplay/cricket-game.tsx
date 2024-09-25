"use client";

import { useEffect } from "react";
import { QuickPlayMode } from "../game-modes/quick-play";
import { Gameplay } from "./gameplay";
import { MidInnings } from "./mid-innings";
import { Result } from "./result";
import { Toss } from "./toss";
import { useCricketGameState } from "@/src/lib/store";
import { getCurrentInningsData } from "@/src/lib/game-logics";

export default function CricketGame() {
  const { gameState, updateGameState } = useCricketGameState();
  const {
    currentInnings,
    matchSetup: { overs, totalWickets },
    toss: { playMode },
  } = gameState;

  useEffect(() => {
    checkInningsEnd();
  });

  const checkInningsEnd = () => {
    const currentInningsData = getCurrentInningsData(gameState);

    const isInningsOver =
      currentInningsData.ballsFaced >= overs * 6 ||
      currentInningsData.wickets >= totalWickets;

    if (isInningsOver) {
      if (currentInnings === 1) {
        updateGameState({
          target: currentInningsData.runs + 1,
          gamePhase: "inningsOver",
        });
      } else {
        checkMatchResult();
      }
    }
  };

  const checkMatchResult = () => {
    gameState.player.runs === gameState.opponent.runs &&
      updateGameState({
        gamePhase: "result",
        matchResult: {
          winner: "tie",
          marginType: null,
          margin: null,
        },
      });

    if (playMode === "chase") {
      gameState.player.runs > gameState.opponent.runs &&
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "player",
            marginType: "wickets",
            margin: totalWickets - gameState.player.wickets,
          },
        });

      gameState.player.ballsFaced === overs * 6 ||
        (gameState.player.wickets === totalWickets &&
          updateGameState({
            gamePhase: "result",
            matchResult: {
              winner: "opponent",
              marginType: "runs",
              margin: gameState.opponent.runs - gameState.player.runs,
            },
          }));
    }

    if (playMode === "defend") {
      gameState.opponent.runs > gameState.player.runs &&
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "opponent",
            marginType: "wickets",
            margin: 5 - gameState.opponent.wickets,
          },
        });

      gameState.opponent.ballsFaced === overs * 6 ||
        (gameState.opponent.wickets === totalWickets &&
          updateGameState({
            gamePhase: "result",
            matchResult: {
              winner: "player",
              marginType: "runs",
              margin: gameState.player.runs - gameState.opponent.runs,
            },
          }));
    }
  };

  return (
    <div className="min-h-svh text-gray-100">
      <div className="flex flex-col justify-between min-h-[85svh]">
        <main className="flex-grow overflow-auto">
          {gameState.gamePhase === "quick-setup" && <QuickPlayMode />}
          {gameState.gamePhase === "toss" && <Toss />}

          {(gameState.gamePhase === "batting" ||
            gameState.gamePhase === "bowling") && <Gameplay />}

          {gameState.gamePhase === "inningsOver" && <MidInnings />}

          {gameState.gamePhase === "result" && <Result />}
        </main>
      </div>
    </div>
  );
}
