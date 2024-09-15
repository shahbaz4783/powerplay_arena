"use client";

import { useState } from "react";
import { GameState } from "@/src/lib/types";
import ShinyButton from "../magicui/shiny-button";
import { motion } from "framer-motion";
import { PiCoinThin } from "react-icons/pi";

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
          <p className="text-slate-400">What do you choose?</p>
          <div className="flex justify-between gap-6">
            <ShinyButton onClick={() => handleTossChoice("bat")} text="Bat" />
            <ShinyButton onClick={() => handleTossChoice("bowl")} text="Bowl" />
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
        <motion.div
          animate={{
            rotateX: isCoinSpinning && 1800,
            rotateZ: isCoinSpinning && -10,
            rotateY: isCoinSpinning && 10,
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full flex items-center justify-center mb-8"
        >
          <PiCoinThin size={100} className="text-yellow-400" />
        </motion.div>
      );
    }

    if (showTossResult) {
      return (
        <div className="text-center w-full space-y-6">
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
      <div className="w-full flex flex-col justify-between items-center min-h-[60svh]">
        <div className="flex justify-center items-center flex-grow">
          <PiCoinThin className="w-24 h-24 text-yellow-400" />
        </div>
        <ShinyButton onClick={performToss} text="Flip Coin" />
      </div>
    );
  };

  return (
    <main className="p-6 min-h-svh flex flex-col items-center h-full justify-center">
      {renderContent()}
    </main>
  );
}
