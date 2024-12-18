import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CyberPulseButtonProps {
	href: string;
	onClick?: () => void;
	children: React.ReactNode;
	icon: React.ReactNode;
}

export const GameButton: React.FC<CyberPulseButtonProps> = ({
	href,
	onClick,
	children,
	icon,
}) => {
	return (
		<Link href={href} className='w-full'>
			<motion.button
				className='w-full p-4 bg-gray-900 text-purple-400 font-bold rounded-xl shadow-lg flex items-center justify-center space-x-3 relative overflow-hidden'
				onClick={onClick}
				whileTap={{ scale: 0.95 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}
			>
				<motion.div
					className='absolute inset-0 bg-purple-800 opacity-30'
					animate={{
						background: [
							'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(17,24,39,0) 70%)',
							'radial-gradient(circle, rgba(147,51,234,0.3) 100%, rgba(17,24,39,0) 100%)',
						],
					}}
					transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
				/>
				<span className=' z-10'>{icon}</span>
				<span className='text-sm font-mono z-10'>{children}</span>
				<motion.div
					className='absolute inset-0 border  rounded-xl'
					animate={{
						boxShadow: [
							'0 0 0 0 rgba(147,51,234,0.7)',
							'0 0 0 10px rgba(147,51,234,0)',
						],
					}}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
			</motion.button>
		</Link>
	);
};
