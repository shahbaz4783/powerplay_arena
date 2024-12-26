import { Card, CardContent } from '@/src/components/ui/card';
import { motion } from 'framer-motion';

const shimmer = {
	animate: {
		backgroundPosition: ['200% 0', '-200% 0'],
	},
	transition: {
		duration: 2,
		repeat: Infinity,
		ease: 'linear',
	},
};

interface StatCardSkeletonProps {
	gradient?: string;
}

export const StatCardSkeleton = ({
	gradient = 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
}: StatCardSkeletonProps) => (
	<Card className='relative h-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm'>
		<div
			className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`}
		/>
		<div className='absolute inset-0 bg-grid-white/[0.02] bg-grid-16' />

		<CardContent className='relative h-full p-6 flex flex-col justify-between space-y-4'>
			<div className='space-y-4'>
				<div className='flex justify-between items-start'>
					<div className='space-y-2'>
						<motion.div
							className='h-6 w-32 bg-gray-800 rounded-lg'
							{...shimmer}
						/>
						<motion.div
							className='h-4 w-48 bg-gray-800/50 rounded-lg'
							{...shimmer}
						/>
					</div>
					<motion.div
						className='w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'
						{...shimmer}
					/>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className='bg-black/30 rounded-xl p-3 border border-white/[0.08] backdrop-blur-sm'
						>
							<motion.div
								className='h-3 w-16 bg-gray-800 rounded-lg mb-2'
								{...shimmer}
							/>
							<motion.div
								className='h-6 w-24 bg-gray-800/50 rounded-lg'
								{...shimmer}
							/>
						</div>
					))}
				</div>
			</div>

			<div className='flex justify-between items-center pt-2'>
				<div className='flex items-center gap-3'>
					<div className='flex -space-x-2'>
						{[...Array(3)].map((_, i) => (
							<motion.div
								key={i}
								className='w-6 h-6 rounded-full border-2 border-gray-900 bg-gray-800'
								{...shimmer}
							/>
						))}
					</div>
					<motion.div
						className='h-4 w-20 bg-gray-800 rounded-lg'
						{...shimmer}
					/>
				</div>
				<motion.div
					className='h-8 w-24 bg-white/5 rounded-lg border border-white/10'
					{...shimmer}
				/>
			</div>
		</CardContent>
	</Card>
);
