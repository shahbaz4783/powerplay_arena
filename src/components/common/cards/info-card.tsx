import React from 'react';
import { cn, formatCompactNumber } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { Info, Loader2 } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';

interface InfoCardProps {
	icon: React.ReactNode;
	title: string;
	amount: number | string;
	color:
		| 'yellow'
		| 'green'
		| 'purple'
		| 'blue'
		| 'red'
		| 'pink'
		| 'orange'
		| 'teal'
		| 'indigo';

	info?: {
		title?: string;
		description: string;
	};
	isLoading?: boolean;
}

export const InfoCard = ({
	icon,
	title,
	amount,
	color,
	info,
	isLoading,
}: InfoCardProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const colorMap = {
		yellow: {
			background: 'from-yellow-500/10 to-yellow-600/5',
			border: 'border-yellow-500/20',
			text: 'text-yellow-400',
			icon: 'bg-yellow-500/10',
			shimmer: 'bg-yellow-500/10',
		},
		green: {
			background: 'from-green-500/10 to-green-600/5',
			border: 'border-green-500/20',
			text: 'text-green-400',
			icon: 'bg-green-500/10',
			shimmer: 'bg-green-500/10',
		},
		purple: {
			background: 'from-purple-500/10 to-purple-600/5',
			border: 'border-purple-500/20',
			text: 'text-purple-400',
			icon: 'bg-purple-500/10',
			shimmer: 'bg-purple-500/10',
		},
		blue: {
			background: 'from-blue-500/10 to-blue-600/5',
			border: 'border-blue-500/20',
			text: 'text-blue-400',
			icon: 'bg-blue-500/10',
			shimmer: 'bg-blue-500/10',
		},
		red: {
			background: 'from-red-500/10 to-red-600/5',
			border: 'border-red-500/20',
			text: 'text-red-400',
			icon: 'bg-red-500/10',
			shimmer: 'bg-red-500/10',
			pulse: 'animate-pulse-red',
		},
		pink: {
			background: 'from-pink-500/10 to-pink-600/5',
			border: 'border-pink-500/20',
			text: 'text-pink-400',
			icon: 'bg-pink-500/10',
			shimmer: 'bg-pink-500/10',
			pulse: 'animate-pulse-pink',
		},
		orange: {
			background: 'from-orange-500/10 to-orange-600/5',
			border: 'border-orange-500/20',
			text: 'text-orange-400',
			icon: 'bg-orange-500/10',
			shimmer: 'bg-orange-500/10',
			pulse: 'animate-pulse-orange',
		},
		teal: {
			background: 'from-teal-500/10 to-teal-600/5',
			border: 'border-teal-500/20',
			text: 'text-teal-400',
			icon: 'bg-teal-500/10',
			shimmer: 'bg-teal-500/10',
			pulse: 'animate-pulse-teal',
		},
		indigo: {
			background: 'from-indigo-500/10 to-indigo-600/5',
			border: 'border-indigo-500/20',
			text: 'text-indigo-400',
			icon: 'bg-indigo-500/10',
			shimmer: 'bg-indigo-500/10',
			pulse: 'animate-pulse-indigo',
		},
	};

	const colors = colorMap[color];

	const parsedAmount =
		typeof amount === 'number'
			? amount
			: !isNaN(Number(amount))
			? Number(amount)
			: amount;

	const LoadingAnimation = () => (
		<div className='space-y-2 w-full'>
			<div className='flex items-center justify-between gap-3'>
				<div
					className='h-4 w-16 rounded animate-pulse'
					style={{ background: `${color}-500/10` }}
				/>
				{info && (
					<div
						className='w-4 h-4 rounded-full animate-pulse'
						style={{ background: `${color}-500/10` }}
					/>
				)}
			</div>
			<div className='flex items-center gap-2'>
				<div className={cn('p-2 rounded-lg animate-pulse', colors.shimmer)}>
					<div className='w-4 h-4' />
				</div>
				<div
					className='h-6 w-20 rounded animate-pulse'
					style={{ background: `${color}-500/10` }}
				/>
			</div>
		</div>
	);

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className={cn(
					'relative rounded-lg border',
					colors.border,
					'bg-gradient-to-br',
					colors.background,
					colors.text,
					'overflow-hidden'
				)}
			>
				<div className='p-2'>
					{isLoading ? (
						<LoadingAnimation />
					) : (
						<div className='space-y-2'>
							<div className='flex items-center justify-between gap-3'>
								<div className='flex flex-col'>
									<h3 className='text-xs font-jetbrains font-medium'>
										{title}
									</h3>
								</div>
								{info && (
									<motion.button
										whileTap={{ scale: 0.9 }}
										onClick={() => setIsOpen(true)}
										className='rounded-full'
									>
										<Info className='w-4 h-4' />
									</motion.button>
								)}
							</div>
							<div className='flex items-center gap-2'>
								<div className={cn('p-2 rounded-lg relative', colors.icon)}>
									{isLoading ? (
										<Loader2 className='w-4 h-4 animate-spin' />
									) : (
										<div className={colors.text}>{icon}</div>
									)}
								</div>
								<span className={cn(`text-xl font-bold ${colors.text}`)}>
									{typeof parsedAmount === 'number'
										? formatCompactNumber(parsedAmount)
										: parsedAmount}
								</span>
							</div>
						</div>
					)}
				</div>

				{/* Loading shimmer effect */}
				{isLoading && (
					<div
						className='absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite]'
						style={{
							background: `linear-gradient(90deg, transparent, ${color}-500/5, transparent)`,
						}}
					/>
				)}

				<motion.div
					className={cn(
						'absolute bottom-0 left-0 right-0 h-1',
						colors.text,
						'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
					)}
					layoutId={`underline-${color}`}
				/>
			</motion.div>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='w-11/12 rounded-xl'>
					<DialogHeader>
						<DialogTitle className={colors.text}>
							{info?.title || title}
						</DialogTitle>
					</DialogHeader>

					<p className='text-sm text-muted-foreground whitespace-pre-line'>
						{info?.description}
					</p>
				</DialogContent>
			</Dialog>
		</>
	);
};