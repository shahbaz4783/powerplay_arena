"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Star, Zap, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetWalletBalance } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { AvatarDialog } from "./avatar-dialog";

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
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(75);

  const initData = useInitData();
  const user = initData?.user;

  const { data, isLoading } = useGetWalletBalance(user?.id!);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return null;
        await saveOrUpdateUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user]);

  const getLevelTitle = (level: number) => {
    return levelTitles[Math.min(level - 1, levelTitles.length - 1)];
  };

  return (
    <motion.div
      className="border bg-gray-800/50 rounded-xl p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
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
              <Star className="h-4 w-4 text-yellow-300 mr-1" />
              <span className="text-sm text-blue-300">
                {getLevelTitle(level)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-blue-800 rounded-full px-3 py-1">
          <svg
            className="h-5 w-5 text-yellow-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="text-lg font-bold text-yellow-300">
            {isLoading ? "100" : data?.balance}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Progress value={xp} className="w-full" />
        <div className="flex justify-between text-sm text-blue-300">
          <span>XP: {xp}/100</span>
          <span>Next Level: {100 - xp} XP</span>
        </div>
      </div>
    </motion.div>
  );
}
