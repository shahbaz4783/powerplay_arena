"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Coins, Zap, Target, Trophy, Award } from "lucide-react";
import { startQuickMatch } from "@/src/actions/game.action";
import { IconType } from "react-icons/lib";
import { token } from "@/src/lib/constants";

const entryFees = [
  {
    amount: 50,
    rewards: {
      six: 5,
      four: 2,
      wicket: 10,
      runMargin: 1.5,
      wicketMargin: 5,
    },
  },
  {
    amount: 100,
    rewards: {
      six: 10,
      four: 4,
      wicket: 20,
      runMargin: 3,
      wicketMargin: 10,
    },
  },
  {
    amount: 200,
    rewards: {
      six: 20,
      four: 8,
      wicket: 40,
      runMargin: 6,
      wicketMargin: 20,
    },
  },
];

const RewardItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number | string;
}) => (
  <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-xl">
    <Icon className="w-8 h-8 text-cyan-400" />
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-lg font-bold">{value} coins</p>
    </div>
  </div>
);

export default function QuickMatchPage() {
  const [selectedFee, setSelectedFee] = useState("50");

  const handleContinue = async () => {
    const fee = entryFees.find((fee) => fee.amount.toString() === selectedFee);
    if (fee) {
      try {
        await startQuickMatch(fee);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className="min-h-svh flex flex-col justify-between">
      <CardHeader className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <CardTitle className="text-2xl font-bold text-center">
          Quick Match Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={selectedFee}
          onValueChange={setSelectedFee}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto">
            {entryFees.map((fee) => (
              <TabsTrigger
                key={fee.amount}
                value={fee.amount.toString()}
                className={
                  "flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900"
                }
              >
                <span className="text-lg font-bold">{fee.amount} PWR</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {entryFees.map((fee) => (
            <TabsContent key={fee.amount} value={fee.amount.toString()}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-center">
                  Reward Structure
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <RewardItem icon={Zap} label="Six" value={fee.rewards.six} />
                  <RewardItem
                    icon={Target}
                    label="Four"
                    value={fee.rewards.four}
                  />
                  <RewardItem
                    icon={Award}
                    label="Wicket"
                    value={fee.rewards.wicket}
                  />
                  <RewardItem
                    icon={Trophy}
                    label="Run Margin"
                    value={fee.rewards.runMargin}
                  />
                </div>
                <div className="mt-4 text-sm text-gray-300">
                  <p>Win by runs: {fee.rewards.runMargin} coins per run</p>
                  <p>
                    Win by wickets: {fee.rewards.wicketMargin} coins per wicket
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <Button onClick={handleContinue} className="w-full rounded-xl">
          Pay {selectedFee} {token.symbol} and Start match
        </Button>
      </CardFooter>
    </Card>
  );
}
