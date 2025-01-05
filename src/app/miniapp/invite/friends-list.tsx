'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
	Activity,
	Star,
	Coins,
	Ticket,
	Clock,
	PlusCircle,
	Shield,
} from 'lucide-react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Progress } from '@/src/components/ui/progress';
import { useState } from 'react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserReferrals } from '@/src/hooks/useUserData';
import { useFormatDate } from '@/src/hooks/useFormatDate';
import { ExtendBenefitsModal } from './extend-benefits';
import { SectionLoading } from '@/src/components/layouts/feedback/section-loading';
import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { cn } from '@/src/lib/utils';

interface MaxCapInfo {
	baseLimit: number;
	additionalLimit: number;
	currentUsage: number;
}
interface ReferredUser {
	telegramId: string;
	firstName: string;
	username: string | null;
}
interface User {
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

const calculateMaxCap = (extensionWeeks: number): number => {
	switch (extensionWeeks) {
		case 1:
			return 10;
		case 2:
			return 25;
		case 3:
			return 40;
		case 4:
			return 60;
		case 8:
			return 150;
		default:
			return 0;
	}
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
	const { referredUser } = user;
	const { formatDateDistance, isExpired, formatDate } = useFormatDate();
	const today = new Date();
	const expiresAt = new Date(user.expiresAt);
	const lessThanWeek =
		(expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 7;

	const expired = isExpired(user.expiresAt);
	const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);

	// Mock data for demonstration
	const maxCapInfo: MaxCapInfo = {
		baseLimit: 100,
		additionalLimit: calculateMaxCap(4),
		currentUsage: 85,
	};

	const totalLimit = maxCapInfo.baseLimit + maxCapInfo.additionalLimit;
	const usagePercentage = (maxCapInfo.currentUsage / totalLimit) * 100;

	return (
		<GradientBorder className='space-y-3'>
			<div className='flex items-center space-x-4 mb-4'>
				<div className='relative'>
					<Avatar className='w-16 h-16 border-2 border-blue-500/50 shadow-lg'>
						<AvatarImage
							src={''}
							alt={referredUser?.firstName || 'User Avatar'}
						/>
						<AvatarFallback className='bg-blue-500/20'>
							{referredUser?.firstName?.[0] || 'A'}
						</AvatarFallback>
					</Avatar>
					{!expired && (
						<Badge className='absolute -bottom-2 -right-2 bg-green-500/20 border text-green-200 border-green-500/50 backdrop-blur-sm hover:bg-green-500/20'>
							<Activity className='w-3 h-3 mr-1' />
							Active
						</Badge>
					)}
				</div>
				<div className='flex-grow'>
					<h3 className='text-xl font-bold text-gray-100 mb-1'>
						{referredUser?.firstName || 'Anonymous User'}
					</h3>
					<p className='text-sm text-gray-400 flex items-center'>
						<Clock className='w-4 h-4 mr-1' />
						Joined {formatDateDistance(user.createdAt)}
					</p>
				</div>
			</div>

			<div className='space-y-4'>
				<div className='flex justify-between items-center mb-2'>
					<div className='flex items-center space-x-2'>
						<div className='flex items-center'>
							<Coins className='w-4 h-4 text-yellow-500 mr-1' />
							<span className='text-sm font-semibold text-yellow-500'>
								{user.totalEarnedCoins}
							</span>
						</div>

						<div className='flex items-center'>
							<Ticket className='w-4 h-4 text-green-500 mr-1' />
							<span className='text-sm font-semibold text-green-500'>
								{user.totalEarnedPasses}
							</span>
						</div>
						<div className='flex items-center'>
							<Star className='w-4 h-4 text-purple-500 mr-1' />
							<span className='text-sm font-semibold text-purple-500'>
								{user.totalEarnedVouchers}
							</span>
						</div>
					</div>
				</div>

				<div className='space-y-2'>
					<div className='flex justify-between items-center text-sm'>
						<div className='flex items-center text-gray-300'>
							<Shield className='w-4 h-4 mr-2 text-blue-400' />
							Max Vouchers
						</div>
						<span className='text-gray-300'>
							{maxCapInfo.currentUsage}/{totalLimit}
						</span>
					</div>
					<Progress value={usagePercentage} className='h-2' />
					<div className='flex justify-between text-xs text-gray-400'>
						<span>Base: {maxCapInfo.baseLimit}</span>
						<span className='text-blue-400'>
							+{maxCapInfo.additionalLimit} Extended
						</span>
					</div>
				</div>

				<div className='flex justify-between items-center sub-card'>
					<span
						className={cn('text-sm text-gray-400', {
							'text-red-400': lessThanWeek,
						})}
					>
						Benefits {expired ? 'ended' : 'end'}{' '}
						{formatDateDistance(user.expiresAt)}
					</span>
					{!expired && (
						<Button
							variant='secondary'
							size='sm'
							onClick={() => setIsExtendModalOpen(true)}
							className='bg-blue-500/20 text-blue-400'
						>
							<PlusCircle className='w-4 h-4 mr-1' />
							Extend
						</Button>
					)}
				</div>
			</div>

			<ExtendBenefitsModal
				isOpen={isExtendModalOpen}
				currentVouchers={user.totalEarnedVouchers}
				referredId={user.id}
				onClose={() => setIsExtendModalOpen(false)}
				userId={user.referrerId}
				currentExpiryDate={user.expiresAt}
			/>
		</GradientBorder>
	);
};

export function FriendsList() {
	const { telegramId } = useCurrentUser();
	const { data, isLoading } = useUserReferrals(telegramId);

	if (isLoading) {
		return (
			<SectionLoading size='lg' message='Fetching your referral list...' />
		);
	}

	return (
		<AnimatePresence>
			{data?.length! > 0 ? (
				<motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
	);
}
