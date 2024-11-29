'use client';

import { powerPassPacks } from '@/src/constants/shop-items';
import { useFormState } from 'react-dom';
import { purchasePowerPass } from '@/src/actions/shop.action';
import { useInitData } from '@telegram-apps/sdk-react';
import { ShopItemCard } from '../common/cards/shop-item-card';
import { cloudinary_url } from '@/src/constants/app-config';

export function PowerPassStore() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id || 0);

	const [response, formAction] = useFormState(
		purchasePowerPass.bind(null, telegramId),
		{
			message: {},
		}
	);

	return (
		<>
			{powerPassPacks.map((pack) => (
				<ShopItemCard
					key={pack.id}
					name={pack.name}
					description={pack.description}
					image={cloudinary_url + pack.image}
					isPurchased={false}
					onPurchase={formAction}
					requiredLevel={pack.requiredLevel}
					type={pack.type}
					id={pack.id}
					price={pack.price}
					discount={pack.discount}
					quantity={pack.quantity}
					serverResponse={response}
				/>
			))}
		</>
	);
}
