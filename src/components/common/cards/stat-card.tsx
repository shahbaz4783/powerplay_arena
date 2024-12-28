import React from 'react';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface StatsCardProps {
	title: string;
	value: string | number;
	icon?: React.ReactNode;
	description?: string;
	change?: {
		value: number;
		type: 'increase' | 'decrease';
	};
	loading?: boolean;
	className?: string;
	color?: 'blue' | 'green' | 'purple' | 'yellow';
}

const colorVariants = {
	blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
	green: 'from-green-500/10 to-green-600/5 border-green-500/20 text-green-400',
	purple:
		'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
	yellow:
		'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20 text-yellow-400',
};

export const QuickStatsCard = ({
	title,
	value,
	icon,
	description,
	change,
	loading = false,
	className,
	color = 'blue',
}: StatsCardProps) => {
	const colorClasses = colorVariants[color];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'relative overflow-hidden rounded-lg border bg-gradient-to-br p-4',
				'backdrop-blur-sm transition-all duration-200 group',
				colorClasses,
				loading && 'pointer-events-none',
				className
			)}
		>
			{loading && (
				<div className='absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm'>
					<Loader2 className='h-5 w-5 animate-spin text-white' />
				</div>
			)}

			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					{icon && (
						<div className={cn('rounded p-1.5', `bg-${color}-500/20`)}>
							{React.cloneElement(icon as React.ReactElement)}
						</div>
					)}
					<h3 className='text-xs font-medium text-white/80'>{title}</h3>
				</div>

				{change && (
					<div
						className={cn(
							'flex items-center space-x-0.5 text-xs font-medium',
							change.type === 'increase' ? 'text-green-500' : 'text-red-500'
						)}
					>
						{change.type === 'increase' ? '↑' : '↓'}
						<span>{Math.abs(change.value)}%</span>
					</div>
				)}
			</div>

			<div className='mt-2 space-y-1'>
				<motion.div
					key={String(value)}
					initial={{ opacity: 0, y: 5 }}
					animate={{ opacity: 1, y: 0 }}
					className={cn('text-xl font-bold', `text-${color}-400`)}
				>
					{value}
				</motion.div>
				{description && <p className='text-xs text-white/60'>{description}</p>}
			</div>

			<motion.div
				className={cn(
					'absolute bottom-0 left-0 right-0 h-0.5',
					`bg-${color}-400`,
					'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
				)}
				layoutId={`underline-${color}`}
			/>
		</motion.div>
	);
};
