import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

interface ActionButtonProps {
	icon: React.ReactNode;
	label: string;
	disabled: boolean;
	onClick: () => void;
	usageCount?: number;
	maxUses?: number;
	isAnimating: boolean;
}

export const ActionButton = ({
	icon,
	label,
	disabled,
	onClick,
	usageCount,
	maxUses,
	isAnimating,
}: ActionButtonProps) => (
	<motion.button
		whileTap={{ scale: disabled ? 1 : 0.9 }}
		className={cn(
			'relative group',
			'rounded-xl p-3',
			'bg-gradient-to-br from-slate-800/90 to-slate-900/90',
			'border border-teal-500/20',
			disabled ? 'opacity-50' : 'cursor-pointer',
			isAnimating && 'animate-pulse'
		)}
		disabled={disabled}
		onClick={onClick}
	>
		{/* Background Icon */}
		<div className='absolute inset-0 flex items-center justify-center opacity-20'>
			{icon}
		</div>

		{/* Usage indicators */}
		{maxUses && maxUses < 6 && (
			<div className='absolute right-[0.5px] top-0 py-1 h-full flex flex-col justify-center items-end pr-1'>
				{[...Array(maxUses)].map((_, i) => (
					<div
						key={i}
						className={cn(
							'w-1 h-3 rounded-full my-0.5',
							'transition-all duration-200',
							i < (usageCount || 0) ? 'bg-slate-400/20' : 'bg-teal-400',
							`transform rotate-${i * 10 - 10}`
						)}
					/>
				))}
			</div>
		)}

		{/* Label */}
		<div className='relative shadow-2xl flex items-center justify-center h-full'>
			<span className='font-bold  font-jetbrains text-slate-200'>{label}</span>
		</div>

		{/* Hover effect */}
		<div className='absolute inset-0 rounded-xl bg-gradient-to-br from-slate-500/0 to-slate-900/0 group-hover:from-slate-500/5 group-hover:to-slate-900/5 transition-all duration-200' />
	</motion.button>
);
