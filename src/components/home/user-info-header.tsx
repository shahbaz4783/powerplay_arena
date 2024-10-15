"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetUserInfo } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";

import { token } from "@/src/lib/constants";
import { AvatarDialog } from "../dialog/avatar-dialog";

const levelTitles = [
  "Rookie Batsman",
  "Spin Wizard",
  "Pace Ace",
  "All-Rounder",
  "Captain Cool",
  "Master Blaster",
];

const avatars = [
  {
    id: 1,
    name: "Classic",
    free: true,
    url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Cyber Batsman",
    free: true,
    url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Neon Bowler",
    free: false,
    price: 100,
    url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Holographic Captain",
    free: false,
    price: 200,
    url: "/placeholder.svg?height=100&width=100",
  },
];

export function UserInfoHeader() {
  const [currentAvatar, setCurrentAvatar] = useState(1);

  const initData = useInitData();
  const user = initData?.user;

  const { data } = useGetUserInfo(user?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;
        await saveOrUpdateUser(user);
      } catch (error) {
        console.error("Error saving/updating user data:", error);
      }
    };

    fetchData();
  }, [user]);

  const getLevelTitle = (level: number) => {
    return levelTitles[Math.min(level - 1, levelTitles.length - 1)];
  };

  const level = data?.userXP?.level ?? 1;
  const totalXP = data?.userXP?.totalXP ?? 0;
  const balance = data?.walletInfo?.balance ?? 0;

  const xpForNextLevel = 1000 - (totalXP % 1000);

  return (
    <motion.div
      className="border bg-gray-800/50 rounded-xl p-4 space-y-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Dialog>
              <DialogTrigger asChild>
                <Avatar className="h-14 w-14 ring-2 ring-blue-500 cursor-pointer">
                  <AvatarImage src={avatars[currentAvatar - 1].url} />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <AvatarDialog
                currentAvatar={currentAvatar}
                setCurrentAvatar={setCurrentAvatar}
                onClose={() => {}}
              />
            </Dialog>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <Zap className="h-4 w-4 text-yellow-300" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-100">
              {user?.firstName}
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-yellow-300">
                {getLevelTitle(level)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-yellow-300">Level {level}</p>
          <p className="text-2xl font-bold">
            {balance} <span className="text-sm">{token.symbol}</span>
          </p>
        </div>
      </div>
      <div className="space-y-3 ">
        <Progress value={(totalXP % 1000) / 10} className="w-full" />
        <div className="flex justify-between text-sm text-blue-300">
          <span>XP: {totalXP}</span>
          <span>Next Level: {xpForNextLevel} XP</span>
        </div>
      </div>
    </motion.div>
  );
}
