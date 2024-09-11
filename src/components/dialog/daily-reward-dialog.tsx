"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Gift } from "lucide-react";
import { ClaimButton } from "../feedback/claim-button";
import FormFeedback from "../feedback/form-feedback";
import { dailyDrop } from "@/src/actions/tasks.action";
import { useInitData } from "@telegram-apps/sdk-react";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

export function DailyRewardDialog() {
  const initData = useInitData();
  const user = initData?.user;

  const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
    message: {},
  });

  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (response.message.error || response.message.success) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [response.message]);

  return (
    <Dialog>
      <DialogTrigger className="bg-slate-800/50 bg-opacity-70 backdrop-blur-xl border border-white p-4 rounded-xl flex flex-col items-center justify-center">
        <Gift size={32} className="mb-2 text-cyan-300" />
        <span>Reward</span>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader className="space-y-6">
          <DialogTitle>Claim your daily reward</DialogTitle>
          <DialogDescription>
            <div className="flex justify-center">
              <Gift size={48} className="mb-2 text-cyan-300 text-center" />
            </div>
            You will get a random amount of coins.
          </DialogDescription>
          {showFeedback && (
            <FormFeedback
              error={response.message.error}
              success={response.message.success}
            />
          )}
        </DialogHeader>
        <DialogFooter>
          <form className="w-4/5 m-auto" action={action}>
            <ClaimButton title="Claim" loadingTitle="Claiming..." />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
