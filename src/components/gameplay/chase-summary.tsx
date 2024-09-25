"use client";

import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";

export function ChaseSummary() {
  const { gameState } = useCricketGameState();
  if (gameState.currentInnings === 1) return null;
  if (!gameState.target) return null;

  const {
    matchSetup: { overs, totalWickets },
  } = gameState;

  const { ballsFaced, runs } = getCurrentInningsData(gameState);

  return (
    <section className="p-4 bg-slate-800/50 backdrop-blur-md rounded-xl space-y-6">
      <div className="flex justify-between">
        <div className="text-gray-300 space-x-1">
          <span className="text-sm text-slate-400">Target</span>
          <span className="text-2xl font-bold">{gameState.target}</span>
        </div>
        <div className="space-x-1">
          <span className="text-xs text-slate-400">Req. Run Rate:</span>
          <span className="text-2xl font-bold">
            {(
              (gameState.target - runs) /
              ((overs * 6 - ballsFaced) / 6)
            ).toFixed(2)}
          </span>
        </div>
      </div>
      <p className="text-center text-slate-400">
        Need{" "}
        <span className="text-xl font-bold text-white">
          {gameState.target - runs}
        </span>{" "}
        runs from{" "}
        <span className="text-xl font-bold text-white">
          {overs * 6 - ballsFaced}
        </span>{" "}
        balls
      </p>
    </section>
  );
}
