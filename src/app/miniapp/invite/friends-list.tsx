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
import { Button } from '@/src/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/src/components/ui/select';

export interface User {
	id: string;
	username: string;
	avatar: string;
	joinDate: string;
	earnedCoins: number;
	earnedPasses: number;
	earnedVouchers: number;
	tier: 'bronze' | 'silver' | 'gold' | 'platinum';
	lastActive: string;
}

const friendsList: User[] = [
	{
		id: '1',
		username: 'CyberNinja',
		avatar: 'https://i.pravatar.cc/150?img=1',
		joinDate: '2023-06-01',
		earnedCoins: 1000,
		earnedPasses: 20,
		earnedVouchers: 15,
		tier: 'gold',
		lastActive: '2023-06-28',
	},
	{
		id: '2',
		username: 'QuantumGamer',
		avatar: 'https://i.pravatar.cc/150?img=2',
		joinDate: '2023-06-15',
		earnedCoins: 1500,
		earnedPasses: 30,
		earnedVouchers: 30,
		tier: 'platinum',
		lastActive: '2023-06-29',
	},
	{
		id: '3',
		username: 'NeonRider',
		avatar: 'https://i.pravatar.cc/150?img=3',
		joinDate: '2023-07-01',
		earnedCoins: 800,
		earnedPasses: 15,
		earnedVouchers: 5,
		tier: 'silver',
		lastActive: '2023-07-02',
	},
];

export function FriendsList() {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('username');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const filteredAndSortedFriends = friendsList
		.filter((friend) =>
			friend.username.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			const order = sortOrder === 'asc' ? 1 : -1;
			if (sortBy === 'username') {
				return order * a.username.localeCompare(b.username);
			} else if (sortBy === 'tier') {
				const tierOrder = ['bronze', 'silver', 'gold', 'platinum'];
				return order * (tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));
			} else if (sortBy === 'lastActive') {
				return (
					order *
					(new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime())
				);
			}
			return 0;
		});

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-bold flex items-center gap-2 mb-4'>
					<Users className='w-6 h-6 text-blue-400' />
					Your Frens ({friendsList.length})
				</CardTitle>
			</CardHeader>
			<CardContent>
				<AnimatePresence>
					{filteredAndSortedFriends.length > 0 ? (
						<motion.ul className='space-y-4'>
							{filteredAndSortedFriends.map((friend) => (
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
							src={user.avatar}
							alt={user.username}
							className='w-16 h-16 rounded-full object-cover border-2 border-blue-500'
						/>
						<Award
							className={`absolute -bottom-1 -right-1 w-6 h-6 ${
								tierColors[user.tier]
							}`}
						/>
					</div>
					<div className='flex-grow'>
						<h3 className='text-lg font-semibold text-blue-300'>
							{user.username}
						</h3>
						<p className='text-xs text-gray-400'>
							Joined: {new Date(user.joinDate).toLocaleDateString()}
						</p>
					</div>
					<div className='text-right'>
						<p className='text-sm font-semibold text-yellow-400'>
							{user.earnedVouchers} <Star className='inline w-4 h-4' />
						</p>
						<p className='text-xs text-gray-400'>
							{user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
						</p>
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
					src={user.avatar}
					alt={user.username}
					className='w-12 h-12 rounded-full object-cover border-2 border-blue-500'
				/>
				<span>{user.username}</span>
			</DialogTitle>
		</DialogHeader>
		<div className='space-y-6'>
			<p className='text-gray-400'>
				Joined: {new Date(user.joinDate).toLocaleDateString()}
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
							{user.earnedCoins}
						</p>
						<p className='text-xs text-gray-400'>Power Coins</p>
					</div>
					<div className='text-center'>
						<p className='text-2xl font-bold text-green-400'>
							{user.earnedPasses}
						</p>
						<p className='text-xs text-gray-400'>Power Passes</p>
					</div>
					<div className='text-center'>
						<p className='text-2xl font-bold text-purple-400'>
							{user.earnedVouchers}
						</p>
						<p className='text-xs text-gray-400'>Star Vouchers</p>
					</div>
				</CardContent>
			</Card>
			<div>
				<h4 className='text-lg font-semibold text-blue-300 mb-2'>
					Last Active
				</h4>
				<p className='text-gray-400'>
					{new Date(user.lastActive).toLocaleString()}
				</p>
			</div>
		</div>
	</DialogContent>
);
