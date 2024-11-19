'use client';

import { motion } from 'framer-motion';
import { RewardTier, token } from '@/src/constants/app-config';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Coins, Gift, Zap } from 'lucide-react';
import {
	calculateBoostedReward,
	getTimeUntilNextReward,
} from '@/src/lib/utils';

interface RewardHighlightProps {
	tier: RewardTier;
	isClaimed: boolean;
	weeklyStreak: number;
}

export function RewardHighlight({
	tier,
	isClaimed,
	weeklyStreak,
}: RewardHighlightProps) {
	return (
		<Card className='relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg border border-slate-700'>
			<CardHeader className='relative z-10'>
				<CardTitle className='text-2xl font-bold text-slate-100'>
					Day {tier.day}
				</CardTitle>
				{isClaimed ? (
					<p className='text-xs text-slate-400 italic'>
						Available to claim after {getTimeUntilNextReward()}
					</p>
				) : (
					<p className='text-sm text-emerald-400 font-semibold'>
						Claim Your Reward!
					</p>
				)}
			</CardHeader>
			<CardContent className='relative z-10'>
				<div className='flex items-center space-x-3 text-slate-200'>
					<Coins className='h-6 w-6 text-amber-400' />
					<p className='text-xl font-semibold font-mono'>
						{calculateBoostedReward(tier.coins, weeklyStreak)} {token.symbol}
					</p>
				</div>

				<div className='mt-3 flex items-center space-x-3 text-slate-200'>
					<Gift className='h-6 w-6 text-purple-400' />
					<p className='text-xl font-semibold font-mono'>
						{calculateBoostedReward(tier.powerPass, weeklyStreak)} {token.pass}
					</p>
				</div>
			</CardContent>
			{isClaimed ? (
				<motion.div
					className='absolute inset-0 bg-gradient-to-t from-slate-700/50 to-transparent'
					initial={{ y: '100%' }}
					animate={{ y: '0%' }}
					transition={{
						duration: 3,
						repeat: Infinity,
						repeatType: 'reverse',
						ease: 'easeInOut',
					}}
				/>
			) : (
				<motion.div
					className='absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20'
					initial={{ opacity: 0 }}
					animate={{ opacity: [0.1, 0.2, 0.1] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
				/>
			)}
			<motion.div
				className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10'
				initial={{ x: '-100%' }}
				animate={{ x: '100%' }}
				transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
			/>
		</Card>
	);
}
