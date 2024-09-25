"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { useCricketGameState } from "@/src/lib/store";
import { ChaseSummary } from "./chase-summary";
import { getCurrentInningsData } from "@/src/lib/game-logics";

export function Gameplay() {
  const { gameState, updateGameState } = useCricketGameState();
  const {
    currentInnings,
    matchSetup: { overs, totalWickets },
  } = gameState;

  const maxBalls = overs * 6;

  useEffect(() => {
    checkInningsEnd();
  });

  const checkInningsEnd = () => {
    const currentInningsData = getCurrentInningsData(gameState);

    if (
      currentInningsData.ballsFaced >= maxBalls ||
      currentInningsData.wickets >= totalWickets
    ) {
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
    const playMode = gameState.toss.playMode;

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

      gameState.player.ballsFaced === 30 ||
        (gameState.player.wickets === 5 &&
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

      gameState.opponent.ballsFaced === 30 ||
        (gameState.opponent.wickets === 5 &&
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
    <main className="min-h-svh flex flex-col justify-between p-4">
      <section className="space-y-6">
        <ScoreBoard />
        <OverInfo />
        <Commentary />
      </section>
      <ChaseSummary />
      <section>
        <GameControls />
      </section>
    </main>
  );
}
