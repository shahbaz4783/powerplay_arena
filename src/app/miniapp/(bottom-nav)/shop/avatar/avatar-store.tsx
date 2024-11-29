'use client';

import { avatars } from '@/src/constants/shop-items';
import { useInitData } from '@telegram-apps/sdk-react';
import { useFormState } from 'react-dom';
import { purchaseAvatar } from '@/src/actions/shop.action';
import { ShopItemCard } from '../../../../../components/common/cards/shop-item-card';
import { cloudinary_url } from '@/src/constants/app-config';

export function AvatarStore() {
	const initData = useInitData();
	const telegramId = BigInt(initData?.user?.id || 0);

	const [response, formAction] = useFormState(
		purchaseAvatar.bind(null, telegramId),
		{
			message: {},
		}
	);

	return (
		<>
			{avatars.map((avatar) => (
				<ShopItemCard
					id={avatar.id}
					key={avatar.id}
					type='avatar'
					image={cloudinary_url + avatar.href}
					price={avatar.price}
					isPurchased={false}
					name={avatar.name}
					xpGain={avatar.xpGain}
					onPurchase={formAction}
					requiredLevel={avatar.requiredLvl}
					description={avatar.description}
					serverResponse={response}
				/>
			))}
		</>
	);
}
