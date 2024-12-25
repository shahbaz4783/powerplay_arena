'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/src/components/ui/card';
import {
	LucideIcon,
	CoinsIcon,
	TicketIcon,
	TrophyIcon,
	ArrowUpRight,
	Activity,
	Sparkles,
} from 'lucide-react';
import { PiBaseballCap } from 'react-icons/pi';
import { cn } from '@/src/lib/utils';

interface StatInfo {
	label: string;
	value: string;
}

interface StatCardProps {
	title: string;
	icon: React.ReactNode;
	href: string;
	stats?: StatInfo[];
	disabled?: boolean;
}

const StatCard = ({
	title,
	icon,
	href,
	stats,
	disabled = false,
}: StatCardProps) => (
	<Link
		href={disabled ? '#' : href}
		className={cn(disabled && 'cursor-not-allowed')}
	>
		<motion.div whileTap={{ scale: 0.98 }}>
			<Card className='relative h-48 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80'>
				<div className='absolute inset-0 bg-gradient-to-br from-neutral-800/50 via-neutral-900/50 to-black/50' />

				<CardContent className='relative h-full p-6 flex flex-col justify-between'>
					<div className='space-y-3'>
						<div className='flex justify-between items-start'>
							<h3 className='text-lg font-semibold text-white'>{title}</h3>
							<motion.div
								whileHover={{ scale: 1.1 }}
								className='p-1.5 rounded-lg bg-white/5 backdrop-blur-sm'
							>
								<ArrowUpRight size={18} className='text-white/70' />
							</motion.div>
						</div>

						{stats && (
							<div className='grid grid-cols-2 gap-2'>
								{stats.map((stat, index) => (
									<div
										key={index}
										className='bg-black/20 rounded-lg p-2.5 border border-white/5 backdrop-blur-sm'
									>
										<div className='text-neutral-400 text-xs font-medium'>
											{stat.label}
										</div>
										<div className='text-white font-bold mt-0.5'>
											{stat.value}
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<div className='flex justify-between items-end'>
						<div className='text-neutral-400 text-sm flex items-center gap-2 group'>
							<Activity
								size={14}
								className='text-blue-400 group-hover:text-blue-300 transition-colors'
							/>
							<span className='group-hover:text-neutral-300 transition-colors'>
								View Stats
							</span>
						</div>
						<div className='text-white/20'>
							{React.cloneElement(icon as React.ReactElement)}
						</div>
					</div>
				</CardContent>

				{disabled && (
					<div className='absolute inset-0 bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center'>
						<div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10'>
							<Sparkles size={16} className='text-blue-400' />
							<span className='text-neutral-300 font-medium'>Coming Soon</span>
						</div>
					</div>
				)}
			</Card>
		</motion.div>
	</Link>
);

interface StatsHomePageProps {
	className?: string;
}

const StatsHomePage: React.FC<StatsHomePageProps> = ({ className }) => {
	const statCards = [
		{
			title: 'Cricket Stats',
			icon: <PiBaseballCap />,
			href: '/miniapp/stats/cricket',
			stats: [
				{ label: 'Total Matches', value: '248' },
				{ label: 'Win Rate', value: '64%' },
			],
		},
		{
			title: 'Coin Flip Stats',
			icon: <CoinsIcon />,
			href: '/miniapp/stats/coin-flip',
			stats: [
				{ label: 'Total Flips', value: '1.2K' },
				{ label: 'Profit', value: '+2,480' },
			],
		},
		{
			title: 'Raffle Stats',
			icon: <TicketIcon />,
			href: '',
			disabled: true,
		},
		{
			title: 'Achievements',
			icon: <TrophyIcon />,
			href: '',
			stats: [
				{ label: 'Completed', value: '12/30' },
				{ label: 'Points', value: '2,450' },
			],
		},
	];

	return (
		<motion.div
			className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			{statCards.map((card, index) => (
				<motion.div
					key={card.title}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
				>
					<StatCard {...card} />
				</motion.div>
			))}
		</motion.div>
	);
};

export { StatsHomePage };
