import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Coins, Zap, X } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/src/components/ui/dialog';
import { token } from '@/src/constants/app-config';

interface RewardGridProps {
	streak: number;
	weeklyStreak: number;
}

const rewardTiers = [
	{ day: 1, coins: '20-50', powerPass: '2-5' },
	{ day: 2, coins: '50-100', powerPass: '5-10' },
	{ day: 3, coins: '100-200', powerPass: '10-20' },
	{ day: 4, coins: '200-300', powerPass: '20-30' },
	{ day: 5, coins: '300-500', powerPass: '30-50' },
	{ day: 6, coins: '500-800', powerPass: '50-70' },
	{ day: 7, coins: '800-1000', powerPass: '70-100' },
];

export function RewardGrid({ streak, weeklyStreak }: RewardGridProps) {
	const calculateBoostedReward = (reward: string) => {
		const [min, max] = reward.split('-').map(Number);
		const boost = 1 + (weeklyStreak * 5) / 100;
		return `${Math.floor(min * boost)}-${Math.floor(max * boost)}`;
	};

	return (
		<div className='grid grid-cols-3 gap-4'>
			{rewardTiers.map((tier) => (
				<Dialog key={tier.day}>
					<DialogTrigger asChild>
						<motion.div
							className={`p-4 rounded-xl ${
								streak >= tier.day
									? 'bg-gradient-to-br from-gray-700 to-gray-600 cursor-pointer shadow-lg'
									: 'bg-gray-800 opacity-50'
							} text-center relative overflow-hidden group`}
							whileTap={streak >= tier.day ? { scale: 0.95 } : {}}
						>
							{/* <Gift className='h-8 w-8 mx-auto mb-2 text-yellow-400' /> */}
							<div className='font-semibold text-lg'>Day {tier.day}</div>
							<div className='text-xs text-gray-400 mt-1'>Tap to view</div>
							{streak >= tier.day && (
								<motion.div
									className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0  transition-opacity duration-300'
									initial={false}
									animate={{ scale: [0.9, 1.1, 1] }}
									transition={{
										duration: 0.5,
										repeat: Infinity,
										repeatType: 'reverse',
									}}
								/>
							)}
						</motion.div>
					</DialogTrigger>
					<DialogContent className='bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 w-11/12 max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden'>
						<div className='p-6'>
							<DialogHeader>
								<DialogTitle className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
									<Gift className=' text-yellow-400 animate-bounce' />
									Day {tier.day} Reward
								</DialogTitle>
							</DialogHeader>
							<div className='mt-6 space-y-6'>
								<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-inner'>
									<h3 className='text-xl font-semibold mb-4 text-blue-400'>
										Base Reward
									</h3>
									<div className='flex items-center space-x-3 mb-2'>
										<Coins className='h-6 w-6 text-yellow-400' />
										<span className='font-mono'>
											{tier.coins} {token.symbol}
										</span>
									</div>
									{tier.powerPass !== '0' && (
										<div className='flex items-center space-x-3'>
											<Zap className='h-6 w-6 text-blue-400' />
											<span className='font-mono'>
												{tier.powerPass} {token.pass}
											</span>
										</div>
									)}
								</div>
								{weeklyStreak > 0 && (
									<div className='bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-inner'>
										<h3 className='text-xl font-semibold mb-4 text-green-400'>
											Boosted Reward
										</h3>
										<div className='flex items-center space-x-3 mb-2'>
											<Coins className='h-6 w-6 text-yellow-400' />
											<span className='font-mono'>
												{calculateBoostedReward(tier.coins)} coins
											</span>
										</div>
										{tier.powerPass !== '0' && (
											<div className='flex items-center space-x-3'>
												<Zap className='h-6 w-6 text-blue-400' />
												<span className='font-mono'>
													{calculateBoostedReward(tier.powerPass)} Power Pass
												</span>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>
			))}
		</div>
	);
}
