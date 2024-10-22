import { PerformanceStats } from "@/src/components/stats/performance-stats";
import { BattingStats } from "@/src/components/stats/batting-stats";
import { BowlingStats } from "@/src/components/stats/bowling-stats";
import { Header } from "@/src/components/shared/header";

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <Header
        title="Your Cricket Journey"
        subtitle="Dive into your performance metrics"
      />
      <BattingStats />
    </div>
  );
}
