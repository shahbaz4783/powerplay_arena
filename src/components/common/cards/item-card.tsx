'use client';

import { SubmitButton } from '../../common/buttons/submit-button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cloudinary_url } from '@/src/constants/app-config';
import { Star } from 'lucide-react';
import { LevelInfo } from '../../common/dialog/level-info';

interface ItemCardProps {
	id: string;
	image: string;
	title: string;
	levels?: any;
	price: number;
	onPurchase: (formData: FormData) => void;
	description: string;
}

export function ItemCard({
	id,
	image,
	title,
	levels,
	price,
	onPurchase,
	description,
}: ItemCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='rounded-xl grid grid-cols-3 bg-gray-900 backdrop-blur-sm border border-gray-800 overflow-hidden'
		>
			<aside className='relative col-span-1 h-full'>
				<div className='absolute inset-0'>
					<Image
						src={cloudinary_url + image}
						alt={title}
						fill
						className='object-cover'
						draggable={false}
						priority
					/>
				</div>
				{levels && <LevelInfo title={title} levels={levels} />}
			</aside>

			<aside className='col-span-2 p-4 flex gap-3 flex-col justify-between'>
				<div>
					<div className='flex justify-between items-start mb-3'>
						<h3 className='text-lg font-bold text-white'>{title}</h3>
					</div>
					<p className='text-slate-400 text-xs leading-relaxed'>
						{description}
					</p>
				</div>
				<footer className='flex items-center justify-between bg-slate-700/50 backdrop-blur-md p-2 rounded-xl'>
					<div className='flex items-center space-x-1'>
						<Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
						<span className='text-white font-bold text-'>{price}</span>
					</div>

					<form action={onPurchase}>
						<input type='hidden' name='itemId' value={id} />
						<SubmitButton
							title='Purchase'
							loadingTitle='Purchasing...'
							className='bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2'
						/>
					</form>
				</footer>
			</aside>
		</motion.div>
	);
}