import React from 'react';
import { Button } from '@/src/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Info, Zap, Target, Award, Trophy, LucideIcon } from 'lucide-react';

interface RewardStructure {
	six: string;
	four: string;
	wicket: string;
	runMargin: string;
}

interface RewardItemProps {
	icon: LucideIcon;
	label: string;
	value: string;
}

interface RewardDialogProps {
	rewards: RewardStructure;
}

const RewardItem = ({ icon: Icon, label, value }: RewardItemProps) => (
	<div className='flex items-center gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800'>
		<div className='p-2 rounded-full bg-zinc-800'>
			<Icon className='w-5 h-5 text-zinc-200' />
		</div>
		<div className='flex flex-col'>
			<span className='text-sm font-medium text-zinc-400'>{label}</span>
			<span className='text-lg font-semibold text-zinc-100'>{value}</span>
		</div>
	</div>
);

export const RewardDialog = ({ rewards }: RewardDialogProps) => {
	return (
		<div className='flex justify-center'>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='outline'
						className='rounded-xl hover:bg-zinc-800 hover:text-zinc-100 transition-colors'
					>
						<Info className='w-4 h-4 mr-2' />
						View Reward Structure
					</Button>
				</DialogTrigger>
				<DialogContent className='w-11/12 max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100'>
					<DialogHeader>
						<DialogTitle className='text-xl font-semibold text-zinc-100'>
							Reward Structure
						</DialogTitle>
					</DialogHeader>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						<RewardItem icon={Zap} label='Six' value={rewards.six} />
						<RewardItem icon={Target} label='Four' value={rewards.four} />
						<RewardItem icon={Award} label='Wicket' value={rewards.wicket} />
						<RewardItem
							icon={Trophy}
							label='Run Margin'
							value={rewards.runMargin}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
