'use client';


import { motion } from 'framer-motion';
import { CoinsIcon, TicketIcon, TrophyIcon } from 'lucide-react';
import { PiBaseballCap, PiBaseballCapDuotone } from 'react-icons/pi';
import { useFortuneFlip } from '@/src/hooks/useFortuneFlip';
import { StatCardProps } from '@/src/types/stats.types';
import { StatCard } from './stats-card';
import { StatCardSkeleton } from '@/src/components/common/elements/stats-skeleton';
import { useCricketStatsAggregated } from '@/src/hooks/usePowerStrike';

export const StatsHomePage: React.FC = () => {
	const { stats: fortuneFlipStats, isLoading } = useFortuneFlip();
	const { stats: cricketStats } = useCricketStatsAggregated();

	const statCards: StatCardProps[] = [
		{
			title: 'Fortune Flip',
			description: 'Your coin flipping journey',
			icon: <CoinsIcon />,
			href: '/miniapp/stats/coin-flip',
			gradient: 'from-yellow-500/10 via-amber-500/10 to-orange-500/10',
			stats: [
				{
					label: 'Total Flips',
					value: fortuneFlipStats.totalBets,
				},
				{
					label: 'Total Won',
					value: fortuneFlipStats.totalBetsWon,
					color: 'text-orange-400',
				},
				{
					label: 'Profit',
					value: fortuneFlipStats.totalEarnings,
					color: 'text-green-400',
				},
				{
					label: 'Win Rate',
					value: fortuneFlipStats.winPercentage,
				},
			],
		},
		{
			title: 'Power Strike',
			description: 'Your coin flipping journey',
			icon: <PiBaseballCapDuotone />,
			href: '/miniapp/stats/cricket',
			gradient: 'from-yellow-500/10 via-amber-500/10 to-orange-500/10',
			stats: [
				{
					label: 'Total Matches',
					value: cricketStats.totalMatches,
				},
				{
					label: 'Win Rate',
					value: cricketStats.winPercentage,
				},
				{
					label: 'Total Runs',
					value: cricketStats.totalRunsScored,
					color: 'text-orange-400',
				},
				{
					label: 'Wickets',
					value: cricketStats.totalWicketsTaken,
					color: 'text-green-400',
				},
			],
		},
	];

	return (
		<div className=' bg-gray-950'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='max-w-6xl mx-auto space-y-6'
			>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{statCards.map((card, index) => (
						<motion.div
							key={card.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							{isLoading ? (
								<StatCardSkeleton gradient={card.gradient} />
							) : (
								<StatCard {...card} />
							)}
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};
