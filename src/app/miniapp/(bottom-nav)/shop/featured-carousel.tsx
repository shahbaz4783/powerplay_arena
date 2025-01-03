import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/card';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from '@/src/components/ui/carousel';
import { cn } from '@/src/lib/utils';
import {
	Gift,
	Sparkles,
	Clock,
	Zap,
	Trophy,
	Heart,
	Star,
	ChevronRight,
	Pause,
	Play,
} from 'lucide-react';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';

const carouselItems = [
	{
		id: 1,
		type: 'flash-sale',
		title: 'Lightning Deal',
		description: '50% OFF Premium Season Pass',
		icon: <Zap className='h-6 w-6 text-amber-200' />,
		gradient: 'from-[#1a1a1a] via-[#2a1f1f] to-[#2d1818]',
		accent: 'bg-gradient-to-r from-red-500 to-amber-500',
		cta: 'Claim Now',
		timer: 7200,
		badge: 'Flash Sale',
		badgeColor: 'bg-gradient-to-r from-red-500 to-orange-500',
		originalPrice: '59.99',
		salePrice: '29.99',
	},
	{
		id: 2,
		type: 'bundle',
		title: 'Ultimate Bundle',
		description: '10,000 Coins + 100 Gems + 5 Rare Items',
		icon: <Gift className='h-6 w-6 text-violet-200' />,
		gradient: 'from-[#1a1a1a] via-[#1f1f2a] to-[#1f1a2d]',
		accent: 'bg-gradient-to-r from-violet-500 to-purple-500',
		cta: 'View Bundle',
		price: '49.99',
		badge: 'Best Value',
		badgeColor: 'bg-gradient-to-r from-violet-500 to-purple-500',
		discount: '30% OFF',
	},
	{
		id: 3,
		type: 'achievement',
		title: 'Elite Challenge',
		description: 'Complete Tasks for Legendary Rewards',
		icon: <Trophy className='h-6 w-6 text-blue-200' />,
		gradient: 'from-[#1a1a1a] via-[#1f242a] to-[#1a222d]',
		accent: 'bg-gradient-to-r from-blue-500 to-cyan-500',
		cta: 'Start Challenge',
		progress: 30,
		badge: 'Event',
		badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
		rewardValue: '100+ Items',
	},
	{
		id: 4,
		type: 'subscription',
		title: 'VIP Pass',
		description: 'Exclusive Perks & Daily Rewards',
		icon: <Heart className='h-6 w-6 text-pink-200' />,
		gradient: 'from-[#1a1a1a] via-[#2a1f24] to-[#2d1a22]',
		accent: 'bg-gradient-to-r from-pink-500 to-rose-500',
		cta: 'Join VIP',
		price: '14.99/month',
		badge: 'Popular',
		badgeColor: 'bg-gradient-to-r from-pink-500 to-rose-500',
		benefits: ['Daily Rewards', 'Exclusive Items'],
	},
	{
		id: 5,
		type: 'deals',
		title: 'Mystery Box',
		description: 'Guaranteed Rare or Better Items',
		icon: <Sparkles className='h-6 w-6 text-emerald-200' />,
		gradient: 'from-[#1a1a1a] via-[#1f2a24] to-[#1a2d22]',
		accent: 'bg-gradient-to-r from-emerald-500 to-green-500',
		cta: 'Open Box',
		price: '9.99',
		badge: 'New',
		badgeColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
		guarantee: 'Rare Item Guaranteed',
	},
];

export function InfoCarousel() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap());
		});

		let interval: NodeJS.Timeout;
		if (autoplay) {
			interval = setInterval(() => {
				api.scrollNext();
			}, 8000);
		}

		return () => clearInterval(interval);
	}, [api, autoplay]);

	const formatTimeRemaining = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		return `${hours}h ${minutes}m`;
	};

	return (
		<div className='relative w-full backdrop-blur-2xl'>
			<Carousel
				setApi={setApi}
				className='w-full border-none'
				opts={{
					loop: true,
				}}
			>
				<CarouselContent>
					{carouselItems.map((item, index) => (
						<CarouselItem key={item.id}>
							<div className=' h-full'>
								<section
									className={cn(
										'bg-gradient-to-br h-full border border-white/5',
										'transition-all duration-300 ease-out',
										'hover:scale-102 group',
										item.gradient,
										'relative overflow-hidden'
									)}
								>
									<div
										className={cn(
											'absolute top-0 left-0 right-0 h-1',
											item.accent
										)}
									/>

									<CardContent className='flex flex-col items-start p-6 h-full relative'>
										{item.badge && (
											<Badge
												className={cn(
													'absolute top-3 right-2',
													item.badgeColor,
													'text-white px-2 py-1 text-xs font-medium'
												)}
											>
												{item.badge}
											</Badge>
										)}

										<div
											className={cn(
												'rounded-lg p-2.5',
												item.accent,
												'bg-opacity-10 mb-4',
												'transition-transform duration-300 group-hover:scale-105'
											)}
										>
											{item.icon}
										</div>

										<h3 className='text-base font-semibold text-white mb-1'>
											{item.title}
										</h3>

										<p className='text-white/80 text-sm mb-4'>
											{item.description}
										</p>

										{item.timer && (
											<div className='flex items-center space-x-2 mb-3 bg-white/5 rounded-full px-3 py-1.5'>
												<Clock className='h-4 w-4 text-white/70' />
												<span className='text-sm text-white/70'>
													{formatTimeRemaining(item.timer)}
												</span>
											</div>
										)}

										{item.price && (
											<div className='flex items-baseline gap-2 mb-3'>
												<span className='text-xl font-bold text-white'>
													${item.price}
												</span>
											</div>
										)}

										{item.progress !== undefined && (
											<div className='w-full space-y-2 mb-4'>
												<div className='flex justify-between text-xs text-white/60'>
													<span>Progress</span>
													<span>{item.progress}%</span>
												</div>
												<div className='w-full bg-white/5 rounded-full h-1.5'>
													<div
														className={cn(
															'rounded-full h-1.5 transition-all duration-500',
															item.accent
														)}
														style={{ width: `${item.progress}%` }}
													/>
												</div>
											</div>
										)}

										<Button
											className={cn(
												'mt-auto w-full',
												item.accent,
												'text-white font-medium',
												'transition-all duration-300',
												'group flex items-center justify-center gap-2'
											)}
										>
											{item.cta}
											<ChevronRight className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
										</Button>
									</CardContent>
								</section>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<div className='border-b-2 backdrop-blur-md w-full right-0 flex items-center space-x-4 py-2 px-6'>
				<button
					className='text-white/60 hover:text-white transition-colors'
					onClick={() => setAutoplay(!autoplay)}
				>
					{autoplay ? (
						<Pause className='h-4 w-4' />
					) : (
						<Play className='h-4 w-4' />
					)}
				</button>
				<div className='flex space-x-2'>
					{Array.from({ length: count }).map((_, index) => (
						<button
							key={index}
							className={cn(
								'w-1.5 h-1.5 rounded-full transition-all duration-300',
								current === index
									? 'w-3 bg-white'
									: 'bg-white/40 hover:bg-white/60'
							)}
							onClick={() => api?.scrollTo(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default InfoCarousel;
