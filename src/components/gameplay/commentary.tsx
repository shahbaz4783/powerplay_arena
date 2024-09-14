"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentaryEvent } from "@/src/lib/types";
import { commentaryTexts } from "@/src/lib/commentary";

type CommentaryProps = {
  event: CommentaryEvent;
};

export function Commentary({ event }: CommentaryProps) {
  const [commentary, setCommentary] = useState<string>("");

  useEffect(() => {
    const texts = commentaryTexts[event];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setCommentary(texts[randomIndex]);
  }, [event]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={commentary}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-4 shadow-lg"
      >
        <p className="text-lg text-white">{commentary}</p>
      </motion.div>
    </AnimatePresence>
  );
}
