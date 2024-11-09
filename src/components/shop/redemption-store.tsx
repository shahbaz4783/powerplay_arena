'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Gift, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/src/components/ui/dialog';
import Image from 'next/image';

interface RedemptionItem {
	id: number;
	name: string;
	description: string;
	coinCost: number;
	image: string;
	type: 'physical' | 'digital' | 'experience';
}

const redemptionItems: RedemptionItem[] = [
	{
		id: 1,
		name: 'Streaming Service Annual Subscription',
		description: 'One year premium subscription to a top streaming service.',
		coinCost: 200000,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731137122/Screenshot_2024-11-09_at_12.54.09_PM_ao3xi4.png',
		type: 'digital',
	},
	{
		id: 2,
		name: 'Designer Sunglasses',
		description: 'Stylish, high-end designer sunglasses.',
		coinCost: 150000,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731137122/Screenshot_2024-11-09_at_12.54.09_PM_ao3xi4.png',
		type: 'physical',
	},
	{
		id: 3,
		name: 'Online Course Bundle',
		description:
			'Access to a bundle of premium online courses on various topics.',
		coinCost: 250000,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731137122/Screenshot_2024-11-09_at_12.54.09_PM_ao3xi4.png',
		type: 'digital',
	},
	{
		id: 4,
		name: 'Smart Home Starter Kit',
		description: 'Complete smart home starter kit with various IoT devices.',
		coinCost: 350000,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731137122/Screenshot_2024-11-09_at_12.54.09_PM_ao3xi4.png',
		type: 'physical',
	},
	{
		id: 5,
		name: 'Premium Fitness Tracker',
		description:
			'High-end fitness tracker with advanced health monitoring features.',
		coinCost: 100000,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731137122/Screenshot_2024-11-09_at_12.54.09_PM_ao3xi4.png',
		type: 'physical',
	},
];

export function RedemptionStore() {
	const [selectedItem, setSelectedItem] = useState<RedemptionItem | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleRedeem = (item: RedemptionItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	const confirmRedemption = () => {
		setIsDialogOpen(false);
	};

	return (
		<div>
			<div className='space-y-6'>
				{redemptionItems.map((item) => (
					<motion.div
						key={item.id}
						className='bg-card border rounded-xl overflow-hidden shadow-lg'
						transition={{ duration: 0.2 }}
					>
						<Image
							src={item.image}
							alt={item.name}
							width={300}
							height={200}
							className='w-full h-48 object-cover'
						/>
						<div className='p-4'>
							<h3 className='text-lg font-semibold mb-2'>{item.name}</h3>
							<p className='text-sm text-muted-foreground mb-4'>
								{item.description}
							</p>
							<div className='flex justify-between items-center'>
								<span className='flex items-center text-yellow-500'>
									<Coins className='mr-1 h-4 w-4' />
									{item.coinCost}
								</span>
								<Button onClick={() => handleRedeem(item)}>
									<Gift className='mr-2 h-4 w-4' />
									Redeem
								</Button>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Redemption</DialogTitle>
						<DialogDescription>
							Are you sure you want to redeem {selectedItem?.name} for{' '}
							{selectedItem?.coinCost} coins?
						</DialogDescription>
					</DialogHeader>
					<div className='flex items-center justify-center py-4'>
						<Image
							src={selectedItem?.image || ''}
							alt={selectedItem?.name || ''}
							width={200}
							height={150}
							className='rounded-md'
						/>
					</div>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={confirmRedemption}>Confirm Redemption</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
