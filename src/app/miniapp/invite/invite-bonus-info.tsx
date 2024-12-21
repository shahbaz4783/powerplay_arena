'use client';

import { motion } from 'framer-motion';
import { Coins, Award, Gift } from 'lucide-react';

interface TotalEarnings {
	coins: number;
	passes: number;
	vouchers: number;
}

interface CyberpunkEarningsProps {
	totalEarnings: TotalEarnings;
}

const CyberpunkEarnings: React.FC<CyberpunkEarningsProps> = ({
	totalEarnings,
}) => {
	const MotionCoins = motion(Coins);
	const MotionAward = motion(Award);
	const MotionGift = motion(Gift);

	return (
		<motion.div
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='border overflow-hidden rounded-xl backdrop-blur-sm  p-1'
		>
			<div className='opacity-10'></div>
			<div className='relative backdrop-blur-sm p-4 space-y-4 rounded-2xl'>
				<h2 className='text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'>
					Total Earnings
				</h2>
				<div className='grid grid-cols-1 gap-4'>
					<EarningItem
						icon={<MotionCoins className='w-10 h-10 text-yellow-400' />}
						value={totalEarnings.coins}
						label='Power Coin'
						color='from-yellow-400 to-orange-500'
					/>
					<EarningItem
						icon={<MotionAward className='w-10 h-10 text-blue-400' />}
						value={totalEarnings.passes}
						label='Power Pass'
						color='from-blue-400 to-indigo-500'
					/>
					<EarningItem
						icon={<MotionGift className='w-10 h-10 text-pink-400' />}
						value={totalEarnings.vouchers}
						label='Star Voucher'
						color='from-pink-400 to-purple-500'
					/>
				</div>
			</div>
		</motion.div>
	);
};

interface EarningItemProps {
	icon: React.ReactNode;
	value: number;
	label: string;
	color: string;
}

const EarningItem: React.FC<EarningItemProps> = ({
	icon,
	value,
	label,
	color,
}) => {
	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-4'
		>
			<div className='flex items-center justify-between mb-2'>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 500, damping: 15 }}
				>
					{icon}
				</motion.div>
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
				>
					{value}
				</motion.div>
			</div>
			<p className='text-sm text-gray-400'>{label}</p>
			<motion.div
				className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400'
				initial={{ width: 0 }}
				animate={{ width: '100%' }}
				transition={{ duration: 1, delay: 0.5 }}
			/>
		</motion.div>
	);
};

export { CyberpunkEarnings };
