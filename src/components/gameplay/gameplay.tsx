"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { CommentaryEvent } from "@/src/lib/types";
import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { useCricketGameState } from "@/src/lib/store";

export function Gameplay() {
  const [showInningsMessage, setShowInningsMessage] = useState(false);
  const [inningsMessage, setInningsMessage] = useState("");
  const [commentary, setCommentary] = useState<CommentaryEvent>("start");
  const [disableControls, setDisableControls] = useState(false);
  const [ballResult, setBallResult] = useState<string | null>(null);

  const { gameState, updateGameState } = useCricketGameState();

  const { currentInnings, gamePhase, target } = gameState;

  const totalOvers = 5;
  const maxWickets = 5;

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
        <div className="flex justify-between text-sm text-gray-300">
          <span>Run Rate: </span>
        </div>
        <OverInfo currentOverData={[]} />
        <Commentary event={commentary} ballResult={ballResult} />
      </section>

      <section>
        <GameControls />
      </section>
    </main>
  );
}
