import { motion } from 'framer-motion';
import { RefreshCcw, type LucideIcon } from 'lucide-react';

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
				disabled={isLoading}
				className={`grid grid-cols-6 font-poppins items-center gap-2 h-full px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/20 ${className}`}
			>
				<div className='col-span-1'>
					{isLoading ? (
						<RefreshCcw className={'w-5 h-5 animate-spin'} />
					) : (
						<Icon className={'w-5 h-5'} />
					)}
				</div>
				<div className='col-span-5 text-right'>{isLoading ? loadingText : text}</div>
			</motion.button>
		</>
	);
}
