'use client';

import { motion } from 'framer-motion';
import {
	LucideIcon,
	AlertCircle,
	CheckCircle2,
	Info,
	Loader2,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { fakeDelay } from '@/src/lib/utils';

interface MessageCardProps {
	title: string;
	message: string;
	icon?: LucideIcon;
	type?: 'info' | 'success' | 'warning' | 'loading';
	actionText?: string;
	onAction?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
	info: Info,
	success: CheckCircle2,
	warning: AlertCircle,
	loading: Loader2,
};

const colorMap: Record<string, string> = {
	info: 'from-blue-500 to-blue-600',
	success: 'from-green-500 to-green-600',
	warning: 'from-yellow-500 to-yellow-600',
	loading: 'from-blue-400 to-blue-500',
};

export function MessageCard({
	title,
	message,
	icon,
	type = 'info',
	actionText,
	onAction,
}: MessageCardProps) {
	const Icon = icon || iconMap[type];
	const gradientColor = colorMap[type];
	return (
		<motion.div
			className={`bg-gradient-to-br ${gradientColor} rounded-xl p-1 shadow-lg overflow-hidden`}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className='bg-slate-900 rounded-xl p-6 flex flex-col items-center text-center'>
				<motion.div
					className='text-white mb-4'
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						delay: 0.2,
						type: 'spring',
						stiffness: 500,
						damping: 15,
					}}
				>
					{type === 'loading' ? (
						<Icon className='w-12 h-12 animate-spin' />
					) : (
						<Icon className='w-12 h-12' />
					)}
				</motion.div>
				<motion.h3
					className='text-xl font-bold text-white mb-2'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					{title}
				</motion.h3>
				<motion.p
					className='text-slate-300 mb-6'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
				>
					{message}
				</motion.p>
				{actionText && onAction && (
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					>
						<Button
							onClick={onAction}
							className='bg-white text-slate-900 hover:bg-slate-100'
						>
							{actionText}
						</Button>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}
