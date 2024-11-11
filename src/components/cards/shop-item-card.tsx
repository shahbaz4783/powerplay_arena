'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, Minus, Plus } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '@/src/components/feedback/submit-button';
import Image from 'next/image';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import { FormResponse } from '@/src/types/types';
import FormFeedback from '../feedback/form-feedback';

interface ShopItemProps {
	id: number | string;
	name: string;
	price: number;
	requiredLevel: number;
	image: string;
	onPurchase: (formData: FormData) => void;
	isPurchased: boolean;
	description: string;
	type: 'avatar' | 'powerPass';
	discount?: number;
	quantity?: number;
	xpGain?: number;
	serverResponse: FormResponse;
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
	xpGain,
	serverResponse,
}: ShopItemProps) {
	const initData = useInitData();
	const user = initData?.user;

	const { data } = useUserProfile(user?.id);
	const userLevel = data?.userProfile.level || 1;

	const [isOpen, setIsOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const handlePurchase = () => {
		setSelectedQuantity(1);
		setIsDialogOpen(true);
	};

	const incrementQuantity = () => {
		if (quantity && selectedQuantity < quantity) {
			setSelectedQuantity((prev) => prev + 1);
		}
	};
	const decrementQuantity = () => {
		if (selectedQuantity > 1) {
			setSelectedQuantity((prev) => prev - 1);
		}
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
								{quantity ?? xpGain}{' '}
								{type === 'powerPass' ? `${token.pass}` : 'XP'}
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
							<Button
								onClick={handlePurchase}
								disabled={userLevel < requiredLevel}
								className='w-full rounded-xl'
							>
								Purchase
							</Button>
						)}
					</div>
				</motion.div>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className='w-11/12 rounded-xl'>
					<DialogHeader>
						<DialogTitle>Confirm Purchase</DialogTitle>
						<DialogDescription>
							{quantity ? (
								<div className='space-y-4'>
									<p>Select the quantity you want to purchase:</p>
									<div className='flex items-center justify-center space-x-4'>
										<Button
											variant='outline'
											size='icon'
											onClick={decrementQuantity}
											disabled={selectedQuantity === 1}
										>
											<Minus className='h-4 w-4' />
										</Button>
										<span className='text-2xl font-bold'>
											{selectedQuantity}
										</span>
										<Button
											variant='outline'
											size='icon'
											onClick={incrementQuantity}
											disabled={selectedQuantity === quantity}
										>
											<Plus className='h-4 w-4' />
										</Button>
									</div>
								</div>
							) : (
								<p>Are you sure you want to purchase {name}?</p>
							)}
							<p className='mt-4 text-center font-semibold'>
								Total: {price * selectedQuantity} {token.symbol}
							</p>
						</DialogDescription>
					</DialogHeader>
					<form action={onPurchase}>
						<input type='hidden' name='itemId' value={id} />
						<input type='hidden' name='itemQuantity' value={selectedQuantity} />
						<SubmitButton
							title='Confirm Purchase'
							loadingTitle='Purchasing'
							disabled={userLevel < requiredLevel}
						/>
					</form>
					<FormFeedback message={serverResponse.message} />
				</DialogContent>
			</Dialog>
		</>
	);
}
