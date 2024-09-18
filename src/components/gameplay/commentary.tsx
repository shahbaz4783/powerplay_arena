"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentaryEvent } from "@/src/lib/types";
import { commentaryTexts } from "@/src/lib/commentary";
import { cn } from "@/src/lib/utils";

type CommentaryProps = {
  event: CommentaryEvent;
  ballResult: string | null;
};

export function Commentary({ event, ballResult }: CommentaryProps) {
  const [commentary, setCommentary] = useState<string>("");

  useEffect(() => {
    const texts = commentaryTexts[event];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setCommentary(texts[randomIndex]);
  }, [event]);

  return (
    <AnimatePresence mode="wait">
      {ballResult && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.p
            className={cn("text-4xl font-bold text-slate-100 mb-4", {
              "text-red-300": ballResult === "OUT!",
              "text-green-300": ballResult === "SIX!",
              "text-blue-300": ballResult === "FOUR!",
            })}
          >
            {ballResult}
          </motion.p>
          <div
            key={commentary}
            className="bg-slate-800/50 backdrop-blur-md rounded-xl p-3 shadow-lg"
          >
            <p className="text-white">{commentary}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
