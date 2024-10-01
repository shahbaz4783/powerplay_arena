"use client";

import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";
import { Button } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { useEffect, useState } from "react";
import { ArrowRight, Target, Clock } from "lucide-react";

export function MidInnings() {
  const { gameState, updateGameState } = useCricketGameState();
  const { target, currentInnings, toss } = gameState;
  const { runs, wickets, oversPlayed } = getCurrentInningsData(gameState);
  const {
    matchSetup: { overs },
  } = gameState;

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

  const remainingBalls =
    overs * 6 -
    (parseInt(oversPlayed.split(".")[0]) * 6 +
      parseInt(oversPlayed.split(".")[1]));
  
  if (!target) return null;
  const requiredRunRate = (target / (remainingBalls / 6)).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
    >
      <motion.div
        className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Innings Break
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold space-x-1">
                <span className="text-white">{runs}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-300">{wickets}</span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                ({oversPlayed} overs)
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <span className="text-sm text-slate-400 block mb-1">Target</span>
              <span className="text-4xl font-bold text-cyan-400">{target}</span>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-700/50 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-slate-300">Required Runs</span>
              </div>
              <span className="text-xl font-bold text-white">{target}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-slate-300">Balls Remaining</span>
              </div>
              <span className="text-xl font-bold text-white">
                {remainingBalls}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ArrowRight className="w-5 h-5 text-cyan-400 mr-2" />
                <span className="text-slate-300">Required Run Rate</span>
              </div>
              <span className="text-xl font-bold text-white">
                {requiredRunRate}
              </span>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="p-6">
          <Button
            onClick={handleStartSecondInnings}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Start {currentInnings === 1 ? "Second Innings" : "Chase"}
          </Button>
        </CardFooter>
      </motion.div>
    </motion.div>
  );
}
