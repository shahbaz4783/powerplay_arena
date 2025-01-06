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
import { InfoCard } from '@/src/components/common/cards/info-card';

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
			vouchers: acc.vouchers + referral.totalEarnedStars,
		}),
		{ coins: 0, passes: 0, vouchers: 0 }
	);

	return (
		<GradientBorder className='space-y-3'>
			<SectionHeader
				title='Earnings'
				highlightedTitle='Dashboard'
				icon={LayoutDashboard}
				description='Have a look at your lifetime referral earnings.'
			/>

			<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
				<AnimatePresence mode='wait'>
					<InfoCard
						key='active-referrals'
						icon={<Users className='w-5 h-5' />}
						title='Active Referrals'
						amount={data.length}
						color='blue'
					/>
					<InfoCard
						key='power-coin'
						icon={<Coins className='w-5 h-5' />}
						title='Power Coin'
						amount={totalEarnings.coins}
						color='yellow'
					/>
					<InfoCard
						key='power-pass'
						icon={<Ticket className='w-5 h-5' />}
						title='Power Pass'
						amount={totalEarnings.passes}
						color='green'
					/>
					<InfoCard
						key='star-voucher'
						icon={<Star className='w-5 h-5' />}
						title='Stars'
						amount={totalEarnings.vouchers}
						color='purple'
					/>
				</AnimatePresence>
			</div>
		</GradientBorder>
	);
}


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
