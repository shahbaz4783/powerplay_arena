'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { useGetUserAvatar } from '@/src/hooks/useUserData';
import { SubmitButton } from '../buttons/submit-button';
import { cn } from '@/src/lib/utils';
import { updateAvatar } from '@/src/actions/user.action';
import { MessageCard } from '../cards/message-card';
import { cloudinary_url } from '@/src/constants/app-config';

interface AvatarData {
	id: string;
	href: string;
	title: string;
}

export function AvatarDialog({
	userId,
	currentAvatar,
}: {
	userId: number;
	currentAvatar: string;
}) {
	const { data: avatars } = useGetUserAvatar(userId);
	const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);

	const handleAvatarSelect = (avatar: AvatarData) => {
		setSelectedAvatar(avatar);
	};

	const handleSubmit = () => {
		if (selectedAvatar) {
			updateAvatar(userId, selectedAvatar.href);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='relative h-16 w-16 rounded-full'>
					<Avatar className='h-16 w-16 border-2 border-white'>
						<AvatarImage src={currentAvatar} />
						<AvatarFallback>
							<User className='h-8 w-8' />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 rounded-xl'>
				{!avatars?.length ? (
					<MessageCard
						title='You dont have Avatars'
						message='Your purchased avatars will display here.'
					/>
				) : (
					<>
						<DialogHeader>
							<DialogTitle className='text-center'>
								Choose your avatar
							</DialogTitle>
						</DialogHeader>
						<div className='grid grid-cols-3 gap-4 py-4'>
							<AnimatePresence>
								{avatars?.map((avatar) => (
									<motion.div
										key={avatar.id}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										transition={{ duration: 0.2 }}
									>
										<Button
											variant='outline'
											className={cn(
												'w-full h-24 p-0 rounded-xl flex flex-col items-center justify-center overflow-hidden',
												selectedAvatar?.id === avatar.id &&
													'ring-2 ring-primary ring-offset-2'
											)}
											onClick={() => handleAvatarSelect(avatar)}
										>
											<div className='relative'>
												<Avatar className='h-16 w-16'>
													<AvatarImage
														src={cloudinary_url + avatar.href}
														alt={avatar.title}
													/>
													<AvatarFallback>
														<User className='h-8 w-8' />
													</AvatarFallback>
												</Avatar>
												{selectedAvatar?.id === avatar.id && (
													<div className='absolute inset-0 bg-primary/20 rounded-full flex items-center justify-center'>
														<Check className='text-primary w-8 h-8' />
													</div>
												)}
											</div>
											<p className='mt-2 text-xs truncate w-full text-center px-2'>
												{avatar.title}
											</p>
										</Button>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
						<SubmitButton
							title='Choose'
							loadingTitle='Applying...'
							onClick={handleSubmit}
							disabled={!selectedAvatar}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
