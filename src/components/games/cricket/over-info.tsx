"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  PiNumberSixBold,
  PiNumberFourBold,
  PiNumberZeroBold,
} from "react-icons/pi";
import { FaW } from "react-icons/fa6";
import { getCurrentInningsData } from "@/src/lib/game-logics";
import { useCricketGameState } from "@/src/lib/store";
import { RunOutcome } from "@/src/types/gameState";

const BallResult = ({ result }: { result: RunOutcome }) => {
  let bgColor = "bg-gray-700";
  let textColor = "text-white";
  let icon = null;

  switch (result) {
    case 0:
      bgColor = "bg-slate-600";
      icon = <PiNumberZeroBold className="w-4 h-4" />;
      break;
    case 1:
    case 2:
    case 3:
      bgColor = "bg-blue-600";
      break;
    case 4:
      bgColor = "bg-green-500";
      icon = <PiNumberFourBold className="w-4 h-4" />;
      break;
    case 6:
      bgColor = "bg-yellow-400";
      icon = <PiNumberSixBold className="w-4 h-4 font-bold" />;
      break;
    case -1:
      bgColor = "bg-red-600";
      icon = <FaW className="w-4 h-4" />;
      break;
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`w-10 h-10 ${bgColor} ${textColor} rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}
    >
      {icon || result}
    </motion.div>
  );
};

export function OverInfo() {
  const { gameState } = useCricketGameState();
  const { overInfo, ballsFaced } = getCurrentInningsData(gameState);

  const currentOverIndex = Math.floor(ballsFaced / 6);
  const ballsInCurrentOver = ballsFaced % 6;
  const startIndex = currentOverIndex * 6;
  const currentOverInfo = overInfo.slice(
    startIndex,
    startIndex + ballsInCurrentOver,
  );
  
  const runsInCurrentOver = currentOverInfo.filter(
    (run) => run !== -1 && run !== null,
  ) as number[];

  const totalRunsInCurrentOver = runsInCurrentOver.reduce(
    (sum, run) => sum + run,
    0,
  );

  return (
    <section className="bg-gray-800 p-4 border-gray-700 rounded-xl space-y-2">
      <div className="flex justify-between">
        <h3 className="font-semibold text-white mb-2">This Over</h3>
        <p className="text-sm">Runs: {totalRunsInCurrentOver}</p>
      </div>
      <div className="flex gap-2">
        <AnimatePresence>
          {currentOverInfo.map((result, index) => (
            <motion.div
              key={`current-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BallResult result={result} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
