"use client";

import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";
import { Card, Button } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { useEffect, useState } from "react"; 

export function MidInnings() {
  const { gameState, updateGameState } = useCricketGameState();
  const { target, currentInnings, toss } = gameState;
  const { runs, wickets, oversPlayed } = getCurrentInningsData(gameState);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartSecondInnings = () => {
    updateGameState({
      currentInnings: 2,
      gamePhase: toss.playMode === "chase" ? "batting" : "bowling",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Innings Break
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-2xl font-bold space-x-1">
              <span>{runs}</span>
              <span>/</span>
              <span className="text-slate-200">{wickets}</span>
            </div>
            <p className="text-slate-400 text-xs">({oversPlayed})</p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 space-x-1"
          >
            <span className="text-sm text-slate-400">Target</span>
            <span className="text-2xl font-bold">{gameState.target}</span>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <p className="text-center text-slate-400">
              Need{" "}
              <span className="text-xl font-bold text-white">{target}</span>{" "}
              runs from{" "}
              <span className="text-xl font-bold text-white">{30}</span> balls
            </p>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartSecondInnings} className="w-full">
            Start {currentInnings === 2 ? "Batting" : "Bowling"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
