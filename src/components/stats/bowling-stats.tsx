"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { StatCard } from "../cards/stats-card";
import SectionHeading from "../shared/section-heading";

const bowlingStats = [
  {
    title: "Wickets",
    value: 102,
    color: "from-red-500 to-pink-300",
  },
  {
    title: "Best Figures",
    value: "5/23",
    color: "from-indigo-500 to-blue-300",
  },
  {
    title: "Economy",
    value: 6.78,
    color: "from-green-500 to-teal-300",
  },
  {
    title: "Average",
    value: 25.34,
    color: "from-yellow-500 to-amber-300",
  },
];

export function BowlingStats() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <SectionHeading title="Bowling Statistics" subtitle="" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bowlingStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
