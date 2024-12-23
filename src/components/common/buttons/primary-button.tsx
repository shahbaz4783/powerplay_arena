import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface IconButtonProps {
	icon: LucideIcon;
	text?: string;
	className?: string;
	onClick?: () => void;
}

export function IconButton({
	icon: Icon,
	text,
	className,
	onClick,
}: IconButtonProps) {
	return (
		<motion.button
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={`flex font-jetbrains items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/20 ${className}`}
		>
			<Icon className='w-4 h-4' />
			{text}
		</motion.button>
	);
}
