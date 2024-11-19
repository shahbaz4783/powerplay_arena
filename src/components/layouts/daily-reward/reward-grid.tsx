'use client';

import React from 'react';
import { rewardTiers } from '@/src/constants/app-config';
import { RewardCardDialog } from '@/src/components/common/dialog/reward-card-dialog';
import { RewardHighlight } from './reward-highlight';

interface RewardGridProps {
	streak: number;
	weeklyStreak: number;
	rewardClaimed: boolean;
}

export function RewardGrid({
	streak,
	weeklyStreak,
	rewardClaimed,
}: RewardGridProps) {
	const currentDay = rewardTiers[streak % 7];
	const otherDays = rewardTiers.filter((tier) => tier.day !== currentDay.day);

	return (
		<div className='space-y-6'>
			<div className='mb-6'>
				<RewardHighlight
					tier={currentDay}
					isClaimed={rewardClaimed}
					weeklyStreak={weeklyStreak}
				/>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				{otherDays.map((tier) => (
					<RewardCardDialog
						key={tier.day}
						streak={streak}
						tier={tier}
						isClaimed={false}
						weeklyStreak={weeklyStreak}
					/>
				))}
			</div>
		</div>
	);
}
