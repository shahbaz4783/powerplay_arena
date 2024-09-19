"use client";

import { useState } from "react";
import {
  calculateRunsScored,
  computerBowling,
  getOpponentBattingStrategy,
} from "@/src/lib/game-logics";
import ShinyButton from "../magicui/shiny-button";
import { useCricketGameState } from "@/src/lib/store";

// Define types for the game actions
type BattingAction = "aggressive" | "normal" | "defensive";
type BowlingAction = "normal" | "yorker" | "bouncer";
type GameAction = BattingAction | BowlingAction;

export function GameControls() {
  const [disableControls, setDisableControls] = useState(false);
  const { gameState, updatePlayerInnings, updateOpponentInnings } =
    useCricketGameState();

  const handleAction = (action: GameAction) => {
    setDisableControls(true);
    const isBatting = gameState.gamePhase === "batting";
    const runsScored = isBatting
      ? calculateRunsScored(action as BattingAction, computerBowling())
      : calculateRunsScored(
          getOpponentBattingStrategy(gameState, action as BowlingAction),
          action as BowlingAction,
        );

    const updateInnings = isBatting
      ? updatePlayerInnings
      : updateOpponentInnings;

    if (runsScored === -1) {
      updateInnings(0, 1, false, false);
    } else {
      updateInnings(runsScored, 0, runsScored === 4, runsScored === 6);
    }

    setTimeout(() => setDisableControls(false), 2000);
  };

  const renderButtons = (actions: GameAction[], colors: string[]) => (
    <>
      {actions.map((action, index) => (
        <ShinyButton
          key={action}
          onClick={() => handleAction(action)}
          className={`w-full ${colors[index]}`}
          text={action.charAt(0).toUpperCase() + action.slice(1)}
          disabled={disableControls}
        />
      ))}
    </>
  );

  const battingActions: BattingAction[] = ["aggressive", "normal", "defensive"];
  const bowlingActions: BowlingAction[] = ["normal", "bouncer", "yorker"];
  const colors = ["bg-red-300", "bg-green-300", "bg-slate-300"];

  return (
    <div className="grid p-4 sticky bottom-0 grid-cols-3 gap-4 w-full bg-slate-800/50 backdrop-blur-md rounded-xl">
      {gameState.gamePhase === "batting"
        ? renderButtons(battingActions, colors)
        : renderButtons(bowlingActions, colors)}
    </div>
  );
}
