'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ArrowUpCircle,
	ArrowDownCircle,
	Coins,
	Badge,
	CoinsIcon,
	Shuffle,
	ArrowRight,
	Landmark,
	SwordIcon,
} from 'lucide-react';
import { Slider } from '@/src/components/ui/slider';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { SubmitButton } from '../feedback/submit-button';
import { token } from '@/src/lib/constants';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import { MessageCard } from '../cards/message-card';
import { betOptions, betSides } from '@/src/constants/challenges';
import { calculateBettingPassCost, cn } from '@/src/lib/utils';
import { Card, CardContent } from '../ui/card';

export function CoinFlipChallenge() {
	const [betAmount, setBetAmount] = useState(0);
	const [selectedChallenge, setSelectedChallenge] = useState(betOptions[0]);
	const [selectedSide, setSelectedSide] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [result, setResult] = useState<'win' | 'lose' | null>(null);

	const initData = useInitData();
	const user = initData?.user;
	const { data, isLoading } = useUserProfile(user?.id);

	if (isLoading)
		return (
			<MessageCard
				title='Preparing Coin Flip Challenge'
				message='Polishing the lucky coin and setting up the challenge. Get ready to test your fortune!'
				type='loading'
			/>
		);

	const profile = data?.userProfile;
	const userBalance = profile?.balance as number;
	const maxBet = Math.floor((userBalance * 0.65) / 10) * 10;

	const handleBet = () => {
		if (betAmount > userBalance || !selectedSide) return;

		setIsSpinning(true);
		setResult(null);
		setIsModalOpen(true);

		setTimeout(() => {
			const randomOutcome = Math.random();
			const isWin = randomOutcome <= selectedChallenge.odds;

			setIsSpinning(false);
		}, 5000);
	};

	return (
		<div className='w-full max-w-2xl mx-auto'>
			<main className='space-y-4'>
				<section className='w-full bg-slate-900 rounded-xl p-4 space-y-6'>
					<div className='flex justify-between text-sm text-muted-foreground'>
						<span>Min Bet: {10}</span>
						<span>Balance: {userBalance}</span>
						<span>Max Bet: {maxBet}</span>
					</div>
					<Slider
						min={0}
						max={maxBet}
						step={10}
						value={[betAmount]}
						onValueChange={(value) => setBetAmount(value[0])}
						className='w-full'
						disabled={profile?.bettingPasses === 0}
					/>
					<div className='flex justify-between text-sm text-slate-400'>
						<p>Betting Pass: {profile?.bettingPasses}</p>
						<p>
							Bet Amount: {betAmount} {token.symbol}
						</p>
					</div>
				</section>

				<section className='bg-slate-900 rounded-xl p-3 space-y-4'>
					<div className='grid grid-cols-2 gap-2'>
						{betOptions.map((option) => (
							<div
								key={option.name}
								className={cn(
									'w-full rounded-xl border cursor-pointer h-auto py-4 flex flex-col items-center justify-center',
									{
										'text-slate-900 bg-white font-bold':
											selectedChallenge === option,
									}
								)}
								onClick={() => setSelectedChallenge(option)}
							>
								<span className=' text-sm'>{option.name}</span>
							</div>
						))}
					</div>
					<p className='text-sm text-slate-400 text-center'>
						{selectedChallenge.description}
					</p>
				</section>

				<div className='bg-slate-900 rounded-xl p-3'>
					<h3 className='text-center text-slate-400 text-sm mb-2'>
						Choose Your Side
					</h3>
					<div className='grid grid-cols-2 gap-2'>
						{betSides.map((side) => (
							<div
								key={side.value}
								className={cn(
									'w-full rounded-xl border cursor-pointer h-auto py-4 flex flex-col items-center justify-center',
									{
										'text-slate-900 bg-white font-bold':
											selectedSide === side.value,
									}
								)}
								onClick={() => setSelectedSide(side.value)}
							>
								<span className=' text-sm'>{side.name}</span>
							</div>
						))}
					</div>
				</div>

				{betAmount > 0 && selectedChallenge && selectedSide && (
					<section className='bg-slate-900 border-slate-800 rounded-xl'>
						<CardContent className='p-6 space-y-4'>
							<h3 className='text-lg font-semibold text-slate-200'>
								Your Bet Summary
							</h3>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<p className='text-sm text-slate-400'>Bet Amount</p>
									<div className='flex items-center space-x-2'>
										<Landmark className='h-5 w-5 text-blue-500' />
										<span className='text-lg font-medium text-slate-200'>
											{betAmount} {token.symbol}
										</span>
									</div>
								</div>
								<div className='space-y-2'>
									<p className='text-sm text-slate-400'>Bet Amount</p>
									<div className='flex items-center space-x-2'>
										<SwordIcon className='h-5 w-5 text-blue-500' />
										<span className='text-lg font-medium text-slate-200'>
											{selectedChallenge.name}
										</span>
									</div>
								</div>
								<div className='space-y-2'>
									<p className='text-sm text-slate-400'>Your Side</p>
									<div className='flex items-center space-x-2'>
										<CoinsIcon className='h-5 w-5 text-blue-500' />
										<span className='text-lg font-medium text-slate-200 capitalize'>
											{selectedSide || 'Not selected'}
										</span>
									</div>
								</div>
								<div className='space-y-2'>
									<p className='text-sm text-slate-400'>Betting Pass Cost</p>
									<div className='flex items-center space-x-2'>
										<Shuffle className='h-5 w-5 text-blue-500' />
										<span className='text-lg font-medium text-slate-200'>
											{calculateBettingPassCost(betAmount)}
										</span>
									</div>
								</div>
							</div>

							<div className='flex items-center justify-between text-sm text-slate-400'>
								<span>Potential Win</span>
								<div className='flex items-center space-x-1'>
									<span className='text-green-400 font-medium'>
										{Math.round(betAmount * selectedChallenge.payout)}
										{token.symbol}
									</span>
									<ArrowRight className='h-4 w-4 text-green-400' />
								</div>
							</div>

							<SubmitButton
								title='Place Bet'
								loadingTitle='Please wait for result...'
								onClick={handleBet}
								disabled={
									betAmount > userBalance || !selectedSide || isSpinning
								}
								className='w-full'
							/>
						</CardContent>
					</section>
				)}
			</main>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='text-center'>
							Flipping the Coin!
						</DialogTitle>
					</DialogHeader>
					<div className='flex items-center justify-center py-8'>
						<AnimatePresence>
							{isSpinning && (
								<motion.div
									initial={{ rotateY: 0 }}
									animate={{ rotateY: 1800 }}
									transition={{ duration: 5, ease: 'easeInOut' }}
									className='w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center'
								>
									<Coins className='text-white' size={64} />
								</motion.div>
							)}
							{result && !isSpinning && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className={`text-center p-4 rounded-md ${
										result === 'win' ? 'bg-green-500' : 'bg-red-500'
									} text-white font-bold text-xl`}
								>
									{result === 'win' ? (
										<ArrowUpCircle className='inline-block mr-2 h-8 w-8' />
									) : (
										<ArrowDownCircle className='inline-block mr-2 h-8 w-8' />
									)}
									You {result}!
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
