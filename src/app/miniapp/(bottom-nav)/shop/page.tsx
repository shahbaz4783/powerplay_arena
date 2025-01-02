'use client';

import { motion } from 'framer-motion';
import {
	Shirt,
	Zap,
	Package,
	Coins,
	Diamond,
	Ticket,
	Sparkles,
	ArrowLeftRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { FeaturedCarousel } from './featured-carousel';

interface StoreSection {
	id: string;
	title: string;
	icon: React.ReactNode;
	description: string;
	color: string;
	highlight?: boolean;
	href: string;
}

export default function ShopHub() {
	const stores: StoreSection[] = [
		{
			id: 'voucher',
			title: 'Voucher Store',
			icon: <Ticket className='h-7 w-7' />,
			description: 'Buy vouchers & try your luck',
			color: 'from-purple-600 via-pink-600 to-rose-600',
			highlight: true,
			href: '/miniapp/shop/vouchers',
		},
		{
			id: 'avatars',
			title: 'Avatar Shop',
			icon: <Shirt className='h-7 w-7' />,
			description: 'Boost xp with avatars',
			color: 'from-blue-600 to-indigo-600',
			href: '/miniapp/shop/avatar',
		},
		{
			id: 'exchange',
			title: 'Exchange',
			icon: <ArrowLeftRight className='h-7 w-7' />,
			description: 'Convert your resources',
			color: 'from-amber-500 to-orange-600',
			href: '/miniapp/shop/exchange',
		},
		{
			id: 'powerups',
			title: 'Power Ups',
			icon: <Zap className='h-7 w-7' />,
			description: 'Boost your gameplay',
			color: 'from-cyan-500 to-blue-600',
			href: '/miniapp/shop/powerups',
		},
		{
			id: 'resources',
			title: 'Resources',
			icon: <Package className='h-7 w-7' />,
			description: 'Stock up on essentials',
			color: 'from-emerald-500 to-green-600',
			href: '/miniapp/shop/resource-bank',
		},
	];

	return (
		<main className='bg-gradient-to-b from-slate-900 to-slate-950 text-white'>
			{/* Header */}
			<section className='p-3 z-[100] sticky top-0 bg-black/20 backdrop-blur-sm'>
				<header className='flex justify-between items-center mb-2'>
					<h1 className='text-2xl font-bold'>Shop</h1>
					<div className='flex items-center gap-2 bg-black/30 px-4 py-1.5 rounded-full'>
						<Diamond className='h-5 w-5 text-purple-400' />
						<span className='font-mono text-lg'>2,450</span>
					</div>
				</header>
			</section>
			{/* Stores Grid */}
			<section className='p-3 grid gap-3'>
				<motion.div
					className=' col-span-2 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 opacity-90'
					whileTap={{ scale: 0.98 }}
				>
					<div className=' p-6'>
						<div className='flex items-start justify-between'>
							<div className='p-3 rounded-lg bg-black/20 backdrop-blur-sm'>
								<Ticket className='h-8 w-8' />
							</div>
						</div>
						<div className='mt-4'>
							<h3 className='text-xl font-bold mb-1'>Voucher Store</h3>
							<p className='text-white/80 text-sm'>
								Buy vouchers & try your luck in games
							</p>
						</div>
					</div>
				</motion.div>

				{/* Other Stores */}
				{stores.slice(1).map((store) => (
					<Link
						key={store.id}
						href={store.href}
						className={cn(
							'rounded-lg bg-gradient-to-r overflow-hidden cursor-pointer',
							store.color
						)}
					>
						<motion.div whileTap={{ scale: 0.98 }}>
							<div className='relative h-full p-4 flex flex-col justify-between'>
								<div className='p-2 rounded-lg bg-black/20 backdrop-blur-sm w-fit'>
									{store.icon}
								</div>
								<div>
									<h3 className='font-bold text-lg mb-1'>{store.title}</h3>
									<p className='text-sm text-white/80'>{store.description}</p>
								</div>
							</div>
						</motion.div>
					</Link>
				))}
			</section>
		</main>
	);
};