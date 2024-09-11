"use client";

import { Card } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { StatCard } from "../cards/stats-card";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import SectionHeading from "../shared/section-heading";

const battingStats = [
  {
    title: "Total Runs",
    value: 23456,
    color: "from-blue-500 to-cyan-300",
  },
  {
    title: "High Score",
    value: 156,
    color: "from-yellow-500 to-orange-300",
  },
  {
    title: "Average",
    value: 45.67,
    color: "from-green-500 to-emerald-300",
  },
  {
    title: "Sixes",
    value: 70,
    color: "from-purple-500 to-pink-300",
  },
  {
    title: "Fours",
    value: 113,
    color: "from-purple-500 to-pink-300",
  },
  {
    title: "Strike Rate",
    value: 157.83,
    color: "from-purple-500 to-pink-300",
  },
];

export function BattingStats() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <SectionHeading title="Batting Statistics" />

      <div className="grid grid-cols-3 gap-4">
        {battingStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
