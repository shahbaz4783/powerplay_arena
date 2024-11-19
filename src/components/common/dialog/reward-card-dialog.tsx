import { RewardTier, token } from '@/src/constants/app-config';
import { motion } from 'framer-motion';
import { Gift, Coins, Zap, Star, CheckCircle } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { calculateBoostedReward } from '@/src/lib/utils';

export function RewardCardDialog({
	tier,
	isClaimed,
	streak,
	weeklyStreak,
}: {
	tier: RewardTier;
	isClaimed: boolean;
	streak: number;
	weeklyStreak: number;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<motion.div
					className={`p-4 rounded-xl ${
						isClaimed
							? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg'
							: streak >= tier.day
							? 'bg-gradient-to-br from-gray-700 to-gray-600 shadow-md'
							: 'bg-gray-800'
					} text-center relative overflow-hidden cursor-pointer`}
					whileTap={{ scale: 0.95 }}
				>
					<div className='font-bold text-lg mb-2'>Day {tier.day}</div>
					{!isClaimed && streak >= tier.day ? (
						<CheckCircle className='h-6 w-6 text-green-400 m-auto' />
					) : (
						<Gift className='h-8 w-8 text-gray-600 m-auto' />
					)}
					{isClaimed && (
						<Star className='absolute top-2 right-2 h-6 w-6 text-yellow-400' />
					)}

					{isClaimed && (
						<>
							<div className='text-sm text-gray-300'>
								{calculateBoostedReward(tier.coins, weeklyStreak)}{' '}
								{token.symbol}
							</div>
							{tier.powerPass !== '0' && (
								<div className='text-sm text-gray-300'>
									{calculateBoostedReward(tier.powerPass, weeklyStreak)}{' '}
									{token.pass}
								</div>
							)}
						</>
					)}
				</motion.div>
			</DialogTrigger>
			<DialogContent className='bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 w-11/12 max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden'>
				<div className='p-6'>
					<DialogHeader>
						<DialogTitle className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
							Day {tier.day} Reward
						</DialogTitle>
					</DialogHeader>
					<div className='mt-6 space-y-6'>
						<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-inner'>
							<h3 className='text-xl font-semibold mb-4 text-blue-400'>
								Base Reward
							</h3>
							<div className='flex items-center justify-between mb-2'>
								<div className='flex items-center space-x-2'>
									<Coins className='h-5 w-5 text-yellow-400' />
									<span className='text-sm'>{token.symbol}</span>
								</div>
								<span className='font-mono text-lg'>{tier.coins}</span>
							</div>
							{tier.powerPass !== '0' && (
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Zap className='h-5 w-5 text-blue-400' />
										<span className='text-sm'>{token.pass}</span>
									</div>
									<span className='font-mono text-lg'>{tier.powerPass}</span>
								</div>
							)}
						</div>
						{weeklyStreak > 0 && (
							<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-inner'>
								<h3 className='text-xl font-semibold mb-4 text-green-400'>
									Boosted Reward
								</h3>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center space-x-2'>
										<Coins className='h-5 w-5 text-yellow-400' />
										<span className='text-sm'>{token.symbol}</span>
									</div>
									<span className='font-mono text-lg'>
										{calculateBoostedReward(tier.coins, weeklyStreak)}
									</span>
								</div>
								{tier.powerPass !== '0' && (
									<div className='flex items-center justify-between'>
										<div className='flex items-center space-x-2'>
											<Zap className='h-5 w-5 text-blue-400' />
											<span className='text-sm'>{token.pass}</span>
										</div>
										<span className='font-mono text-lg'>
											{calculateBoostedReward(tier.powerPass, weeklyStreak)}
										</span>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
