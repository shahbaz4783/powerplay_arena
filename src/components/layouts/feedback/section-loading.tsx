import React from 'react';
import { Loader } from 'lucide-react';
import { Card } from '@/src/components/ui/card';
import { cn } from '@/src/lib/utils';

interface LoadingProps {
	message?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'minimal';
	className?: string;
}

export const SectionLoading = ({
	message = 'Loading...',
	size = 'md',
	variant = 'default',
	className,
}: LoadingProps) => {
	// Size mappings for loader and text
	const sizeMap = {
		sm: { loader: 'w-6 h-6', text: 'text-sm' },
		md: { loader: 'w-8 h-8', text: 'text-base' },
		lg: { loader: 'w-12 h-12', text: 'text-lg' },
	};

	// Animation styles using CSS animations instead of motion
	const spinAnimation = `animate-spin`;

	// If minimal variant, render without card
	if (variant === 'minimal') {
		return (
			<div className={cn('flex flex-col items-center gap-3', className)}>
				<Loader
					className={cn(sizeMap[size].loader, 'text-blue-500', spinAnimation)}
				/>
				{message && (
					<p className={cn(sizeMap[size].text, 'text-gray-500 font-medium')}>
						{message}
					</p>
				)}
			</div>
		);
	}

	// Default variant with card
	return (
		<Card
			className={cn(
				'bg-gradient-to-br from-gray-900 to-black border-gray-800',
				size === 'sm' ? 'p-4' : size === 'md' ? 'p-6' : 'p-8',
				className
			)}
		>
			<div className='flex flex-col items-center gap-4'>
				<div className='relative'>
					<Loader
						className={cn(sizeMap[size].loader, 'text-blue-500', spinAnimation)}
					/>
					<div
						className={cn(
							'absolute inset-0',
							sizeMap[size].loader,
							'animate-pulse bg-blue-500/20 rounded-full blur-xl'
						)}
					/>
				</div>
				{message && (
					<p
						className={cn(
							sizeMap[size].text,
							'text-gray-400 font-medium text-center'
						)}
					>
						{message}
					</p>
				)}
			</div>
		</Card>
	);
};
