"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { GameState } from "@/src/lib/types";
import { RewardItem } from "../cards/reward-card";
import { Trophy, Award, Zap, Target } from "lucide-react";
import { SubmitButton } from "../feedback/submit-button";
import { useCricketGameState } from "@/src/lib/store";

export function Result() {
  const { gameState } = useCricketGameState();

  const isWin = gameState.playerScore > gameState.computerAIScore;
  const runDifference = Math.abs(
    gameState.playerScore - gameState.computerAIScore,
  );
  const wicketDifference = gameState.wickets - gameState.wickets;

  const getResultMessage = () => {
    if (isWin) {
      return gameState.wickets < gameState.wickets
        ? `Won by ${wicketDifference} wicket${wicketDifference > 1 ? "s" : ""}`
        : `Won by ${runDifference} run${runDifference > 1 ? "s" : ""}`;
    } else {
      return gameState.wickets === gameState.wickets
        ? `Lost by ${runDifference} run${runDifference > 1 ? "s" : ""}`
        : `Lost by ${gameState.wickets - gameState.wickets} wicket${gameState.wickets - gameState.wickets > 1 ? "s" : ""}`;
    }
  };

  return (
    <Card className="flex flex-col justify-between border-none">
      <CardHeader className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <CardTitle className="text-2xl font-bold text-center">
          Match Result
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-700 p-3 rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4 text-center">
            Match Summary
          </h4>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-sm text-gray-400">Your Score</p>
              <p className="text-2xl font-bold">
                {gameState.playerScore}/{gameState.wickets}
              </p>
            </div>
            <div className="text-4xl font-bold text-gray-400">vs</div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Opponent's Score</p>
              <p className="text-2xl font-bold">{gameState.computerAIScore}</p>
            </div>
          </div>
        </div>
        <div
          className={`p-6 rounded-xl mb-6 ${isWin ? "bg-green-900/30" : "bg-red-900/30"}`}
        >
          <h4
            className={`text-2xl font-bold mb-2 text-center ${isWin ? "text-green-400" : "text-red-400"}`}
          >
            {isWin ? "Victory!" : "Defeat"}
          </h4>
          <p className="text-lg text-center text-gray-300">
            {getResultMessage()}
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4 text-center">
            Your Performance
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <RewardItem
              icon={Trophy}
              label="Runs"
              value={gameState.playerScore}
            />
            <RewardItem
              icon={Award}
              label="Wickets"
              value={gameState.wickets}
            />
            <RewardItem icon={Zap} label="Sixes" value={gameState.entryFee} />
            <RewardItem icon={Target} label="Fours" value={gameState.wickets} />
          </div>
        </div>

        <div className="bg-cyan-900/30 p-6 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 text-center text-cyan-400">
            Your Rewards
          </h4>
          <p className="text-3xl font-bold text-center text-cyan-400">
            435 PWR
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6 flex flex-col space-y-4">
        <SubmitButton title="Claim Rewards" loadingTitle="Claiming..." />
      </CardFooter>
    </Card>
  );
}
