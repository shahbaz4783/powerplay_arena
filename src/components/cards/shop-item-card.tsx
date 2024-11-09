'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, Percent } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '@/src/components/feedback/submit-button';
import Image from 'next/image';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';

interface ShopItemProps {
	id: number;
	name: string;
	price: number;
	requiredLevel: number;
	image: string;
	onPurchase: (id: number, price: number) => void;
	isPurchased: boolean;
	description: string;
	discount?: number;
	type: 'avatar' | 'powerPass';
	quantity?: number;
}

export function ShopItemCard({
	id,
	name,
	price,
	requiredLevel,
	image,
	onPurchase,
	description,
	discount,
	quantity,
	type,
}: ShopItemProps) {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);
	const userLevel = data?.userProfile.level || 1;

	const [isOpen, setIsOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handlePurchase = () => {
		setIsDialogOpen(true);
	};

	const confirmPurchase = () => {
		onPurchase(id, price);
		setIsDialogOpen(false);
	};

	return (
		<>
			<div className='bg-card border rounded-xl text-card-foreground overflow-hidden shadow-lg mb-4'>
				<div className='flex'>
					<div className='w-1/3 relative'>
						<Image
							src={image}
							alt={name}
							width={80}
							height={80}
							className='w-full h-32 object-cover'
						/>
						{userLevel < requiredLevel && (
							<div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-2 items-center justify-center'>
								<Lock className='h-8 w-8 text-white' />
								<p className='text-xs font-bold shadow-2xl'>
									Require Level {requiredLevel}
								</p>
							</div>
						)}
						{discount && (
							<div className='absolute top-0 right-0 bg-green-700 text-white px-2 py-1 rounded-bl-xl flex items-center'>
								<span className='text-xs font-semibold'>Save {discount}%</span>
							</div>
						)}
					</div>
					<div className='w-2/3 p-3 flex flex-col justify-between'>
						<div>
							<h3 className='text-lg font-semibold'>{name}</h3>
							<p className='text-xs font-mono text-slate-400'>
								{quantity} {type === 'powerPass' ? 'Power Pass' : ''}
							</p>
						</div>
						<div className='flex justify-between items-center'>
							<div className='flex items-baseline gap-1'>
								<span className='text-lg font-semibold font-mono'>{price}</span>
								<span className='text-xs'>{token.symbol} </span>
							</div>
							<Button
								size='sm'
								variant='ghost'
								className='self-end rounded-xl'
								onClick={() => setIsOpen(!isOpen)}
							>
								<ChevronRight
									className={`h-4 w-4 transition-transform ${
										isOpen ? 'rotate-90' : ''
									}`}
								/>
							</Button>
						</div>
					</div>
				</div>
				<motion.div
					initial={{ height: 0 }}
					animate={{ height: isOpen ? 'auto' : 0 }}
					transition={{ duration: 0.3 }}
					className='overflow-hidden'
				>
					<div className='p-3'>
						<p className='text-sm text-muted-foreground mb-3'>{description}</p>
						{userLevel >= requiredLevel && (
							<SubmitButton
								title='Purchase'
								loadingTitle='Purchasing'
								onClick={handlePurchase}
								disabled={userLevel < requiredLevel}
							/>
						)}
					</div>
				</motion.div>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Purchase</DialogTitle>
						<DialogDescription>
							Are you sure you want to purchase {name} for {price}{' '}
							{token.symbol}?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={confirmPurchase}>Confirm Purchase</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
