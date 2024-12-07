'use client';

import { useGetUserBettingStats } from '@/src/hooks/useUserData';
import { StatCard } from '../../common/cards/stats-card';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '@/src/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/src/components/ui/carousel';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

const betTypes = [
	'SAFE_BET',
	'CLASSIC_FLIP',
	'TRIPLE_SHOT',
	'JACKPOT',
] as const;

export function BettingStats() {
	const { telegramId } = useCurrentUser();

	const bettingStats = {
		SAFE_BET: useGetUserBettingStats(telegramId, 'SAFE_BET').data,
		CLASSIC_FLIP: useGetUserBettingStats(telegramId, 'CLASSIC_FLIP').data,
		TRIPLE_SHOT: useGetUserBettingStats(telegramId, 'TRIPLE_SHOT').data,
		JACKPOT: useGetUserBettingStats(telegramId, 'JACKPOT').data,
	};

	const renderBettingStatContent = (data: any) => (
		<div className='grid grid-cols-2 gap-2'>
			<StatCard title='Total Bets' value={data?.betsPlaced ?? 0} />
			<StatCard
				title='Bets Won'
				value={data?.betsWon ?? 0}
				color='from-indigo-500 to-blue-300'
			/>
			<StatCard
				title='Win %'
				value={
					data?.betsPlaced
						? ((data.betsWon / data.betsPlaced) * 100).toFixed(2)
						: 0
				}
				color='from-yellow-500 to-orange-300'
			/>
			<StatCard
				title={'Earnings'}
				value={data?.totalEarning ?? 0}
				color={'from-green-500 to-emerald-300'}
			/>
		</div>
	);

	return (
		<motion.section
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className='space-y-6 bg-slate-900 rounded-xl p-4 backdrop-blur-md relative text-center'
		>
			<h2 className='text-xl font-semibold text-white tracking-wide mb-6 bg-gradient-to-r from-sky-900 to-slate-800 p-3 rounded-xl'>
				Your Betting Performance
			</h2>

			<Carousel className='w-4/5 m-auto'>
				<CarouselContent>
					{betTypes.map((betType, index) => (
						<CarouselItem key={index}>
							<Card className='rounded-xl'>
								<CardTitle className='pt-4'>
									{betType.replace(/_/g, ' ')}
								</CardTitle>
								<CardContent className='p-4'>
									{renderBettingStatContent(bettingStats[betType])}
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</motion.section>
	);
}
