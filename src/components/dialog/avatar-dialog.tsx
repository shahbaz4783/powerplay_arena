"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { token } from '@/src/lib/constants';
import { avatars } from '@/src/constants/avatars';
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
import { SubmitButton } from '../feedback/submit-button';

export function AvatarDialog() {
	const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' className='relative h-16 w-16 rounded-full'>
					<Avatar className='h-16 w-16 border-2 border-white'>
						<AvatarImage src={selectedAvatar.href} alt={selectedAvatar.name} />
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
						{avatars.map((avatar) => (
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
									className={`w-full h-24 p-0 rounded-xl flex flex-col ${
										selectedAvatar.id === avatar.id ? 'ring-2 ring-primary' : ''
									}`}
									onClick={() => setSelectedAvatar(avatar)}
								>
									<Avatar className=''>
										<AvatarImage src={avatar.href} alt={avatar.name} />
										<AvatarFallback>
											<User className='h-8 w-8' />
										</AvatarFallback>
									</Avatar>
									<p className='mt-2 text-xs'>{avatar.name}</p>
								</Button>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				<SubmitButton title='Choose' loadingTitle='Applty' />
			</DialogContent>
		</Dialog>
	);
}
