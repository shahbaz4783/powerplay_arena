'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface GlowingButtonProps {
	href: string;
	children: React.ReactNode;
}

export default function GlowingButton({ href, children }: GlowingButtonProps) {
	return (
		<motion.div whileTap={{ scale: 0.95 }}>
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className='relative inline-flex items-center px-8 py-4 overflow-hidden text-lg font-bold text-white rounded-full group'
			>
				<span className='absolute inset-0 w-full h-full transition duration-300 ease-out opacity-75 bg-gradient-to-br from-purple-600 via-pink-700 to-blue-400'></span>
				<span className='absolute inset-0 w-full h-full border border-white rounded-full opacity-25'></span>
				<span className='absolute inset-0 w-full h-full animate-pulse bg-gradient-to-br from-transparent via-purple-900 to-transparent opacity-25 group-active:opacity-50'></span>
				<span className='relative flex items-center'>
					<Play className='mr-2' />
					{children}
				</span>
			</a>
		</motion.div>
	);
}
