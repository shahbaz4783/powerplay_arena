"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Target,
  Trophy,
  Zap,
  Activity,
  Crosshair,
  BarChart2,
} from "lucide-react";

const mainStats = [
  { icon: Zap, title: "Total Runs", value: 3456 },
  { icon: Zap, title: "Highest Score", value: 156 },
  { icon: Target, title: "Strike Rate", value: 145.67 },
  { icon: Trophy, title: "Tournaments Won", value: 5 },
  { icon: Activity, title: "Average", value: 80.37 },
  { icon: Crosshair, title: "Centuries", value: 3 },
];

const detailedStats = [
  { title: "Matches Played", value: 50 },
  { title: "Innings Batted", value: 48 },
  { title: "Not Outs", value: 5 },
  { title: "Fours", value: 286 },
  { title: "Sixes", value: 72 },
  { title: "Fifties", value: 15 },
  { title: "Dot Ball %", value: "30%" },
  { title: "Boundary %", value: "58%" },
];

const HolographicCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative bg-gray-900 rounded-lg p-4">{children}</div>
  </div>
);

export default function Stats() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Holographic Stats Dashboard
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {mainStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <HolographicCard>
              <Card className="bg-transparent border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
                    <stat.icon className="w-4 h-4 mr-2" />
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </HolographicCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {detailedStats.map((stat, index) => (
          <HolographicCard key={stat.title}>
            <Card className="bg-transparent border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-cyan-400">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </HolographicCard>
        ))}
      </motion.div>
    </div>
  );
}
