'use client';

import { useActionState } from "react";
import { avatars } from '@/src/constants/shop-items';
import { purchaseAvatar } from '@/src/actions/shop.action';
import { ShopItemCard } from '../../../../../components/common/cards/shop-item-card';
import { cloudinary_url } from '@/src/constants/app-config';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

export function AvatarStore() {
	const { telegramId } = useCurrentUser();

	const [response, formAction] = useActionState(
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
					description={avatar.description}
					requiredLevel={1}
					serverResponse={response}
				/>
			))}
		</>
	);
}
