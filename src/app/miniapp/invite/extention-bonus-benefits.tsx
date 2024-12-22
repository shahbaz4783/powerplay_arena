import React from 'react';
import { motion } from 'framer-motion';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { AlertCircle, ArrowRight } from 'lucide-react';

const ExtensionBonusInfo: React.FC = () => {
	return (
		<Card className='bg-gray-900 border-gray-700 overflow-hidden mt-8'>
			<CardHeader className='text-center pb-2'>
				<CardTitle className='text-2xl font-bold text-red-300 flex items-center justify-center'>
					<AlertCircle className='w-6 h-6 mr-2' />
					Extension Bonus Details
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<p className='text-blue-200 mb-4'>
						When a referrer extends their referral period, both parties benefit!
						Here's how it works:
					</p>
					<ul className='space-y-4'>
						<motion.li
							className='flex items-start'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<ArrowRight className='w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0' />
							<span className='text-blue-100'>
								Referrers can extend the 4-week benefit period for an additional
								cost.
							</span>
						</motion.li>
						<motion.li
							className='flex items-start'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<ArrowRight className='w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0' />
							<span className='text-blue-100'>
								Referrals receive a 5% boost to their Power Coin earnings during
								the extended period.
							</span>
						</motion.li>
						<motion.li
							className='flex items-start'
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.6, duration: 0.5 }}
						>
							<ArrowRight className='w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0' />
							<span className='text-blue-100'>
								The voucher bonus continues, with an increased cap of 150 free
								vouchers during the extended period.
							</span>
						</motion.li>
					</ul>
					<motion.p
						className='mt-4 text-yellow-300 font-semibold'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.5 }}
					>
						Stay active and engage with the platform to encourage your referrer
						to extend the benefits!
					</motion.p>
				</motion.div>
			</CardContent>
		</Card>
	);
};

export { ExtensionBonusInfo };
