import { formatCompactNumber } from '@/src/lib/utils';
import { motion } from 'framer-motion';
import { Coins, Ticket, Gift, TrendingUp, TrendingDown } from 'lucide-react';
import { InfoCard } from '@/src/components/common/cards/info-card';
import { token } from '@/src/constants/app-config';

interface AmountBadgeProps {
	amount: number;
	icon: React.ElementType;
	label?: string;
	trend?: number;
}

// const AmountBadge = ({
// 	amount,
// 	icon: Icon,
// 	label,
// 	trend,
// }: AmountBadgeProps) => {
// 	const getTrendIcon = () => {
// 		if (trend === undefined) return null;
// 		return trend > 0 ? (
// 			<TrendingUp className='w-3 h-3 text-green-400' />
// 		) : (
// 			<TrendingDown className='w-3 h-3 text-red-400' />
// 		);
// 	};

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, y: -20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			className='relative group'
// 		>
// 			<div className='flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300'>
// 				<div className='flex items-center gap-1.5'>
// 					<Icon className='w-4 h-4 text-slate-300' />
// 					<span className='text-sm font-medium text-slate-200'>
// 						{formatCompactNumber(amount)}
// 					</span>
// 				</div>
// 				{getTrendIcon()}
// 			</div>

// 			{label && (
// 				<motion.div
// 					initial={{ opacity: 0, y: 10 }}
// 					animate={{ opacity: 0, y: 10 }}
// 					whileHover={{ opacity: 1, y: 0 }}
// 					className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-slate-300 bg-slate-800 rounded-md whitespace-nowrap'
// 				>
// 					{label}
// 				</motion.div>
// 			)}
// 		</motion.div>
// 	);
// };

interface DailyTotals {
	coins: number;
	pass: number;
	voucher: number;
}

interface HeaderProps {
	date: string;
	total: number;
	dailyTotals: DailyTotals;
}

export const TransactionHeader: React.FC<HeaderProps> = ({
	date,
	total,
	dailyTotals,
}) => {
	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className='sub-card'
		>
			{/* Background Glow Effect */}
			<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl filter blur-xl opacity-50' />

			<div className='relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
				{/* Date and Transaction Count */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className='flex gap-2 items-baseline'
				>
					<motion.h3 className='text-xl font-exo2 font-semibold text-slate-100 tracking-tight'>
						{date}
					</motion.h3>
					<span className='text-xs text-slate-400 font-poppins'>
						{total} transaction{total !== 1 && 's'}
					</span>
				</motion.div>

				{/* Badges */}
				<motion.div
					className='grid grid-cols-3 gap-3'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
				>
					<InfoCard
						title={token.name}
						amount={dailyTotals.coins}
						color={dailyTotals.coins < 0 ? 'red' : 'green'}
					/>
					<InfoCard
						title={token.pass}
						amount={dailyTotals.pass}
						color={dailyTotals.pass < 0 ? 'red' : 'green'}
					/>
					<InfoCard
						title='Voucher'
						amount={dailyTotals.voucher}
						color={dailyTotals.voucher < 0 ? 'red' : 'green'}
					/>
				</motion.div>
			</div>
		</motion.header>
	);
};
