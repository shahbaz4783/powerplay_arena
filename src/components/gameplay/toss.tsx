"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";
import { Coins, HandCoins } from "lucide-react";

interface TossProps {
  gameState: GameState;
  updateGameState: any;
  addCommentary: any;
}

export function Toss({ gameState, updateGameState, addCommentary }: TossProps) {
  const [isCoinSpinning, setIsCoinSpinning] = useState(false);
  const [showTossResult, setShowTossResult] = useState(false);

  const performToss = () => {
    setIsCoinSpinning(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "player" : "computer";
      updateGameState({ tossWinner: result });
      setIsCoinSpinning(false);
      setShowTossResult(true);
      if (result === "computer") {
        const computerChoice = Math.random() < 0.5 ? "bat" : "bowl";
        updateGameState({ tossChoice: computerChoice });
        addCommentary(`Computer won the toss and chose to ${computerChoice}`);
        setTimeout(() => {
          setShowTossResult(false);
          updateGameState({
            gamePhase: computerChoice === "bat" ? "bowling" : "batting",
          });
        }, 3000);
      } else {
        addCommentary("You won the toss! Choose to bat or bowl.");
      }
    }, 3000);
  };

  const handleTossChoice = (choice: "bat" | "bowl") => {
    updateGameState({ tossChoice: choice });
    setShowTossResult(false);
    updateGameState({ gamePhase: choice === "bat" ? "batting" : "bowling" });
    addCommentary(`You chose to ${choice}`);
  };

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 flex flex-col items-center justify-center h-[60vh]">
        {isCoinSpinning ? (
          <div className="animate-spin">
            <Coins className="w-24 h-24 text-yellow-400" />
          </div>
        ) : showTossResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {gameState.tossWinner === "player"
                ? "You won the toss!"
                : "Computer won the toss!"}
            </h2>
            {gameState.tossWinner === "player" ? (
              <div className="space-y-4">
                <p>Choose to bat or bowl:</p>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleTossChoice("bat")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Coins className="mr-2 h-4 w-4" /> Bat
                  </Button>
                  <Button
                    onClick={() => handleTossChoice("bowl")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Coins className="mr-2 h-4 w-4" /> Bowl
                  </Button>
                </div>
              </div>
            ) : (
              <p>Computer chose to {gameState.tossChoice}.</p>
            )}
          </div>
        ) : (
          <Button
            onClick={performToss}
            className="bg-yellow-600 hover:bg-yellow-700 text-xl py-6 px-8"
          >
            <HandCoins className="mr-2 h-6 w-6" /> Toss Coin
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
