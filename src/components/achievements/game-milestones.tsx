"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { useGetUserFormatStats } from "@/src/hooks/useUserData";
import { token } from "@/src/lib/constants";
import { useInitData } from "@telegram-apps/sdk-react";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import MilestoneCard from "../cards/milestone-card";

export default function MilestonesPage() {
  const initData = useInitData();
  const user = initData?.user;
  const { data: blitzStats } = useGetUserFormatStats(user?.id, "BLITZ");
  const { data: powerplayStats } = useGetUserFormatStats(user?.id, "POWERPLAY");
  const { data: classicStats } = useGetUserFormatStats(user?.id, "CLASSIC");

  const totalSixes =
    blitzStats?.sixes! + powerplayStats?.sixes! + classicStats?.sixes!;

  const totalWickets =
    blitzStats?.wicketsTaken! +
    powerplayStats?.wicketsTaken! +
    classicStats?.wicketsTaken!;

  const totalWins =
    blitzStats?.matchesWon! +
    powerplayStats?.matchesWon! +
    classicStats?.matchesWon!;

  const totalRuns =
    blitzStats?.runsScored! +
    powerplayStats?.runsScored! +
    classicStats?.runsScored!;

  const milestones = [
    {
      id: 1,
      title: "Thousand Thunderbolts",
      description: "Hit 1000 sixes across all formats",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      progress: totalSixes,
      total: 1000,
      reward: 5000,
    },
    {
      id: 2,
      title: "Wicket Wizard",
      description: "Take 1000 wickets across all format",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      progress: totalWickets,
      total: 1000,
      reward: 5000,
    },
    {
      id: 3,
      title: "Match Winner",
      description: "Win 500 matches",
      icon: <Star className="h-8 w-8 text-purple-400" />,
      progress: totalWins,
      total: 500,
      reward: 2000,
    },
    {
      id: 4,
      title: "Run Machine",
      description: "Score a total of 10,000 runs",
      icon: <Target className="h-8 w-8 text-green-400" />,
      progress: totalRuns,
      total: 10000,
      reward: 5000,
    },
    {
      id: 5,
      title: "Wicket Taker",
      description: "Take a total of 1,000 wickets",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: 300,
      total: 300,
      reward: 5000,
    },
  ];

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          title={milestone.title}
          description={milestone.description}
          reward={milestone.reward}
          currentProgress={milestone.progress}
          targetGoal={milestone.total}
        />
      ))}
    </div>
  );
}
