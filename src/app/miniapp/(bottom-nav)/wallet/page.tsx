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
import { PageHeader } from '@/src/components/layouts/global/page-header';

export default function InventoryPage() {
	const { telegramId } = useCurrentUser();
	const { data, isPending } = useUserInventory(telegramId);

	const powerUps = data?.powerUps;
	const avatars = data?.avatars;
	const resources = data?.avatars;

	return (
		<div className='text-gray-100 backdrop-blur-sm'>
			<Tabs defaultValue='powerups' className='space-y-6 px-3'>
				<PageHeader
					title='Inventory'
					description='Upgrade, manage, and dominate with everything at your fingertips.'
				/>
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
					{powerUps?.length === 0 && <EmptyInventoryState type='powerups' />}
					<div className='grid grid-cols-2 gap-3'>
						{powerUps?.map((powerUp) => (
							<InventoryCard key={powerUp.id} powerUp={powerUp} />
						))}
					</div>
				</TabsContent>

				<TabsContent value='avatars' className='space-y-4'>
					{avatars?.length === 0 && <EmptyInventoryState type='avatars' />}
					<div className='grid grid-cols-2 gap-4'>
						{avatars?.map((avatar) => (
							<div key={avatar.avatarId}>{avatar.title}</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value='resources' className='space-y-4'>
					{resources?.length === 0 && <EmptyInventoryState type='resources' />}
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
