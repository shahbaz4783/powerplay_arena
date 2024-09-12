"use client";

import { Button } from "../ui/button";
import { Gem } from "lucide-react";
import SectionHeading from "../shared/section-heading";
import ShinyButton from "../magicui/shiny-button";
import { dailyDrop } from "@/src/actions/tasks.action";
import { useInitData } from "@telegram-apps/sdk-react";
import { useFormState } from "react-dom";
import FormFeedback from "../feedback/form-feedback";
import { SubmitButton } from "../feedback/submit-button";

export function DailyBonus() {
  const initData = useInitData();
  const user = initData?.user;

  const [response, action] = useFormState(dailyDrop.bind(null, user?.id!), {
    message: {},
  });

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-xl p-4">
      <h3 className="text-2xl font-bold mb-2 text-center">
        Today's Power Play
      </h3>
      <p className="text-sm text-center mb-4">
        Score big with your daily bonus!
      </p>
      <form className="w-full col-span-3 border" action={action}>
        <SubmitButton title="Claim" loadingTitle="Claiming..." />
      </form>
      <FormFeedback
        error={response.message.error}
        success={response.message.success}
      />
    </div>
  );
}
