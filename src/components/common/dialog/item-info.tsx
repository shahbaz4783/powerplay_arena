import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Info, Star, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface LevelInfoProps {
	title: string;
	levels: {
		level: number;
		effect: string;
	}[];
}

export function ItemInfo({ title, levels }: LevelInfoProps) {
	const keyLevels = [1, 5, 10];
	const getEffect = (level: number) =>
		levels.find((l) => l.level === level)?.effect || '';

	return (
		<Dialog>
			<DialogTrigger className='absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full backdrop-blur-sm hover:bg-slate-800 z-10 transition-all duration-200 hover:scale-110'>
				<Info className='w-5 h-5 text-slate-300' />
			</DialogTrigger>
			<DialogContent className='bg-gray-900 border border-slate-800 w-11/12 rounded-xl p-0 overflow-hidden shadow-2xl'>
				{/* Header */}
				<DialogHeader className='relative p-6 bg-slate-800/50 border-b border-slate-800'>
					<motion.div
						className='absolute inset-0 bg-gradient-to-r from-slate-700/10 to-slate-600/10'
						initial={{ opacity: 0 }}
						animate={{ opacity: [0.3, 0.1, 0.3] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<DialogTitle className='relative text-2xl font-bold text-white flex items-center gap-3'>
						<Star className='w-6 h-6 text-yellow-500 fill-yellow-500' />
						{title}
					</DialogTitle>
				</DialogHeader>

				<div className='p-6 space-y-6'>
					{/* Level Cards */}
					<div className='space-y-3'>
						{keyLevels.map((level, index) => (
							<motion.div
								key={level}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className={`relative group p-4 rounded-xl transition-all duration-300 
                  ${
										level === 10
											? 'bg-slate-800/80 border border-slate-700 shadow-lg'
											: 'bg-slate-800/40 border border-slate-800 hover:bg-slate-800/60'
									}`}
							>
								{/* Level Indicator */}
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-2'>
										{level === 10 ? (
											<Sparkles className='w-5 h-5 text-yellow-500' />
										) : (
											<ChevronRight className='w-5 h-5 text-slate-400' />
										)}
										<span
											className={`text-sm font-semibold ${
												level === 10 ? 'text-yellow-500' : 'text-slate-300'
											}`}
										>
											Level {level}
										</span>
									</div>
									{level === 10 && (
										<span className='text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'>
											MAX
										</span>
									)}
								</div>
								{/* Effect Description */}
								<p className='text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200'>
									{getEffect(level)}
								</p>
							</motion.div>
						))}
					</div>

					{/* Progress Bar */}
					<div className='relative pt-2'>
						<div className='h-1 bg-slate-800 rounded-full overflow-hidden'>
							<motion.div
								className='h-full bg-gradient-to-r from-slate-500 via-yellow-500 to-slate-500'
								initial={{ width: 0 }}
								animate={{ width: '100%' }}
								transition={{ duration: 1.5, ease: 'easeOut' }}
							/>
						</div>
						<div className='flex justify-between mt-2'>
							<span className='text-xs text-slate-500'>Level 1</span>
							<span className='text-xs text-yellow-500'>Level 10</span>
						</div>
					</div>

					{/* Footer */}
					<div className='text-center'>
						<p className='text-xs text-slate-500'>
							Purchase to unlock progression
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ItemInfo;
