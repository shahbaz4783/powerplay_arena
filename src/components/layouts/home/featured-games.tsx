'use client';

import { motion } from 'framer-motion';
import { Gift, HandCoins, Target } from 'lucide-react';
import { FaBaseballBatBall } from 'react-icons/fa6';
import {
	DescriptedButton,
	IconButton,
} from '@/src/components/common/buttons/link-button';

export function FeaturedGames() {
	return (
		<motion.section
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='grid grid-cols-3 gap-3 border backdrop-blur-sm rounded-xl p-3'
		>
			<div className='space-y-4 col-span-2'>
				<DescriptedButton
					title='Fortune Flip'
					description='Flip to win, luck awaits!'
					icon={HandCoins}
					href='/game/coin-flip'
					accentColor='border-yellow-500'
					label=''
				/>
				<DescriptedButton
					title='Power Strike'
					description='Quick matches, big wins!'
					icon={FaBaseballBatBall}
					href='/game/cricket/match-setup'
					accentColor='border-green-500'
					label=''
				/>
			</div>

			<div className='h-full border bg-gray-900 backdrop-blur-sm rounded-xl p-2 flex flex-col justify-between space-y-4'>
				<IconButton icon={Gift} label='Daily reward' href='/miniapp/reward' />
				<IconButton icon={Target} label='Stats' href='/miniapp/stats' />
			</div>
		</motion.section>
	);
}
