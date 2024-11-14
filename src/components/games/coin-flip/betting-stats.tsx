'use client';

import { useGetUserBettingStats } from '@/src/hooks/useUserData';
import { useInitData } from '@telegram-apps/sdk-react';
import { StatCard } from '../../common/cards/stats-card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const betTypes = [
	'SAFE_BET',
	'CLASSIC_FLIP',
	'TRIPLE_SHOT',
	'JACKPOT',
] as const;

export function BettingStats() {
	const initData = useInitData();
	const user = initData?.user;

	const safeBetStats = useGetUserBettingStats(user?.id, 'SAFE_BET').data;
	const classicFlipStats = useGetUserBettingStats(
		user?.id,
		'CLASSIC_FLIP'
	).data;
	const tripleShotStats = useGetUserBettingStats(user?.id, 'TRIPLE_SHOT').data;
	const jackpotStats = useGetUserBettingStats(user?.id, 'JACKPOT').data;

	const bettingStats = {
		SAFE_BET: safeBetStats,
		CLASSIC_FLIP: classicFlipStats,
		TRIPLE_SHOT: tripleShotStats,
		JACKPOT: jackpotStats,
	};

	const [selectedBetTypeIndex, setSelectedBetTypeIndex] = useState(0);

	const handlePrevious = () => {
		setSelectedBetTypeIndex((prev) =>
			prev === 0 ? betTypes.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setSelectedBetTypeIndex((prev) =>
			prev === betTypes.length - 1 ? 0 : prev + 1
		);
	};

	const selectedBetType = betTypes[selectedBetTypeIndex];

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
				Your Betting Performance
			</h2>
			<div className='flex justify-between items-center mb-6'>
				<Button
					variant='ghost'
					size='icon'
					onClick={handlePrevious}
					className='text-white hover:bg-slate-800'
				>
					<ChevronLeft className='h-6 w-6' />
				</Button>
				<span className='text-lg font-medium text-white'>
					{selectedBetType.replace(/_/g, ' ')}
				</span>
				<Button
					variant='ghost'
					size='icon'
					onClick={handleNext}
					className='text-white hover:bg-slate-800'
				>
					<ChevronRight className='h-6 w-6' />
				</Button>
			</div>

			<motion.div
				key={selectedBetType}
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -50 }}
				transition={{ duration: 0.3 }}
				className='flex justify-center items-center mt-6'
			>
				{renderBettingStatContent(bettingStats[selectedBetType])}
			</motion.div>
		</motion.section>
	);
}