"use client";

import { CircleUserRound, Gem } from "lucide-react";
import { useEffect } from "react";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetWalletBalance } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Trophy, Coins, Zap } from "lucide-react";

const UserInfo = () => {
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
  });

  return (
    <Card className="bg-slate-800/50 backdrop-blur-md rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 border-2 border-blue-500">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-blue-400">
              {user?.firstName}
            </h2>
            <div className="flex items-center mt-1">
              <Zap className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-300">Level 5</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="flex items-center justify-end gap-2">
              <Gem className="text-blue-200" size={20} strokeWidth={2} />
              <span className="font-bold">{data?.balance}</span>
            </div>
          </div>
        </div>
        <Progress value={65} className="h-2 bg-gray-700" />
      </CardContent>
    </Card>
  );
};

export default UserInfo;
