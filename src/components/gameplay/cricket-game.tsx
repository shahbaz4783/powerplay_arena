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
    computerAIScore: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    target: null,
    playerStats: {
      runs: 0,
      ballsFaced: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
    },
    bowlingStats: {
      wicketsTaken: 0,
      oversBowled: 0,
      runsConceded: 0,
      economy: 0,
    },
    matchResult: null,
    winMargin: null,
    entryFee: 50, // Default entry fee, adjust as needed
    potentialReward: 0,
    bonusMultiplier: 1,
    dotBalls: 0,
    boundaries: 0,
    highestPartnership: 0,
    fastestBall: 0,
    longestSix: 0,
    achievements: [],
  });
  const [commentary, setCommentary] = useState<string[]>([]);

  const addCommentary = (text: string) => {
    setCommentary((prev) => [text, ...prev.slice(0, 2)]);
  };

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      
      // Update derived statistics
      if ('playerStats' in newState || 'bowlingStats' in newState) {
        updatedState.playerStats.strikeRate = 
          updatedState.playerStats.ballsFaced > 0
            ? (updatedState.playerStats.runs / updatedState.playerStats.ballsFaced) * 100
            : 0;
        updatedState.bowlingStats.economy = 
          updatedState.bowlingStats.oversBowled > 0
            ? updatedState.bowlingStats.runsConceded / updatedState.bowlingStats.oversBowled
            : 0;
      }

      // Update boundaries count
      if ('playerStats' in newState) {
        updatedState.boundaries = updatedState.playerStats.fours + updatedState.playerStats.sixes;
      }

      return updatedState;
    });
  };

  useEffect(() => {
    const {
      overs,
      wickets,
      currentInnings,
      gamePhase,
      playerScore,
      computerAIScore,
      target,
    } = gameState;

    if (overs === 5 || wickets === 10) {
      if (currentInnings === 1) {
        const newTarget = gamePhase === "batting" ? playerScore + 1 : computerAIScore + 1;
        updateGameState({
          currentInnings: 2,
          target: newTarget,
          overs: 0,
          balls: 0,
          wickets: 0,
          gamePhase: gamePhase === "batting" ? "bowling" : "batting",
          playerStats: {
            ...gameState.playerStats,
            runs: 0,
            ballsFaced: 0,
          },
          bowlingStats: {
            ...gameState.bowlingStats,
            wicketsTaken: 0,
            oversBowled: 0,
            runsConceded: 0,
          },
        });
        addCommentary(`Innings over. Target: ${newTarget}`);
      } else {
        // Determine match result
        let matchResult: 'win' | 'loss' | 'tie';
        let winMargin = null;

        if (playerScore > computerAIScore) {
          matchResult = 'win';
          winMargin = { runs: playerScore - computerAIScore };
        } else if (playerScore < computerAIScore) {
          matchResult = 'loss';
          winMargin = { runs: computerAIScore - playerScore };
        } else {
          matchResult = 'tie';
        }

        // Calculate potential reward
        const basePotentialReward = gameState.entryFee * 2;
        const performanceBonus = (gameState.playerStats.fours * 5) + (gameState.playerStats.sixes * 10);
        const potentialReward = (basePotentialReward + performanceBonus) * gameState.bonusMultiplier;

        updateGameState({ 
          gamePhase: "result",
          matchResult,
          winMargin,
          potentialReward,
        });
      }
    }
  }, [gameState]);

  return (
    <div className="min-h-svh text-gray-100">
      <div className="flex flex-col justify-between min-h-[85svh]">
        {gameState.gamePhase !== "result" && (
          <>
            <QuitGame />
            <Commentary commentary={commentary} />
          </>
        )}
        <main className="flex-grow overflow-auto">
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