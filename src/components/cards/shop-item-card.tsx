'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ChevronDown,
	ChevronRight,
	ChevronUp,
	Coins,
	Lock,
	Star,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '../feedback/submit-button';
import Image from 'next/image';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';

interface ShopItemProps {
	id: number;
	name: string;
	price: number;
	requiredLevel: number;
	image: string;
	userCoins: number;
	onPurchase: (id: number, price: number) => void;
	isPurchased: boolean;
	description: string;
}

export function ShopItemCard({
	id,
	name,
	price,
	requiredLevel,
	image,
	onPurchase,
	description,
}: ShopItemProps) {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);
	const userLevel = data?.userProfile.level || 1;

	const [isOpen, setIsOpen] = useState(false);

	const handlePurchase = () => {
		onPurchase(id, price);
	};

	return (
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
						<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
							<Lock className='h-8 w-8 text-white' />
						</div>
					)}
				</div>
				<div className='w-2/3 p-3 flex flex-col justify-between'>
					<div className=''>
						<h3 className='text-lg font-semibold mb-1'>{name}</h3>
						<div className='flex items-center space-x-1'>
							<span className='text-xs text-slate-400'>
								Required Level {requiredLevel}
							</span>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<div className=' flex items-baseline gap-1'>
							<span className='text-lg font-semibold font-mono'>{price} </span>
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
					<SubmitButton title='Purchase' loadingTitle='Purchasing' />
				</div>
			</motion.div>
		</div>
	);
}
