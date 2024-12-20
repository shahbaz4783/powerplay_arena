'use client';

import GlowingButton from '@/src/components/common/buttons/glowing-button';
import GlowBackground from '@/src/components/common/elements/glow-background';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function StartBotPage() {
	const botLink = 'https://t.me/powerplay_arena_bot?start=123';

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div className='relative bg-black text-white overflow-hidden font-sans'>
			<GlowBackground />

			<motion.div
				className='relative z-10 min-h-[100svh] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-transparent via-black/50 to-black'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				<motion.div variants={itemVariants} className='text-center mb-8'>
					<h1 className='text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 leading-tight'>
						PowerPlay Arena
					</h1>
					<p className='text-slate-300 font-mono'>
						Prepare for the ultimate gaming experience!
					</p>
				</motion.div>

				<motion.div variants={itemVariants} className='mb-8'>
					<GlowingButton href={botLink}>Start the Bot</GlowingButton>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className='text-center text-gray-400 font-mono text-sm'
				>
					<p className='mb-2'>
						To activate your account, tap the button above or use the command:
					</p>
					<code className='bg-purple-900/50 px-3 py-1 rounded-full text-purple-300 inline-block'>
						/start
					</code>
					<p className='mt-2'>
						in the bot chat to unleash the power of PowerPlay Arena.
					</p>
				</motion.div>

				<motion.div
					variants={itemVariants}
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatType: 'reverse',
					}}
					className='mt-12 text-purple-400'
				>
					<MessageCircle size={48} />
				</motion.div>
			</motion.div>
		</div>
	);
}
