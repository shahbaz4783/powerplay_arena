'use client';

import { useActionState } from "react";
import { avatars } from '@/src/constants/shop-items';
import { purchaseAvatar } from '@/src/actions/shop.action';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { ItemCard } from '@/src/components/common/cards/item-card';

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
				<ItemCard
					key={avatar.id}
					type='RESOURCE'
					description={avatar.description}
					id={avatar.id}
					image={avatar.href}
					onPurchase={() => response}
					price={avatar.price}
					title={avatar.name}
				/>
			))}
		</>
	);
}
