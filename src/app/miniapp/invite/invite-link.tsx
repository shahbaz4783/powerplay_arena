'use client';

import { Check, Copy, Share, Link as LinkIcon, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { initUtils } from '@telegram-apps/sdk';
import { useState } from 'react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInfo } from '@/src/hooks/useUserData';
import { cn } from '@/src/lib/utils';
import { IconButton } from '@/src/components/common/buttons/primary-button';
import { SectionHeader } from '@/src/components/common/elements/section-header';
import { Skeleton } from '@/src/components/ui/skeleton';

export function InviteLink() {
	const [isCopied, setIsCopied] = useState(false);

	const utils = initUtils();
	const { telegramId } = useCurrentUser();
	const { data, isLoading } = useUserInfo(telegramId);
	const inviteLink = `https://t.me/powerplay_arena_bot?start=${data?.inviteCode}`;

	const handleShare = () => {
		utils.shareURL(
			'Hack the system, reap the rewards! Amazing bonuses await in this arena.',
			inviteLink
		);
	};

	const copyLink = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(inviteLink);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<GradientBorder>
			<SectionHeader
				title='Invite'
				highlightedTitle='Friends'
				icon={Users}
				description='Share your link and earn amazing rewards together.'
			/>

			<section className='p-3 bg-gray-800/50 rounded-xl border border-gray-700/50'>
				<div className='flex items-center gap-3 mb-4'>
					<LinkIcon className='w-4 h-4 text-blue-400' />
					<span className='text-sm font-exo2 font-medium text-gray-300'>
						Your Unique Invite Link
					</span>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex-1 overflow-hidden font-jetbrains text-sm bg-gray-900/50 p-3 rounded-lg border border-gray-700/30 truncate'>
						<motion.div
							className=''
							whileHover={{ scale: 1.01 }}
							transition={{ duration: 0.2 }}
						>
							{isLoading ? (
								<Skeleton className='w-full h-3' />
							) : (
								<>{data?.inviteCode}</>
							)}
						</motion.div>
					</div>

					<motion.button
						className='relative p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 transition-colors duration-200'
						whileTap={{ scale: 0.95 }}
						onClick={copyLink}
					>
						<AnimatePresence mode='wait' initial={false}>
							<motion.div
								key='check'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
								className={cn('text-blue-400', {
									'text-green-400': isCopied,
								})}
							>
								{isCopied ? (
									<Check className='w-5 h-5' />
								) : (
									<Copy className='w-5 h-5' />
								)}
							</motion.div>
						</AnimatePresence>
					</motion.button>
					<IconButton icon={Share} onClick={handleShare} text='Share' />
				</div>
			</section>
		</GradientBorder>
	);
}