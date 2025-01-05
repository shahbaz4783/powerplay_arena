'use client';

import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@/src/components/ui/tabs';
import { Sparkles, Sword, Package, User, Diamond } from 'lucide-react';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInventory } from '@/src/hooks/useUserData';
import { InventoryCard } from './powerups';
import InventoryLoadingFallback from '@/src/components/layouts/feedback/inventory-loading';
import EmptyInventoryState from '@/src/components/layouts/feedback/empty-inventory';
import { motion } from 'framer-motion';

export const InventoryPage: React.FC = () => {
	const { telegramId } = useCurrentUser();
	const { data, isPending } = useUserInventory(telegramId);

	const powerUps = data?.powerUps;
	const avatars = data?.avatars;
	const resources = data?.avatars;

	return (
		<div className=' text-gray-100 backdrop-blur-sm'>
			<header className='p-4 z-[100] sticky top-0 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800'>
				<div className='flex justify-between items-center mx-auto'>
					<div className='space-y-1'>
						<h1 className='text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent'>
							Inventory
						</h1>
						<p className='text-sm text-gray-400 font-medium'>
							Level up your gameplay
						</p>
					</div>
					<motion.div className='flex items-center gap-3 bg-gray-900/80 px-6 py-3 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/5'>
						<Diamond className='h-5 w-5 text-purple-400' />
						<span className='font-mono text-lg text-purple-100'>2,450</span>
					</motion.div>
				</div>
			</header>

			<Tabs defaultValue='powerups' className='space-y-6 p-3'>
				<TabsList className='w-full bg-gray-800 p-1 gap-2 rounded-xl'>
					<TabsTrigger
						value='powerups'
						className='flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white'
					>
						Power-Ups
					</TabsTrigger>
					<TabsTrigger
						value='avatars'
						className='flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white'
					>
						Avatars
					</TabsTrigger>
					<TabsTrigger
						value='resources'
						className='flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white'
					>
						Resources
					</TabsTrigger>
				</TabsList>

				{isPending && <InventoryLoadingFallback />}

				<TabsContent value='powerups' className='space-y-4'>
					{!powerUps?.length && <EmptyInventoryState type='powerups' />}
					<div className='grid grid-cols-2 gap-3'>
						{powerUps?.map((powerUp) => (
							<InventoryCard key={powerUp.id} powerUp={powerUp} />
						))}
					</div>
				</TabsContent>

				<TabsContent value='avatars' className='space-y-4'>
					{!avatars?.length && <EmptyInventoryState type='avatars' />}
					<div className='grid grid-cols-2 gap-4'>
						{avatars?.map((avatar) => (
							<div key={avatar.avatarId}>{avatar.title}</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value='resources' className='space-y-4'>
					{!resources?.length && <EmptyInventoryState type='resources' />}
					<div className='grid grid-cols-2 gap-4'>
						{resources?.map((resource) => (
							<div key={resource.avatarId}>{resource.title}</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default InventoryPage;
