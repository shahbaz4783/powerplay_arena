"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Trophy } from "lucide-react";
import { Progress } from "../ui/progress";
import { token } from "@/src/lib/constants";
import { SubmitButton } from "../feedback/submit-button";

interface MilestoneCardProps {
  title: string;
  description: string;
  reward: number;
  currentProgress: number;
  targetGoal: number;
}

export default function MilestoneCard({
  title,
  description,
  reward,
  currentProgress,
  targetGoal,
}: MilestoneCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (currentProgress >= targetGoal) {
      setIsUnlocked(true);
    }
  }, []);

  return (
    <Card className="bg-slate-800/50 backdrop-blur-md rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-blue-400">
          {title}
        </CardTitle>
        <Trophy className="h-8 w-8 text-yellow-400" />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <Progress
          value={(currentProgress / targetGoal) * 100}
          className="h-2 mb-2 bg-gray-700"
        />

        <div className="flex justify-between text-sm text-gray-400">
          <span>
            {currentProgress}/{targetGoal}
          </span>
          <span>
            Reward: {reward} {token.symbol}
          </span>
        </div>
      </CardContent>
      {isUnlocked && (
        <CardFooter>
          <form className="w-full">
            <SubmitButton
              title="Claim"
              loadingTitle="Claiming your achievement..."
            />
          </form>
        </CardFooter>
      )}
    </Card>
  );
}
