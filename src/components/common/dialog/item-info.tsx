'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { token } from '@/src/constants/app-config';
import { motion } from 'framer-motion';
import { Star, Zap, TrendingUp, Shield, Info } from 'lucide-react';

interface LevelInfoProps {
	title: string;
	levels: {
		level: number;
		effect: string;
	}[];
}

export function ItemInfo({ title, levels }: LevelInfoProps) {
	const startEffect = levels.find((l) => l.level === 1)?.effect || '';
	const maxEffect = levels.find((l) => l.level === 10)?.effect || '';

	return (
		<Dialog>
			<DialogTrigger className='absolute top-2 right-2 bg-black/50 p-2 rounded-full backdrop-blur-sm hover:bg-black/70 z-10'>
				<Info className='w-5 h-5 text-white' />
			</DialogTrigger>
			<DialogContent className='bg-gray-900 border border-gray-800 w-11/12 rounded-xl p-0 overflow-hidden'>
				<DialogHeader className='p-6 bg-gradient-to-r from-purple-600/20 to-pink-800 border-b border-gray-800'>
					<DialogTitle className='text-2xl font-bold text-white flex items-center gap-2'>
						<Star className='w-6 h-6 text-yellow-500 fill-yellow-500' />
						{title}
					</DialogTitle>
				</DialogHeader>

				<div className='p-6 space-y-6'>
					{/* Key Features */}
					<div className='grid grid-cols-2 gap-4'>
						<div className='bg-gray-800/50 rounded-xl p-4 border border-gray-700'>
							<div className='flex items-center gap-2 mb-2'>
								<Shield className='w-5 h-5 text-purple-400' />
								<h3 className='text-sm font-semibold text-white'>
									Starting Power
								</h3>
							</div>
							<p className='text-gray-300 text-sm'>{startEffect}</p>
						</div>
						<div className='bg-gray-800/50 rounded-xl p-4 border border-gray-700'>
							<div className='flex items-center gap-2 mb-2'>
								<TrendingUp className='w-5 h-5 text-pink-400' />
								<h3 className='text-sm font-semibold text-white'>
									Maximum Power
								</h3>
							</div>
							<p className='text-gray-300 text-sm'>{maxEffect}</p>
						</div>
					</div>

					{/* Progression Info */}
					<div className='bg-gray-800 rounded-xl p-4 border border-gray-700'>
						<div className='flex items-center gap-2 mb-3'>
							<Zap className='w-5 h-5 text-yellow-400' />
							<h3 className='text-sm font-semibold text-white'>
								Upgrade System
							</h3>
						</div>
						<ul className='space-y-2 text-sm text-gray-300'>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-purple-400' />
								Maximum 10 levels to upgrade.
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-purple-400' />
								Use {token.name} to level up.
							</li>
							<li className='flex items-center gap-2'>
								<div className='w-1.5 h-1.5 rounded-full bg-purple-400' />
								Effects increase at level 1, 5 and 10.
							</li>
						</ul>
					</div>

					{/* Progress Bar */}
					<div className='relative'>
						<div className='h-2 bg-gray-800 rounded-full overflow-hidden'>
							<motion.div
								className='h-full bg-gradient-to-r from-purple-500 to-pink-500'
								initial={{ width: 0 }}
								animate={{ width: '100%' }}
								transition={{ duration: 1.5, ease: 'easeOut' }}
							/>
						</div>
						<div className='flex justify-between mt-2'>
							<span className='text-xs text-gray-400'>Level 1</span>
							<span className='text-xs text-gray-400'>Level 10</span>
						</div>
					</div>

					{/* Footer Note */}
					<p className='text-center text-gray-400 text-xs'>
						Purchase to start your progression journey
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
