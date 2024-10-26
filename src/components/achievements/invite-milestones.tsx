import { INVITE_MILESTONES } from "@/src/lib/milestones";
import MilestoneCard from "../cards/milestone-card";

export function InviteMilestones() {
  return (
    <div className="space-y-4">
      {INVITE_MILESTONES.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          title={milestone.title}
          description={milestone.description}
          reward={milestone.reward}
          currentProgress={12}
          targetGoal={20}
        />
      ))}
    </div>
  );
}
