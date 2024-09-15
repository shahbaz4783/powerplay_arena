"use client";

import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";
import { motion } from "framer-motion";
import ShinyButton from "../magicui/shiny-button";

interface GameControlsProps {
  gameState: GameState;
  handleBatting: any;
  handleBowling: any;
  disabled: boolean;
}

export function GameControls({
  gameState,
  handleBatting,
  handleBowling,
  disabled,
}: GameControlsProps) {
  return (
    <div className="grid p-4 sticky bottom-0 grid-cols-3 gap-4 w-full bg-slate-800/50 backdrop-blur-md rounded-xl">
      {gameState.gamePhase === "batting" ? (
        <>
          <ShinyButton
            onClick={() => handleBatting("aggressive")}
            className="w-full bg-red-300"
            text="Loft"
            disabled={disabled}
          />
          <ShinyButton
            onClick={() => handleBatting("normal")}
            className="w-full bg-green-300"
            text="Stroke"
            disabled={disabled}
          />
          <ShinyButton
            onClick={() => handleBatting("defensive")}
            className="w-full bg-slate-300"
            text="Push"
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <ShinyButton
            onClick={() => handleBowling("normal")}
            className="w-full bg-blue-300"
            text="Normal"
            disabled={disabled}
          />
          <ShinyButton
            onClick={() => handleBowling("bouncer")}
            className="w-full bg-purple-300"
            text="Bouncer"
            disabled={disabled}
          />
          <ShinyButton
            onClick={() => handleBowling("yorker")}
            className="w-full bg-green-300"
            text="Yorker"
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
}
