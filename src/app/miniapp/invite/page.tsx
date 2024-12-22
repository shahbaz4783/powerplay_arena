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
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { InviteLink } from './invite-link';
import { FriendsList } from './friends-list';
import { OverallEarnings } from './invite-bonus-info';
import { ReferralBenefits } from './invite-benefits';
import { ExtensionBonusInfo } from './extention-bonus-benefits';

export interface BenefitCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export interface TotalEarnings {
	coins: number;
	passes: number;
	vouchers: number;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
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

export default function ReferralPage() {
	const [totalEarnings, setTotalEarnings] = useState<TotalEarnings>({
		coins: 0,
		passes: 0,
		vouchers: 0,
	});

	useEffect(() => {
		setTotalEarnings({ coins: 330, passes: 20, vouchers: 10 });
	}, []);

	return (
		<div className='space-y-4'>
			<InviteLink />
			<OverallEarnings />

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
					<ReferralBenefits />
				</TabsContent>
				<TabsContent value='referrals' className='space-y-4 mt-4'>
					<FriendsList />
				</TabsContent>
			</Tabs>
		</div>
	);
}
