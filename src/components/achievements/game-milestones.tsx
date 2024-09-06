import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { token } from "@/src/lib/constants";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";

export default function MilestonesPage() {
  const milestones = [
    {
      id: 1,
      title: "Century Maker",
      description: "Score 100 runs in a single match",
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      progress: 87,
      total: 100,
      reward: 1000,
    },
    {
      id: 2,
      title: "Bowling Maestro",
      description: "Take 5 wickets in a single match",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      progress: 3,
      total: 5,
      reward: 800,
    },
    {
      id: 3,
      title: "Match Winner",
      description: "Win 50 matches",
      icon: <Star className="h-8 w-8 text-purple-400" />,
      progress: 32,
      total: 50,
      reward: 2000,
    },
    {
      id: 4,
      title: "Run Machine",
      description: "Score a total of 10,000 runs",
      icon: <Target className="h-8 w-8 text-green-400" />,
      progress: 7500,
      total: 10000,
      reward: 5000,
    },
    {
      id: 5,
      title: "Wicket Taker",
      description: "Take a total of 1,000 wickets",
      icon: <Award className="h-8 w-8 text-red-400" />,
      progress: 750,
      total: 1000,
      reward: 5000,
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <Card
            key={milestone.id}
            className="bg-slate-800/50 backdrop-blur-md rounded-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-blue-400">
                {milestone.title}
              </CardTitle>
              {milestone.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-2">
                {milestone.description}
              </p>
              <Progress
                value={(milestone.progress / milestone.total) * 100}
                className="h-2 mb-2 bg-gray-700"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>
                  {milestone.progress} / {milestone.total}
                </span>
                <span>
                  Reward: {milestone.reward} {token.symbol}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
