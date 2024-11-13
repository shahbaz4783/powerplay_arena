"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentaryEvent } from '@/src/types/types';
import { commentaryTexts } from "@/src/constants/game-texts";
import { cn } from "@/src/lib/utils";
import { useCricketGameState } from "@/src/lib/store";
import { getCurrentInningsData } from "@/src/lib/game-logics";
import { RunOutcome } from "@/src/types/gameState";

export function Commentary() {
  const { gameState } = useCricketGameState();
  const { overInfo } = getCurrentInningsData(gameState);

  const [commentary, setCommentary] = useState<string>("");
  const [event, setEvent] = useState<CommentaryEvent>("start");
  const [ballResult, setBallResult] = useState<string | null>(null);
  const [showCommentary, setShowCommentary] = useState(false);
  const lastBallRef = useRef<RunOutcome | null>(null);

  useEffect(() => {
    if (overInfo.length > 0) {
      const lastBall = overInfo[overInfo.length - 1];
      if (lastBall !== lastBallRef.current) {
        updateEventAndBallResult(lastBall);
        lastBallRef.current = lastBall;
      }
    }
  }, [overInfo]);

  useEffect(() => {
    if (event !== "start") {
      const texts = commentaryTexts[event];
      const randomIndex = Math.floor(Math.random() * texts.length);
      setCommentary(texts[randomIndex]);
      setShowCommentary(true);

      const timer = setTimeout(() => {
        setShowCommentary(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [event]);

  const updateEventAndBallResult = (result: RunOutcome) => {
    let newEvent: CommentaryEvent = "start";
    let newBallResult: string | null = null;

    switch (result) {
      case -1:
        newEvent = "wicket";
        newBallResult = "OUT!";
        break;
      case 0:
        newEvent = "dot";
        newBallResult = "DOT BALL";
        break;
      case 1:
        newEvent = "single";
        newBallResult = "Single";
        break;
      case 2:
        newEvent = "double";
        newBallResult = "Double";
        break;
      case 3:
        newEvent = "triple";
        newBallResult = "Triple";
        break;
      case 4:
        newEvent = "four";
        newBallResult = "FOUR!";
        break;
      case 6:
        newEvent = "six";
        newBallResult = "SIX!";
        break;
    }

    setEvent((prevEvent) => {
      if (prevEvent === newEvent) {
        // Force a re-render by appending a timestamp
        return `${newEvent}-${Date.now()}` as CommentaryEvent;
      }
      return newEvent;
    });
    setBallResult(newBallResult);
  };

  return (
    <>
      {showCommentary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      )}
      <AnimatePresence mode="wait">
        {showCommentary && (
          <motion.div
            key={event} // Add this line to force re-render on event change
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg max-w-md w-full mx-4">
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={cn("text-4xl font-bold text-center mb-4", {
                  "text-red-300": ballResult === "OUT!",
                  "text-green-300": ballResult === "SIX!",
                  "text-blue-300": ballResult === "FOUR!",
                  "text-white": !["OUT!", "SIX!", "FOUR!"].includes(
                    ballResult || "",
                  ),
                })}
              >
                {ballResult}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-center text-lg"
              >
                {commentary}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
