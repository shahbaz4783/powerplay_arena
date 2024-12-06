'use client';

import { motion } from 'framer-motion';
import { TicketCheck, UserPlus2 } from 'lucide-react';
import { FaRankingStar } from 'react-icons/fa6';
import { IconLabelButton } from '@/src/components/common/buttons/link-button';

export function FeaturedTiles() {
	return (
		<motion.section
			className='grid grid-cols-3 gap-4 border p-3 rounded-xl backdrop-blur-sm'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<IconLabelButton href='/miniapp/invite' icon={UserPlus2} label='Invite' />
			<IconLabelButton
				href='/miniapp/tasks'
				icon={TicketCheck}
				label='Lucky Draw'
			/>
			<IconLabelButton
				href='/miniapp/rankings'
				icon={FaRankingStar}
				label='Rankings'
			/>
		</motion.section>
	);
}
