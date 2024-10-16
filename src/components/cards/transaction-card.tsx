"use client";

import { useGetUserTransaction } from "@/src/hooks/useUserData";
import { useInitData } from "@telegram-apps/sdk-react";
import { Card } from "@telegram-apps/telegram-ui";
import { DollarSign, BarChart2, ArrowDown, ArrowUp } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { timeSince } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { token } from "@/src/lib/constants";

export function TransactionLists() {
  const initData = useInitData();
  const user = initData?.user;

  const { data } = useGetUserTransaction(user?.id);
  return (
    <>
      <div className="w-full">
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          Recent Transactions
        </h2>
        <ul className="space-y-4">
          {data?.map((tx) => (
            <motion.li
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
            >
              <div className="flex items-center">
                {tx.type === "MATCH_FEE" ? (
                  <ArrowDown className="mr-2 h-5 w-5 text-red-400" />
                ) : (
                  <ArrowUp className="mr-2 h-5 w-5 text-green-400" />
                )}
                <div>
                  <p className="font-semibold text-gray-100 line-clamp-1">
                    {tx.description}
                  </p>
                  <p className="text-sm text-gray-400">
                    {timeSince(tx.createdAt)}
                  </p>
                </div>
              </div>
              <div
                className={`font-bold space-x-1 text-right ${tx.type === "MATCH_FEE" ? "text-red-400" : "text-green-400"}`}
              >
                <span>
                  {tx.type === "MATCH_FEE" ? "-" : "+"}
                  {tx.amount}
                </span>
                <span className="text-xs">{token.symbol}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}
