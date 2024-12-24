'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/src/components/ui/card';
import {
	BirdIcon as BatIcon,
	CoinsIcon as CoinIcon,
	TicketIcon,
	TrophyIcon,
	BarChart3Icon,
	ActivityIcon,
} from 'lucide-react';
import { FaBaseball } from 'react-icons/fa6';
import { PiBaseballCap } from 'react-icons/pi';

const StatCard: React.FC<{
	title: string;
	icon: React.ReactNode;
	href: string;
	gradient: string;
}> = ({ title, icon, href, gradient }) => (
	<Link href={href} passHref>
		<motion.div whileTap={{ scale: 0.95 }}>
			<Card className={`h-40 overflow-hidden rounded-xl relative ${gradient}`}>
				<CardContent className='h-full flex flex-col justify-between p-6'>
					<div className='text-white text-xl font-bold'>{title}</div>
					<div className='text-white/80 text-sm'>View Stats</div>
					<div className='absolute right-4 bottom-4 text-white/30 transform transition-all duration-300 ease-in-out'>
						{React.cloneElement(icon as React.ReactElement<any>, { size: 64 })}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	</Link>
);

const StatsHomePage: React.FC = () => {
	const statCards = [
		{
			title: 'Cricket Stats',
			icon: <PiBaseballCap />,
			href: '/miniapp/stats/cricket',
			gradient: 'bg-gradient-to-br from-green-400 to-blue-500',
		},
		{
			title: 'Coin Flip Stats',
			icon: <CoinIcon />,
			href: '/miniapp/stats/coin-flip',
			gradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
		},
		{
			title: 'Raffle Stats',
			icon: <TicketIcon />,
			href: '',
			gradient: 'bg-gradient-to-br from-purple-400 to-pink-500',
		},
		{
			title: 'Achievements',
			icon: <TrophyIcon />,
			href: '',
			gradient: 'bg-gradient-to-br from-blue-400 to-indigo-500',
		},
	];

	return (
		<motion.div
			className='grid grid-cols-2 gap-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{statCards.map((card, index) => (
				<motion.div
					key={card.title}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
				>
					<StatCard {...card} />
				</motion.div>
			))}
		</motion.div>
	);
};

export { StatsHomePage };
