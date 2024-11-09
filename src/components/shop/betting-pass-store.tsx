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
			'Dip your toes into the exciting world of cricket betting with 5 passes. Perfect for newcomers looking to test their luck!',
		isPurchased: false,
		type: 'bettingPass' as const,
		quantity: 5,
	},
	{
		id: 2,
		name: "Enthusiast's Choice",
		price: 359,
		requiredLevel: 2,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Step up your game with 20 passes. Ideal for regular players who want more action and better value. Save 10% on this pack!',
		isPurchased: false,
		type: 'bettingPass' as const,
		quantity: 20,
		discount: 10,
	},
	{
		id: 3,
		name: "Pro Punter's Pack",
		price: 799,
		requiredLevel: 3,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Elevate your betting experience with 50 passes. Perfect for serious players looking to maximize their winning potential. Enjoy a 20% discount!',
		isPurchased: false,
		type: 'bettingPass' as const,
		quantity: 50,
		discount: 20,
	},
	{
		id: 4,
		name: 'Century Striker Bundle',
		price: 1399,
		requiredLevel: 4,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Hit a century with 100 betting passes! This power-packed bundle is designed for dedicated bettors who play frequently. Save a whopping 30%!',
		isPurchased: false,
		type: 'bettingPass' as const,
		quantity: 100,
		discount: 30,
	},
	{
		id: 5,
		name: "Legend's Vault",
		price: 1999,
		requiredLevel: 5,
		image:
			'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1731132322/Untitled_design_ueqh9m.jpg',
		description:
			'Unleash your inner cricket legend with our ultimate pack of 200 passes. For the most passionate and high-stakes players. Incredible 50% savings!',
		isPurchased: false,
		type: 'bettingPass' as const,
		quantity: 200,
		discount: 50,
	},
];

export function BettingPassStore() {
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
					type='bettingPass'
					id={option.id}
					price={option.price}
					discount={option.discount}
					quantity={option.quantity}
				/>
			))}
		</>
	);
}
