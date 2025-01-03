'use client';

import React, { useActionState } from 'react';
import { dailyDrop } from '@/src/actions/tasks.action';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { SubmitButton } from '@/src/components/common/buttons/submit-button';
import { RewardGrid } from './reward-grid';
import { MessageCard } from '../../../components/common/cards/message-card';
import { ServerResponse } from '../../../components/common/message/server-response';
import { AlertCircle } from 'lucide-react';
import { getStreakStatus } from '@/src/lib/utils';
import { StreakInfo } from './streak-info';
import { WeeklyBoost } from './weekly-boost';
import { useUserProgress } from '@/src/hooks/useUserData';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

export function DailyReward() {
	const { telegramId } = useCurrentUser();

	const { data: profile, isLoading } = useUserProgress(telegramId);

	const [response, action] = useActionState(dailyDrop.bind(null, telegramId), {
		message: {},
	});

	const lastClaimed = profile?.lastClaimedAt
		? new Date(profile?.lastClaimedAt)
		: null;
	const currentStreak = profile?.streakLength || 0;
	const currentWeeklyStreak = profile?.weeklyStreak || 0;

	const { canClaim, isMissed } = getStreakStatus(lastClaimed);

	if (isLoading)
		return (
			<MessageCard
				title='Preparing Your Rewards'
				message='Calculating your streaks and bonuses..'
				type='loading'
			/>
		);

	return (
		<Card className='w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 shadow-xl'>
			<CardHeader className='text-center bg-gradient-to-r from-slate-700 to-gray-700 py-6'>
				<CardTitle className='text-2xl font-mono font-bold'>
					{!canClaim ? 'Reward Claimed!' : 'Reward is Ready!'}
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6 p-6'>
				{isMissed && (
					<div className='flex items-center justify-center space-x-2 bg-yellow-500/20 p-4 rounded-xl text-yellow-300 font-mono'>
						<AlertCircle className='h-5 w-5 flex-1' />
						<span className='text-sm font-semibold'>
							Oops! You missed your streak. Start a new one today!
						</span>
					</div>
				)}
				<StreakInfo streak={currentStreak} weeklyStreak={currentWeeklyStreak} />
				<RewardGrid
					streak={currentStreak}
					weeklyStreak={currentWeeklyStreak}
					rewardClaimed={!canClaim}
				/>
				<WeeklyBoost weeklyStreak={currentWeeklyStreak} />

				<div className='flex items-center justify-center space-x-2 text-gray-400'>
					<span className='text-sm italic'>
						{canClaim && 'You can claim your reward now!'}
					</span>
				</div>
				<ServerResponse message={response.message} />
				<form className='w-full' action={action}>
					{canClaim && (
						<SubmitButton title='Claim Now' loadingTitle='Claiming' />
					)}
				</form>
			</CardContent>
		</Card>
	);
}
