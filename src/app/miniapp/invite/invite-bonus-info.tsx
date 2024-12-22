'use client';

import { motion } from 'framer-motion';
import { Coins, Award, Gift, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/src/components/ui/tooltip';

interface Earnings {
	coins: number;
	passes: number;
	vouchers: number;
}

interface CyberpunkEarningsProps {
	overallEarnings: Earnings;
	thisWeekEarnings: Earnings;
	percentageIncrease: Earnings;
}

const CyberpunkEarnings: React.FC<CyberpunkEarningsProps> = ({
	overallEarnings,
	thisWeekEarnings,
	percentageIncrease,
}) => {
	const earningsData = [
		{
			key: 'coins' as const,
			icon: Coins,
			label: 'Power Coins',
			color: 'from-yellow-400 to-orange-500',
			overall: overallEarnings.coins,
			thisWeek: thisWeekEarnings.coins,
			increase: percentageIncrease.coins,
		},
		{
			key: 'passes' as const,
			icon: Award,
			label: 'Power Passes',
			color: 'from-blue-400 to-indigo-500',
			overall: overallEarnings.passes,
			thisWeek: thisWeekEarnings.passes,
			increase: percentageIncrease.passes,
		},
		{
			key: 'vouchers' as const,
			icon: Gift,
			label: 'Star Vouchers',
			color: 'from-pink-400 to-purple-500',
			overall: overallEarnings.vouchers,
			thisWeek: thisWeekEarnings.vouchers,
			increase: percentageIncrease.vouchers,
		},
	];

	return (
		<Card className='bg-gradient-to-br from-gray-900 to-blue-900 border-2 border-purple-500 overflow-hidden rounded-xl shadow-2xl'>
			<CardHeader className='pb-2'>
				<CardTitle className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-between'>
					Referral Earnings
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className='w-5 h-5 text-gray-400' />
							</TooltipTrigger>
							<TooltipContent>
								<p>Your overall and weekly earnings</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</CardTitle>
			</CardHeader>
			<CardContent className='pt-2'>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
					{earningsData.map(
						({
							key,
							icon: Icon,
							label,
							color,
							overall,
							thisWeek,
							increase,
						}) => (
							<Dialog key={key}>
								<DialogTrigger asChild>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className='cursor-pointer'
									>
										<EarningItem
											icon={<Icon className='w-8 h-8' />}
											label={label}
											color={color}
											overall={overall}
											thisWeek={thisWeek}
											increase={increase}
										/>
									</motion.div>
								</DialogTrigger>
								<DialogContent className='bg-gray-800 text-white border-2 border-purple-500'>
									<DialogHeader>
										<DialogTitle className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'>
											{label} Details
										</DialogTitle>
									</DialogHeader>
									<EarningDetails
										label={label}
										overall={overall}
										thisWeek={thisWeek}
										increase={increase}
									/>
								</DialogContent>
							</Dialog>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
};

interface EarningItemProps {
	icon: React.ReactNode;
	label: string;
	color: string;
	overall: number;
	thisWeek: number;
	increase: number;
}

const EarningItem: React.FC<EarningItemProps> = ({
	icon,
	label,
	color,
	overall,
	thisWeek,
	increase,
}) => {
	return (
		<div className='relative overflow-hidden rounded-xl bg-gray-800 p-4'>
			<div className='flex items-center justify-between mb-2'>
				<div className='flex items-center'>
					{icon}
					<span className='ml-2 text-sm text-gray-400'>{label}</span>
				</div>
				<div
					className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
				>
					{overall.toLocaleString()}
				</div>
			</div>
			<div className='flex justify-between items-center mt-2'>
				<div>
					<p className='text-xs text-gray-400'>This Week</p>
					<p className='text-lg font-semibold text-white'>
						{thisWeek.toLocaleString()}
					</p>
				</div>
				<div className='flex items-center'>
					<TrendingUp className='w-4 h-4 mr-1 text-green-500' />
					<span className='text-sm text-green-500'>
						+{increase.toFixed(1)}%
					</span>
				</div>
			</div>
			<motion.div
				className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color}`}
				initial={{ width: 0 }}
				animate={{ width: '100%' }}
				transition={{ duration: 1, delay: 0.5 }}
			/>
		</div>
	);
};

interface EarningDetailsProps {
	label: string;
	overall: number;
	thisWeek: number;
	increase: number;
}

const EarningDetails: React.FC<EarningDetailsProps> = ({
	label,
	overall,
	thisWeek,
	increase,
}) => {
	const dailyAverage = (thisWeek / 7).toFixed(1);
	const projectedMonthly = (thisWeek * 4).toLocaleString();

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-2 gap-4'>
				<div>
					<p className='text-sm text-gray-400'>Overall {label}</p>
					<p className='text-2xl font-bold text-white'>
						{overall.toLocaleString()}
					</p>
				</div>
				<div>
					<p className='text-sm text-gray-400'>This Week</p>
					<p className='text-2xl font-bold text-white'>
						{thisWeek.toLocaleString()}
					</p>
				</div>
				<div>
					<p className='text-sm text-gray-400'>Overall Increase</p>
					<p className='text-xl font-semibold text-green-500'>
						+{increase.toFixed(1)}%
					</p>
				</div>
				<div>
					<p className='text-sm text-gray-400'>Daily Average (This Week)</p>
					<p className='text-xl font-semibold text-cyan-400'>{dailyAverage}</p>
				</div>
			</div>
			<div>
				<p className='text-sm text-gray-400'>Projected Monthly</p>
				<p className='text-xl font-semibold text-yellow-400'>
					{projectedMonthly}
				</p>
			</div>
			<p className='text-xs text-gray-500 italic'>
				*Projections based on current week's performance
			</p>
		</div>
	);
};

export { CyberpunkEarnings };
