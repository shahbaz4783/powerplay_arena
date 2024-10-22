import FeatureComingSoon from "@/src/components/shared/coming-soon";
import { Header } from "@/src/components/shared/header";

export default function TournamentPage() {
  return (
    <div className="min-h-screen space-y-6 text-gray-100 p-4 relative overflow-hidden">
      <Header
        title="Tournaments"
        subtitle="Compete in high-stakes events for glory and rewards"
      />
      <FeatureComingSoon feature="Tournaments are" />
    </div>
  );
}
