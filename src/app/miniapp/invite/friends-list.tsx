'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Award,
	Users,
	Search,
	ChevronDown,
	ChevronUp,
	Activity,
	Star,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInfo } from '@/src/hooks/useUserData';

export interface User {
	id: string;
	createdAt: Date;
	referrerId: string;
	referredId: string;
	expiresAt: Date;
	totalEarnedCoins: number;
	totalEarnedPasses: number;
	totalEarnedVouchers: number;
}

export function FriendsList() {
	const { telegramId } = useCurrentUser();
	const { data } = useUserInfo(telegramId);
	const friendsList = data?.referrals;

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-bold flex items-center gap-2 mb-4'>
					<Users className='w-6 h-6 text-blue-400' />
					Your Frens ({friendsList?.length})
				</CardTitle>
			</CardHeader>
			<CardContent>
				<AnimatePresence>
					{friendsList?.length! > 0 ? (
						<motion.ul className='space-y-4'>
							{friendsList?.map((friend) => (
								<motion.li
									key={friend.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<Dialog>
										<DialogTrigger asChild>
											<div>
												<UserCard user={friend} />
											</div>
										</DialogTrigger>
										<UserModal user={friend} />
									</Dialog>
								</motion.li>
							))}
						</motion.ul>
					) : (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='text-gray-400 text-center py-8'
						>
							No friends found. Try adjusting your search.
						</motion.p>
					)}
				</AnimatePresence>
			</CardContent>
		</Card>
	);
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
	const tierColors = {
		bronze: 'text-orange-400',
		silver: 'text-gray-300',
		gold: 'text-yellow-400',
		platinum: 'text-blue-300',
	};

	return (
		<motion.div whileTap={{ scale: 0.98 }}>
			<Card className='bg-gray-800 border-gray-700 cursor-pointer shadow-lg overflow-hidden'>
				<CardContent className='p-4 flex items-center space-x-4'>
					<div className='relative'>
						<img
							src={''}
							alt={''}
							className='w-16 h-16 rounded-full object-cover border-2 border-blue-500'
						/>
						{/* <Award
							className={`absolute -bottom-1 -right-1 w-6 h-6 ${
								tierColors[user.tier]
							}`}
						/> */}
					</div>
					<div className='flex-grow'>
						<h3 className='text-lg font-semibold text-blue-300'>
							{user.referredId}
						</h3>
						<p className='text-xs text-gray-400'>
							Joined: {new Date(user.createdAt).toLocaleDateString()}
						</p>
					</div>
					<div className='text-right'>
						<p className='text-sm font-semibold text-yellow-400'>
							{user.totalEarnedVouchers} <Star className='inline w-4 h-4' />
						</p>
						{/* <p className='text-xs text-gray-400'>
							{user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
						</p> */}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

const UserModal: React.FC<{ user: User }> = ({ user }) => (
	<DialogContent className='bg-gray-900 text-white border-gray-700 rounded-xl w-11/12 max-w-md'>
		<DialogHeader>
			<DialogTitle className='text-2xl font-bold text-blue-300 flex items-center space-x-2'>
				<img
					src={''}
					alt={''}
					className='w-12 h-12 rounded-full object-cover border-2 border-blue-500'
				/>
				<span>{user.referredId}</span>
			</DialogTitle>
		</DialogHeader>
		<div className='space-y-6'>
			<p className='text-gray-400'>
				Joined: {new Date(user.createdAt).toLocaleDateString()}
			</p>
			<Card className='bg-gray-800 border-gray-700'>
				<CardHeader>
					<CardTitle className='text-blue-300 flex items-center'>
						<Activity className='w-5 h-5 mr-2' /> Earnings
					</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-3 gap-4'>
					<div className='text-center'>
						<p className='text-2xl font-bold text-yellow-400'>
							{user.totalEarnedCoins}
						</p>
						<p className='text-xs text-gray-400'>Power Coins</p>
					</div>
					<div className='text-center'>
						<p className='text-2xl font-bold text-green-400'>
							{user.totalEarnedPasses}
						</p>
						<p className='text-xs text-gray-400'>Power Passes</p>
					</div>
					<div className='text-center'>
						<p className='text-2xl font-bold text-purple-400'>
							{user.totalEarnedVouchers}
						</p>
						<p className='text-xs text-gray-400'>Star Vouchers</p>
					</div>
				</CardContent>
			</Card>
			<div>
				<h4 className='text-lg font-semibold text-blue-300 mb-2'>
					Benefits ends on:
				</h4>
				<p className='text-gray-400'>
					{new Date(user.expiresAt).toLocaleString()}
				</p>
			</div>
		</div>
	</DialogContent>
);
