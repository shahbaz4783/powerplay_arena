"use client";

import { useCricketGameState } from "@/src/lib/store";
import { motion } from "framer-motion";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";
import { Trophy, Target, Zap, Award } from "lucide-react";
import { calculateRewards } from "@/src/lib/game-logics";
import { useRouter } from "next/navigation";
import { RewardItem } from "../cards/reward-card";
import { SubmitButton } from "../feedback/submit-button";
import { useFormState } from "react-dom";

export function Result() {
  const { gameState, endMatchAndClaimReward } = useCricketGameState();
  const { player, opponent, matchResult } = gameState;
  const router = useRouter();

  const isPlayerWinner = matchResult.winner === "player";
  const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
    calculateRewards(gameState);
  const totalReward =
    fourReward + sixerReward + wicketTakenReward + winMarginReward;

  const [response, formAction] = useFormState(endMatchAndClaimReward, {
    message: {},
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
          <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-2" />
            Match Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-sm text-slate-400 mb-1">Your Score</div>
              <div className="text-4xl font-bold text-white">
                {player.runs}/{player.wickets}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                ({player.oversPlayed})
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-cyan-400"
            >
              VS
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-sm text-slate-400 mb-1">Opponent Score</div>
              <div className="text-4xl font-bold text-white">
                {opponent.runs}/{opponent.wickets}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                ({opponent.oversPlayed})
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
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
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-700/50 rounded-xl p-4 space-y-3"
          >
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
          </motion.div>
        </CardContent>
        <CardFooter className="p-6">
          <form action={formAction}>
            <SubmitButton
              title="Claim Rewards"
              loadingTitle="Claiming..."
              className="w-full py-4"
            />
          </form>
        </CardFooter>
      </div>
    </motion.div>
  );
}
