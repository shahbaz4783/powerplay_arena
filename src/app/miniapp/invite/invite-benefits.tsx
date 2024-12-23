'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Coins,
	Gift,
	Rocket,
	Users,
	Zap,
	ChevronLeft,
	ChevronRight,
	Clock,
	AlarmClockPlus,
} from 'lucide-react';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { IconButton } from '@/src/components/common/buttons/primary-button';

const benefits = [
	{
		icon: <Zap className='w-8 h-8' />,
		title: 'Instant Rewards',
		description:
			'Earn 500 Power Coins and 10 Passes for both referrer and referee.',
		gradient: 'from-blue-600 to-cyan-400',
	},
	{
		icon: <Coins className='w-8 h-8' />,
		title: 'Ongoing Earnings',
		description: "Get 10% of your referral's Power Coins for 4 weeks.",
		gradient: 'from-amber-500 to-orange-400',
	},
	{
		icon: <Gift className='w-8 h-8' />,
		title: 'Voucher Bonuses',
		description:
			'Both earns 1 free voucher for every 10 your referral buys (up to 100).',
		gradient: 'from-purple-600 to-pink-400',
	},
	{
		icon: <Clock className='w-8 h-8' />,
		title: 'Time-Limited Offer',
		description: 'Enjoy these rewards for the first 4 weeks after joining.',
		gradient: 'from-green-600 to-emerald-400',
	},
	{
		icon: <AlarmClockPlus className='w-8 h-8' />,
		title: 'Extension Rewards',
		description:
			'Referees can extend benefits with Star Vouchers, also unlocks higher limits for both.',
		gradient: 'from-indigo-600 to-blue-400',
	},
];

export const ReferralBenefits = () => {
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
		<GradientBorder className='p-0'>
			<div className='relative h-[240px]'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className='absolute inset-0 p-6 flex flex-col items-center justify-center text-center'
					>
						<div
							className={`p-3 rounded-full bg-gradient-to-br ${benefits[currentIndex].gradient} mb-4`}
						>
							<div className='text-white'>{benefits[currentIndex].icon}</div>
						</div>
						<h3 className='text-2xl font-bold text-white mb-2 font-exo2'>
							{benefits[currentIndex].title}
						</h3>
						<p className='text-sm text-slate-400 font-poppins'>
							{benefits[currentIndex].description}
						</p>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className='flex justify-between items-center bg-gray-800 p-2'>
				<IconButton text='' icon={ChevronLeft} onClick={prevSlide} />

				<div className='absolute  left-1/2 transform -translate-x-1/2 flex space-x-2'>
					{benefits.map((_, index) => (
						<button
							key={index}
							onClick={() => handleSlideChange(index)}
							className='w-2 h-2 rounded-full focus:outline-none transition-all duration-200 ease-in-out'
							style={{
								backgroundColor: index === currentIndex ? '#60A5FA' : '#4B5563',
								transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
							}}
						/>
					))}
				</div>
				<IconButton text='' icon={ChevronRight} onClick={nextSlide} />
			</div>
		</GradientBorder>
	);
};

