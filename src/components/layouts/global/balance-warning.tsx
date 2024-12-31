import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import {
	AlertTriangle,
	Coins,
	Ticket,
	ArrowRightLeft,
	ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';

interface BalanceWarningProps {
	coins: number;
	passes: number;
	minCoin: number;
	minPass: number;
}

const BalanceWarning = ({
	coins,
	passes,
	minCoin,
	minPass,
}: BalanceWarningProps) => {
	const showWarning = passes <= minPass || coins < minCoin;

	if (!showWarning) return null;

	const item = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<section className='main-card'>
			<motion.div variants={item} className='flex items-center gap-3 mb-4'>
				<div className='bg-yellow-500/10 p-2 rounded-lg'>
					<AlertTriangle className='text-yellow-500' size={24} />
				</div>
				<div>
					<h3 className='font-semibold text-lg'>Running Low</h3>
					<p className='text-slate-400 text-sm'>Time to top up your balance</p>
				</div>
			</motion.div>

			<div className='space-y-3 mb-6'>
				{passes <= 2 && (
					<motion.div
						variants={item}
						className='bg-slate-800/50 p-3 rounded-lg flex items-center gap-3'
					>
						<Ticket className='text-blue-400' size={20} />
						<div>
							<p className='text-sm font-medium'>
								{passes} {passes === 1 ? 'Pass' : 'Passes'} Left
							</p>
							<p className='text-xs text-slate-400'>
								Get more passes to continue
							</p>
						</div>
					</motion.div>
				)}

				{coins < 100 && (
					<motion.div
						variants={item}
						className='bg-slate-800/50 p-3 rounded-lg flex items-center gap-3'
					>
						<Coins className='text-yellow-400' size={20} />
						<div>
							<p className='text-sm font-medium'>{coins} Coins Available</p>
							<p className='text-xs text-slate-400'>Minimum recommended: 100</p>
						</div>
					</motion.div>
				)}
			</div>

			<motion.div variants={item} className='grid grid-cols-2 gap-3'>
				<Link href={'/miniapp/shop/resource-bank'} className='contents'>
					<Button
						variant='default'
						className='bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 w-full'
					>
						<ShoppingCart size={16} className='mr-2' />
						Buy More
					</Button>
				</Link>
				<Link href={'/miniapp/shop/exchange'} className='contents'>
					<Button
						variant='outline'
						className='border-blue-500/20 text-blue-400 hover:bg-blue-500/10 w-full'
					>
						<ArrowRightLeft size={16} className='mr-2' />
						Exchange
					</Button>
				</Link>
			</motion.div>
		</section>
	);
};

export default BalanceWarning;
