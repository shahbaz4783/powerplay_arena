'use client';

import { motion } from 'framer-motion';
import { Coins, Gift, Clock, Users } from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';

const ReferralBenefits = () => {
	const benefits = [
		{
			icon: <Users className='w-6 h-6 text-blue-300' />,
			title: 'Instant Rewards',
			description:
				'Both referrer and referee receive 500 Power Coins and 10 Passes upon successful referral.',
		},
		{
			icon: <Coins className='w-6 h-6 text-yellow-300' />,
			title: 'Ongoing Earnings',
			description:
				"Referrers earn 10% of their referral's Power Coin earnings for the first 4 weeks after joining.",
		},
		{
			icon: <Gift className='w-6 h-6 text-purple-300' />,
			title: 'Voucher Bonuses',
			description:
				'For every 10 vouchers purchased by your referral, both parties receive 1 free voucher (up to 100) for 4 weeks.',
		},
		{
			icon: <Clock className='w-6 h-6 text-green-300' />,
			title: 'Time-Limited Offer',
			description:
				'Take advantage of these exclusive benefits within 4 weeks of your referral joining.',
		},
	];

	return (
		<div className='grid grid-cols-1 gap-4'>
			{benefits.map((benefit, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
				>
					<BenefitCard
						icon={benefit.icon}
						title={benefit.title}
						description={benefit.description}
					/>
				</motion.div>
			))}
		</div>
	);
};

interface BenefitCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
	icon,
	title,
	description,
}) => {
	return (
		<Card className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700 overflow-hidden'>
			<CardHeader className='flex flex-row items-center space-y-0 pb-2'>
				<div className='mr-4 rounded-full bg-blue-500 bg-opacity-20 p-2.5 transition-all duration-300 ease-in-out'>
					{icon}
				</div>
				<CardTitle className='text-lg font-semibold text-blue-100'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-sm text-blue-200 '>{description}</p>
			</CardContent>
		</Card>
	);
};

export { ReferralBenefits };
