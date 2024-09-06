"use client";

import { Gem, Star, Zap } from "lucide-react";
import { useEffect } from "react";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetWalletBalance } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
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
    <header className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-14 w-14 ring-2 ring-blue-500">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
            <Zap className="h-4 w-4 text-yellow-300" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-100">{user?.firstName}</h2>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-300 mr-1" />
            <span className="text-sm text-blue-300">Master Blaster</span>
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
    </header>
  );
};

export default UserInfo;
