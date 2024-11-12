import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { Header } from '@/src/components/common/elements/header';
import { PowerPassStore } from '@/src/components/layouts/shop/powerpass-store';
import { AvatarStore } from '@/src/components/layouts/shop/avatar-store';
import { RedemptionStore } from '@/src/components/layouts/shop/redeem-store';

export default function ShopPage() {
	return (
		<div className='min-h-screen space-y-6 text-gray-100 relative overflow-hidden'>
			<Header
				title='Cricket Bazaar'
				subtitle='Personalize Your Look and Test Your Luck'
			/>

			<Tabs defaultValue='power-pass' className='w-full'>
				<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					<TabsTrigger
						value='power-pass'
						className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
					>
						Power Pass
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

				<TabsContent value='power-pass'>
					<PowerPassStore />
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
