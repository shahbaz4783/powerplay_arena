import { motion } from 'framer-motion';

export const CoinFlip = ({ size = 24 }: { size?: number }) => (
	<div className={`relative w-${size} h-${size}`}>
		<motion.div
			className='absolute inset-0'
			animate={{
				rotateY: [0, 180, 360],
				filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
			}}
			transition={{
				rotateY: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
				filter: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
			}}
		>
			<div className='w-full h-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)]'>
				<div className='absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 opacity-80' />
			</div>
		</motion.div>
	</div>
);
