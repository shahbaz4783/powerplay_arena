"use client";

import { Gem, Star, Zap } from "lucide-react";
import { useEffect } from "react";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetWalletBalance } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

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
      <CardContent className="p-3">
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 border-2 border-blue-400">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-blue-300">
              {user?.firstName}
            </h2>
            <div className="flex items-center mt-1">
              <Star className="h-5 w-4  mr-1" />
                <span className="font-semibold text-sm">Level 5</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="flex items-center justify-end mb-1">
              <Gem className="h-5 w-5 text-sky-400 mr-2" />
              <span className="font-bold text-lg text-sky-300">
                {data?.balance}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={23} className="h-2 bg-blue-900" />
          <div className="flex justify-between">
            <div className="flex items-center justify-end">
              <Zap className="h-5 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300">{234} XP</span>
            </div>
            <p className="text-xs text-blue-300">
              {1000 - (239 % 1000)} XP to next level
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
