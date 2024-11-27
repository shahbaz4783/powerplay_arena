'use client';

import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/src/components/ui/carousel';
import { featuredItems } from '@/src/constants/shop-items';

export function FeaturedCarousel() {
	return (
		<Carousel className='w-full' opts={{ loop: true }}>
			<CarouselContent>
				{featuredItems.map((item) => (
					<CarouselItem key={item.id}>
						<div className='p-1'>
							<div className='relative border border-blue-600 aspect-video overflow-hidden rounded-xl'>
								<Image
									src={item.image}
									alt={item.title}
									layout='fill'
									objectFit='cover'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
								<div className='absolute bottom-4 left-4 right-4 text-white'>
									<h3 className='text-xl font-mono font-bold mb-1'>{item.title}</h3>
									<p className='text-xs text-slate-400'>{item.description}</p>
								</div>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
