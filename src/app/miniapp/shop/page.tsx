import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { Header } from '@/src/components/shared/header';
import { AvatarStore } from '@/src/components/shop/avatar-store';
import { CoinFlipChallenge } from '@/src/components/coin-flip/coin-flip-game';
import { BettingPassStore } from '@/src/components/shop/betting-pass-store';
import { RedemptionStore } from '@/src/components/shop/redemption-store';

export default function ShopPage() {
	return (
		<div className='min-h-screen space-y-6 text-gray-100 relative overflow-hidden'>
			<Header
				title='Cricket Bazaar'
				subtitle='Personalize Your Look and Test Your Luck'
			/>

			<Tabs defaultValue='betting-pass' className='w-full'>
				<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					<TabsTrigger
						value='betting-pass'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Betting Pass
					</TabsTrigger>
					<TabsTrigger
						value='avatar'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Avatars
					</TabsTrigger>
					<TabsTrigger
						value='redemption'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Redeem
					</TabsTrigger>
				</TabsList>

				<TabsContent value='betting-pass'>
					<BettingPassStore />
				</TabsContent>
				<TabsContent value='avatar'>
					<AvatarStore />
				</TabsContent>
				<TabsContent value='redemption'>
					<RedemptionStore />
				</TabsContent>
			</Tabs>
		</div>
	);
}
