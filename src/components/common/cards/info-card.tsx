import { cn, formatCompactNumber } from '@/src/lib/utils';
import { motion } from 'framer-motion';

interface InfoCardProps {
	icon: React.ReactNode;
	title: string;
	amount: number | string;
	color: 'yellow' | 'green' | 'purple' | 'blue';
}

export const InfoCard = ({ icon, title, amount, color }: InfoCardProps) => {
	const colorMap = {
		yellow: {
			background: 'from-yellow-500/10 to-yellow-600/5',
			border: 'border-yellow-500/20',
			text: 'text-yellow-400',
			icon: 'bg-yellow-500/10',
		},
		green: {
			background: 'from-green-500/10 to-green-600/5',
			border: 'border-green-500/20',
			text: 'text-green-400',
			icon: 'bg-green-500/10',
		},
		purple: {
			background: 'from-purple-500/10 to-purple-600/5',
			border: 'border-purple-500/20',
			text: 'text-purple-400',
			icon: 'bg-purple-500/10',
		},
		blue: {
			background: 'from-blue-500/10 to-blue-600/5',
			border: 'border-blue-500/20',
			text: 'text-blue-400',
			icon: 'bg-blue-500/10',
		},
	};
	const colors = colorMap[color];

	const parsedAmount =
		typeof amount === 'number'
			? amount
			: !isNaN(Number(amount))
			? Number(amount)
			: amount;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`rounded-lg border ${colors.border} bg-gradient-to-br ${colors.background} ${colors.text}`}
		>
			<div className='p-2 space-y-2'>
				<div className='flex items-center gap-3'>
					<div className='flex flex-col'>
						<h3 className='text-xs font-jetbrains font-medium'>{title}</h3>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<div className={`p-2 rounded-lg ${colors.icon}`}>
						<div className={colors.text}>{icon}</div>
					</div>
					<span className={cn(`text-xl font-bold ${colors.text}`)}>
						{typeof parsedAmount === 'number'
							? formatCompactNumber(parsedAmount)
							: parsedAmount}
					</span>
				</div>
			</div>
			<motion.div
				className={`absolute bottom-0 left-0 right-0 h-1 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
				layoutId={`underline-${colors}`}
			/>
		</motion.div>
	);
};
