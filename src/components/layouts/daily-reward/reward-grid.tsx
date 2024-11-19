import React from 'react';
import { RewardTier, rewardTiers, token } from '@/src/constants/app-config';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { RewardCardDialog } from '../../common/dialog/reward-card-dialog';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import { MessageCard } from '../../common/cards/message-card';

interface RewardGridProps {
	streak: number;
	weeklyStreak: number;
}

export function RewardGrid({ streak, weeklyStreak }: RewardGridProps) {
	const currentDay = rewardTiers[streak % 7];
	const otherDays = rewardTiers.filter((tier) => tier.day !== currentDay.day);

	const RewardCardBig = ({
		tier,
		isCurrent,
	}: {
		tier: RewardTier;
		isCurrent: boolean;
	}) => (
		<Card className='rounded-xl'>
			<CardHeader>
				<CardTitle>Day {tier.day}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{tier.coins}</p>
				<p>{tier.powerPass}</p>
			</CardContent>
		</Card>
	);

	return (
		<div className='space-y-6'>
			<div className='mb-6'>
				<RewardCardBig tier={currentDay} isCurrent={true} />
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
