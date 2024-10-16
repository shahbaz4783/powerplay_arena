import { Leaderboard } from "@/src/components/cards/rankings";
import { Header } from "@/src/components/shared/header";

export default async function LeaderboardPage() {
  return (
    <div className="space-y-4">
      <Header title="Rankings" />
      <Leaderboard />
    </div>
  );
}
