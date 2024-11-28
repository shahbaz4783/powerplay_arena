'use client';

import { useCallback, useState } from 'react';
import { inGameItems } from '@/src/constants/powerUps';
import { useFormState } from 'react-dom';
import { initInvoice, useInitData } from '@telegram-apps/sdk-react';
import {
	generateItemInvoice,
	PurchaseState,
} from '@/src/actions/invoice.action';
import { SubmitButton } from '../../common/buttons/submit-button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cloudinary_url } from '@/src/constants/app-config';
import { Button } from '../../ui/button';
import { Info, Star } from 'lucide-react';
import { LevelInfo } from '../../common/dialog/level-info';

export function PowerUps() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id!);
	const invoice = initInvoice();
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const initialState: PurchaseState = {
		success: false,
	};

	const handlePurchase = useCallback(
		async (prevState: PurchaseState, formData: FormData) => {
			const result = await generateItemInvoice(telegramId, prevState, formData);
			if (result.success && result.invoiceLink) {
				invoice.open(result.invoiceLink, 'url').then((status) => {
					return alert(status);
				});
			}
			return result;
		},
		[telegramId]
	);

	const [response, formAction] = useFormState(handlePurchase, initialState);

	return (
		<div className='space-y-4'>
			{inGameItems.map((item) => (
				<motion.div
					key={item.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className='rounded-xl grid grid-cols-3 bg-gray-900 backdrop-blur-sm border border-gray-800 overflow-hidden'>
						<aside className='relative col-span-1 h-full'>
							<div className='absolute inset-0'>
								<Image
									src={cloudinary_url + item.image}
									alt={item.title}
									fill
									className='object-cover'
									draggable={false}
									priority
								/>
							</div>
							<Button
								onClick={() => setSelectedItem(item.id)}
								variant={'ghost'}
								className='absolute top-2 right-2 bg-black/50 p-2 rounded-full backdrop-blur-sm hover:bg-black/70 z-10'
							>
								<Info className='w-5 h-5 text-white' />
							</Button>
						</aside>

						<aside className='col-span-2 p-4 flex gap-3 flex-col justify-between'>
							<div>
								<div className='flex justify-between items-start mb-3'>
									<h3 className='text-lg font-bold text-white'>{item.title}</h3>
								</div>
								<p className='text-slate-400 text-xs leading-relaxed'>
									{item.description}
								</p>
							</div>
							<footer className='flex items-center justify-between bg-slate-700/50 backdrop-blur-md p-2 rounded-xl'>
								<div className='flex items-center space-x-1'>
									<Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
									<span className='text-white font-bold text-'>
										{item.price}
									</span>
								</div>

								<form action={formAction}>
									<input type='hidden' name='itemId' value={item.id} />
									<SubmitButton
										title='Purchase'
										loadingTitle='Purchasing...'
										className='bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2'
									/>
								</form>
							</footer>
						</aside>
					</div>

					<LevelInfo
						isOpen={selectedItem === item.id}
						onClose={() => setSelectedItem(null)}
						title={item.title}
						levels={item.levels}
					/>
				</motion.div>
			))}
		</div>
	);
}
