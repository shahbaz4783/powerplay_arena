'use client';

import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/src/components/ui/dialog';
import {
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { useInitData } from '@telegram-apps/sdk-react';
import { useGetUserAvatar, useUserProfile } from '@/src/hooks/useUserData';
import { SubmitButton } from '../buttons/submit-button';

export function AvatarDialog() {
	const initData = useInitData();
	const user = initData?.user;
	const { data: avatars } = useGetUserAvatar(user?.id!);
	const { data } = useUserProfile(user?.id!);
	const currentAvatar = data?.userProfile.avatarUrl;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
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
			<DialogContent className='m-auto w-11/12 rounded-xl'>
				<DialogHeader>
					<DialogTitle>Choose your avatar</DialogTitle>
				</DialogHeader>
				<div className='grid grid-cols-2 gap-4 py-4'>
					<AnimatePresence>
						{avatars &&
							avatars.map((avatar) => (
								<motion.div
									key={avatar.id}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button
										variant='outline'
										className={`w-full h-24 p-0 rounded-xl flex flex-col`}
									>
										<Avatar>
											<AvatarImage src={avatar.href} alt={avatar.title} />
											<AvatarFallback>
												<User className='h-8 w-8' />
											</AvatarFallback>
										</Avatar>
										<p className='mt-2 text-xs'>{avatar.title}</p>
									</Button>
								</motion.div>
							))}
					</AnimatePresence>
				</div>

				<SubmitButton title='Choose' loadingTitle='Applying...' />
			</DialogContent>
		</Dialog>
	);
}
