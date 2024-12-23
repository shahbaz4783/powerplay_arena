'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
	Coins,
	Ticket,
	Star,
	Users,
	Loader,
	TrendingUp,
	LayoutDashboard,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserReferrals } from '@/src/hooks/useUserData';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { SectionHeader } from '@/src/components/common/elements/section-header';
import { cn } from '@/src/lib/utils';
import { SectionLoading } from '@/src/components/layouts/feedback/section-loading';

export function OverallEarnings() {
	const { telegramId } = useCurrentUser();
	const { data, isLoading, isError } = useUserReferrals(telegramId);

	if (isLoading) {
		return <SectionLoading message='Fetching overall earnings info...' />;
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
		<GradientBorder>
			<SectionHeader
				title='Earnings'
				highlightedTitle='Dashboard'
				icon={LayoutDashboard}
				description='Have a look at your lifetime referral earnings.'
			/>

			<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
				<AnimatePresence mode='wait'>
					<EarningCard
						icon={<Users className='w-5 h-5' />}
						title='Active Referrals'
						amount={data.length}
						color='blue'
						description='Number of active referrals'
					/>
					<EarningCard
						icon={<Coins className='w-5 h-5' />}
						title='Power Coin'
						amount={totalEarnings.coins}
						color='yellow'
						description='Total PWR earned through referrals'
					/>
					<EarningCard
						icon={<Ticket className='w-5 h-5' />}
						title='Power Pass'
						amount={totalEarnings.passes}
						color='green'
						description='Passes earned through referrals'
					/>
					<EarningCard
						icon={<Star className='w-5 h-5' />}
						title='Star Voucher'
						amount={totalEarnings.vouchers}
						color='purple'
						description='Vouchers earned from referrals'
					/>
				</AnimatePresence>
			</div>
		</GradientBorder>
	);
}

interface EarningCardProps {
	icon: React.ReactNode;
	title: string;
	amount: number;
	color: 'yellow' | 'green' | 'purple' | 'blue';
	description: string;
}

const EarningCard: React.FC<EarningCardProps> = ({
	icon,
	title,
	amount,
	color,
}) => {
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
					<span
						className={cn(`text-xl font-bold ${colors.text}`, {
							'text-lg': amount > 99999,
						})}
					>
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
