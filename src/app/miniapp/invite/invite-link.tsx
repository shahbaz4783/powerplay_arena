'use client';

import { Copy, Share } from 'lucide-react';
import ShinyButton from '../../../components/magicui/shiny-button';
import { motion } from 'framer-motion';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';

export function InviteLink() {
	const inviteLink = 'https://t.me/powerplay_arena_bot?start=123';

	const copyLink = () => {
		navigator.clipboard.writeText(inviteLink);
	};

	return (
		<>
			<GradientBorder className='backdrop-blur-md space-y-2'>
				<menu className='flex gap-3 items-center'>
					<Share size={34} />
					<div>
						<h3 className='text-xl font-bold'>Invite Link</h3>
						<p className='text-slate-400 font-light text-sm'>
							Invite your frens and get bonuses!
						</p>
					</div>
				</menu>
				<div className='flex items-center gap-3'>
					<ShinyButton text='INVITE FRENS' />
					<motion.div
						whileTap={{ scale: 0.95 }}
						className='border border-slate-600 rounded-xl p-2 cursor-pointer transition-colors'
						onClick={copyLink}
					>
						<Copy />
					</motion.div>
				</div>
			</GradientBorder>
		</>
	);
}
