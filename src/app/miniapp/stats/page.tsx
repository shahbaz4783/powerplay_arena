import { PerformanceStats } from "@/src/components/stats/performance-stats";
import { BattingStats } from "@/src/components/stats/batting-stats";
import { BowlingStats } from "@/src/components/stats/bowling-stats";

export default function StatsPage() {
  return (
    <div className="space-y-12">
      <BattingStats />
    </div>
  );
}
