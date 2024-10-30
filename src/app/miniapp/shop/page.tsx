import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { Header } from '@/src/components/shared/header';
import { AvatarStore } from '@/src/components/shop/avatar-store';
import { CoinFlipChallenge } from '@/src/components/shop/coin-flip-store';

export default function ShopPage() {
	return (
		<div className='min-h-screen space-y-6 text-gray-100 relative overflow-hidden'>
			<Header
				title='Cricket Bazaar'
				subtitle='Personalize Your Look and Test Your Luck'
			/>

			<Tabs defaultValue='equipment' className='w-full'>
				<TabsList className='grid grid-cols-2 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					<TabsTrigger
						value='equipment'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Coin Flip Challenge
					</TabsTrigger>
					<TabsTrigger
						value='cosmetics'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Avatars
					</TabsTrigger>
				</TabsList>

				<TabsContent value='equipment'>
					<CoinFlipChallenge />
				</TabsContent>

				<TabsContent value='cosmetics'>
					<AvatarStore />
				</TabsContent>
			</Tabs>
		</div>
	);
}
