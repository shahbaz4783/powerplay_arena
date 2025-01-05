'use client';

import React, { useState } from 'react';
import {
	Trophy,
	Timer,
	Lock,
	Info,
	Plus,
	Sparkles,
	Sword,
	Shield,
	Wand,
	Scroll,
	Circle,
} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import CountdownTimer from './countdown';
import { GameHeader } from '../../layouts/global/game-header';

export type GameOption = 'Warrior' | 'Guardian' | 'Mystic' | 'Sage';
export type BetAmount = 100 | 500 | 1000;

export interface GameState {
	totalPrizePool: number;
	totalParticipants: number;
	userBalance: number;
	gameEndTime: Date;
}

export interface UserBet {
	option: GameOption | null;
	amount: number;
	totalAdded: number;
	isLocked: boolean;
}

const GAME_OPTIONS: { id: GameOption; icon: any; description: string }[] = [
	{
		id: 'Warrior',
		icon: Sword,
		description: 'Bold and aggressive strategy',
	},
	{
		id: 'Guardian',
		icon: Shield,
		description: 'Defensive and stable approach',
	},
	{
		id: 'Mystic',
		icon: Wand,
		description: 'Unpredictable magical tactics',
	},
	{
		id: 'Sage',
		icon: Scroll,
		description: 'Wise and calculated decisions',
	},
];

