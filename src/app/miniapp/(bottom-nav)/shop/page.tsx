'use client';

import { motion } from 'framer-motion';
import {
	Shirt,
	Zap,
	Package,
	Diamond,
	ArrowLeftRight,
	Flame,
	ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { PremiumAnnouncementCarousel } from './featured-carousel';

const storeCategories = [
	{
		id: 'resources',
		title: 'Resource',
		icon: <Package className='h-6 w-6' />,
		description: 'Stock up on essential game items',
		perks: ['Bulk savings', 'Auto-refill', 'Resource tracking'],
		bg_gradient: 'from-emerald-600/20 via-emerald-900/40 to-emerald-950/50',
		pattern:
			'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
		href: '/miniapp/shop/resource-bank',
		accent_color: 'bg-emerald-500',
		text_color: 'text-emerald-200',
		icon_color: 'text-emerald-300',
		border_color: 'border-emerald-400/20',
		stat: '2.5M+',
		stat_label: 'Daily trades',
	},
	{
		id: 'exchange',
		title: 'Exchange',
		icon: <ArrowLeftRight className='h-6 w-6' />,
		description: 'Quick and secure resource conversion',
		perks: ['Real-time rates', 'Instant exchange', 'No hidden fees'],
		bg_gradient: 'from-amber-600/20 via-amber-900/40 to-amber-950/50',
		pattern:
			'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
		href: '/miniapp/shop/exchange',
		accent_color: 'bg-amber-500',
		text_color: 'text-amber-200',
		icon_color: 'text-amber-300',
		border_color: 'border-amber-400/20',
		stat: '500K+',
		stat_label: 'Exchanges',
	},
	{
		id: 'powerups',
		title: 'Power Ups',
		icon: <Zap className='h-6 w-6' />,
		description: 'Boost your gameplay with special abilities',
		perks: ['Instant effect', 'Stack boosters', 'Duration tracker'],
		bg_gradient: 'from-cyan-600/20 via-cyan-900/40 to-cyan-950/50',
		pattern:
			'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
		href: '/miniapp/shop/powerups',
		accent_color: 'bg-cyan-500',
		text_color: 'text-cyan-200',
		icon_color: 'text-cyan-300',
		border_color: 'border-cyan-400/20',
		stat: '300+',
		stat_label: 'Sold',
	},
	{
		id: 'avatars',
		title: 'Avatar Shop',
		icon: <Shirt className='h-6 w-6' />,
		description: 'Boost xp and your look with avatars',
		perks: ['Preview before buy', 'Rare collections', 'Seasonal items'],
		bg_gradient: 'from-fuchsia-600/20 via-fuchsia-900/40 to-fuchsia-950/50',
		pattern:
			'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
		href: '/miniapp/shop/avatar',
		accent_color: 'bg-fuchsia-500',
		text_color: 'text-fuchsia-200',
		icon_color: 'text-fuchsia-300',
		border_color: 'border-fuchsia-400/20',
		stat: '1000+',
		stat_label: 'Items',
	},
];

export default function ShopHub() {
	return (
		<main className='text-white'>
			<header className='p-4 z-[100] sticky top-0 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800'>
				<div className='flex justify-between items-center mx-auto'>
					<div className='space-y-1'>
						<h1 className='text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent'>
							Shop
						</h1>
						<p className='text-sm text-gray-400 font-medium'>
							Level up your gameplay
						</p>
					</div>
					<motion.div className='flex items-center gap-3 bg-gray-900/80 px-6 py-3 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/5'>
						<Diamond className='h-5 w-5 text-purple-400' />
						<span className='font-mono text-lg text-purple-100'>2,450</span>
					</motion.div>
				</div>
			</header>
			<PremiumAnnouncementCarousel />

			<section className='space-y-6 px-3 pt-6 pb-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 rounded-lg bg-orange-500/10'>
						<Flame className='h-5 w-5 text-orange-400' />
					</div>
					<h2 className='text-xl font-bold text-gray-100'>Featured Stores</h2>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					{storeCategories.map((store) => (
						<Link key={store.id} href={store.href}>
							<motion.div
								className={cn(
									'group relative rounded-2xl overflow-hidden h-full',
									store.pattern,
									store.bg_gradient,
									'backdrop-blur-sm',
									'shadow-lg transition-all duration-500',
									'border',
									store.border_color
								)}
								whileTap={{ scale: 0.98 }}
							>
								{/* Subtle gradient overlay */}
								<div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20' />

								{/* Glowing accent line */}

								<div className='relative h-full p-4'>
									<div className='flex flex-col h-full gap-4'>
										<div className='flex justify-between items-start'>
											<div
												className={cn(
													'p-3 rounded-xl',
													'bg-white/5 backdrop-blur-sm',
													'border border-white/10',
													'shadow-lg'
												)}
											>
												<div className={store.icon_color}>{store.icon}</div>
											</div>
											<div className='flex flex-col items-end'>
												<span className='text-lg font-bold text-white'>
													{store.stat}
												</span>
												<span className='text-xs text-white/60'>
													{store.stat_label}
												</span>
											</div>
										</div>

										<div className='flex-grow space-y-2'>
											<h3 className='font-bold text-white text-xl tracking-tight'>
												{store.title}
											</h3>
											<p
												className={cn('text-sm font-medium', store.text_color)}
											>
												{store.description}
											</p>
										</div>

										<div
											className={cn(
												'flex items-center justify-between',
												'p-2.5 rounded-xl',
												'bg-white/5 backdrop-blur-sm',
												'border border-white/10'
											)}
										>
											<span className='text-xs font-medium text-white/70'>
												View Store
											</span>
											<ChevronRight
												className={cn(
													'h-4 w-4 transition-transform duration-300',
													store.icon_color
												)}
											/>
										</div>
									</div>
								</div>
							</motion.div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
