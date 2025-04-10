'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { NAVIGATION_LINKS } from '@/src/constants/app-config';

const Navigation = () => {
	const pathname = usePathname();

	const isActiveRoute = (href: string) => {
		if (pathname === href) return true;
		if (href !== '/miniapp' && pathname.startsWith(href)) return true;
		return false;
	};

	return (
		<motion.nav
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			className='main-card
        sticky bottom-0
        w-full 
        backdrop-blur-lg
        border-t border-white/[0.08]
        bg-gradient-to-b from-gray-900/95 to-black/95
        safe-area-pb
      '
		>
			<div className=''>
				<div className='flex items-center justify-evenly'>
					{NAVIGATION_LINKS.map((item) => (
						<Link key={item.href} href={item.href} className='relative'>
							<div
								className={cn(
									'flex flex-col items-center justify-center relative',
									'transition-all duration-200 ease-in-out',
									isActiveRoute(item.href) ? 'scale-105' : 'scale-100'
								)}
							>
								{/* Active Background Glow */}
								{isActiveRoute(item.href) && (
									<motion.div
										layoutId='navGlow'
										className='absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-blue-500/0 blur-md rounded-xl'
										transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
									/>
								)}

								{/* Icon Container */}
								<div
									className={cn(
										'relative flex items-center justify-center',
										'rounded-xl p-1.5',
										'transition-colors duration-200',
										isActiveRoute(item.href)
											? 'text-blue-400'
											: 'text-gray-400 hover:text-gray-300'
									)}
								>
									<item.icon
										className={cn(
											'h-5 w-5 transition-all duration-200',
											isActiveRoute(item.href) && 'scale-110'
										)}
									/>
								</div>

								{/* Title */}
								<span
									className={cn(
										'text-[10px] font-medium mt-1',
										'transition-colors duration-200',
										isActiveRoute(item.href) ? 'text-blue-400' : 'text-gray-400'
									)}
								>
									{item.title}
								</span>

								{/* Active Indicator Dot */}
								{isActiveRoute(item.href) && (
									<motion.div
										layoutId='navIndicator'
										className='absolute -top-1 w-1 h-1 rounded-full bg-blue-400'
										transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Fancy Border Gradient */}
			<div className='absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent' />

			{/* Glass Reflection Effect */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/0 via-white/[0.02] to-white/[0.02] pointer-events-none' />
		</motion.nav>
	);
};

export default Navigation;
