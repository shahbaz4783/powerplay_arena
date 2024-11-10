'use client';

import { avatars } from '@/src/constants/shop-items';
import { ShopItemCard } from '../cards/shop-item-card';

export function AvatarStore() {
	return (
		<>
			{avatars.map((avatar) => (
				<ShopItemCard
					key={avatar.id}
					type='avatar'
					image={avatar.href}
					price={avatar.price}
					isPurchased={false}
					name={avatar.name}
					onPurchase={() => {}}
					requiredLevel={avatar.requiredLvl}
					id={avatar.id}
					description={avatar.description}
				/>
			))}
		</>
	);
}
