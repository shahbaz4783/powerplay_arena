'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Coins, Gift, Users, Zap, Award } from 'lucide-react';
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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { InviteLink } from './invite-link';
import { Header } from '@/src/components/common/elements/header';

export interface BenefitCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export interface UserCardProps {
	user: User;
	onClick: () => void;
}

export interface UserModalProps {
	user: User;
}

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

export interface TotalEarnings {
	coins: number;
	passes: number;
	vouchers: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
	icon,
	title,
	description,
}) => (
	<motion.div whileTap={{ scale: 0.95 }}>
		<Card className='cyberpunk-bg neon-border shadow-lg'>
			<CardHeader className='flex flex-row items-center space-x-2 pb-2'>
				<div className='rounded-full bg-[hsl(var(--neon-blue))] p-2'>
					{icon}
				</div>
				<CardTitle className='text-lg neon-text'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-sm text-[hsl(var(--muted-foreground))]'>
					{description}
				</p>
			</CardContent>
		</Card>
	</motion.div>
);

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
	const tierColors = {
		bronze: 'text-orange-400',
		silver: 'text-gray-300',
		gold: 'text-yellow-400',
		platinum: 'text-blue-300',
	};

	return (
		<motion.div whileTap={{ scale: 0.98 }}>
			<Card
				className='cyberpunk-bg neon-border cursor-pointer shadow-lg overflow-hidden'
				onClick={onClick}
			>
				<CardContent className='p-4 flex items-center space-x-4'>
					<div className='relative'>
						<img
							src={user.avatar}
							alt={user.username}
							className='w-16 h-16 rounded-full object-cover'
						/>
						<Award
							className={`absolute -bottom-1 -right-1 w-6 h-6 ${
								tierColors[user.tier]
							}`}
						/>
					</div>
					<div className='flex-grow'>
						<h3 className='text-lg font-semibold neon-text'>{user.username}</h3>
						<p className='text-xs text-[hsl(var(--muted-foreground))]'>
							Joined: {user.joinDate}
						</p>
					</div>
					<div className='text-right'>
						<p className='text-sm font-semibold neon-text'>
							{user.earnedVouchers} Vouchers
						</p>
						<p className='text-xs text-[hsl(var(--muted-foreground))]'>
							{user.tier.charAt(0).toUpperCase() + user.tier.slice(1)} Tier
						</p>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

const UserModal: React.FC<UserModalProps> = ({ user }) => (
	<DialogContent className='cyberpunk-bg neon-border  rounded-xl w-11/12'>
		<DialogHeader>
			<DialogTitle className='text-2xl font-bold neon-text flex items-center space-x-2'>
				<img
					src={user.avatar}
					alt={user.username}
					className='w-10 h-10 rounded-full object-cover'
				/>
				<span>{user.username}</span>
			</DialogTitle>
		</DialogHeader>
		<div className='space-y-4'>
			<p className='text-[hsl(var(--muted-foreground))]'>
				Joined: {user.joinDate}
			</p>
			<Card className='cyberpunk-bg neon-border'>
				<CardHeader>
					<CardTitle className='neon-text'>Earnings</CardTitle>
				</CardHeader>
				<CardContent className='grid grid-cols-3 gap-4'>
					<div className='text-center'>
						<p className='text-xl font-bold neon-text'>{user.earnedCoins}</p>
						<p className='text-xs text-[hsl(var(--muted-foreground))]'>
							Power Coins
						</p>
					</div>
					<div className='text-center'>
						<p className='text-xl font-bold neon-text'>{user.earnedPasses}</p>
						<p className='text-xs text-[hsl(var(--muted-foreground))]'>
							Power Passes
						</p>
					</div>
					<div className='text-center'>
						<p className='text-xl font-bold neon-text'>{user.earnedVouchers}</p>
						<p className='text-xs text-[hsl(var(--muted-foreground))]'>
							Star Vouchers
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	</DialogContent>
);

export default function ReferralPage() {
	const [totalEarnings, setTotalEarnings] = useState<TotalEarnings>({
		coins: 0,
		passes: 0,
		vouchers: 0,
	});

	const mockUsers: User[] = [
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

	useEffect(() => {
		setTotalEarnings({ coins: 1500, passes: 60, vouchers: 50 });
	}, []);

	return (
		<div className='min-h-screen text-[hsl(var(--foreground))] space-y-6'>
			<Header
				title='Refer & Conquer!'
				subtitle='Boost your rewards by inviting friends'
			/>
			<InviteLink />

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<Card className='cyberpunk-bg neon-border shadow-lg'>
					<CardHeader>
						<CardTitle className='neon-text text-2xl'>Total Earnings</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-3 gap-4 mb-6'>
							<div className='text-center'>
								<p className='text-3xl font-bold neon-text'>
									{totalEarnings.coins}
								</p>
								<p className='text-sm text-[hsl(var(--muted-foreground))]'>
									Power Coins
								</p>
							</div>
							<div className='text-center'>
								<p className='text-3xl font-bold neon-text'>
									{totalEarnings.passes}
								</p>
								<p className='text-sm text-[hsl(var(--muted-foreground))]'>
									Power Passes
								</p>
							</div>
							<div className='text-center'>
								<p className='text-3xl font-bold neon-text'>
									{totalEarnings.vouchers}
								</p>
								<p className='text-sm text-[hsl(var(--muted-foreground))]'>
									Star Vouchers
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<Tabs defaultValue='benefits' className='w-full'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='benefits' className='neon-text'>
						Benefits
					</TabsTrigger>
					<TabsTrigger value='referrals' className='neon-text'>
						Your Referrals
					</TabsTrigger>
				</TabsList>
				<TabsContent value='benefits' className='space-y-4 mt-4'>
					<BenefitCard
						icon={<Coins className='h-6 w-6 text-[hsl(var(--neon-blue))]' />}
						title='Instant Rewards'
						description='500 Power Coins and 10 Power Passes for you and your friend on join!'
					/>
					<BenefitCard
						icon={<Gift className='h-6 w-6 text-[hsl(var(--neon-purple))]' />}
						title='Voucher Bonuses'
						description='Up to 5 bonus vouchers when your friend buys 10+ vouchers!'
					/>
					<BenefitCard
						icon={<Users className='h-6 w-6 text-[hsl(var(--neon-pink))]' />}
						title='Win-Win'
						description='Your friend also gets bonus vouchers on purchases!'
					/>
					<BenefitCard
						icon={<Zap className='h-6 w-6 text-[hsl(var(--neon-blue))]' />}
						title='Limited Time'
						description='4 weeks to claim all benefits from each referral. Act fast!'
					/>
				</TabsContent>
				<TabsContent value='referrals' className='space-y-4 mt-4'>
					{mockUsers.map((user) => (
						<Dialog key={user.id}>
							<DialogTrigger asChild>
								<div>
									<UserCard user={user} onClick={() => {}} />
								</div>
							</DialogTrigger>
							<UserModal user={user} />
						</Dialog>
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
