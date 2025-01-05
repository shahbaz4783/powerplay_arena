import React, { useEffect, useState } from 'react';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from '@/src/components/ui/carousel';
import { cn } from '@/src/lib/utils';
import {
	Award,
	Bell,
	Crown,
	Sparkles,
	Star,
	Zap,
	Pause,
	Play,
} from 'lucide-react';

const announcements = [
	{
		id: 1,
		title: 'Special Event',
		description:
			'Join our exclusive Year-End Celebration starting this weekend',
		icon: <Crown className='h-6 w-6 text-amber-300' />,
		gradient: 'from-zinc-900 via-amber-950 to-orange-950',
		accent: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500',
		badge: 'Featured',
	},
	{
		id: 2,
		title: 'New Release',
		description: 'Experience our latest premium features and enhancements',
		icon: <Sparkles className='h-6 w-6 text-fuchsia-300' />,
		gradient: 'from-zinc-900 via-fuchsia-950 to-purple-950',
		accent: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500',
		badge: 'New',
	},
	{
		id: 3,
		title: 'Important Update',
		description: 'System maintenance scheduled for improved performance',
		icon: <Zap className='h-6 w-6 text-cyan-300' />,
		gradient: 'from-zinc-900 via-cyan-950 to-blue-950',
		accent: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500',
		badge: 'System',
	},
	{
		id: 4,
		title: 'Achievement Unlocked',
		description: 'Congratulations to our top performers this month',
		icon: <Award className='h-6 w-6 text-emerald-300' />,
		gradient: 'from-zinc-900 via-emerald-950 to-green-950',
		accent: 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500',
		badge: 'Community',
	},
];

export function PremiumAnnouncementCarousel() {
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
			}, 5000);
		}

		return () => clearInterval(interval);
	}, [api, autoplay]);

	return (
		<div className='relative w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-xl shadow-2xl'>
			<div className='pb-12'>
				<Carousel
					setApi={setApi}
					className='w-full'
					opts={{
						loop: true,
					}}
				>
					<CarouselContent>
						{announcements.map((item) => (
							<CarouselItem key={item.id}>
								<div className='p-1'>
									<div
										className={cn(
											'bg-gradient-to-br rounded-lg',
											'transition-all duration-500 ease-out',
											'group relative overflow-hidden min-h-[200px]',
											item.gradient
										)}
									>
										<div className='absolute inset-0 bg-black/10 backdrop-blur-[2px]' />
										<div
											className={cn(
												'absolute top-0 left-0 right-0 h-1',
												item.accent,
												'animate-pulse'
											)}
										/>

										<div className='flex flex-col items-start p-6 relative z-10'>
											<div className='flex items-center justify-between w-full mb-4'>
												<div
													className={cn(
														'rounded-xl p-3',
														item.accent,
														'bg-opacity-20 backdrop-blur-sm shadow-lg',
														'transition-all duration-500 group-hover:scale-110'
													)}
												>
													{item.icon}
												</div>
												<span
													className={cn(
														'text-xs font-medium text-white/90 px-3 py-1 rounded-full',
														item.accent,
														'bg-opacity-20 backdrop-blur-sm'
													)}
												>
													{item.badge}
												</span>
											</div>

											<h3 className='text-xl font-bold text-white mb-2 tracking-tight'>
												{item.title}
											</h3>

											<p className='text-white/80 text-sm leading-relaxed font-medium'>
												{item.description}
											</p>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<div className='absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/20 flex items-center justify-between space-x-4 py-3 px-6 rounded-b-xl border-t border-white/5'>
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
								'w-1.5 h-1.5 rounded-full transition-all duration-500',
								current === index
									? 'w-4 bg-white'
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

export default PremiumAnnouncementCarousel;
