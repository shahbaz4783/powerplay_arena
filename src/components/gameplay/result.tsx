"use client";

import { useCricketGameState } from "@/src/lib/store";
import { Trophy, Target, Zap, Award } from "lucide-react";
import { calculateRewards } from "@/src/lib/game-logics";
import { RewardItem } from "../cards/reward-card";
import { SubmitButton } from "../feedback/submit-button";
import { useFormState } from "react-dom";
import { Header } from "../shared/header";

export function Result() {
  const { gameState, endMatchAndClaimReward } = useCricketGameState();
  const { player, opponent, matchResult } = gameState;

  const isPlayerWinner = matchResult.winner === "player";
  const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
    calculateRewards(gameState);
  const totalReward =
    fourReward + sixerReward + wicketTakenReward + winMarginReward;

  const [response, formAction] = useFormState(endMatchAndClaimReward, {
    message: {},
  });

  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl">
      <Header title="Match Result" />

      <section className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Your Score</div>
            <div className="text-4xl font-bold text-white">
              {player.runs}/{player.wickets}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              ({player.oversPlayed})
            </div>
          </div>
          <div className="text-4xl font-bold text-cyan-400">VS</div>
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-1">Opponent Score</div>
            <div className="text-4xl font-bold text-white">
              {opponent.runs}/{opponent.wickets}
            </div>
            <div className="text-sm text-slate-400 mt-1">
              ({opponent.oversPlayed})
            </div>
          </div>
        </div>

        <div
          className={`text-center p-4 rounded-xl ${isPlayerWinner ? "bg-green-900/30" : "bg-red-900/30"}`}
        >
          <h3
            className={`text-2xl font-bold ${isPlayerWinner ? "text-green-400" : "text-red-400"}`}
          >
            {isPlayerWinner ? "Victory!" : "Defeat"}
          </h3>
          <p className="text-slate-300 mt-2">
            {matchResult.winner === "player" ? "You" : "Opponent"} won by{" "}
            {matchResult.margin} {matchResult.marginType}
          </p>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4 space-y-3">
          <h3 className="text-xl font-bold text-center text-cyan-400 mb-3">
            Your Rewards
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <RewardItem icon={Zap} label="Sixes" value={sixerReward} />
            <RewardItem icon={Target} label="Fours" value={fourReward} />
            <RewardItem
              icon={Award}
              label="Wickets"
              value={wicketTakenReward}
            />
            <RewardItem
              icon={Trophy}
              label="Win Bonus"
              value={winMarginReward}
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-slate-400">Total Reward</div>
            <div className="text-3xl font-bold text-cyan-400">
              {totalReward} PWR
            </div>
          </div>
        </div>
      </section>

      <section className="p-6">
        <form action={formAction}>
          <SubmitButton
            title="Claim Rewards"
            loadingTitle="Claiming..."
            className="w-full py-4"
          />
        </form>
      </section>
    </div>
  );
}
