'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
	Users,
	Activity,
	Star,
	Coins,
	Ticket,
	Clock,
	PlusCircle,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/src/components/ui/tooltip';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserReferrals } from '@/src/hooks/useUserData';
import { useFormatDate } from '@/src/hooks/useFormatDate';
import { useState } from 'react';
import { ExtendBenefitsModal } from './extend-benefits';
import { fakeDelay } from '@/src/lib/utils';

interface ReferredUser {
	telegramId: string;
	firstName: string;
	username: string | null;
}

export interface User {
	id: string;
	createdAt: Date;
	referrerId: string;
	referredId: string;
	referredUser?: ReferredUser;
	expiresAt: Date;
	totalEarnedCoins: number;
	totalEarnedPasses: number;
	totalEarnedVouchers: number;
}

export function FriendsList() {
	const { telegramId } = useCurrentUser();
	const { data } = useUserReferrals(telegramId);

	return (
		<section className='bg-black border-gray-800'>
			<AnimatePresence>
				{data?.length! > 0 ? (
					<motion.div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{data?.map((friend) => (
							<motion.div
								key={friend.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<UserCard user={friend} />
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-gray-400 text-center py-8'
					>
						<p className='mb-4'>You haven't referred anyone yet.</p>
						<Badge variant='outline' className='text-gray-300 border-gray-700'>
							Start referring friends and earn rewards together!
						</Badge>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
	const { referredUser } = user;
	const { formatDateDistance, isExpired } = useFormatDate();
	const expired = isExpired(user.expiresAt);
	const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

	return (
		<TooltipProvider>
			<motion.div
				whileTap={{ scale: 0.98 }}
				className='bg-gray-900 shadow-lg rounded-xl border-l-2 border-gray-700 overflow-hidden'
			>
				<CardContent className='p-4'>
					<div className='flex items-center space-x-4 mb-3'>
						<Avatar className='w-12 h-12 border-2 border-gray-700'>
							<AvatarImage
								src={''}
								alt={referredUser?.firstName || 'User Avatar'}
							/>
							<AvatarFallback>
								{referredUser?.firstName?.[0] || 'A'}
							</AvatarFallback>
						</Avatar>
						<div className='flex-grow'>
							<h3 className='text-lg font-semibold text-gray-200'>
								{referredUser?.firstName || 'Anonymous User'}
							</h3>
							<p className='text-xs text-gray-400'>
								Joined {formatDateDistance(user.createdAt)}
							</p>
						</div>
					</div>
					<div className='flex justify-between items-center mb-2'>
						<div className='flex items-center space-x-2'>
							<Tooltip>
								<TooltipTrigger>
									<div className='flex items-center'>
										<Coins className='w-4 h-4 text-yellow-500 mr-1' />
										<span className='text-sm font-semibold text-yellow-500'>
											{user.totalEarnedCoins}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>Power Coins earned</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger>
									<div className='flex items-center'>
										<Ticket className='w-4 h-4 text-green-500 mr-1' />
										<span className='text-sm font-semibold text-green-500'>
											{user.totalEarnedPasses}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>Power Passes earned</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger>
									<div className='flex items-center'>
										<Star className='w-4 h-4 text-purple-500 mr-1' />
										<span className='text-sm font-semibold text-purple-500'>
											{user.totalEarnedVouchers}
										</span>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>Star Vouchers earned</p>
								</TooltipContent>
							</Tooltip>
						</div>
						<Badge
							variant={expired ? 'destructive' : 'secondary'}
							className={
								expired
									? 'bg-red-900/20 text-red-400'
									: 'bg-green-900/20 text-green-400'
							}
						>
							{expired ? (
								<Clock className='w-3 h-3 mr-1' />
							) : (
								<Activity className='w-3 h-3 mr-1' />
							)}
							{expired ? 'Expired' : 'Active'}
						</Badge>
					</div>
					<div className='flex items-center justify-between text-xs text-gray-400'>
						<span>
							Benefits {expired ? 'ended' : 'end'}{' '}
							{formatDateDistance(user.expiresAt)}
						</span>

						<Button
							variant='secondary'
							size='icon'
							onClick={() => setIsExtendModalOpen(true)}
							className='text-blue-400'
						>
							<PlusCircle className='w-4 h-4' />
						</Button>
					</div>
				</CardContent>
			</motion.div>
			<ExtendBenefitsModal
				isOpen={isExtendModalOpen}
				onClose={() => setIsExtendModalOpen(false)}
				userId={user.id}
				currentExpiryDate={user.expiresAt}
			/>
		</TooltipProvider>
	);
};

export { UserCard };
