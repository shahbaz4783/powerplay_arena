"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { CommentaryEvent } from "@/src/lib/types";
import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { useCricketGameState } from "@/src/lib/store";
import { ChaseSummary } from "./chase-summary";
import { GameParticipant, MarginType } from "@/src/types/gameState";

export function Gameplay() {
  const [showInningsMessage, setShowInningsMessage] = useState(false);
  const [inningsMessage, setInningsMessage] = useState("");
  const [commentary, setCommentary] = useState<CommentaryEvent>("start");
  const [ballResult, setBallResult] = useState<string | null>(null);

  const { gameState, updateGameState } = useCricketGameState();

  const { currentInnings, gamePhase, target, player, opponent } = gameState;

  const maxWickets = 5;
  const maxBalls = 30;

  useEffect(() => {
    checkInningsEnd();
  });

  const checkInningsEnd = () => {
    const currentInningsData = gamePhase === "batting" ? player : opponent;

    if (
      currentInningsData.ballsFaced >= maxBalls ||
      currentInningsData.wickets >= maxWickets
    ) {
      if (currentInnings === 1) {
        endFirstInnings();
      } else {
        endSecondInnings();
      }
    }
  };

  const endFirstInnings = () => {
    const target = (gamePhase === "batting" ? player.runs : opponent.runs) + 1;
    setInningsMessage(`First innings over. Target: ${target} runs`);
    setShowInningsMessage(true);

    setTimeout(() => {
      setShowInningsMessage(false);
      updateGameState({
        currentInnings: 2,
        target: target,
        gamePhase: gamePhase === "batting" ? "bowling" : "batting",
      });
    }, 5000);
  };

  const endSecondInnings = () => {
    let winner: GameParticipant;
    const playerWon = player.runs > opponent.runs;
    const margin = Math.abs(player.runs - opponent.runs);
    const result = playerWon
      ? "win"
      : player.runs === opponent.runs
        ? "tie"
        : "loss";

    const playMode = gameState.toss.playMode;

    if (playMode === "chase") {
      gameState.player.runs > gameState.opponent.runs &&
        updateGameState({
          gamePhase: "result",
          matchResult: {
            winner: "player",
            marginType: "wickets",
            margin: 5 - gameState.player.wickets,
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

    setInningsMessage(
      result === "tie"
        ? "The match ended in a tie!"
        : `You ${result} by ${margin} runs!`,
    );
    setShowInningsMessage(true);
  };

  if (showInningsMessage) {
    return (
      <Card className="bg-yellow-900">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <p className="text-2xl font-bold text-center">{inningsMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="min-h-svh flex flex-col justify-between p-4">
      <section className="space-y-6">
        <ScoreBoard />
        <OverInfo currentOverData={[]} />
        <Commentary event={commentary} ballResult={ballResult} />
      </section>

      <ChaseSummary />

      <section>
        <GameControls />
      </section>
    </main>
  );
}
