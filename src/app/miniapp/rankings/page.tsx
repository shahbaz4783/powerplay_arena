import { Leaderboard } from "@/src/components/cards/rankings";
import { Header } from "@/src/components/shared/header";

export default async function LeaderboardPage() {
  return (
    <div className="space-y-4">
      <Header
        title="Leaderboard"
        subtitle="See how you stack up against the competition"
      />
      <Leaderboard />
    </div>
  );
}
