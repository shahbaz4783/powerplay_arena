"use client";

import { useState, useEffect } from "react";
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
import { Zap, Target, Trophy, Award, Clock, Bolt, Shield } from "lucide-react";
import { startQuickMatch } from "@/src/actions/game.action";
import { token } from "@/src/lib/constants";
import { SubmitButton } from "@/src/components/feedback/submit-button";
import { useInitData } from "@telegram-apps/sdk-react";
import { useFormState } from "react-dom";
import { RewardItem } from "../cards/reward-card";
import FormFeedback from "../feedback/form-feedback";
import { useCricketGameState } from "@/src/lib/store";
import { MatchFormat, MATCH_FORMATS } from "@/src/types/gameState";

export function QuickPlayMode() {
  const [selectedFormat, setSelectedFormat] = useState<MatchFormat>("blitz");

  const { gameState, updateGameState } = useCricketGameState();

  const initData = useInitData();
  const user = initData?.user;

  const [response, formAction] = useFormState(
    startQuickMatch.bind(null, user?.id!),
    {
      message: {},
    },
  );

  useEffect(() => {
    const format = MATCH_FORMATS[selectedFormat];
    if (format) {
      updateGameState({
        matchSetup: format,
      });
    }
  }, [selectedFormat, updateGameState]);

  useEffect(() => {
    if (response.message.success) {
      updateGameState({
        gamePhase: "toss",
        matchSetup: MATCH_FORMATS[selectedFormat],
      });
    }
  }, [response.message.success, selectedFormat, updateGameState]);

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format as MatchFormat);
  };

  const handleSubmit = (formData: FormData) => {
    const format = MATCH_FORMATS[selectedFormat];
    if (format) {
      formData.append("entryFee", format.entryFee.toString());
      formData.append("overs", format.overs.toString());
      formData.append("format", format.format);
    }
    formAction(formData);
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
          value={selectedFormat}
          onValueChange={handleFormatChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto">
            {Object.entries(MATCH_FORMATS).map(([key, format]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900"
              >
                <FormatIcon format={format.format} className="w-6 h-6 mb-2" />
                <span className="text-lg font-bold">{format.format}</span>
                <span className="text-sm">{format.overs} overs</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(MATCH_FORMATS).map(([key, format]) => (
            <TabsContent key={key} value={key}>
              <div className="bg-gray-700 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-center">
                  Match Details
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="font-semibold">Entry Fee</p>
                    <p>
                      {format.entryFee} {token.symbol}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Overs</p>
                    <p>{format.overs}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Wickets</p>
                    <p>{format.totalWickets}</p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-center">
                  Reward Structure
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <RewardItem
                    icon={Zap}
                    label="Six"
                    value={format.rewards.six}
                  />
                  <RewardItem
                    icon={Target}
                    label="Four"
                    value={format.rewards.four}
                  />
                  <RewardItem
                    icon={Award}
                    label="Wicket"
                    value={format.rewards.wicket}
                  />
                  <RewardItem
                    icon={Trophy}
                    label="Run Margin"
                    value={format.rewards.runMargin}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <FormFeedback error={response.message.error} />
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-slate-800/50 to-slate-900 p-6">
        <form action={handleSubmit} className="w-full">
          <SubmitButton
            title={`Pay ${MATCH_FORMATS[selectedFormat].entryFee} ${token.symbol} & Start ${selectedFormat} match`}
            loadingTitle="Creating the game..."
          />
        </form>
      </CardFooter>
    </Card>
  );
}

function FormatIcon({
  format,
  className,
}: {
  format: MatchFormat;
  className?: string;
}) {
  switch (format) {
    case "blitz":
      return <Bolt className={className} />;
    case "classic":
      return <Trophy className={className} />;
    case "extended":
      return <Shield className={className} />;
    default:
      return <Clock className={className} />;
  }
}
