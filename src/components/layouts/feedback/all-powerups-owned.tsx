import { Trophy, Sparkles, Crown } from 'lucide-react';

export const AllPowerUpsOwned = () => {
	return (
		<div className='flex-1  flex rounded-none flex-col items-center justify-center text-center relative overflow-hidden'>
			{/* Background effects */}
			<div className='absolute inset-0 bg-grid-white/[0.02]' />
			{/* <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent' /> */}

			{/* Content container */}
			<div className='flex flex-col items-center px-6'>
				{/* Crown icon with glow effect */}
				<div className='relative mb-6'>
					<div className='absolute -inset-4 bg-yellow-500/20 blur-xl rounded-full' />
					<Crown className='w-16 h-16 text-yellow-500 relative animate-float' />
				</div>

				{/* Achievement badges */}
				<div className='flex items-center gap-3 mb-4'>
					<div className='flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20'>
						<Trophy className='w-4 h-4 text-yellow-500' />
						<span className='text-sm font-medium text-yellow-500'>
							All Collected
						</span>
					</div>
					<div className='flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20'>
						<Sparkles className='w-4 h-4 text-blue-500' />
						<span className='text-sm font-medium text-blue-500'>
							Master Collector
						</span>
					</div>
				</div>

				{/* Main text */}
				<h3 className='text-xl font-bold text-white mb-2'>
					Impressive Collection!
				</h3>
				<p className='text-gray-400 max-w-md'>
					You've acquired all available power-ups. Your dedication to building
					the ultimate collection is remarkable!
				</p>

				{/* Stats */}
				<div className='grid grid-cols-2 gap-4 mt-6 max-w-xs w-full'>
					<div className='bg-gray-800/50 rounded-lg p-3 border border-gray-700/50'>
						<div className='text-2xl font-bold text-white mb-1'>100%</div>
						<div className='text-sm text-gray-400'>Collection Complete</div>
					</div>
					<div className='bg-gray-800/50 rounded-lg p-3 border border-gray-700/50'>
						<div className='text-2xl font-bold text-white mb-1'>
							<span className='text-yellow-500'>★</span> MAX
						</div>
						<div className='text-sm text-gray-400'>Achievement</div>
					</div>
				</div>

				{/* Footer message */}
				<div className='mt-6 text-sm text-slate-500'>
					Stay tuned for new power-ups coming soon!
				</div>
			</div>
		</div>
	);
};
