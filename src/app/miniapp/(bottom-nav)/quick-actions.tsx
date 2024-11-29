'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Share2, Bell, ChartLine, Gift } from 'lucide-react';
import Link from 'next/link';

export const ActionButton = ({
	icon: Icon,
	label,
	href,
}: {
	icon: React.ElementType;
	label: string;
	href: string;
}) => (
	<motion.button className='w-full' whileTap={{ scale: 0.95 }}>
		<Link
			href={href}
			className='w-full bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 border-b-4 border-blue-500'
		>
			<Icon className='w-8 h-8 text-white' />
		</Link>
	</motion.button>
);

export function QuickActions() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='h-full bg-gray-900 rounded-xl p-4 flex flex-col justify-between space-y-4'
		>
			<ActionButton
				icon={ChartLine}
				label='Rankings'
				href='/miniapp/rankings'
			/>
			<ActionButton icon={Gift} label='Daily reward' href='/miniapp/reward' />
		</motion.div>
	);
}
