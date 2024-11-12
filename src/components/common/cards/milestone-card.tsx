'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Progress } from '../../ui/progress';
import { token } from '@/src/lib/constants';
import { useFormState } from 'react-dom';
import { Milestone } from '@/src/types/db.types';
import { claimAwardAction } from '@/src/actions/tasks.action';
import { iconMap } from '@/src/constants/challenges';
import { SubmitButton } from '../buttons/submit-button';

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
	});
	const [state, formAction] = useFormState(claimAward, initialState);

	const Icon = iconMap[id] || Award;

	return (
		<motion.div
			className='bg-gradient-to-br from-slate-900 to-stone-800 border border-slate-700 rounded-xl p-6 shadow-lg'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				className='flex items-center justify-between mb-4'
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<motion.h3
					className='text-xl font-bold text-blue-400'
					initial={{ x: -20 }}
					animate={{ x: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					{title}
				</motion.h3>
				<Icon className='h-8 w-8 text-yellow-300' />
			</motion.div>
			<motion.p
				className='text-sm text-slate-300 mb-4'
				initial={{ x: -20 }}
				animate={{ x: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				{description}
			</motion.p>
			<motion.div
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}
			>
				<Progress
					value={(progress / total) * 100}
					className='h-2 mb-2 bg-slate-700'
				/>
			</motion.div>
			<motion.div
				className='flex justify-between text-sm text-slate-400'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}
			>
				<span>
					{progress}/{total}
				</span>
				<span>
					Reward: {reward} {token.symbol}
				</span>
			</motion.div>
			{isCompleted && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.5 }}
				>
					<form action={formAction} className='mt-4'>
						<SubmitButton
							title='Claim'
							loadingTitle='Claiming your achievement...'
						/>
					</form>
				</motion.div>
			)}
			{state.message && (
				<motion.p
					className={`text-sm text-center mt-2 ${
						state.success ? 'text-green-500' : 'text-red-500'
					}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{state.message}
				</motion.p>
			)}
		</motion.div>
	);
}
