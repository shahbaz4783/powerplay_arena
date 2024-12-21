'use client';

import { Check, Copy, Share } from 'lucide-react';
import ShinyButton from '../../../components/magicui/shiny-button';
import { AnimatePresence, motion } from 'framer-motion';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { initUtils } from '@telegram-apps/sdk';
import { useState } from 'react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInfo } from '@/src/hooks/useUserData';

export function InviteLink() {
	const [isCopied, setIsCopied] = useState(false);

	const utils = initUtils();

	const { telegramId } = useCurrentUser();
	const { data } = useUserInfo(telegramId);
	const inviteLink = `https://t.me/powerplay_arena_bot?start=${data?.inviteCode}`;

	const handelShare = () => {
		utils.shareURL(inviteLink, 'Look! Some cool app here!');
	};

	const copyLink = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(inviteLink);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<>
			<GradientBorder className='backdrop-blur-sm cyberpunk-bg space-y-4'>
				<menu className='flex gap-3 items-center'>
					<Share size={28} className='border' />
					<div>
						<h2 className='text-xl font-bold text-white '>
							INVITE<span className='text-cyan-400'>LINK</span>
						</h2>
						<p className='text-slate-400 font-light text-sm'>
							Boost your rewards by inviting friends
						</p>
					</div>
				</menu>
				<div className='flex items-center gap-3'>
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={handelShare}
						className='bg-blue-950 rounded-xl p-2 flex-1'
					>
						Share
					</motion.button>
					<motion.button
						className='bg-slate-800/50 p-2 rounded-xl'
						whileTap={{ scale: 0.95 }}
						onClick={copyLink}
					>
						<AnimatePresence mode='wait' initial={false}>
							{isCopied ? (
								<motion.div
									key='check'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
								>
									<Check className='text-white' size={20} />
								</motion.div>
							) : (
								<motion.div
									key='copy'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
								>
									<Copy className='text-white' size={20} />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</GradientBorder>
		</>
	);
}
