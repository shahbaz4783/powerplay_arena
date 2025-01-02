import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { RefreshCcw, type LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	// Base styles
	'grid grid-cols-6 font-poppins items-center gap-2 h-full px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				// Modern blue with subtle gradient
				default: [
					'bg-gradient-to-r from-cyan-500 to-blue-500',
					'text-white',
					'shadow-lg shadow-blue-500/10',
					'active:shadow-inner',
				],
				// Sophisticated gray
				secondary: [
					'bg-gradient-to-r from-slate-600 to-slate-500',
					'text-white',
					'shadow-lg shadow-slate-500/10',
					'active:shadow-inner',
				],
				// Emerald success
				success: [
					'bg-gradient-to-r from-emerald-500 to-teal-500',
					'text-white',
					'shadow-lg shadow-emerald-500/10',
					'active:shadow-inner',
				],
				// Crimson danger
				danger: [
					'bg-gradient-to-r from-rose-500 to-red-500',
					'text-white',
					'shadow-lg shadow-rose-500/10',
					'active:shadow-inner',
				],
				// Amber warning
				warning: [
					'bg-gradient-to-r from-amber-500 to-orange-500',
					'text-white',
					'shadow-lg shadow-amber-500/10',
					'active:shadow-inner',
				],
				// Royal purple
				purple: [
					'bg-gradient-to-r from-violet-500 to-purple-500',
					'text-white',
					'shadow-lg shadow-violet-500/10',
					'active:shadow-inner',
				],
				// Subtle ghost
				ghost: [
					'bg-slate-800/30',
					'text-slate-200',
					'active:bg-slate-700/70',
					'backdrop-blur-sm',
				],
				// Minimal link
				link: [
					'bg-transparent',
					'text-cyan-400',
					'shadow-none',
					'active:text-cyan-500',
				],
				// Clean outline
				outline: [
					'border-2',
					'border-cyan-500/50',
					'bg-slate-900/30',
					'text-cyan-400',
					'active:bg-cyan-950/70',
					'backdrop-blur-sm',
				],
				// Glass effect
				glass: [
					'bg-white/10',
					'backdrop-blur-md',
					'text-white',
					'border border-white/20',
					'active:bg-white/30',
				],
			},
			size: {
				sm: 'text-sm h-8 px-2 py-1',
				default: 'text-base h-10 px-3 py-2',
				lg: 'text-lg h-12 px-4 py-2',
			},
			fullWidth: {
				true: 'w-full',
				false: 'w-auto',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			fullWidth: false,
		},
	}
);

interface IconButtonProps extends VariantProps<typeof buttonVariants> {
	icon: LucideIcon;
	text?: string;
	loadingText?: string;
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;
	disabled?: boolean;
}

export function IconButton({
	icon: Icon,
	text,
	className,
	onClick,
	isLoading,
	loadingText,
	variant,
	size,
	fullWidth,
	disabled,
}: IconButtonProps) {
	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			onClick={onClick}
			disabled={isLoading || disabled}
			className={cn(buttonVariants({ variant, size, fullWidth }), className)}
		>
			<div className='col-span-1'>
				{isLoading ? (
					<RefreshCcw className='w-5 h-5 animate-spin' />
				) : (
					<Icon className='w-5 h-5' />
				)}
			</div>
			<div className='col-span-5 text-center'>
				{isLoading ? loadingText : text}
			</div>
		</motion.button>
	);
}
