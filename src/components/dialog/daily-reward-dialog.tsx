"use client";

import React from "react";
import { useFormState } from "react-dom";
import { useInitData } from "@telegram-apps/sdk-react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";
import { dailyDrop } from "@/src/actions/tasks.action";
import FormFeedback from "../feedback/form-feedback";
import { SubmitButton } from "../feedback/submit-button";
import { useGetUserInfo } from "@/src/hooks/useUserData";
import { Button } from "@/src/components/ui/button";

export function DailyRewardDialog() {
  const initData = useInitData();
  const user = initData?.user;

  const { data } = useGetUserInfo(user?.id);

  const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
    message: {},
  });

  const rewardTiers = [
    { day: 1, reward: "10-50" },
    { day: 3, reward: "50-100" },
    { day: 5, reward: "100-200" },
    { day: 7, reward: "200-500" },
  ];

  const streak = data?.userInfo?.streak || 0;
  const lastClaimed = data?.userInfo?.lastClaimed
    ? new Date(data.userInfo.lastClaimed)
    : null;

  const isRewardClaimed = () => {
    if (!lastClaimed) return false;
    const now = new Date();
    const lastClaimedUTC = new Date(
      Date.UTC(
        lastClaimed.getUTCFullYear(),
        lastClaimed.getUTCMonth(),
        lastClaimed.getUTCDate(),
      ),
    );
    const nowUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    return lastClaimedUTC.getTime() === nowUTC.getTime();
  };

  const getTimeUntilNextReward = () => {
    const now = new Date();
    const utcMidnight = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
    );
    const timeLeft = utcMidnight.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const rewardClaimed = isRewardClaimed();

  return (
    <Dialog>
      <DialogTrigger className="bg-slate-800/50 bg-opacity-70 backdrop-blur-xl border border-white p-4 rounded-xl flex flex-col items-center justify-center">
        <Gift size={32} className="mb-2" />
        <span className="text-blue-200 text-sm font-mono">Reward</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Daily Reward
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Gift size={64} className="text-yellow-400" />
            </motion.div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              {rewardClaimed ? "Reward Claimed!" : "Claim Your Reward!"}
            </h3>
            <p className="text-gray-300">
              {rewardClaimed
                ? "Come back tomorrow for your next reward."
                : "Tap the button below to receive your daily coins."}
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Calendar className="text-blue-400" />
            <span className="font-semibold">
              Streak: {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Streak Progress</span>
              <span>{streak}/7 days</span>
            </div>
            <Progress value={(streak / 7) * 100} className="h-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {rewardTiers.map((tier) => (
              <div
                key={tier.day}
                className={`p-3 rounded-xl ${streak >= tier.day ? "bg-blue-600" : "bg-gray-700"} text-center`}
              >
                <div className="font-semibold">Day {tier.day}</div>
                <div className="text-sm">{tier.reward} coins</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <Clock size={16} />
            <span className="text-sm">
              {rewardClaimed
                ? `Next reward in: ${getTimeUntilNextReward()}`
                : "You can claim your reward!"}
            </span>
          </div>
          <AnimatePresence>
            {(response.message.error || response.message.success) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FormFeedback
                  error={response.message.error}
                  success={response.message.success}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <form className="w-full" action={action}>
            {rewardClaimed ? (
              <Button
                disabled
                className="w-full bg-gray-500 text-gray-300 cursor-not-allowed rounded-xl"
              >
                Reward Claimed
              </Button>
            ) : (
              <SubmitButton
                title="Claim Reward"
                loadingTitle="Claiming..."
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
              />
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
