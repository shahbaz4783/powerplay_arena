import { motion } from 'framer-motion';
import { InfoCard } from '@/src/components/common/cards/info-card';
import { token } from '@/src/constants/app-config';

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
			<div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl filter blur-xl opacity-50' />

			<div className='relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
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
