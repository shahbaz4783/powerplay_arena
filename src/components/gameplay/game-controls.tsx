"use client";

import { Button } from "@/src/components/ui/button";
import { GameState } from "@/src/lib/types";
import { motion } from "framer-motion";

interface GameControlsProps {
  gameState: GameState;
  handleBatting: (option: "normal" | "aggressive" | "defensive") => void;
  handleBowling: (option: "normal" | "yorker" | "bouncer") => void;
  disabled: boolean;
}

export function GameControls({
  gameState,
  handleBatting,
  handleBowling,
  disabled,
}: GameControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {gameState.gamePhase === "batting" ? (
        <>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBatting("aggressive")}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={disabled}
            >
              Loft
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBatting("normal")}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={disabled}
            >
              Stroke
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBatting("defensive")}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={disabled}
            >
              Push
            </Button>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBowling("normal")}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={disabled}
            >
              Normal Ball
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBowling("yorker")}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={disabled}
            >
              Yorker
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleBowling("bouncer")}
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={disabled}
            >
              Bouncer
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
}
