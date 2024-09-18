"use client";

import { useState } from "react";
import ShinyButton from "../magicui/shiny-button";
import { motion } from "framer-motion";
import { PiCoinThin } from "react-icons/pi";
import { useCricketGameState } from "@/src/lib/store";

export function Toss() {
  const [isCoinSpinning, setIsCoinSpinning] = useState(false);
  const [showTossResult, setShowTossResult] = useState(false);

  const { gameState, updateGameState } = useCricketGameState();

  const performToss = () => {
    setIsCoinSpinning(true);

    setTimeout(() => {
      const random = Math.floor(Math.random() * 1000);
      let result: "opponent" | "player";
      console.log(random);

      if (random % 2 === 0) {
        result = "opponent";
        console.log(result);
      } else {
        result = "player";
        console.log(result);
      }

      updateGameState({ tossWinner: result });
      console.log("Main result " + result);

      setIsCoinSpinning(false);
      setShowTossResult(true);

      if (result === "opponent") {
        const opponentChoice = Math.random() < 0.5 ? "bat" : "bowl";
        updateGameState({ tossChoice: opponentChoice });
        setTimeout(() => {
          setShowTossResult(false);
          updateGameState({
            gamePhase: opponentChoice === "bat" ? "bowling" : "batting",
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
      return <p>Opponent chose to {gameState.tossChoice}</p>;
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
              : "Opponent won the toss!"}
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
