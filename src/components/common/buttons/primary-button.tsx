import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { LoadingOverlay } from '../dialog/loading-overlay';
import { cn } from '@/src/lib/utils';

interface IconButtonProps {
	icon: LucideIcon;
	text?: string;
	loadingText?: string;
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;
}

export function IconButton({
	icon: Icon,
	text,
	className,
	onClick,
	isLoading,
	loadingText,
}: IconButtonProps) {
	return (
		<>
			<motion.button
				whileTap={{ scale: 0.98 }}
				onClick={onClick}
				className={`flex font-poppins items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/20 ${className}`}
			>
				<Icon className={cn('w-5 h-5', { 'animate-spin': isLoading })} />
				{isLoading ? loadingText : text}
			</motion.button>
			{isLoading && <LoadingOverlay initialMessage={loadingText} />}
		</>
	);
}
