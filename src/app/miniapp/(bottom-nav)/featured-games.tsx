'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CoinsIcon, HandCoins, Swords } from 'lucide-react';
import { FaBaseballBatBall } from 'react-icons/fa6';

export const GameCard = ({
	title,
	description,
	icon: Icon,
	href,
	accentColor,
}: {
	title: string;
	description: string;
	icon: React.ElementType;
	href: string;
	accentColor: string;
}) => (
	<Link href={href} className='block'>
		<motion.div
			className={`bg-gray-800 rounded-xl p-4 flex items-center space-x-4 border-l-4 ${accentColor}`}
			whileTap={{ scale: 0.98 }}
		>
			<Icon className='w-8 h-8 text-white' />
			<div>
				<h3 className='text-lg font-bold text-white mb-1'>{title}</h3>
				<p className='text-xs text-gray-400'>{description}</p>
			</div>
		</motion.div>
	</Link>
);

export function FeaturedGames() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='space-y-4'
		>
			<GameCard
				title='Strike Play'
				description='Quick matches, big wins!'
				icon={FaBaseballBatBall}
				href='/game/cricket/match-setup'
				accentColor='border-green-500'
			/>
			<GameCard
				title='Fortune Flip'
				description='Flip to win, luck awaits!'
				icon={HandCoins}
				href='/game/coin-flip'
				accentColor='border-yellow-500'
			/>
		</motion.div>
	);
}
