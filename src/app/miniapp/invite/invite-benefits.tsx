'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Coins,
	Gift,
	Clock,
	Users,
	ChevronLeft,
	ChevronRight,
	AlertCircle,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';

const benefits = [
	{
		icon: <Users className='w-12 h-12' />,
		title: 'Instant Rewards',
		description:
			'Both referrer and referee receive 500 Power Coins and 10 Passes upon successful referral.',
		gradient: 'from-blue-500/20 to-blue-600/20',
		iconColor: 'text-blue-400',
	},
	{
		icon: <Coins className='w-12 h-12' />,
		title: 'Ongoing Earnings',
		description:
			"Referrers earn 10% of their referral's Power Coin earnings for the first 4 weeks after joining.",
		gradient: 'from-yellow-500/20 to-yellow-600/20',
		iconColor: 'text-yellow-400',
	},
	{
		icon: <Gift className='w-12 h-12' />,
		title: 'Voucher Bonuses',
		description:
			'For every 10 vouchers purchased by your referral, both parties receive 1 free voucher (up to 100) for 4 weeks.',
		gradient: 'from-purple-500/20 to-purple-600/20',
		iconColor: 'text-purple-400',
	},
	{
		icon: <Clock className='w-12 h-12' />,
		title: 'Time-Limited Offer',
		description:
			'Take advantage of these exclusive benefits within 4 weeks of your referral joining.',
		gradient: 'from-green-500/20 to-green-600/20',
		iconColor: 'text-green-400',
	},
	{
		icon: <AlertCircle className='w-12 h-12' />,
		title: 'Extension Rewards',
		description:
			'Stay active and earn well! Referrers are more likely to extend the referral benefits period for users who actively participate and generate good earnings.',
		gradient: 'from-red-500/20 to-red-600/20',
		iconColor: 'text-red-400',
	},
];

const ReferralBenefits = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		if (isAutoPlaying) {
			const timer = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
			}, 5000);

			return () => clearInterval(timer);
		}
	}, [isAutoPlaying]);

	const handleSlideChange = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
	};

	const nextSlide = () => {
		handleSlideChange((currentIndex + 1) % benefits.length);
	};

	const prevSlide = () => {
		handleSlideChange((currentIndex - 1 + benefits.length) % benefits.length);
	};

	return (
		<div className=''>
			<Card className='bg-gray-900/95 border-gray-800 shadow-xl backdrop-blur'>
				<CardContent>
					<AnimatePresence mode='wait'>
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.4, ease: 'easeOut' }}
							className='min-h-[280px] flex flex-col items-center justify-center text-center px-4'
						>
							<motion.div
								className={`p-6 rounded-full mb-8 bg-gradient-to-br ${benefits[currentIndex].gradient}`}
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<div className={benefits[currentIndex].iconColor}>
									{benefits[currentIndex].icon}
								</div>
							</motion.div>
							<motion.h3
								className='text-2xl font-bold text-white mb-6 font-mono'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
							>
								{benefits[currentIndex].title}
							</motion.h3>
							<motion.p
								className='text-sm text-slate-400'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								{benefits[currentIndex].description}
							</motion.p>
						</motion.div>
					</AnimatePresence>

					<div className='flex justify-between items-center mt-8'>
						<Button
							variant='outline'
							size='icon'
							onClick={prevSlide}
							className='bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-white'
						>
							<ChevronLeft className='h-5 w-5' />
						</Button>

						<div className='flex space-x-3'>
							{benefits.map((_, index) => (
								<button
									key={index}
									onClick={() => handleSlideChange(index)}
									className='group p-1 focus:outline-none'
								>
									<motion.div
										className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
											index === currentIndex
												? 'bg-blue-400'
												: 'bg-gray-600 group-hover:bg-gray-500'
										}`}
										animate={{
											scale: index === currentIndex ? 1.2 : 1,
										}}
										transition={{ duration: 0.3 }}
									/>
								</button>
							))}
						</div>

						<Button
							variant='outline'
							size='icon'
							onClick={nextSlide}
							className='bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-white'
						>
							<ChevronRight className='h-5 w-5' />
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export { ReferralBenefits };
