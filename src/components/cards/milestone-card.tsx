'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Award, Trophy } from 'lucide-react';
import { Progress } from '../ui/progress';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '../feedback/submit-button';
import { useFormState } from 'react-dom';
import { Milestone } from '@/src/types/db.types';
import { claimAwardAction } from '@/src/actions/tasks.action';

interface MilestoneCardProps extends Milestone {
	userId: number;
}

export function MilestoneCard({
	id,
	title,
	description,
	reward,
	progress,
	total,
	isCompleted,
	userId,
	icon: Icon,
}: MilestoneCardProps) {
	const initialState = { message: '', success: false };
	const claimAward = claimAwardAction.bind(null, userId, {
		id,
		title,
		description,
		reward,
		progress,
		total,
		isCompleted,
		icon: Award,
	});
	const [state, formAction] = useFormState(claimAward, initialState);

	return (
		<Card className='bg-slate-800/50 backdrop-blur-md rounded-xl'>
			<CardHeader className='flex flex-row items-center justify-between pb-2'>
				<CardTitle className='text-lg font-bold text-blue-400'>
					{title}
				</CardTitle>
				<Icon className='h-8 w-8 text-yellow-400' />
			</CardHeader>
			<CardContent>
				<p className='text-sm text-gray-300 mb-2'>{description}</p>
				<Progress
					value={(progress / total) * 100}
					className='h-2 mb-2 bg-gray-700'
				/>

				<div className='flex justify-between text-sm text-gray-400'>
					<span>
						{progress}/{total}
					</span>
					<span>
						Reward: {reward} {token.symbol}
					</span>
				</div>
			</CardContent>
			{isCompleted && (
				<CardFooter>
					<form action={formAction}>
						<SubmitButton
							title='Claim'
							loadingTitle='Claiming your achievement...'
						/>
					</form>
				</CardFooter>
			)}
			{state.message && (
				<p
					className={`text-sm text-center mt-2 ${
						state.success ? 'text-green-500' : 'text-red-500'
					}`}
				>
					{state.message}
				</p>
			)}
		</Card>
	);
}
