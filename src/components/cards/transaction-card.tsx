"use client";

import { useGetUserTransaction } from "@/src/hooks/useGetUserTransactions";
import { useInitData } from "@telegram-apps/sdk-react";
import { Card } from "@telegram-apps/telegram-ui";
import { DollarSign, BarChart2, ArrowDown, ArrowUp } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { timeSince } from "@/src/lib/utils";

export function TransactionLists() {
  const initData = useInitData();
  const user = initData?.user;

  const { data } = useGetUserTransaction(user?.id);
  return (
    <>
      <Card className="bg-gray-800 w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {data?.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-xl"
              >
                <div className="flex items-center">
                  {tx.type === "MATCH_FEE" ? (
                    <ArrowDown className="mr-2 h-5 w-5 text-red-400" />
                  ) : (
                    <ArrowUp className="mr-2 h-5 w-5 text-green-400" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-100">
                      {tx.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      {timeSince(tx.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-bold ${tx.type === "MATCH_FEE" ? "text-red-400" : "text-green-400"}`}
                >
                  {tx.type === "MATCH_FEE" ? "-" : "+"}
                  {tx.amount} PWR
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
