'use client';

import { motion } from 'framer-motion';
import { Coins, Gift, Star } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';

export function RedemptionStore() {
	return (
		<div>
			<Card className='w-full rounded-xl'>
				<CardHeader className='text-center'>
					<CardTitle className='text-3xl font-bold'>
						Exciting Rewards Coming Soon!
					</CardTitle>
					<CardDescription className='text-xl mt-2'>
						Keep playing and earning coins to unlock amazing prizes!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-8'>
						<motion.div
							className='flex justify-center items-center space-x-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Coins className='w-12 h-12 text-yellow-500' />
							<Star className='w-12 h-12 text-purple-500' />
							<Gift className='w-12 h-12 text-red-500' />
						</motion.div>

						<div className='bg-muted p-4 rounded-xl'>
							<h3 className='font-semibold text-lg mb-2'>
								Why keep earning coins?
							</h3>
							<ul className='list-disc list-inside space-y-1 text-muted-foreground'>
								<li>Unlock exclusive rewards and experiences</li>
								<li>Boost your chances of winning big</li>
								<li>Climb the leaderboard and gain recognition</li>
								<li>Be first in line when new rewards drop</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
