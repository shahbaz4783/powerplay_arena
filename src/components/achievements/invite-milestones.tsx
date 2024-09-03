import { INVITE_MILESTONES } from "@/src/lib/milestones";

export function InviteMilestones() {
  return (
    <div>
      {INVITE_MILESTONES.map((milestone) => (
        <div key={milestone.id}>
          <p>{milestone.title}</p>
        </div>
      ))}
    </div>
  );
}
