"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Zap, Target, Trophy, Award } from "lucide-react";
import { startQuickMatch } from "@/src/actions/game.action";
import { QUICK_PLAY_ENTRY_FEES, token } from "@/src/lib/constants";
import { SubmitButton } from "@/src/components/feedback/submit-button";
import { useInitData } from "@telegram-apps/sdk-react";
import { useFormState } from "react-dom";
import { RewardItem } from "../cards/reward-card";
import FormFeedback from "../feedback/form-feedback";

export function QuickPlayMode() {
  const [selectedFee, setSelectedFee] = useState("50");

  const initData = useInitData();
  const user = initData?.user;

  const [response, action] = useFormState(
    startQuickMatch.bind(null, user?.id!),
    {
      message: {},
    },
  );

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
            {QUICK_PLAY_ENTRY_FEES.map((fee) => (
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
          {QUICK_PLAY_ENTRY_FEES.map((fee) => (
            <TabsContent key={fee.amount} value={fee.amount.toString()}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-center">
                  Reward Structure
                </h4>
                <div className="grid grid-cols-2 gap-4">
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
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <FormFeedback error={response.message.error} />
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <form action={action} className="w-full">
          <SubmitButton
            title={`Pay ${selectedFee} ${token.symbol} & Start match`}
            loadingTitle="Creating the game..."
          />
        </form>
      </CardFooter>
    </Card>
  );
}
