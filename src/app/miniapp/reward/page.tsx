import { DailyReward } from "@/src/components/earn/daily-reward";
import { Header } from "@/src/components/shared/header";

export default function RewardPage() {
  return (
    <div className="space-y-8">
      <Header
        title="Daily Bounty"
        subtitle="Claim your rewards and keep your streak alive"
      />
      <DailyReward />
    </div>
  );
}
