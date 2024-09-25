"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { GameControls } from "./game-controls";
import { Commentary } from "./commentary";
import { ScoreBoard } from "./scoreboard";
import { OverInfo } from "./over-info";
import { ChaseSummary } from "./chase-summary";

export function Gameplay() {
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
