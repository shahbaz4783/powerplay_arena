import { motion } from 'framer-motion';
import { User2, Crown, Gem, Plus, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type TabId = 'powerups' | 'avatars' | 'resources';

interface EmptyStateConfig {
	icon: LucideIcon;
	title: string;
	description: string;
	action: string;
	href: string;
	bgClass: string;
}

interface EmptyInventoryStateProps {
	type: TabId;
}

const emptyStates: Record<TabId, EmptyStateConfig> = {
	powerups: {
		icon: Crown,
		title: 'No Power-ups Yet',
		description:
			'Unlock unique abilities to gain an edge in the game. Power-ups can turn the tide in your favor!',
		action: 'Discover Power-ups',
		href: '/miniapp/shop/powerups',
		bgClass: 'from-yellow-600/20 via-orange-600/20 to-red-600/20',
	},
	avatars: {
		icon: User2,
		title: 'No Avatars Collected',
		description:
			'Express yourself with distinctive avatars. Stand out and let your style shine!',
		action: 'Explore Avatars',
		href: '/miniapp/shop/avatar',
		bgClass: 'from-blue-600/20 via-purple-600/20 to-pink-600/20',
	},
	resources: {
		icon: Gem,
		title: 'No Resources Found',
		description:
			'Gather coins and passes to unlock opportunities and progress further in your journey.',
		action: 'Acquire Resources',
		href: '/miniapp/shop/resource-bank',
		bgClass: 'from-emerald-600/20 via-teal-600/20 to-cyan-600/20',
	},
};


const EmptyInventoryState: React.FC<EmptyInventoryStateProps> = ({ type }) => {
	const emptyState = emptyStates[type];
	const EmptyStateIcon = emptyState.icon;

	return (
		<section className='flex flex-col text-center  items-center justify-center rounded-2xl bg-gray-800/50 p-6'>
			<div className='relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full'>
				<div
					className={`absolute inset-0 animate-pulse rounded-full bg-gradient-to-r ${emptyState.bgClass} blur-xl`}
				/>
				<div className='absolute inset-0 rounded-full bg-gray-900/90' />
				<EmptyStateIcon
					className='relative h-12 w-12 text-gray-300'
					strokeWidth={1.5}
				/>
			</div>

			<h3 className='mb-2 text-xl font-bold text-white'>{emptyState.title}</h3>

			<p className='mb-6 text-sm text-gray-400'>{emptyState.description}</p>

			<Link href={emptyState.href}>
				<motion.button
					whileTap={{ scale: 0.98 }}
					className='inline-flex items-center justify-center gap-2 rounded-lg bg-gray-700 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-gray-600 active:scale-95'
				>
					<Plus className='h-4 w-4' />
					{emptyState.action}
				</motion.button>
			</Link>
		</section>
	);
};

export default EmptyInventoryState;
