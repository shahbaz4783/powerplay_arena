'use client';
import { useGetUserBettingStats } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { StatCard } from '../../common/cards/stats-card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/src/components/ui/dropdown-menu';
import { Button } from '../../ui/button';

const betTypes = [
	'SAFE_BET',
	'CLASSIC_FLIP',
	'TRIPLE_SHOT',
	'JACKPOT',
] as const;
type BetType = (typeof betTypes)[number];

export function BettingStats() {
	const initData = useInitData();
	const user = initData?.user;

	const bettingStats = betTypes.reduce((stats, betType) => {
		stats[betType] = useGetUserBettingStats(user?.id, betType).data;
		return stats;
	}, {} as Record<BetType, any>);

	const [selectedBetType, setSelectedBetType] = useState<BetType>(betTypes[0]);

	const renderBettingStatContent = (data: any) => (
		<div className='grid grid-cols-2 gap-3'>
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
				title={data?.totalPayout! >= 0 ? 'Total Profit' : 'Total Loss'}
				value={data?.totalPayout ?? 0}
				color={
					data?.totalPayout! >= 0
						? 'from-green-500 to-emerald-300'
						: 'from-red-500 to-red-300'
				}
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
			<h2 className='text-2xl font-semibold text-white tracking-wide mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl'>
				Betting Stats & Insights
			</h2>
			<div className='flex justify-center mb-6'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className='bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-2 shadow-md'>
							{selectedBetType.replace(/_/g, ' ')}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='bg-slate-800 text-white rounded-lg shadow-lg'>
						{betTypes.map((betType) => (
							<DropdownMenuItem
								key={betType}
								onClick={() => setSelectedBetType(betType)}
								className='hover:bg-indigo-600 px-4 py-2 rounded-lg'
							>
								{betType.replace(/_/g, ' ')}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='flex justify-center items-center mt-6'>
				{renderBettingStatContent(bettingStats[selectedBetType])}
			</div>
		</motion.section>
	);
}
