'use client';

import { useCallback } from 'react';
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

export function PowerUps() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id!);
	const invoice = initInvoice();

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
					className='bg-gradient-to-br from-slate-900 to-stone-900 rounded-xl overflow-hidden shadow-xl'
				>
					<div className='relative h-48'>
						<Image
							src={cloudinary_url + item.image}
							alt={item.title}
							layout='fill'
							objectFit='cover'
							className='transition-opacity duration-300 ease-in-out group-hover:opacity-75'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center'>
							<h3 className='text-2xl font-bold text-white text-center px-4'>
								{item.title}
							</h3>
						</div>
					</div>
					<div className='p-4'>
						<p className='text-gray-300 text-sm mb-4'>{item.description}</p>
						<motion.div layout>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-white font-bold text-lg'>
									{item.price} Star
								</span>
								<form action={formAction}>
									<input type='hidden' name='itemId' value={item.id} />
									<SubmitButton title='Pay now' loadingTitle='Please wait' />
								</form>
							</div>
						</motion.div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
