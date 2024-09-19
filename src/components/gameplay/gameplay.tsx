"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { CommentaryEvent } from "@/src/lib/types";
import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { useCricketGameState } from "@/src/lib/store";
import { InningsInterface } from "@/src/types/gameState";

export function Gameplay() {
  const [showInningsMessage, setShowInningsMessage] = useState(false);
  const [inningsMessage, setInningsMessage] = useState("");
  const [commentary, setCommentary] = useState<CommentaryEvent>("start");
  const [ballResult, setBallResult] = useState<string | null>(null);

  const { gameState, updateGameState } = useCricketGameState();

  const { currentInnings, gamePhase, target, playerInnings, opponentInnings } =
    gameState;

  const maxWickets = 5;
  const maxBalls = 30;

  useEffect(() => {
    checkInningsEnd();
  });

  const checkInningsEnd = () => {
    const currentInningsData =
      gamePhase === "batting" ? playerInnings : opponentInnings;

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
    const target =
      (gamePhase === "batting" ? playerInnings.runs : opponentInnings.runs) + 1;
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
    const playerWon = playerInnings.runs > opponentInnings.runs;
    const margin = Math.abs(playerInnings.runs - opponentInnings.runs);
    const result = playerWon
      ? "win"
      : playerInnings.runs === opponentInnings.runs
        ? "tie"
        : "loss";

    updateGameState({
      gamePhase: "result",
      matchResult: result,
      resultMargin: { runs: margin },
    });

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

      <section>
        <GameControls />
      </section>
    </main>
  );
}
