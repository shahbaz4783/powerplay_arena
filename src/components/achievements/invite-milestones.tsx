import { INVITE_MILESTONES } from "@/src/lib/milestones";
import MilestoneCard from "../cards/milestone-card";

export function InviteMilestones() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {INVITE_MILESTONES.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          title={milestone.title}
          description={milestone.description}
          reward={milestone.reward}
          currentInvites={10}
          requiredInvites={milestone.requiredInvites}
        />
      ))}
    </div>
  );
}
