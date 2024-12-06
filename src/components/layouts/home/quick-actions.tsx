'use client';

import { motion } from 'framer-motion';
import { Gift, Target } from 'lucide-react';
import { IconButton } from '@/src/components/common/buttons/link-button';

export function QuickActions() {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className='h-full border bg-gray-900 backdrop-blur-sm rounded-xl p-2 flex flex-col justify-between space-y-4'
		>
			<IconButton icon={Gift} label='Daily reward' href='/miniapp/reward' />
			<IconButton icon={Target} label='Stats' href='/miniapp/stats' />
		</motion.div>
	);
}
