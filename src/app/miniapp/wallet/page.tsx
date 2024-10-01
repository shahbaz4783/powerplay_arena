"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Wallet, DollarSign, BarChart2 } from "lucide-react";

interface Transaction {
  id: number;
  type: "fee" | "reward";
  amount: number;
  date: string;
  description: string;
}

// Mock data - replace with actual data fetching logic
const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "fee",
    amount: -50,
    date: "2023-04-01",
    description: "Match Entry Fee",
  },
  {
    id: 2,
    type: "reward",
    amount: 120,
    date: "2023-04-01",
    description: "Match Winnings",
  },
  {
    id: 3,
    type: "fee",
    amount: -30,
    date: "2023-04-02",
    description: "Tournament Entry",
  },
  {
    id: 4,
    type: "reward",
    amount: 200,
    date: "2023-04-03",
    description: "Tournament Prize",
  },
];

export default function Treasury() {
  const [balance, setBalance] = useState(842); // Replace with actual balance fetching
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  return (
    <div className="container mx-auto p-4 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-blue-900 to-cyan-900">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-100 flex items-center">
              <Wallet className="mr-2" /> Treasury
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-100">
              {balance} PWR
            </div>
            <p className="text-gray-300 mt-2">Your current balance</p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <TransactionList transactions={transactions} />
        </TabsContent>

        <TabsContent value="fees">
          <TransactionList
            transactions={transactions.filter((t) => t.type === "fee")}
          />
        </TabsContent>

        <TabsContent value="rewards">
          <TransactionList
            transactions={transactions.filter((t) => t.type === "reward")}
          />
        </TabsContent>
      </Tabs>

      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-100">
            Treasury Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Fees Paid</span>
              <span className="font-bold text-red-400">
                {transactions
                  .filter((t) => t.type === "fee")
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0)}{" "}
                PWR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Total Rewards Earned
              </span>
              <span className="font-bold text-green-400">
                {transactions
                  .filter((t) => t.type === "reward")
                  .reduce((sum, t) => sum + t.amount, 0)}{" "}
                PWR
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Net Profit</span>
              <span className="font-bold text-blue-400">
                {transactions.reduce((sum, t) => sum + t.amount, 0)} PWR
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TransactionListProps {
  transactions: Transaction[];
}

function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-100">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
            >
              <div className="flex items-center">
                {transaction.type === "fee" ? (
                  <DollarSign className="mr-2 h-5 w-5 text-red-400" />
                ) : (
                  <BarChart2 className="mr-2 h-5 w-5 text-green-400" />
                )}
                <div>
                  <p className="font-semibold text-gray-100">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span
                className={`font-bold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount} PWR
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
