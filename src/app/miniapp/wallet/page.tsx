import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Coins, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function WalletPage() {
  const transactions = [
    {
      id: 1,
      type: "earned",
      amount: 100,
      description: "Match won",
      date: "2023-06-15",
    },
    {
      id: 2,
      type: "spent",
      amount: 50,
      description: "Purchased XP Booster",
      date: "2023-06-14",
    },
    {
      id: 3,
      type: "earned",
      amount: 200,
      description: "Daily challenge completed",
      date: "2023-06-13",
    },
    {
      id: 4,
      type: "earned",
      amount: 75,
      description: "Referral bonus",
      date: "2023-06-12",
    },
  ];

  return (
    <div className="p-4">
      <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-300">Balance</span>
            <div className="flex items-center">
              <Coins className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-yellow-400">1,500</span>
            </div>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Buy Coins
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/50 backdrop-blur-md border border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-400">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <div
                  className={`flex items-center ${transaction.type === "earned" ? "text-green-400" : "text-red-400"}`}
                >
                  {transaction.type === "earned" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="font-medium">{transaction.amount}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
