'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hourglass } from 'lucide-react';
import { Button } from '../../ui/button';

interface FeatureComingSoonProps {
	feature: string;
}

export default function FeatureComingSoon({ feature }: FeatureComingSoonProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setIsFlipped((prev) => !prev);
		}, 2000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className='flex flex-col rounded-xl items-center justify-center min-h-[65svh] px-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'
			>
				<motion.div
					animate={{ rotateX: isFlipped ? 180 : 0 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					className='mb-8 relative w-16 h-16 mx-auto'
				>
					<Hourglass className='w-16 h-16 text-blue-300 absolute top-0 left-0' />
					<Hourglass className='w-16 h-16 text-blue-300 absolute top-0 left-0 rotate-180' />
				</motion.div>
				<h2 className='text-3xl md:text-4xl font-bold mb-2 text-blue-300'>
					{feature}
				</h2>
				<h3 className='text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
					Under Development
				</h3>
				<p className='md:text-xl text-slate-300 font-mono max-w-md mx-auto'>
					We're working hard to bring you this exciting new feature. Stay tuned
					for updates!
				</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='mt-8'
			>
				<Button className='px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-full text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'>
					Notify Me
				</Button>
			</motion.div>
		</div>
	);
}
