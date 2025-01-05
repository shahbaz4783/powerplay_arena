import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Star, Timer, ChevronRight, Trophy, Zap, Sparkles } from 'lucide-react';
import type { PowerUp, Avatar, Resource } from './types';

export const PowerUpDialog: React.FC<{
	powerUp: PowerUp;
	isOpen: boolean;
	onClose: () => void;
}> = ({ powerUp, isOpen, onClose }) => {
	const milestones = [
		{ level: 1, bonus: powerUp.bonusPerLevel },
		{ level: 5, bonus: 5 * powerUp.bonusPerLevel },
		{ level: 10, bonus: 10 * powerUp.bonusPerLevel },
	];

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-gray-900 border-gray-800 text-gray-100 max-w-md'>
				<DialogHeader>
					<div className='flex items-center gap-4'>
						<div className='relative'>
							<div className='relative group'>
								<img
									src={powerUp.imageUrl}
									alt={powerUp.name}
									className='w-16 h-16 rounded-xl object-cover border-2 border-blue-500 group-hover:border-blue-400 transition-colors'
								/>
								<div className='absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-xl transition-colors' />
							</div>
							<div className='absolute -bottom-2 -right-2 bg-blue-500 rounded-lg px-2 py-1 text-xs font-bold flex items-center gap-1'>
								<Sparkles className='w-3 h-3' />
								Lv.{powerUp.level}
							</div>
						</div>
						<div>
							<DialogTitle className='text-xl font-bold text-blue-400'>
								{powerUp.name}
							</DialogTitle>
							<div className='text-sm text-gray-400'>{powerUp.type}</div>
						</div>
					</div>
				</DialogHeader>

				<div className='mt-4 space-y-4'>
					{/* Current Status */}
					<div className='bg-gray-800/50 rounded-lg p-3'>
						<div className='text-sm text-gray-400 mb-2'>
							{powerUp.description}
						</div>
						<div className='flex items-center justify-between text-sm'>
							<div className='flex items-center gap-1.5'>
								<Zap className='w-4 h-4 text-blue-400' />
								<span>Current Power</span>
							</div>
							<span className='font-bold text-blue-400'>
								+{powerUp.currentBonus}%
							</span>
						</div>
					</div>

					{/* Progress Bar */}
					<div className='space-y-1'>
						<div className='flex justify-between text-xs'>
							<span className='text-gray-400'>Progress</span>
							<span className='text-blue-400 font-medium'>
								{powerUp.level}/10
							</span>
						</div>
						<div className='h-2 bg-gray-800 rounded-full overflow-hidden'>
							<div
								className='h-full bg-gradient-to-r from-blue-600 to-blue-400'
								style={{ width: `${(powerUp.level / 10) * 100}%` }}
							/>
						</div>
					</div>

					{/* Milestones */}
					<div className='grid grid-cols-3 gap-2'>
						{milestones.map((milestone) => (
							<div
								key={milestone.level}
								className={`p-2 rounded-lg text-center ${
									powerUp.level >= milestone.level
										? 'bg-blue-500/20 border border-blue-500'
										: 'bg-gray-800/50 border border-gray-700'
								}`}
							>
								<div
									className={`text-xs mb-1 ${
										powerUp.level >= milestone.level
											? 'text-blue-400'
											: 'text-gray-400'
									}`}
								>
									Level {milestone.level}
								</div>
								<div
									className={`font-bold ${
										powerUp.level >= milestone.level
											? 'text-blue-400'
											: 'text-gray-500'
									}`}
								>
									+{milestone.bonus}%
								</div>
							</div>
						))}
					</div>

					{/* Next Level Preview */}
					{powerUp.level < 10 && (
						<div className='bg-gray-800/50 rounded-lg p-3 flex items-center justify-between'>
							<div className='flex items-center gap-1.5'>
								<Trophy className='w-4 h-4 text-green-400' />
								<span className='text-sm'>Next Level Bonus</span>
							</div>
							<span className='font-bold text-green-400'>
								+{powerUp.nextLevelBonus}%
							</span>
						</div>
					)}

					{/* Upgrade Button */}
					{powerUp.level < 10 && (
						<Button
							className='w-full bg-blue-600 hover:bg-blue-500 text-white h-12 text-sm font-medium'
							onClick={() => {
								/* Handle upgrade */
							}}
						>
							Upgrade to Level {powerUp.level + 1}
							<div className='ml-2 flex items-center gap-1 text-blue-200'>
								<img
									src='/api/placeholder/16/16'
									alt='coin'
									className='w-4 h-4'
								/>
								{powerUp.upgradeCost.toLocaleString()}
							</div>
							<ChevronRight className='ml-1 w-4 h-4' />
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const AvatarDialog: React.FC<{
	avatar: Avatar;
	isOpen: boolean;
	onClose: () => void;
}> = ({ avatar, isOpen, onClose }) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent className='bg-gray-900 border-gray-800 text-gray-100 max-w-2xl'>
			<DialogHeader>
				<div className='flex items-center gap-4'>
					<div className='relative'>
						<img
							src={avatar.imageUrl}
							alt={avatar.name}
							className={`w-20 h-20 rounded-xl object-cover border-2 ${
								avatar.rarity === 'legendary'
									? 'border-amber-500'
									: avatar.rarity === 'epic'
									? 'border-purple-500'
									: 'border-blue-500'
							}`}
						/>
						<div
							className={`absolute -bottom-2 -right-2 rounded-lg px-2 py-1 text-xs font-bold ${
								avatar.rarity === 'legendary'
									? 'bg-amber-500'
									: avatar.rarity === 'epic'
									? 'bg-purple-500'
									: 'bg-blue-500'
							}`}
						>
							{avatar.rarity}
						</div>
					</div>
					<div>
						<DialogTitle
							className={`text-2xl font-bold ${
								avatar.rarity === 'legendary'
									? 'text-amber-400'
									: avatar.rarity === 'epic'
									? 'text-purple-400'
									: 'text-blue-400'
							}`}
						>
							{avatar.name}
						</DialogTitle>
						<p className='text-gray-400'>{avatar.description}</p>
					</div>
				</div>
			</DialogHeader>

			<div className='mt-6 space-y-6'>
				<div className='space-y-4'>
					<h3 className='font-semibold'>Special Perks</h3>
					<div className='grid gap-3'>
						{avatar.perks.map((perk, index) => (
							<div
								key={index}
								className='flex items-center gap-3 bg-gray-800 rounded-lg p-3'
							>
								<Star className='w-5 h-5 text-yellow-400' />
								<span>{perk}</span>
							</div>
						))}
					</div>
				</div>

				<div className='flex gap-4'>
					<div className='flex-1 bg-gray-800 rounded-lg p-4'>
						<div className='text-sm text-gray-400'>Obtained On</div>
						<div className='font-semibold mt-1'>{avatar.obtainedDate}</div>
					</div>
					<Button
						className={`flex-1 py-6 text-lg ${
							avatar.isEquipped
								? 'bg-gray-700 hover:bg-gray-600'
								: 'bg-blue-600 hover:bg-blue-500'
						}`}
						disabled={avatar.isEquipped}
						onClick={() => {
							/* Handle equip */
						}}
					>
						{avatar.isEquipped ? 'Equipped' : 'Equip Avatar'}
					</Button>
				</div>
			</div>
		</DialogContent>
	</Dialog>
);

export const ResourceDialog: React.FC<{
	resource: Resource;
	isOpen: boolean;
	onClose: () => void;
}> = ({ resource, isOpen, onClose }) => (
	<Dialog open={isOpen} onOpenChange={onClose}>
		<DialogContent className='bg-gray-900 border-gray-800 text-gray-100 max-w-2xl'>
			<DialogHeader>
				<div className='flex items-center gap-4'>
					<img
						src={resource.imageUrl}
						alt={resource.name}
						className='w-20 h-20 rounded-xl object-cover border-2 border-green-500'
					/>
					<div>
						<DialogTitle className='text-2xl font-bold text-green-400'>
							{resource.name}
						</DialogTitle>
						<p className='text-gray-400'>{resource.description}</p>
					</div>
				</div>
			</DialogHeader>

			<div className='mt-6 space-y-6'>
				<div className='space-y-4'>
					<h3 className='font-semibold'>Contents</h3>
					<div className='grid gap-3'>
						{resource.type === 'bundle' &&
							resource.contents.items?.map((item, index) => (
								<div
									key={index}
									className='flex items-center justify-between bg-gray-800 rounded-lg p-3'
								>
									<div className='flex items-center gap-3'>
										<img
											src='/api/placeholder/32/32'
											alt={item.name}
											className='w-8 h-8 rounded'
										/>
										<span>{item.name}</span>
									</div>
									<span className='text-green-400'>x{item.quantity}</span>
								</div>
							))}
						{resource.type === 'coin_pack' && (
							<div className='flex items-center justify-between bg-gray-800 rounded-lg p-3'>
								<div className='flex items-center gap-3'>
									<img
										src='/api/placeholder/32/32'
										alt='Coins'
										className='w-8 h-8 rounded'
									/>
									<span>Coins</span>
								</div>
								<span className='text-green-400'>
									{resource.contents.coins?.toLocaleString()}
								</span>
							</div>
						)}
					</div>
				</div>

				{resource.expiryDate && (
					<div className='bg-red-500/20 border border-red-500 rounded-lg p-4'>
						<div className='flex items-center gap-2 text-red-400'>
							<Timer className='w-5 h-5' />
							<span>Expires on {resource.expiryDate}</span>
						</div>
					</div>
				)}

				<Button
					className='w-full bg-green-600 hover:bg-green-500 py-6 text-lg'
					onClick={() => {
						/* Handle redeem */
					}}
				>
					Redeem {resource.type === 'bundle' ? 'Bundle' : 'Pack'}
					<ChevronRight className='ml-2 w-5 h-5' />
				</Button>
			</div>
		</DialogContent>
	</Dialog>
);
