'use client';

import { Check, Copy, Share, Link as LinkIcon, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { initUtils } from '@telegram-apps/sdk';
import { useState } from 'react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInfo } from '@/src/hooks/useUserData';

export function InviteLink() {
	const [isCopied, setIsCopied] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const utils = initUtils();
	const { telegramId } = useCurrentUser();
	const { data } = useUserInfo(telegramId);
	const inviteLink = `https://t.me/powerplay_arena_bot?start=${data?.inviteCode}`;

	const handleShare = () => {
		utils.shareURL(
			inviteLink,
			'Hack the system, reap the rewards! Amazing bonuses await in this arena. 💻💰'
		);
	};

	const copyLink = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(inviteLink);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<GradientBorder className='backdrop-blur-sm bg-gray-900/80 p-6 space-y-6'>
			<div className='flex items-start gap-4'>
				<div className='p-3 bg-blue-500/10 rounded-xl'>
					<Users className='w-6 h-6 text-blue-400' />
				</div>
				<div className='flex-1'>
					<h2 className='text-xl font-bold'>
						Invite
						<span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-2'>
							Friends
						</span>
					</h2>
					<p className='text-gray-400 text-sm mt-1'>
						Share your link and earn amazing rewards together
					</p>
				</div>
			</div>

			<div className='relative p-4 bg-gray-800/50 rounded-xl border border-gray-700/50'>
				<div className='flex items-center gap-3 mb-4'>
					<LinkIcon className='w-4 h-4 text-blue-400' />
					<span className='text-sm font-medium text-gray-300'>
						Your Unique Invite Link
					</span>
				</div>

				<div className='flex items-center gap-3'>
					<div className='flex-1 overflow-hidden'>
						<motion.div
							className='font-mono text-sm bg-gray-900/50 p-3 rounded-lg border border-gray-700/30 truncate'
							whileHover={{ scale: 1.01 }}
							transition={{ duration: 0.2 }}
						>
							{data?.inviteCode}
						</motion.div>
					</div>

					<motion.button
						className='relative p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 transition-colors duration-200'
						whileTap={{ scale: 0.95 }}
						onClick={copyLink}
						onHoverStart={() => setIsHovered(true)}
						onHoverEnd={() => setIsHovered(false)}
					>
						<AnimatePresence mode='wait' initial={false}>
							{isCopied ? (
								<motion.div
									key='check'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
									className='text-green-400'
								>
									<Check className='w-5 h-5' />
								</motion.div>
							) : (
								<motion.div
									key='copy'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
									className='text-blue-400'
								>
									<Copy className='w-5 h-5' />
								</motion.div>
							)}
						</AnimatePresence>
						{isHovered && !isCopied && (
							<motion.div
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								className='absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-gray-200 px-2 py-1 rounded whitespace-nowrap'
							>
								Copy link
							</motion.div>
						)}
					</motion.button>

					<motion.button
						whileTap={{ scale: 0.98 }}
						onClick={handleShare}
						className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-blue-500/20'
					>
						<Share className='w-4 h-4' />
						Share
					</motion.button>
				</div>
			</div>
		</GradientBorder>
	);
}

export default InviteLink;
