"use client";

import { CircleUserRound, Gem } from "lucide-react";
import { useEffect } from "react";
import { saveOrUpdateUser } from "../../actions/user.action";
import { useGetWalletBalance } from "@/src/hooks/useGetWalletBalance";
import { useInitData } from "@telegram-apps/sdk-react";
import { Skeleton } from "@/src/components/ui/skeleton";

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
    <header className="bg-slate-800 p-1 rounded-xl flex justify-between">
      <div className=" flex gap-2 font-mono items-center">
        <CircleUserRound size={20} strokeWidth={1.25} />
        <p className="text-xs">{user?.firstName}</p>
      </div>
      <div className="bg-sky-800 px-4 py-2 flex gap-2 items-center rounded-xl">
        <Gem className="text-blue-200" size={20} strokeWidth={2} />
        <p className="font-bold">
          {isLoading ? (
            <Skeleton className="h-6 w-[28px] bg-sky-300 rounded-xl" />
          ) : (
            data?.balance
          )}
        </p>
      </div>
    </header>
  );
};

export default UserInfo;
