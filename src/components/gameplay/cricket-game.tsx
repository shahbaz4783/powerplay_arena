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

  const currentInningsData = getCurrentInningsData(gameState);

  const isInningsOver =
    currentInningsData.ballsFaced >= overs * 6 ||
    currentInningsData.wickets >= totalWickets;

  const checkInningsEnd = () => {
    if (currentInnings === 1) {
      if (isInningsOver) {
        updateGameState({
          target: currentInningsData.runs + 1,
          gamePhase: "inningsOver",
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
          gamePhase: "result",
          matchResult: {
            winner: "tie",
            marginType: null,
            margin: null,
          },
        });
        return;
      }
    }

    if (playMode === "chase") {
      if (player.runs > opponent.runs) {
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "player",
            marginType: "wickets",
            margin: totalWickets - player.wickets,
          },
        });
      } else if (
        player.ballsFaced === overs * 6 ||
        player.wickets === totalWickets
      ) {
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "opponent",
            marginType: "runs",
            margin: opponent.runs - player.runs,
          },
        });
      }
    } else if (playMode === "defend") {
      if (opponent.runs > target! - 1) {
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "opponent",
            marginType: "wickets",
            margin: totalWickets - opponent.wickets,
          },
        });
      } else if (
        opponent.ballsFaced === overs * 6 ||
        opponent.wickets === totalWickets
      ) {
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "player",
            marginType: "runs",
            margin: target! - 1 - opponent.runs,
          },
        });
      }
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
