import { UserCricketStats } from "@/src/components/stats/user-cricket-stats";
import { Header } from "@/src/components/shared/header";

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <Header
        title="Your Cricket Journey"
        subtitle="Dive into your performance metrics"
      />
      <UserCricketStats />
    </div>
  );
}
