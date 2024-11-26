'use client';

import { motion } from 'framer-motion';
import { Coins, Ticket, Star } from 'lucide-react';
import Image from 'next/image';
import { consumableItems } from '@/src/constants/powerUps';
import { token } from '@/src/constants/app-config';
import { SubmitButton } from '../../common/buttons/submit-button';

export function ConsumableItemCard() {
	const isLoading = false;
	return (
		<div className='space-y-3'>
			{consumableItems.map((item) => (
				<motion.div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg'>
					<div className='relative h-40'>
						<Image
							src={item.image}
							alt={item.title}
							layout='fill'
							objectFit='cover'
							className='transition-opacity duration-300 ease-in-out group-hover:opacity-75'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
							<h3 className='text-2xl font-bold text-white text-center px-4'>
								{item.title}
							</h3>
						</div>
					</div>
					<div className='p-4'>
						<p className='text-gray-300 text-sm mb-4'>{item.description}</p>
						<div className='flex justify-between items-center mb-4'>
							{item.coins && (
								<div className='flex items-center'>
									<Coins className='w-5 h-5 text-yellow-400 mr-1' />
									<span className='text-yellow-400 font-semibold'>
										{item.coins} {token.symbol}
									</span>
								</div>
							)}
							{item.passes && (
								<div className='flex items-center'>
									<Ticket className='w-5 h-5 text-green-400 mr-1' />
									<span className='text-green-400 font-semibold'>
										{item.passes}
									</span>
								</div>
							)}
							{item.stars && (
								<div className='flex items-center'>
									<Ticket className='w-5 h-5 text-blue-400 mr-1' />
									<span className='text-blue-400 font-semibold'>
										{item.stars}
									</span>
								</div>
							)}
						</div>
						<div className='flex justify-between items-center'>
							<span className='text-white font-bold text-lg'>
								{item.price} Stars
							</span>
							<SubmitButton
								title='Purchase'
								loadingTitle='Sending your request...'
							/>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
