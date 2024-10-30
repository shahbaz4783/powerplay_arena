'use client';

import { avatars } from '@/src/constants/avatars';
import { ShopItemCard } from '../cards/shop-item-card';

export function AvatarStore() {
	return (
		<>
			{avatars.map((avatar) => (
				<ShopItemCard
					key={avatar.id}
					image={avatar.href}
					price={avatar.price}
					isPurchased={false}
					name={avatar.name}
					onPurchase={() => {}}
					requiredLevel={avatar.requiredLvl}
					userCoins={323}
					id={avatar.id}
					description={avatar.description}
				/>
			))}
		</>
	);
}
