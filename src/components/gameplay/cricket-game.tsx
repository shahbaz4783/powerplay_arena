"use client";

import { useState, useEffect } from "react";
import { Gameplay } from "./gameplay";
import { Result } from "./result";
import { Commentary } from "./commentary";
import { Toss } from "./toss";
import { GameState } from "@/src/lib/types";
import { QuitGame } from "./quit-game";

export default function CricketGame() {
  const [gameState, setGameState] = useState<GameState>({
    gamePhase: "toss",
    tossWinner: null,
    tossChoice: null,
    currentInnings: 1,
    playerScore: 0,
    cricketAIScore: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    target: null,
  });
  const [commentary, setCommentary] = useState<string[]>([]);

  const addCommentary = (text: string) => {
    setCommentary((prev) => [text, ...prev.slice(0, 2)]);
  };

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    const {
      overs,
      wickets,
      currentInnings,
      gamePhase,
      playerScore,
      cricketAIScore,
    } = gameState;
    if (overs === 5 || wickets === 10) {
      if (currentInnings === 1) {
        updateGameState({
          currentInnings: 2,
          target:
            gamePhase === "batting" ? playerScore + 1 : cricketAIScore + 1,
          overs: 0,
          balls: 0,
          wickets: 0,
          gamePhase: gamePhase === "batting" ? "bowling" : "batting",
        });
        addCommentary(
          `Innings over. Target: ${gamePhase === "batting" ? playerScore + 1 : cricketAIScore + 1}`,
        );
      } else {
        updateGameState({ gamePhase: "result" });
      }
    }
  }, [gameState]);

  return (
    <div className="min-h-svh text-gray-100 p-3 ">
      <QuitGame />
      <div className="flex flex-col justify-between min-h-[85svh]">
        <Commentary commentary={commentary} />
        <main className="flex-grow overflow-auto border-red-400 border">
          {gameState.gamePhase === "toss" && (
            <Toss
              gameState={gameState}
              updateGameState={updateGameState}
              addCommentary={addCommentary}
            />
          )}
          {(gameState.gamePhase === "batting" ||
            gameState.gamePhase === "bowling") && (
            <Gameplay
              gameState={gameState}
              updateGameState={updateGameState}
              addCommentary={addCommentary}
            />
          )}
          {gameState.gamePhase === "result" && <Result gameState={gameState} />}
        </main>
      </div>
    </div>
  );
}
