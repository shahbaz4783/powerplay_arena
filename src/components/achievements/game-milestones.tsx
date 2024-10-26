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
      title: "Blitz Warrior",
      description: "Take 50 wickets in Blitz",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: blitzStats?.wicketsTaken!,
      total: 50,
      reward: 750,
    },
    {
      id: 2,
      title: "Blitz Master",
      description: "Hit 200 fours in Blitz",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: blitzStats?.fours!,
      total: 200,
      reward: 750,
    },
    {
      id: 3,
      title: "Power Showdown",
      description: "Score 1000 runs in Powerplay",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: powerplayStats?.runsScored!,
      total: 1000,
      reward: 1500,
    },
    {
      id: 4,
      title: "Power Stamina",
      description: "Bowl 100 overs in Powerplay",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: powerplayStats?.ballsBowled!,
      total: 600,
      reward: 1500,
    },
    {
      id: 5,
      title: "EL Clasico",
      description: "Win 50 Classic games",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: classicStats?.matchesWon!,
      total: 50,
      reward: 10000,
    },
    {
      id: 6,
      title: "The Wall",
      description: "Play 450 overs in Classic games",
      progress: classicStats?.ballsFaced!,
      icon: <Award className="h-8 w-8 text-red-400" />,
      total: 2700,
      reward: 6000,
    },
    {
      id: 7,
      title: "Thousand Thunderbolts",
      description: "Hit 1000 sixes across all formats",
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      progress: totalSixes,
      total: 1000,
      reward: 7500,
    },
    {
      id: 8,
      title: "Wicket Wizard",
      description: "Take 1000 wickets across all format",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      progress: totalWickets,
      total: 1000,
      reward: 15000,
    },
    {
      id: 9,
      title: "Match Winner",
      description: "Win 500 matches",
      icon: <Star className="h-8 w-8 text-purple-400" />,
      progress: totalWins,
      total: 500,
      reward: 18000,
    },
    {
      id: 10,
      title: "Run Machine",
      description: "Score a total of 20,000 runs",
      icon: <Target className="h-8 w-8 text-green-400" />,
      progress: totalRuns,
      total: 20000,
      reward: 20000,
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
