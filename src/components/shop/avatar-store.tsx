'use client';

import { motion } from 'framer-motion';
import { avatars } from '@/src/constants/avatars';
import Image from 'next/image';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '../feedback/submit-button';

export function AvatarStore() {
	return (
		<motion.div
			className='space-y-3'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, staggerChildren: 0.1 }}
		>
			{avatars.map((avatar) => (
				<div className='border rounded-xl overflow-hidden flex gap-3 items-center'>
					<Image
						className='aspect-square object-cover bg-no-repeat'
						src={avatar.href}
						alt='Image'
						width={200}
						height={200}
					/>
					<div className='space-y-4'>
						<p>
							Price: {avatar.price} {token.symbol}
						</p>
						<p>Level Required: {avatar.requiredLvl}</p>
						<SubmitButton title='Buy Now' loadingTitle='Purchasing' />
					</div>
				</div>
			))}
		</motion.div>
	);
}
