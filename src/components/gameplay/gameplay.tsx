"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import {
  calculateRunRate,
  calculateRequiredRunRate,
  calculateRunsScored,
  getCricketAIBattingStrategy,
} from "@/src/lib/game-logics";
import { GameState } from "@/src/lib/types";
import { GameControls } from "./game-controls";

interface GameplayProps {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  addCommentary: (text: string) => void;
}

export function Gameplay({
  gameState,
  updateGameState,
  addCommentary,
}: GameplayProps) {
  const [showInningsMessage, setShowInningsMessage] = useState(false);
  const [inningsMessage, setInningsMessage] = useState("");

  const handleBatting = (option: "normal" | "aggressive" | "defensive") => {
    const runsScored = calculateRunsScored(option);
    if (runsScored === -1) {
      updateGameState({
        wickets: gameState.wickets + 1,
        playerStats: {
          ...gameState.playerStats,
          ballsFaced: gameState.playerStats.ballsFaced + 1,
        },
        bowlingStats: {
          ...gameState.bowlingStats,
          wicketsTaken: gameState.bowlingStats.wicketsTaken + 1,
        },
      });
      addCommentary("Out!");
    } else {
      updateGameState({
        playerScore: gameState.playerScore + runsScored,
        playerStats: {
          ...gameState.playerStats,
          runs: gameState.playerStats.runs + runsScored,
          ballsFaced: gameState.playerStats.ballsFaced + 1,
          fours:
            runsScored === 4
              ? gameState.playerStats.fours + 1
              : gameState.playerStats.fours,
          sixes:
            runsScored === 6
              ? gameState.playerStats.sixes + 1
              : gameState.playerStats.sixes,
        },
        dotBalls:
          runsScored === 0 ? gameState.dotBalls + 1 : gameState.dotBalls,
      });
      addCommentary(`${runsScored} runs scored`);
    }
    updateOversBalls();
  };

  const handleBowling = (option: "normal" | "yorker" | "bouncer") => {
    const cricketAIStrategy = getCricketAIBattingStrategy(gameState, option);
    const runsScored = calculateRunsScored(cricketAIStrategy, option);
    if (runsScored === -1) {
      updateGameState({
        wickets: gameState.wickets + 1,
        bowlingStats: {
          ...gameState.bowlingStats,
          wicketsTaken: gameState.bowlingStats.wicketsTaken + 1,
        },
      });
      addCommentary("CricketAI is out!");
    } else {
      updateGameState({
        computerAIScore: gameState.computerAIScore + runsScored,
        bowlingStats: {
          ...gameState.bowlingStats,
          runsConceded: gameState.bowlingStats.runsConceded + runsScored,
        },
        dotBalls:
          runsScored === 0 ? gameState.dotBalls + 1 : gameState.dotBalls,
      });
      addCommentary(`CricketAI scored ${runsScored} runs`);
    }
    updateOversBalls();
  };

  const updateOversBalls = () => {
    if (gameState.balls === 5) {
      updateGameState({
        overs: gameState.overs + 1,
        balls: 0,
        bowlingStats: {
          ...gameState.bowlingStats,
          oversBowled: gameState.bowlingStats.oversBowled + 1,
        },
      });
    } else {
      updateGameState({ balls: gameState.balls + 1 });
    }
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

    // Check for end of innings or game
    if (
      overs === 5 ||
      wickets === 10 ||
      (target &&
        (gamePhase === "batting"
          ? playerScore >= target
          : computerAIScore >= target))
    ) {
      if (currentInnings === 1) {
        const newTarget =
          gamePhase === "batting" ? playerScore + 1 : computerAIScore + 1;
        setInningsMessage(
          `First innings over. ${newTarget} runs needed to win.`,
        );
        setShowInningsMessage(true);
        setTimeout(() => {
          setShowInningsMessage(false);
          updateGameState({
            currentInnings: 2,
            target: newTarget,
            overs: 0,
            balls: 0,
            wickets: 0,
            gamePhase: gamePhase === "batting" ? "bowling" : "batting",
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
            dotBalls: 0,
          });
        }, 5000);
      } else {
        // Game over
        let matchResult: "win" | "loss" | "tie";
        let winMargin = { runs: 0, wickets: 0 };

        if (gamePhase === "batting") {
          if (playerScore > computerAIScore) {
            matchResult = "win";
            winMargin.wickets = 10 - wickets;
          } else if (playerScore < computerAIScore) {
            matchResult = "loss";
            winMargin.runs = computerAIScore - playerScore;
          } else {
            matchResult = "tie";
          }
        } else {
          if (computerAIScore > playerScore) {
            matchResult = "loss";
            winMargin.wickets = 10 - wickets;
          } else if (computerAIScore < playerScore) {
            matchResult = "win";
            winMargin.runs = playerScore - computerAIScore;
          } else {
            matchResult = "tie";
          }
        }

        updateGameState({
          gamePhase: "result",
          matchResult,
          winMargin,
        });
      }
    }
  }, [gameState, updateGameState]);

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
    <Card className="bg-yellow-900">
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">
              {gameState.gamePhase === "batting"
                ? gameState.playerScore
                : gameState.computerAIScore}
              /{gameState.wickets}
            </p>
            <p className="text-lg text-gray-300">
              ({gameState.overs}.{gameState.balls} overs)
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-yellow-400 border-yellow-400 text-lg py-1 px-3"
          >
            {gameState.currentInnings === 1 ? "1st Innings" : "2nd Innings"}
          </Badge>
        </div>
        {gameState.target && (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
            <p className="text-lg font-semibold">Target: {gameState.target}</p>
            <p className="text-gray-300">
              Need{" "}
              {gameState.target -
                (gameState.gamePhase === "batting"
                  ? gameState.playerScore
                  : gameState.computerAIScore)}{" "}
              runs from {5 * 6 - (gameState.overs * 6 + gameState.balls)} balls
            </p>
            <p className="text-gray-300">
              Required Run Rate: {calculateRequiredRunRate(gameState)}
            </p>
          </div>
        )}
        <Progress
          value={((gameState.overs * 6 + gameState.balls) / (5 * 6)) * 100}
          className="h-3"
        />
        <div className="flex justify-between text-sm text-gray-300">
          <span>Run Rate: {calculateRunRate(gameState)}</span>
          <span>Economy: {gameState.bowlingStats.economy.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-300">
          <span>Dot Balls: {gameState.dotBalls}</span>
          <span>
            Boundaries:{" "}
            {gameState.playerStats.fours + gameState.playerStats.sixes}
          </span>
        </div>
        <GameControls
          gameState={gameState}
          handleBatting={handleBatting}
          handleBowling={handleBowling}
        />
      </CardContent>
    </Card>
  );
}
