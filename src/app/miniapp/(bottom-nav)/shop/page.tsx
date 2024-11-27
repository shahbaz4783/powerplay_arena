'use client';

import { Header } from '@/src/components/common/elements/header';
import { GameCard } from '@/src/components/layouts/home/featured-games';
import { ActionButton } from '@/src/components/layouts/home/quick-actions';
import { Shield, Package, Star, UserCircle } from 'lucide-react';
import { FeaturedCarousel } from '@/src/components/layouts/shop/featured-carousel';
import { PiSwap } from 'react-icons/pi';

export default function ShopPage() {
	return (
		<div className='space-y-4'>
			<Header
				title='Game Store'
				subtitle='Get avatars, power passes, and more for your game.'
			/>
			<FeaturedCarousel />
			<div className='grid grid-cols-3 gap-3'>
				<div className='col-span-2 space-y-3'>
					<GameCard
						title='Consumables'
						description='Stock up on essential items'
						icon={Package}
						href='/miniapp/shop/consumables'
						accentColor='border-blue-500'
					/>
					<GameCard
						title='Upgrades'
						description='One-time purchases for lasting benefits'
						icon={Shield}
						href='/miniapp/shop/upgrades'
						accentColor='border-blue-500'
					/>
				</div>
				<div className='col-span-1 space-y-3 bg-slate-900 rounded-xl p-2 flex flex-col justify-center'>
					<ActionButton
						icon={UserCircle}
						label='Avatar'
						href='/miniapp/shop/avatar'
					/>
					<ActionButton
						icon={PiSwap}
						label='Power Pass'
						href='/miniapp/shop/exchange'
					/>
				</div>
				<div className='col-span-3'>
					<GameCard
						title='Special Offers'
						description='Limited-time deals and bundles'
						icon={Star}
						href='/miniapp/shop/offers'
						accentColor='border-blue-500'
					/>
				</div>
			</div>
		</div>
	);
}
