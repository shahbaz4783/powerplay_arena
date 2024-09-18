"use client";

import {
  calculateRunsScored,
  computerBowling,
  getOpponentBattingStrategy,
} from "@/src/lib/game-logics";
import ShinyButton from "../magicui/shiny-button";
import { useCricketGameState } from "@/src/lib/store";
import { useState } from "react";

export function GameControls() {
  const [disableControls, setDisableControls] = useState(false);
  const { gameState, updatePlayerInnings, updateOpponentInnings } =
    useCricketGameState();

  const handleBatting = (option: "normal" | "aggressive" | "defensive") => {
    setDisableControls(true);
    const runsScored = calculateRunsScored(option, computerBowling());

    if (runsScored === -1) {
      updatePlayerInnings(0, 1, false, false);
    } else {
      updatePlayerInnings(runsScored, 0, runsScored === 4, runsScored === 6);
    }

    setTimeout(() => {
      setDisableControls(false);
    }, 2000);
  };

  const handleBowling = (option: "normal" | "yorker" | "bouncer") => {
    setDisableControls(true);
    const opponentBattingStrategy = getOpponentBattingStrategy(
      gameState,
      option,
    );
    const runsScored = calculateRunsScored(opponentBattingStrategy, option);

    if (runsScored === -1) {
      updateOpponentInnings(0, 1, false, false);
    } else {
      updateOpponentInnings(runsScored, 0, runsScored === 4, runsScored === 6);
    }

    setTimeout(() => {
      setDisableControls(false);
    }, 2000);
  };

  return (
    <div className="grid p-4 sticky bottom-0 grid-cols-3 gap-4 w-full bg-slate-800/50 backdrop-blur-md rounded-xl">
      {gameState.gamePhase === "batting" ? (
        <>
          <ShinyButton
            onClick={() => handleBatting("aggressive")}
            className="w-full bg-red-300"
            text="Loft"
            disabled={disableControls}
          />
          <ShinyButton
            onClick={() => handleBatting("normal")}
            className="w-full bg-green-300"
            text="Stroke"
            disabled={disableControls}
          />
          <ShinyButton
            onClick={() => handleBatting("defensive")}
            className="w-full bg-slate-300"
            text="Push"
            disabled={disableControls}
          />
        </>
      ) : (
        <>
          <ShinyButton
            onClick={() => handleBowling("normal")}
            className="w-full bg-blue-300"
            text="Normal"
            disabled={disableControls}
          />
          <ShinyButton
            onClick={() => handleBowling("bouncer")}
            className="w-full bg-purple-300 "
            text="Bouncer"
            disabled={disableControls}
          />
          <ShinyButton
            onClick={() => handleBowling("yorker")}
            className="w-full bg-green-300 "
            text="Yorker"
            disabled={disableControls}
          />
        </>
      )}
    </div>
  );
}
