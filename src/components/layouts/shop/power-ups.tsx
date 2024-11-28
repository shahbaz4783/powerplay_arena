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
		<div className='space-y-6'>
			{inGameItems.map((item) => (
				<motion.div
					key={item.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className='rounded-xl flex bg-gray-900 border border-gray-800 overflow-hidden'>
						<div className='relative w-full sm:w-1/3 h-48 sm:h-auto min-w-[200px]'>
							<Image
								src={cloudinary_url + item.image}
								alt={item.title}
								layout='fill'
								objectFit='cover'
								className='transition-transform duration-300 group-hover:scale-105'
							/>
							<Button
								onClick={() => setSelectedItem(item.id)}
								variant={'ghost'}
								className='absolute top-3 right-3 bg-black/50 p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors'
							>
								<Info className='w-5 h-5 text-white' />
							</Button>
						</div>

						<div className='w-full md:w-2/3 p-6 flex flex-col justify-between'>
							<div>
								<div className='flex justify-between items-start mb-4'>
									<h3 className='text-lg font-bold text-white'>
										{item.title}
									</h3>
								</div>
								<p className='text-slate-400 mb-6 text-xs'>
									{item.description}
								</p>
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-2'>
									<Star className='w-6 h-6 text-yellow-500 fill-yellow-500' />
									<span className='text-white font-bold text-xl'>
										{item.price}
									</span>
								</div>

								<form action={formAction}>
									<input type='hidden' name='itemId' value={item.id} />
									<SubmitButton title='Purchase' loadingTitle='Purchasing...' />
								</form>
							</div>
						</div>
					</div>

					{/* Level Info Modal */}
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
