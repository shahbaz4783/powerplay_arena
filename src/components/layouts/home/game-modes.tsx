'use client';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/src/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, ArrowRight } from 'lucide-react';

export function GameModes() {
	const cardVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
	};

	return (
		<motion.section
			className='grid grid-cols-2 gap-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, staggerChildren: 0.2 }}
		>
			<Link href='/game/cricket/match-setup' passHref className='h-full'>
				<motion.div
					className='h-full'
					variants={cardVariants}
					initial='initial'
					animate='animate'
				>
					<Card className='h-full backdrop-blur-md overflow-hidden rounded-xl flex flex-col'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<span>Power Play</span>
							</CardTitle>
						</CardHeader>
						<CardContent className='flex-grow flex flex-col justify-between'>
							<CardDescription className='text-xs'>
								Jump into a fast-paced cricket match!
							</CardDescription>
							<motion.div
								className=' flex items-center justify-center self-end'
								animate={{ rotateY: [360, 0] }}
								transition={{
									duration: 1.5,
									ease: 'easeInOut',
								}}
							>
								<ArrowRight className='w-8 h-8' />
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>
			</Link>

			<Link href='/game/coin-flip' passHref className='h-full'>
				<motion.div
					className='h-full'
					variants={cardVariants}
					initial='initial'
					animate='animate'
					whileHover='hover'
				>
					<Card className='h-full backdrop-blur-md overflow-hidden rounded-xl flex flex-col'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<span>Flip & Win</span>
							</CardTitle>
						</CardHeader>
						<CardContent className='flex-grow flex flex-col justify-between'>
							<CardDescription className='text-xs'>
								Test your luck in our exciting coin flip game!
							</CardDescription>
							<motion.div
								className=' flex items-center justify-center self-end'
								animate={{ rotateY: [360, 0] }}
								transition={{
									duration: 1.5,
									ease: 'easeInOut',
								}}
							>
								<ArrowRight className='w-8 h-8' />
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>
			</Link>
		</motion.section>
	);
}
