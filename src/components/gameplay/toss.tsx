"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";
import { Coins } from "lucide-react";
import { SubmitButton } from "../feedback/submit-button";

interface TossProps {
  gameState: GameState;
  updateGameState: any;
}

export function Toss({ gameState, updateGameState }: TossProps) {
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
        setTimeout(() => {
          setShowTossResult(false);
          updateGameState({
            gamePhase: computerChoice === "bat" ? "bowling" : "batting",
          });
        }, 3000);
      }
    }, 3000);
  };

  const handleTossChoice = (choice: "bat" | "bowl") => {
    updateGameState({ tossChoice: choice });
    setShowTossResult(false);
    updateGameState({ gamePhase: choice === "bat" ? "batting" : "bowling" });
  };

  const renderTossResult = () => {
    if (gameState.tossWinner === "player") {
      return (
        <div className="space-y-4">
          <p>Choose to bat or bowl:</p>
          <div className="flex justify-between border">
            <Button onClick={() => handleTossChoice("bat")}>Bat</Button>
            <Button onClick={() => handleTossChoice("bowl")}>Bowl</Button>
          </div>
        </div>
      );
    } else {
      return <p>Computer chose to {gameState.tossChoice}.</p>;
    }
  };

  const renderContent = () => {
    if (isCoinSpinning) {
      return (
        <div className="animate-spin">
          <Coins className="w-24 h-24 text-yellow-400" />
        </div>
      );
    }

    if (showTossResult) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {gameState.tossWinner === "player"
              ? "You won the toss!"
              : "Computer won the toss!"}
          </h2>
          {renderTossResult()}
        </div>
      );
    }

    return (
      <SubmitButton
        onClick={performToss}
        title="Flip Coin"
        loadingTitle="Flipping coin..."
      />
    );
  };

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 flex flex-col items-center justify-center h-[60vh]">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
