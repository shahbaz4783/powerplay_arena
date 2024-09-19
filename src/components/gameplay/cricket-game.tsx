"use client";

import { Gameplay } from "./gameplay";
import { Result } from "./result";
import { Toss } from "./toss";
import { useCricketGameState } from "@/src/lib/store";

export default function CricketGame() {
  const { gameState } = useCricketGameState();

  return (
    <div className="min-h-svh text-gray-100">
      <div className="flex flex-col justify-between min-h-[85svh]">
        <main className="flex-grow overflow-auto">
          {gameState.gamePhase === "toss" && <Toss />}
            
          {(gameState.gamePhase === "batting" ||
            gameState.gamePhase === "bowling") && <Gameplay />}
              
          {gameState.gamePhase === "result" && (
            <Result />
          )}
        </main>
      </div>
    </div>
  );
}
