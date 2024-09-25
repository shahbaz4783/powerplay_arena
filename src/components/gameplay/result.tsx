"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { RewardItem } from "../cards/reward-card";
import { Zap, Target } from "lucide-react";
import { SubmitButton } from "../feedback/submit-button";
import { useCricketGameState } from "@/src/lib/store";
import { InningsInterface } from "@/src/types/gameState";

export function Result() {
  const { gameState, endMatchAndClaimReward } = useCricketGameState();
  const { margin, winner, marginType } = gameState.matchResult;
  const { player, opponent } = gameState;

  const isWin = player.runs > opponent.runs;

  return (
    <main className="flex flex-col justify-between border-none">
      <section className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <h2 className="text-2xl font-bold text-center">Match Result</h2>
      </section>
      <section className="p-6">
        <div className="bg-gray-700 p-3 rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4 text-center">
            Match Summary
          </h4>
          <div className="flex justify-between items-center">
            <ScoreDisplay innings={player} title="Your Innings" />
            <div className="text-4xl font-bold text-gray-400">vs</div>
            <ScoreDisplay innings={opponent} title="Opponent's Innings" />
          </div>
        </div>
        <div
          className={`p-6 rounded-xl mb-6 ${isWin ? "bg-green-900/30" : "bg-red-900/30"}`}
        >
          <h4
            className={`text-2xl font-bold mb-2 text-center ${isWin ? "text-green-400" : "text-red-400"}`}
          >
            {winner === "player" ? "Victory!" : "Defeat"}
          </h4>
          <p className="text-lg text-center text-gray-300">
            {winner === "player" ? "You" : "Opponent"} won by {margin}{" "}
            {marginType}
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-xl mb-6">
          <h4 className="text-lg font-semibold mb-4 text-center">
            Your Performance
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <RewardItem icon={Zap} label="Sixes" value={player.sixes * 6} />
            <RewardItem icon={Target} label="Fours" value={player.fours * 4} />
          </div>
        </div>

        <div className="bg-cyan-900/30 p-6 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 text-center text-cyan-400">
            Your Rewards
          </h4>
          <p className="text-3xl font-bold text-center text-cyan-400">
            {player.sixes * 6 + player.fours * 4} PWR
          </p>
        </div>
      </section>
      <section className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6 flex flex-col space-y-4">
        <SubmitButton
          onClick={endMatchAndClaimReward}
          title="Claim Rewards"
          loadingTitle="Claiming..."
        />
      </section>
    </main>
  );
}

const ScoreDisplay = ({
  innings,
  title,
}: {
  innings: InningsInterface;
  title: string;
}) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-400">{title}</p>
      <div className="text-2xl font-bold space-x-1">
        <span>{innings.runs}</span>
        <span>/</span>
        <span className="text-slate-200">{innings.wickets}</span>
      </div>
      <p className="text-slate-400 text-xs">({innings.oversPlayed})</p>
    </div>
  );
};
