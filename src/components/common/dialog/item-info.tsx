import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Info, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface LevelInfoProps {
	title: string;
	levels: {
		level: number;
		effect: string;
	}[];
}

export function ItemInfo({ title, levels }: LevelInfoProps) {
	const [isOpen, setIsOpen] = useState(false);
	const keyLevels = [1, 5, 10];
	const getEffect = (level: number) =>
		levels.find((l) => l.level === level)?.effect || '';

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='absolute top-2 right-2 transform transition-all duration-300 hover:scale-110 active:scale-95'>
				<div className='bg-slate-900/80 p-2 rounded-full backdrop-blur-md hover:bg-slate-800 border border-slate-700/50 shadow-lg'>
					<Info className='w-5 h-5 text-slate-300' />
				</div>
			</DialogTrigger>

			<DialogContent className='bg-gradient-to-b from-gray-900 to-gray-950 border border-slate-800 w-11/12 rounded-xl p-0 overflow-hidden shadow-2xl transform transition-all duration-500'>
				<DialogHeader className='relative p-6 bg-slate-800/50 border-b border-slate-700'>
					<div className='absolute inset-0 bg-gradient-to-r from-slate-700/10 via-slate-600/10 to-slate-700/10 animate-gradient' />
					<DialogTitle className='relative flex items-center gap-3'>
						<div className='flex items-center gap-3 transform transition-all duration-300 hover:scale-105'>
							<Star className='w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse' />
							<span className='text-2xl font-bold text-white tracking-tight'>
								{title}
							</span>
						</div>
					</DialogTitle>
				</DialogHeader>

				<div className='p-6 space-y-6'>
					<div className='space-y-3'>
						{keyLevels.map((level, index) => (
							<div
								key={level}
								className={`relative group p-4 rounded-xl transition-all duration-300 transform hover:translate-x-1
                  ${
										level === 10
											? 'bg-gradient-to-r from-slate-800/90 to-slate-800/80 border border-slate-700 shadow-lg'
											: 'bg-slate-800/40 border border-slate-800 hover:bg-slate-800/60'
									}`}
								style={{
									opacity: 0,
									animation: `fadeSlideIn 0.5s ease-out forwards ${
										index * 0.1
									}s`,
								}}
							>
								<div className='flex items-center justify-between mb-2'>
									<div className='flex items-center gap-2'>
										{level === 10 ? (
											<Sparkles className='w-5 h-5 text-yellow-500 animate-twinkle' />
										) : (
											<ChevronRight className='w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-200' />
										)}
										<span
											className={`text-sm font-semibold transition-colors duration-200
                      ${
												level === 10
													? 'text-yellow-500'
													: 'text-slate-300 group-hover:text-white'
											}`}
										>
											Level {level}
										</span>
									</div>

									{level === 10 && (
										<span className='text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'>
											MAX
										</span>
									)}
								</div>

								<p className='text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-200'>
									{getEffect(level)}
								</p>
							</div>
						))}
					</div>

					<div className='relative pt-2'>
						<div className='h-1 bg-slate-800 rounded-full overflow-hidden'>
							<div
								className='h-full bg-gradient-to-r from-slate-500 via-yellow-500 to-slate-500 animate-shimmer'
								style={{ width: '100%' }}
							/>
						</div>
						<div className='flex justify-between mt-2'>
							<span className='text-xs text-slate-500'>Level 1</span>
							<span className='text-xs text-yellow-500'>Level 10</span>
						</div>
					</div>

					<div className='text-center transform transition-all duration-300 hover:scale-105'>
						<p className='text-xs text-slate-500 hover:text-slate-400'>
							Purchase to unlock progression
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ItemInfo;
