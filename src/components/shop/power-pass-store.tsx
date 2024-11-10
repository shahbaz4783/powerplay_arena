'use client';

import { powerPassPacks } from '@/src/constants/shop-items';
import { ShopItemCard } from '../cards/shop-item-card';

export function PowerPassStore() {
	return (
		<>
			{powerPassPacks.map((pack) => (
				<ShopItemCard
					key={pack.id}
					name={pack.name}
					description={pack.description}
					image={pack.image}
					isPurchased={false}
					onPurchase={() => {}}
					requiredLevel={pack.requiredLevel}
					type={pack.type}
					id={pack.id}
					price={pack.price}
					discount={pack.discount}
					quantity={pack.quantity}
				/>
			))}
		</>
	);
}
