'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/src/components/ui/dialog';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import {
	Info,
	BoltIcon,
	Target,
	Shield,
	Droplet,
	Zap,
	Flame,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GameState } from '@/src/types/gameState';

interface InfoDialogProps {
	gameState: GameState;
}

interface ControlDetail {
	name: string;
	icon: React.ReactNode;
	description: string;
}

const controls: Record<'batting' | 'bowling', ControlDetail[]> = {
	batting: [
		{
			name: 'Loft',
			icon: <Flame className='w-5 h-5 text-red-400' />,
			description:
				'High risk, high reward. 20% chance of getting out, but 40% chance of hitting 4s or 6s. Use wisely!',
		},
		{
			name: 'Normal',
			icon: <Target className='w-5 h-5 text-amber-400' />,
			description:
				'Balanced approach. 8% chance of getting out, with good odds for singles and doubles. Reliable choice for steady scoring.',
		},
		{
			name: 'Defensive',
			icon: <Shield className='w-5 h-5 text-emerald-400' />,
			description:
				'Play it safe. Only 1% chance of getting out, but mainly singles and doubles. Best when protecting your wicket is crucial.',
		},
	],
	bowling: [
		{
			name: 'Seam',
			icon: <Droplet className='w-5 h-5 text-sky-400' />,
			description:
				'Versatile delivery. Balanced chances for wickets and runs. Effective against all batting styles.',
		},
		{
			name: 'Bouncer',
			icon: <BoltIcon className='w-5 h-5 text-violet-400' />,
			description:
				'Attempt to unsettle the opponent. Most effective against aggressive batting, but least effective against defensive batting',
		},
		{
			name: 'Yorker',
			icon: <Zap className='w-5 h-5 text-orange-400' />,
			description:
				'Great against normal and aggressive batting, but less effective vs defensive. Perfect execution can be unplayable!',
		},
	],
};

export function InfoDialog({ gameState }: InfoDialogProps) {
	const [open, setOpen] = useState(false);
	const isBatting = gameState.gamePhase === 'batting';
	const currentControls = controls[isBatting ? 'batting' : 'bowling'];

	const maxYorker = gameState.gameControls.yorker;
	const maxLoft = gameState.gameControls.loft;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='rounded-full p-2 bg-gradient-to-br from-indigo-500/20 to-purple-600/10 hover:from-indigo-500/30 hover:to-purple-600/20 transition-colors duration-200 shadow-lg backdrop-blur-sm'
				>
					<Info className='h-5 w-5 text-indigo-300' />
				</motion.button>
			</DialogTrigger>
			<DialogContent className='w-11/12 max-w-md bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/50 rounded-xl p-6 overflow-hidden z-[200] shadow-2xl backdrop-blur-xl'>
				<DialogTitle className='text-xl font-bold text-white flex items-center gap-3'>
					{isBatting ? (
						<BoltIcon className='w-6 h-6 text-amber-400' />
					) : (
						<Target className='w-6 h-6 text-amber-400' />
					)}
					{isBatting ? 'Batting' : 'Bowling'} Masterclass
				</DialogTitle>
				<p className='text-gray-400 text-sm font-medium'>
					{isBatting
						? maxLoft === 2
							? `Upto ${maxLoft} lofted shots per over. Purchase power-up from shop to increase limits!`
							: maxLoft < 6
							? `Upto ${maxLoft} lofted shots per over. Upgrade your power-up to increase limits!`
							: 'You can play unlimited lofted shots'
						: maxYorker === 2
						? `Upto ${maxYorker} yorkers per over. Purchase power-up from shop to increase limits!`
						: maxYorker < 6
						? `Upto ${maxYorker} yorkers per over. Upgrade your power-up to increase limits!`
						: 'You can bowl unlimited yorkers'}
				</p>
				<Tabs
					defaultValue={currentControls[0].name.toLowerCase()}
					className='w-full min-h-56'
				>
					<TabsList className='grid w-full grid-cols-3 gap-3 bg-gray-800/30 p-1 rounded-lg'>
						{currentControls.map((control) => (
							<TabsTrigger
								key={control.name}
								value={control.name.toLowerCase()}
								className='data-[state=active]:bg-gray-700/50 data-[state=active]:backdrop-blur-sm'
							>
								<div className='flex flex-col items-center gap-2 py-2'>
									{control.icon}
									<span className='text-xs font-medium'>{control.name}</span>
								</div>
							</TabsTrigger>
						))}
					</TabsList>
					{currentControls.map((control) => (
						<TabsContent key={control.name} value={control.name.toLowerCase()}>
							<div className='mt-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/50 backdrop-blur-sm'>
								<p className='text-sm font-light leading-relaxed tracking-wide text-gray-300'>
									{control.description}
								</p>
							</div>
						</TabsContent>
					))}
				</Tabs>

				<div className='mt-6 p-4 bg-gray-800/20 rounded-lg border border-gray-700/50 backdrop-blur-sm'>
					<h4 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
						<Target className='w-4 h-4 text-amber-400' />
						Powerup Levels
					</h4>
					<div className='grid grid-cols-3 gap-3'>
						{[
							{ level: 1, limit: 3 },
							{ level: 5, limit: 4 },
							{ level: 10, limit: 'No limit' },
						].map(({ level, limit }) => (
							<div
								key={level}
								className='flex flex-col items-center justify-center bg-gray-700/30 rounded-lg px-3 py-2 border border-gray-600/20'
							>
								<span className='text-xs font-semibold text-gray-300'>
									Level {level}
								</span>
								<span className='text-xs text-gray-400 mt-1'>{limit}</span>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
