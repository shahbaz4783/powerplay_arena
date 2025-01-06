'use client';

import { useActionState, useState } from 'react';
import { ChevronRight, Trophy, Info } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { cloudinary_url } from '@/src/lib/config';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconButton } from '@/src/components/common/buttons/primary-button';
import { token } from '@/src/constants/app-config';
import { upgradePowerUp } from '@/src/actions/powerups.action';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { Avatar, PowerUp } from '@prisma/client';
import { format } from 'date-fns';

export const AvatarCard = ({ avatar }: { avatar: Avatar }) => {
	const { telegramId } = useCurrentUser();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [state, action, isPending] = useActionState(
		upgradePowerUp.bind(null, telegramId, avatar.id),
		{
			success: false,
			message: '',
		}
	);

	return (
		<>
			<main className='rounded-xl relative bg-gray-900 backdrop-blur-sm border border-gray-800 overflow-hidden shadow-lg'>
				<motion.section>
					<div className='space-y-4' onClick={() => setIsModalOpen(true)}>
						<Image
							src={cloudinary_url + avatar.photoUrl}
							alt={avatar.title}
							className='w-full object-cover'
							width={80}
							height={120}
							draggable={false}
						/>
					</div>
				</motion.section>
				<motion.div
					className='absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-white flex items-center gap-1'
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					#{avatar.mintNumber}
				</motion.div>
				<motion.div
					className='absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-white flex items-center gap-1'
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					{avatar.rarity}
				</motion.div>
				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogTrigger asChild>
						<motion.button
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className='absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full text-xs font-bold text-white flex items-center gap-1'
						>
							<Info className='size-5' />
						</motion.button>
					</DialogTrigger>
					<DialogContent className='bg-gray-900 border-gray-800 text-gray-100 max-w-md'>
						<DialogHeader>
							<div className='flex items-center gap-4'>
								<div className='relative'>
									<div className='relative group shadow-2xl rounded-lg'>
										<Image
											src={cloudinary_url + avatar.photoUrl}
											alt={avatar.avatarId}
											className='w-16 rounded-xl object-cover border-2 border-blue-500 group-hover:border-blue-400 transition-colors'
											width={40}
											height={40}
										/>
										<div className='absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-xl transition-colors' />
									</div>
									<div className='absolute -bottom-2 -right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-white flex items-center'>
										#{avatar.mintNumber}
									</div>
								</div>
								<div>
									<DialogTitle className='text-xl text-left font-bold text-blue-400'>
										{avatar.title}
									</DialogTitle>
								</div>
							</div>
						</DialogHeader>

						<div className='mt-4 space-y-4'>
							{/* Current Status */}
							<div className='bg-gray-800/50 rounded-lg p-3'>
								<div className='text-sm text-gray-400 mb-2'>
									{avatar.description}
								</div>
								<div className='text-sm'>
									<div className='flex items-center gap-1.5'>
										<span>Current Power</span>
									</div>
									<span className='font-bold text-blue-400'>
										{avatar.currentBenefit}
									</span>
								</div>
							</div>

							{/* Next Level Preview */}
							{avatar.rarity !== 'LEGENDARY' && (
								<div className='bg-gray-800/50 rounded-lg p-3 flex items-center justify-between'>
									<div className='flex items-center gap-1.5'>
										<Trophy className='w-4 h-4 text-green-400' />
										<span className='text-sm'>Next Rarity</span>
									</div>
									<span className='font-bold text-green-400'>
										{avatar.currentBenefit}
									</span>
								</div>
							)}
							<p>{state.message}</p>
							{/* Upgrade Button */}
							{avatar.rarity !== 'LEGENDARY' && (
								<div className='sub-card grid grid-cols-2 gap-1 font-exo2'>
									<div>
									</div>
									<form action={action}>
										<IconButton
											icon={ChevronRight}
											loadingText='Upgrading...'
											text='Upgrade'
											isLoading={isPending}
										/>
									</form>
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</main>
		</>
	);
};
