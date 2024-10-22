"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useGetUserInfo } from "@/src/hooks/useUserData";
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
import { useUserAvatar } from "@/src/hooks/useUserAvatar";
import { Card } from "@/src/components/ui/card";
import { saveOrUpdateUser } from "@/src/actions/user.action";

interface UserXP {
  level: number;
  totalXP: number;
  xpForNextLevel: number;
  levelName: string;
}

interface WalletInfo {
  balance: number;
}

interface UserData {
  userXP: UserXP;
  walletInfo: WalletInfo;
}

interface UserAvatarProps {
  currentAvatar: number;
  setCurrentAvatar: (avatar: number) => void;
  userName: string | undefined;
  levelName: string | undefined;
}

interface UserStatsProps {
  level: number;
  balance: number;
}

interface XPProgressProps {
  totalXP: number;
  xpForLevelUp: number;
  xpForNextLevel: number;
}

export function UserProfileHeader(): JSX.Element {
  const initData = useInitData();
  const user = initData?.user;

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

  const { data } = useGetUserInfo(user?.id);
  const { currentAvatar, setCurrentAvatar } = useUserAvatar(user?.id);

  const userData: UserData = data as UserData;

  const level = userData?.userXP.level;
  const totalXP = userData?.userXP.totalXP;
  const balance = userData?.walletInfo.balance;
  const xpForLevelUp = userData?.userXP.xpForNextLevel;
  const xpForNextLevel = xpForLevelUp - totalXP;

  return (
    <Card className="bg-gradient-to-br rounded-xl from-gray-800 to-gray-900 p-4 space-y-5">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UserAvatar
          currentAvatar={currentAvatar}
          setCurrentAvatar={setCurrentAvatar}
          userName={user?.firstName}
          levelName={userData?.userXP?.levelName}
        />
        <UserStats level={level} balance={balance} />
      </motion.div>
      <XPProgress
        totalXP={totalXP}
        xpForLevelUp={xpForLevelUp}
        xpForNextLevel={xpForNextLevel}
      />
    </Card>
  );
}

function UserAvatar({
  currentAvatar,
  setCurrentAvatar,
  userName,
  levelName,
}: UserAvatarProps): JSX.Element {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="h-14 w-14 ring-2 ring-primary cursor-pointer">
              <AvatarImage
                src={`/avatars/avatar-${currentAvatar}.png`}
                alt="User Avatar"
              />
              <AvatarFallback>{userName?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <AvatarDialog
            currentAvatar={currentAvatar}
            setCurrentAvatar={setCurrentAvatar}
            onClose={() => {}}
          />
        </Dialog>
        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
          <Zap className="h-4 w-4 text-yellow-300" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">{userName ?? "User"}</h2>
        <span className="text-sm text-yellow-300">{levelName ?? "Novice"}</span>
      </div>
    </div>
  );
}

function UserStats({ level, balance }: UserStatsProps): JSX.Element {
  return (
    <div className="text-right">
      <p className="text-sm text-yellow-300">Level {level}</p>
      <p className="text-xl font-bold">
        {balance} <span className="text-sm">{token.symbol}</span>
      </p>
    </div>
  );
}

function XPProgress({
  totalXP,
  xpForLevelUp,
  xpForNextLevel,
}: XPProgressProps): JSX.Element {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Progress
        value={(totalXP / xpForLevelUp) * 100}
        className="w-full h-2 bg-slate-400 bg-opacity-20"
      />
      <div className="flex justify-between text-sm">
        <span>XP: {totalXP}</span>
        <span>Next Level: {xpForNextLevel} XP</span>
      </div>
    </motion.div>
  );
}
