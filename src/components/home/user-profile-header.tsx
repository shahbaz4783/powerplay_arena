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
import { Skeleton } from "../ui/skeleton";

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
  isLoading: boolean;
}

interface UserStatsProps {
  level: number;
  balance: number;
  isLoading: boolean;
}

interface XPProgressProps {
  totalXP: number;
  xpForLevelUp: number;
  xpForNextLevel: number;
  isLoading: boolean;
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

  const { data, isLoading } = useGetUserInfo(user?.id);
  const { currentAvatar, setCurrentAvatar } = useUserAvatar(user?.id);

  const userData: UserData = data as UserData;

  const level = userData?.userXP.level;
  const totalXP = userData?.userXP.totalXP;
  const balance = userData?.walletInfo.balance;
  const xpForLevelUp = userData?.userXP.xpForNextLevel;
  const xpForNextLevel = xpForLevelUp - totalXP;

  return (
    <Card className="rounded-xl p-4 space-y-5 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
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
          isLoading={isLoading}
        />
        <UserStats level={level} balance={balance} isLoading={isLoading} />
      </motion.div>

      <XPProgress
        totalXP={totalXP}
        xpForLevelUp={xpForLevelUp}
        xpForNextLevel={xpForNextLevel}
        isLoading={isLoading}
      />
    </Card>
  );
}

function UserAvatar({
  currentAvatar,
  setCurrentAvatar,
  userName,
  levelName,
  isLoading,
}: UserAvatarProps): JSX.Element {
  return (
		<div className='flex items-center space-x-3'>
			<div className='relative'>
				<Dialog>
					<DialogTrigger asChild>
						<Avatar className='h-14 w-14 ring-2 ring-primary cursor-pointer'>
							<AvatarImage
								src={`https://res.cloudinary.com/dw2o2w9zg/image/upload/v1730138783/9200_3_2_03_tv5m8n.jpg`}
								alt='User Avatar'
							/>
							<AvatarFallback>{userName?.charAt(0) ?? 'U'}</AvatarFallback>
						</Avatar>
					</DialogTrigger>
					<AvatarDialog
						currentAvatar={currentAvatar}
						setCurrentAvatar={setCurrentAvatar}
						onClose={() => {}}
					/>
				</Dialog>
				<div className='absolute -bottom-1 -right-1 bg-primary rounded-full p-1'>
					<Zap className='h-4 w-4 text-yellow-300' />
				</div>
			</div>
			<div>
				<h2 className='text-xl font-bold'>{userName ?? 'User'}</h2>
				{isLoading ? (
					<Skeleton className='h-2 mt-1 w-20 bg-slate-200 bg-opacity-20 rounded-xl' />
				) : (
					<span className='text-sm text-yellow-300'>{levelName}</span>
				)}
			</div>
		</div>
	);
}

function UserStats({ level, balance, isLoading }: UserStatsProps): JSX.Element {
  return (
    <div className="text-right flex flex-col items-end">
      {isLoading ? (
        <Skeleton className="h-3 w-16 bg-slate-200 bg-opacity-20 rounded-xl" />
      ) : (
        <p className="text-sm text-yellow-300">Level {level}</p>
      )}
      {isLoading ? (
        <Skeleton className="h-3 mt-2 w-20 bg-slate-200 bg-opacity-20 rounded-xl" />
      ) : (
        <p className="text-xl font-bold">
          {balance} <span className="text-sm">{token.symbol}</span>
        </p>
      )}
    </div>
  );
}

function XPProgress({
  totalXP,
  xpForLevelUp,
  xpForNextLevel,
  isLoading,
}: XPProgressProps) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {isLoading ? (
        <Skeleton className="h-2 w-full bg-slate-100 bg-opacity-20 rounded-xl" />
      ) : (
        <Progress
          value={(totalXP / xpForLevelUp) * 100}
          className="w-full h-2 bg-slate-400 bg-opacity-20"
        />
      )}

      <div className="flex justify-between text-sm">
        {isLoading ? (
          <Skeleton className="h-3 w-1/6 bg-slate-100 bg-opacity-20 rounded-xl" />
        ) : (
          <span>XP: {totalXP}</span>
        )}
        {isLoading ? (
          <Skeleton className="h-3 w-1/4 bg-slate-100 bg-opacity-20 rounded-xl" />
        ) : (
          <span>Next Level: {xpForNextLevel} XP</span>
        )}
      </div>
    </motion.div>
  );
}
