"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Trophy, Activity, Users } from "lucide-react";

const battingStats = [
  {
    title: "Total Runs",
    value: 3456,
    color: "from-blue-500 to-cyan-300",
  },
  {
    title: "Highest Score",
    value: 156,
    color: "from-yellow-500 to-orange-300",
  },
  {
    title: "Average",
    value: 45.67,
    color: "from-green-500 to-emerald-300",
  },
  {
    title: "Strike Rate",
    value: 135.78,
    color: "from-purple-500 to-pink-300",
  },
];

const matchStats = [
  { title: "Matches Played", value: 80, won: 50, lost: 25, draw: 5 },
  { title: "Tournaments", value: 10, won: 3, lost: 5, draw: 2 },
];

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
    icon: Activity,
    color: "from-yellow-500 to-amber-300",
  },
];

const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <Card className="bg-gray-800 border-none overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p
            className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
          >
            {value}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MatchStatCard = ({ title, value, won, lost, draw }) => (
  <Card className="bg-gray-800 border-none overflow-hidden">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Total</span>
        <span className="text-2xl font-bold text-cyan-400">{value}</span>
      </div>
      <div className="space-y-2">
        <ProgressBar
          label="Won"
          value={won}
          total={value}
          color="bg-green-500"
        />
        <ProgressBar
          label="Lost"
          value={lost}
          total={value}
          color="bg-red-500"
        />
        <ProgressBar
          label="Draw"
          value={draw}
          total={value}
          color="bg-yellow-500"
        />
      </div>
    </CardContent>
  </Card>
);

const ProgressBar = ({ label, value, total, color }) => (
  <div>
    <div className="flex justify-between text-sm text-gray-400 mb-1">
      <span>{label}</span>
      <span>
        {value}/{total}
      </span>
    </div>
    <Progress value={(value / total) * 100} className={`h-2 ${color}`} />
  </div>
);

export default function StatsPage() {
  return (
    <div>
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-cyan-400 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Batting Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-none h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-cyan-400 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Match Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <MatchStatCard {...stat} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-cyan-400 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Bowling Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
