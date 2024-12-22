'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Ticket, Star, Users, Loader, TrendingUp } from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserReferrals } from '@/src/hooks/useUserData';

export function OverallEarnings() {
	const { telegramId } = useCurrentUser();
	const { data, isLoading, isError } = useUserReferrals(telegramId);

	if (isLoading) {
		return <LoadingState />;
	}

	if (isError || !data) {
		return <ErrorState />;
	}

	const totalEarnings = data.reduce(
		(acc, referral) => ({
			coins: acc.coins + referral.totalEarnedCoins,
			passes: acc.passes + referral.totalEarnedPasses,
			vouchers: acc.vouchers + referral.totalEarnedVouchers,
		}),
		{ coins: 0, passes: 0, vouchers: 0 }
	);

	return (
		<Card className='bg-gradient-to-br from-gray-900/95 to-black border border-gray-800/50 shadow-2xl backdrop-blur-sm'>
			<CardHeader className='pb-2'>
				<div className='flex items-center justify-between'>
					<CardTitle className='flex items-center gap-3 text-sm font-bold'>
						<div className='p-2 bg-blue-500/10 rounded-lg'>
							<TrendingUp className='w-6 h-6 text-blue-400' />
						</div>
						<span className='bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent'>
							Earnings Dashboard
						</span>
					</CardTitle>
					<div className='flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg'>
						<Users className='w-4 h-4 text-blue-400' />
						<span className='text-sm font-medium text-blue-300'>
							{data.length} Active Referrals
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className='pt-6'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<AnimatePresence mode='wait'>
						<EarningCard
							icon={<Coins className='w-8 h-8' />}
							title='Power Coin'
							amount={totalEarnings.coins}
							color='yellow'
							description='Total PWR earned through referrals'
						/>
						<EarningCard
							icon={<Ticket className='w-8 h-8' />}
							title='Power Pass'
							amount={totalEarnings.passes}
							color='green'
							description='Passes earned through referrals'
						/>
						<EarningCard
							icon={<Star className='w-8 h-8' />}
							title='Star Voucher'
							amount={totalEarnings.vouchers}
							color='purple'
							description='Vouchers earned from referrals'
						/>
					</AnimatePresence>
				</div>
			</CardContent>
		</Card>
	);
}

interface EarningCardProps {
	icon: React.ReactNode;
	title: string;
	amount: number;
	color: 'yellow' | 'green' | 'purple';
	description: string;
}

const EarningCard: React.FC<EarningCardProps> = ({
	icon,
	title,
	amount,
	color,
	description,
}) => {
	const colorMap = {
		yellow: {
			background: 'from-yellow-500/10 to-yellow-600/5',
			border: 'border-yellow-500/20',
			text: 'text-yellow-400',
			icon: 'bg-yellow-500/10',
			hover:
				'hover:border-yellow-500/30 hover:from-yellow-500/15 hover:to-yellow-600/10',
		},
		green: {
			background: 'from-green-500/10 to-green-600/5',
			border: 'border-green-500/20',
			text: 'text-green-400',
			icon: 'bg-green-500/10',
			hover:
				'hover:border-green-500/30 hover:from-green-500/15 hover:to-green-600/10',
		},
		purple: {
			background: 'from-purple-500/10 to-purple-600/5',
			border: 'border-purple-500/20',
			text: 'text-purple-400',
			icon: 'bg-purple-500/10',
			hover:
				'hover:border-purple-500/30 hover:from-purple-500/15 hover:to-purple-600/10',
		},
	};

	const colors = colorMap[color];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`relative group rounded-xl border ${colors.border} bg-gradient-to-br ${colors.background} ${colors.hover} transition-all duration-300`}
		>
			<div className='p-4'>
				<div className='flex items-center gap-3 mb-3'>
					<div className={`p-2 rounded-lg ${colors.icon}`}>
						<div className={colors.text}>{icon}</div>
					</div>
					<div className='flex flex-col'>
						<h3 className='text-sm font-medium text-gray-400'>{title}</h3>
						<p className='text-xs text-gray-500'>{description}</p>
					</div>
				</div>
				<div className='flex items-baseline gap-1'>
					<span className={`text-2xl font-bold ${colors.text}`}>
						{amount.toLocaleString()}
					</span>
				</div>
			</div>
			<motion.div
				className={`absolute bottom-0 left-0 right-0 h-1 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
				layoutId={`underline-${color}`}
			/>
		</motion.div>
	);
};

const LoadingState: React.FC = () => (
	<Card className='bg-gradient-to-br from-gray-900 to-black border-gray-800 p-8'>
		<div className='flex flex-col items-center gap-4'>
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
			>
				<Loader className='w-8 h-8 text-blue-400' />
			</motion.div>
			<p className='text-gray-400 font-medium'>Loading your earnings data...</p>
		</div>
	</Card>
);

const ErrorState: React.FC = () => (
	<Card className='bg-gradient-to-br from-gray-900 to-black border-gray-800 p-8'>
		<div className='flex flex-col items-center gap-4 text-center'>
			<div className='p-3 bg-red-500/10 rounded-full'>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', bounce: 0.5 }}
				>
					<Star className='w-8 h-8 text-red-400' />
				</motion.div>
			</div>
			<div>
				<h3 className='text-lg font-semibold text-red-400 mb-1'>
					Unable to Load Data
				</h3>
				<p className='text-gray-400'>
					Please check your connection and try again later.
				</p>
			</div>
		</div>
	</Card>
);

export default OverallEarnings;
