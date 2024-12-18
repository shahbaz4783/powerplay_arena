'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface NeonOutlineToastProps {
	message: string;
	type: 'info' | 'success';
	duration?: number;
}

export function Toast({
	message,
	type,
	duration = 3000,
}: NeonOutlineToastProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	const getToastStyles = () => {
		if (type === 'info') {
			return 'bg-blue-950/50 text-blue-300';
		}
		return 'bg-green-950/50 text-green-300';
	};

	const getOutlineColor = () => {
		return type === 'info' ? '#3b82f6' : '#22c55e';
	};

	const Icon = type === 'info' ? AlertCircle : CheckCircle;

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ type: 'spring', stiffness: 500, damping: 30 }}
					className={`fixed top-2 z-50 left-1/2 transform -translate-x-1/2 px-4 py-3 backdrop-blur-md rounded-xl ${getToastStyles()} backdrop-blur-sm`}
				>
					<svg
						className='absolute inset-0 w-full h-full'
						xmlns='http://www.w3.org/2000/svg'
					>
						<rect
							width='100%'
							height='100%'
							fill='none'
							rx='8'
							ry='8'
							strokeWidth='2'
							stroke={getOutlineColor()}
							strokeDasharray='8 8'
						>
							<animate
								attributeName='stroke-dashoffset'
								from='0'
								to='32'
								dur='0.5s'
								repeatCount='indefinite'
							/>
						</rect>
					</svg>
					<div className='flex items-center space-x-2 relative z-10'>
						<Icon className='w-5 h-5' />
						<span className='text-sm font-medium'>{message}</span>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
