'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChartLine, Target, Gift, UserPlus, Share2 } from 'lucide-react';
import Link from 'next/link';

interface NavCardProps {
	href: string;
	icon: React.ReactNode;
	label: string;
}

const NavCard: React.FC<NavCardProps> = ({ href, icon, label }) => (
	<motion.div whileTap={{ scale: 0.95 }}>
		<Link
			href={href}
			className='block h-full bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl border border-primary/20 p-4 rounded-xl transition-all duration-300'
		>
			<div className='flex flex-col items-center justify-center h-full'>
				{React.cloneElement(icon as React.ReactElement, {
					size: 32,
					className: 'mb-2 text-primary',
				})}
				<span className='text-primary-foreground text-sm text-slate-200 font-semibold'>
					{label}
				</span>
			</div>
		</Link>
	</motion.div>
);

const navItems = [
	{ href: '/miniapp/invite', icon: <UserPlus />, label: 'Invite' },
	{ href: '/miniapp/tasks', icon: <Share2 />, label: 'Follow Us' },
	{ href: '/miniapp/stats', icon: <Target />, label: 'Stats' },
];

export function FeaturedTiles() {
	return (
		<motion.section
			className='grid grid-cols-3 gap-4'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			{navItems.map((item, index) => (
				<motion.div
					key={item.href}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.1 }}
				>
					<NavCard {...item} />
				</motion.div>
			))}
		</motion.section>
	);
}
