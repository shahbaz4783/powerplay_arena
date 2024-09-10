"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, ChevronRight } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
}

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const fetchChallenge = () => {
      setChallenge({
        title: "Boundary Blitz",
        description: "Hit 10 fours in Quick Matches",
        reward: 50,
        progress: 3,
        total: 10,
      });
    };

    fetchChallenge();

    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
      );
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (!challenge) return null;

  return (
    <motion.section
      className="bg-gray-800 rounded-xl p-4 mt-4 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-cyan-400 flex items-center">
          <Trophy size={20} className="mr-2" />
          Daily Challenge
        </h3>
        <div className="text-xs text-gray-400 flex items-center">
          <Clock size={14} className="mr-1" />
          {timeLeft} left
        </div>
      </div>
      <p className="text-sm text-white mb-2">
        {challenge.title}: {challenge.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-cyan-500 rounded-full"
              style={{
                width: `${(challenge.progress / challenge.total) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>
              {challenge.progress}/{challenge.total}
            </span>
            <span>{challenge.reward} PWR</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
