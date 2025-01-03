'use client';

import { motion } from 'framer-motion';
import {
	Shirt,
	Zap,
	Package,
	Diamond,
	ArrowLeftRight,
	Flame,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { InfoCarousel } from './featured-carousel';

const storeCategories = [
	{
		id: 'resources',
		title: 'Resource',
		icon: <Package className='h-6 w-6' />,
		description: 'Stock up on essential game items',
		perks: ['Bulk savings', 'Auto-refill', 'Resource tracking'],
		bg_color: 'from-emerald-900 to-teal-950',
		href: '/miniapp/shop/resource-bank',
		border_color: 'border-emerald-500/10',
		text_color: 'text-emerald-300',
		icon_color: 'bg-emerald-500/10',
		hover_effect: 'hover:border-emerald-500/30 hover:bg-emerald-900/50',
	},
	{
		id: 'exchange',
		title: 'Exchange',
		icon: <ArrowLeftRight className='h-6 w-6' />,
		description: 'Quick and secure resource conversion',
		perks: ['Real-time rates', 'Instant exchange', 'No hidden fees'],
		bg_color: 'from-amber-900 to-orange-950',
		href: '/miniapp/shop/exchange',
		border_color: 'border-amber-500/10',
		text_color: 'text-amber-400',
		icon_color: 'bg-amber-500/10',
		hover_effect: 'hover:border-amber-500/30 hover:bg-amber-900/50',
	},
	{
		id: 'powerups',
		title: 'Power Ups',
		icon: <Zap className='h-6 w-6' />,
		description: 'Boost your gameplay with special abilities',
		perks: ['Instant effect', 'Stack boosters', 'Duration tracker'],
		bg_color: 'from-cyan-900 to-sky-950',
		href: '/miniapp/shop/powerups',
		border_color: 'border-cyan-500/10',
		text_color: 'text-cyan-300',
		icon_color: 'bg-cyan-500/10',
		hover_effect: 'hover:border-cyan-500/30 hover:bg-cyan-900/50',
	},
	{
		id: 'avatars',
		title: 'Avatar Shop',
		icon: <Shirt className='h-6 w-6' />,
		description: 'Boost xp and your look with avatars',
		perks: ['Preview before buy', 'Rare collections', 'Seasonal items'],
		bg_color: 'from-fuchsia-900 to-purple-950',
		href: '/miniapp/shop/avatar',
		border_color: 'border-fuchsia-500/10',
		text_color: 'text-fuchsia-300',
		icon_color: 'bg-fuchsia-500/10',
		hover_effect: 'hover:border-fuchsia-500/30 hover:bg-fuchsia-900/50',
	},
];

export default function ShopHub() {
	return (
		<main className='text-white'>
			<header className='p-6 z-[100] sticky top-0 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800'>
				<div className='flex justify-between items-center mx-auto'>
					<div className='space-y-1'>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent'>
							Shop
						</h1>
						<p className='text-sm text-gray-400 font-medium'>
							Level up your gameplay
						</p>
					</div>
					<motion.div
						whileHover={{ scale: 1.02 }}
						className='flex items-center gap-3 bg-gray-900/80 px-6 py-3 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/5'
					>
						<Diamond className='h-5 w-5 text-purple-400' />
						<span className='font-mono text-lg text-purple-100'>2,450</span>
					</motion.div>
				</div>
			</header>
			<InfoCarousel />

			<section className='space-y-6 px-3 pt-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 rounded-lg bg-orange-500/10'>
						<Flame className='h-5 w-5 text-orange-400' />
					</div>
					<h2 className='text-xl font-bold text-gray-100'>Featured Stores</h2>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					{storeCategories.map((store) => (
						<Link key={store.id} href={store.href}>
							<motion.div
								className={cn(
									'rounded-xl overflow-hidden h-full border transition-all duration-300',
									'bg-gradient-to-br backdrop-blur-sm',
									store.bg_color,
									store.border_color,
									store.hover_effect,
									'shadow-lg'
								)}
								whileTap={{ scale: 0.98 }}
							>
								<div className='h-full p-3 bg-black/20'>
									<div className='flex flex-col h-full gap-4'>
										<div
											className={cn(
												'p-3 rounded-xl w-fit',
												store.icon_color,
												'backdrop-blur-xl'
											)}
										>
											{store.icon}
										</div>
										<div className='space-y-2'>
											<h3 className='font-bold font-jetbrains text-white text-xl'>
												{store.title}
											</h3>
											<p
												className={cn(
													'text-xs font-poppins font-light',
													store.text_color
												)}
											>
												{store.description}
											</p>
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
