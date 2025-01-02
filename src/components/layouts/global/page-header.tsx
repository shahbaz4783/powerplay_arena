'use client';

import { useRouter } from 'next/navigation';
import { CircleChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
	title: string;
	description?: string;
	bgGradient?: string;
	showBack?: boolean;
	children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	showBack = true,
	children,
}) => {
	const router = useRouter();
	const gradient = 'from-gray-950 via-gray-900 to-gray-950';

	return (
		<header className='relative bg-gray-900 border-b p-3 border-gray-800'>
			<div
				className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90`}
			/>
			<div className="absolute inset-0 bg-[url('/grid.png')] opacity-5" />
			<div className='absolute inset-0 bg-gradient-to-t from-transparent via-gray-900/5 to-gray-900/20' />

			<div className='relative'>
				<div className='flex items-center gap-3'>
					{showBack && (
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => router.back()}
						>
							<CircleChevronLeft className='size-8 text-slate-400' />
						</motion.button>
					)}

					<div className='flex-1 space-y-1'>
						<h1 className='text-xl font-exo2 font-semibold text-gray-100 tracking-tight truncate'>
							{title}
						</h1>
						{description && (
							<p className='font-poppins text-xs text-gray-400 font-normal'>
								{description}
							</p>
						)}
					</div>
				</div>

				{/* Children content */}
				{children && <div className='mt-6 space-y-4'>{children}</div>}
			</div>
		</header>
	);
};