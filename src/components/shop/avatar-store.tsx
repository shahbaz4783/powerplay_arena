'use client';

import { motion } from 'framer-motion';
import { avatars } from '@/src/constants/avatars';
import Image from 'next/image';
import { token } from '@/src/lib/constants';
import { SubmitButton } from '../feedback/submit-button';
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
					userLevel={4}
					id={avatar.id}
					description={avatar.description}
				/>
			))}
		</>
	);
}
