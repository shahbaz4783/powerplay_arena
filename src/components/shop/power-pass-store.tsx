'use client';

import { ShopItemCard } from '../cards/shop-item-card';

const bettingPassOptions = [
	{
		id: 1,
		name: 'Starter Pack',
		price: 99,
		requiredLevel: 1,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Begin your journey with 5 Power Pass. Perfect for newcomers ready to explore the game!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 5,
	},
	{
		id: 2,
		name: 'Value Pack',
		price: 359,
		requiredLevel: 2,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Boost your gameplay with 20 Power Pass. Ideal for regular players seeking more opportunities. 10% discount included!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 20,
		discount: 10,
	},
	{
		id: 3,
		name: 'Pro Pack',
		price: 799,
		requiredLevel: 3,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Elevate your experience with 50 Power Pass. For serious players aiming to maximize their potential. Enjoy a 20% discount!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 50,
		discount: 20,
	},
	{
		id: 4,
		name: 'Elite Bundle',
		price: 1399,
		requiredLevel: 4,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Power up with 100 Power Pass! This bundle is perfect for dedicated players who engage frequently. Save an impressive 30%!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 100,
		discount: 30,
	},
	{
		id: 5,
		name: 'Ultimate Vault',
		price: 1999,
		requiredLevel: 5,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Unlock limitless play with our top-tier pack of 200 Power Pass. For the most passionate players who demand the best. Enjoy a massive 50% discount!',
		isPurchased: false,
		type: 'powerPass' as const,
		quantity: 200,
		discount: 50,
	},
];

export function PowerPassStore() {
	return (
		<>
			{bettingPassOptions.map((option) => (
				<ShopItemCard
					key={option.id}
					name={option.name}
					description={option.description}
					image={option.image}
					isPurchased={false}
					onPurchase={() => {}}
					requiredLevel={option.requiredLevel}
					type={option.type}
					id={option.id}
					price={option.price}
					discount={option.discount}
					quantity={option.quantity}
				/>
			))}
		</>
	);
}
