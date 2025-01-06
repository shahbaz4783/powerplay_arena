'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface SubPageHeaderProps {
	title: string;
	subtitle: string;
	showBackButton?: boolean;
	className?: string;
}

const SubPageHeader = ({
	title,
	subtitle,
	showBackButton = true,
	className,
}: SubPageHeaderProps) => {
	const router = useRouter();

	return (
		<div className='sticky top-0 z-50'>
			{/* Gradient Background */}
			<div className='absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/75 backdrop-blur-md' />

			{/* Main Content */}
			<div className='relative px-4 py-3'>
				<div className='flex items-center'>
					{/* Animated Back Button */}
					{showBackButton && (
						<motion.button
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => router.back()}
							className='mr-3 p-1.5 rounded-full bg-gray-800/50 hover:bg-gray-800 
                        transition-colors duration-200'
						>
							<ArrowLeft className='w-5 h-5 text-gray-300' />
						</motion.button>
					)}

					{/* Title and Subtitle Container */}
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className='flex-1'
					>
						<h1 className='text-lg font-semibold text-white'>{title}</h1>
						{subtitle && (
							<p className='text-sm text-gray-400 mt-0.5'>{subtitle}</p>
						)}
					</motion.div>
				</div>

				{/* Bottom Border Gradient */}
				<div
					className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                      from-transparent via-gray-700/50 to-transparent'
				/>

				{/* Subtle Top Highlight */}
				<div
					className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r 
                      from-transparent via-white/[0.03] to-transparent'
				/>
			</div>
		</div>
	);
};

export default SubPageHeader;
