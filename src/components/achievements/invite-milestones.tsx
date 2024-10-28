import { INVITE_MILESTONES } from "@/src/lib/milestones";
import { MilestoneCard } from '../cards/milestone-card';

export function InviteMilestones() {
  return (
		<div className='space-y-4'>
			{INVITE_MILESTONES.map((milestone) => (
				<MilestoneCard
					key={milestone.id}
					id={milestone.id.toString()}
					progress={0}
					total={milestone.requiredInvites}
					isCompleted={false}
					description={milestone.description}
					userId={1}
					reward={milestone.reward}
					title={milestone.title}
				/>
			))}
		</div>
	);
}
