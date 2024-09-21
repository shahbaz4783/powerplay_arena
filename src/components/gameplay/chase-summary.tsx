"use client";

import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";

export function ChaseSummary() {
  const { gameState } = useCricketGameState();

  const { ballsFaced, runs } = getCurrentInningsData(gameState);

  return (
    <section>
      <div>
        <div className="text-sm text-gray-300">
          <span>Target: {gameState.target}</span>
          <span className="ml-4">
            Required Run Rate:{" "}
            {gameState.target &&
              ((gameState.target - runs) / ((30 - ballsFaced) / 6)).toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
}