const UnderdogGame = () => {
	const [userBet, setUserBet] = useState<UserBet>({
		option: null,
		amount: 0,
		totalAdded: 0,
		isLocked: false,
	});
	const [showAddStars, setShowAddStars] = useState(false);

	const gameState: GameState = {
		totalPrizePool: 25000,
		totalParticipants: 143,
		userBalance: 1500,
		gameEndTime: new Date('2025-01-07T23:59:59Z'),
	};

	const calculatePotentialWin = (stars: number) => {
		const winAmount =
			(gameState.totalPrizePool * 0.8) / (gameState.totalParticipants / 4);
		const percentage = (stars / gameState.totalPrizePool) * 100;
		return { amount: Math.floor(winAmount), percentage: percentage.toFixed(1) };
	};

	return (
		<div className=' bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-3'>
			{/* Game Header */}
			<GameHeader
				title='Underdog Triumph'
				icon={Circle}
				hasUnsavedProgress={false}
				quitPath='/miniapp'
				iconColors='from-blue-400 to-blue-600'
				titleGradient='from-blue-200 via-blue-300 to-blue-400'
			/>
			<p className='p-2 font-exo2 my-3 border-2 text-yellow-900 border-yellow-500 bg-yellow-200 rounded-lg'>
				This game is not playable yet. Please wait for it to be developed.
			</p>

			<div className='flex justify-between items-center mb-8'>
				<div className='flex items-center gap-3'>
					<div className='bg-yellow-500/20 p-2 rounded-lg'>
						<Trophy className='w-6 h-6 text-yellow-400' />
					</div>
					<div>
						<h1 className='text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent'>
							Ends in
						</h1>
						<CountdownTimer onGameEnd={() => {}} />
					</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<button className='p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all'>
							<Info className='w-5 h-5 text-blue-400' />
						</button>
					</DialogTrigger>
					<DialogContent className='bg-gray-800/95 backdrop-blur-sm border-gray-700'>
						<DialogHeader>
							<DialogTitle className='flex items-center gap-3 text-2xl font-bold pb-4'>
								<Sparkles className='w-7 h-7 text-yellow-500' />
								How to Win
							</DialogTitle>
						</DialogHeader>
						<div className='space-y-6'>
							<div className='bg-gray-700/30 rounded-xl p-5'>
								<p className='text-lg font-medium mb-3'>🎯 Strategy</p>
								<p className='text-gray-300'>
									Choose the option you think others won't pick! The least
									chosen option wins the game.
								</p>
							</div>

							<div className='bg-blue-500/10 rounded-xl p-5'>
								<p className='text-lg font-medium mb-3'>💫 Rewards</p>
								<p className='text-gray-300'>
									Winners share 80% of the total prize pool based on their bet
									amount.
								</p>
							</div>

							<div className='bg-gray-700/30 rounded-xl p-5'>
								<p className='text-lg font-medium mb-3'>⏰ Timeline</p>
								<p className='text-gray-300'>
									Game ends every Sunday at 23:59:59 UTC. Make sure to place
									your bets before the deadline!
								</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Game Stats */}
			<div className='grid grid-cols-2 gap-4 mb-8'>
				<div className='bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-2xl'>
					<div className='flex items-center gap-2 text-purple-400 mb-2'>
						<Sparkles className='w-4 h-4' />
						<span className='text-sm font-medium'>Prize Pool</span>
					</div>
					<p className='text-2xl font-bold'>
						{gameState.totalPrizePool.toLocaleString()} ⭐
					</p>
				</div>
				<div className='bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl'>
					<div className='flex items-center gap-2 text-blue-400 mb-2'>
						<Trophy className='w-4 h-4' />
						<span className='text-sm font-medium'>Players</span>
					</div>
					<p className='text-2xl font-bold'>{gameState.totalParticipants}</p>
				</div>
			</div>

			{/* Potential Winnings Card */}
			{userBet.isLocked && (
				<div className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-8'>
					<h3 className='text-xl font-bold mb-4'>Potential Winnings</h3>
					<div className='space-y-3'>
						<div className='flex justify-between items-center'>
							<span className='text-gray-300'>Expected Return</span>
							<span className='text-xl font-bold text-green-400'>
								{calculatePotentialWin(userBet.amount).amount.toLocaleString()}{' '}
								⭐
							</span>
						</div>
						<div className='flex justify-between items-center text-sm'>
							<span className='text-gray-400'>Your Bet</span>
							<span className='text-gray-300'>
								{userBet.amount.toLocaleString()} ⭐
							</span>
						</div>
						<div className='flex justify-between items-center text-sm'>
							<span className='text-gray-400'>Pool Share</span>
							<span className='text-gray-300'>
								{calculatePotentialWin(userBet.amount).percentage}%
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Options Grid */}
			<div className='grid grid-cols-2 gap-4 mb-8'>
				{GAME_OPTIONS.map((option) => {
					const Icon = option.icon;
					return (
						<div
							key={option.id}
							onClick={() =>
								!userBet.isLocked &&
								setUserBet((prev) => ({ ...prev, option: option.id }))
							}
							className={`
                relative p-6 rounded-2xl cursor-pointer transition-all
                ${
									userBet.option === option.id
										? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400'
										: 'bg-gray-800/50 hover:bg-gray-800/70 border-2 border-gray-700'
								}
              `}
						>
							<div className='flex flex-col items-center gap-3'>
								<Icon
									className={`w-8 h-8 ${
										userBet.option === option.id
											? 'text-blue-400'
											: 'text-gray-400'
									}`}
								/>
								<div className='text-center'>
									<h3 className='text-lg font-bold mb-1'>{option.id}</h3>
									<p className='text-sm text-gray-400'>{option.description}</p>
								</div>
							</div>
							{userBet.isLocked && userBet.option === option.id && (
								<Lock className='absolute top-3 right-3 w-4 h-4 text-blue-400' />
							)}
						</div>
					);
				})}
			</div>

			{/* Betting Controls */}
			{!userBet.isLocked ? (
				<div className='space-y-4'>
					<div className='grid grid-cols-3 gap-3'>
						{[100, 500, 1000].map((amount) => (
							<button
								key={amount}
								onClick={() => setUserBet((prev) => ({ ...prev, amount }))}
								className={`
                  p-4 rounded-xl text-center transition-all
                  ${
										userBet.amount === amount
											? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
											: 'bg-gray-800 hover:bg-gray-700'
									}
                `}
							>
								{amount} ⭐
							</button>
						))}
					</div>

					<button
						onClick={() => setUserBet((prev) => ({ ...prev, isLocked: true }))}
						disabled={!userBet.option || userBet.amount < 100}
						className={`
              w-full p-4 rounded-xl font-bold text-lg transition-all
              ${
								userBet.option && userBet.amount >= 100
									? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
									: 'bg-gray-700 cursor-not-allowed'
							}
            `}
					>
						Place Bet
					</button>
				</div>
			) : (
				<div>
					{!showAddStars ? (
						<button
							onClick={() => setShowAddStars(true)}
							className='w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold text-lg transition-all flex items-center justify-center gap-2'
						>
							<Plus className='w-5 h-5' /> Add More Stars
						</button>
					) : (
						<div className='space-y-4'>
							<div className='grid grid-cols-3 gap-3'>
								{[100, 500, 1000].map((amount) => (
									<button
										key={amount}
										onClick={() => {
											setUserBet((prev) => ({
												...prev,
												amount: prev.amount + amount,
												totalAdded: prev.totalAdded + amount,
											}));
											setShowAddStars(false);
										}}
										className='p-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-center transition-all'
									>
										+{amount} ⭐
									</button>
								))}
							</div>
							<button
								onClick={() => setShowAddStars(false)}
								className='w-full p-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all'
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UnderdogGame;
