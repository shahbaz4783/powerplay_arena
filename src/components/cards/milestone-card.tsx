"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Trophy, Coins, Lock, CheckCircle, Gem } from "lucide-react";

interface MilestoneCardProps {
  title: string;
  description: string;
  reward: number;
  requiredInvites: number;
  currentInvites: number;
}

export default function MilestoneCard({
  title = "Rising Star",
  description = "Invite friends to join the game",
  reward = 500,
  requiredInvites = 5,
  currentInvites = 3,
}: MilestoneCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const progress = (currentInvites / requiredInvites) * 100;

  const handleUnlock = () => {
    if (currentInvites >= requiredInvites) {
      setIsUnlocked(true);
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-blue-900 to-indigo-900 text-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-blue-200">{description}</p>
          </div>
          <Trophy className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Progress</span>
            <span>
              {currentInvites}/{requiredInvites}
            </span>
          </div>
          <div className="w-full bg-blue-950 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center space-x-2">
            <Gem className="h-5 w-5 text-yellow-400" />
            <span>Reward: {reward} </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-blue-950/50 p-4">
        {isUnlocked ? (
          <Button className="w-full bg-green-500 hover:bg-green-600" disabled>
            <CheckCircle className="mr-2 h-4 w-4" /> Unlocked
          </Button>
        ) : (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleUnlock}
            disabled={currentInvites < requiredInvites}
          >
            {currentInvites < requiredInvites ? (
              <>
                <Lock className="mr-2 h-4 w-4" /> Locked
              </>
            ) : (
              "Claim Reward"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
